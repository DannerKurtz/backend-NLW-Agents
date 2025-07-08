import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../db/connections.ts';
import { schemas } from '../../db/schema/index.ts';

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async () => {
    const results = await db
      .select({
        id: schemas.rooms.id,
        name: schemas.rooms.name,
      })
      .from(schemas.rooms)
      .orderBy(schemas.rooms.createAt);
    return results;
  });
};
