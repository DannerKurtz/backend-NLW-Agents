import { desc, eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import z from 'zod/v4';
import { db } from '../../db/connections.ts';
import { schemas } from '../../db/schema/index.ts';

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request) => {
      const { roomId } = request.params;
      const result = await db
        .select({
          id: schemas.questions.id,
          question: schemas.questions.question,
          answer: schemas.questions.answer,
          createAt: schemas.questions.createAt,
        })
        .from(schemas.questions)
        .where(eq(schemas.questions.roomId, roomId))
        .orderBy(desc(schemas.questions.createAt));

      return result;
    }
  );
};
