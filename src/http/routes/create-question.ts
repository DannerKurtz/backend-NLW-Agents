import { and, eq, sql } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connections.ts'
import { schemas } from '../../db/schema/index.ts'
import { generateAnswer, generateEmbeddings } from '../../service/gemini.ts'

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const { question } = request.body

      const embeddings = await generateEmbeddings(question)

      const embeddingsAsString = `[${embeddings.join(',')}]`

      const chunks = await db
        .select({
          id: schemas.audioChunks.id,
          transcription: schemas.audioChunks.transcription,
          similarity: sql<number>`1 - (${schemas.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
        })
        .from(schemas.audioChunks)
        .where(
          and(
            eq(schemas.audioChunks.roomId, roomId),
            sql`1 - (${schemas.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`
          )
        )
        .orderBy(
          sql`${schemas.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`
        )
        .limit(3)

      let answer: string | null = null

      if (chunks.length > 0) {
        const transcriptions = chunks.map((chunk) => chunk.transcription)

        answer = await generateAnswer(question, transcriptions)
      }

      const result = await db
        .insert(schemas.questions)
        .values({ roomId, question, answer })
        .returning()

      const insertedQuestion = result[0]

      if (!insertedQuestion) {
        throw new Error('Failed to create new room.')
      }

      return reply.status(201).send({
        questionId: insertedQuestion.id,
        answer,
      })
    }
  )
}
