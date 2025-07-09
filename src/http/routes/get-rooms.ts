import { count, eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connections.ts';
import { schemas } from '../../db/schema/index.ts';

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async () => {
    const results = await db
      .select({
        id: schemas.rooms.id,
        name: schemas.rooms.name,
        createAt: schemas.rooms.createAt,
        questionsCount: count(schemas.questions.id),
      })
      .from(schemas.rooms)
      .leftJoin(
        schemas.questions,
        eq(schemas.questions.roomId, schemas.rooms.id)
      )
      .groupBy(schemas.rooms.id, schemas.rooms.name)
      .orderBy(schemas.rooms.createAt);
    return results;
  });
};
