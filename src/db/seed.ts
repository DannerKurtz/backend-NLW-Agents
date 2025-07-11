import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connections.ts';
import { schemas } from './schema/index.ts';

await reset(db, schemas);

await seed(db, schemas).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.fullName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 15,
    },
  };
});

await sql.end();
// biome-ignore lint/suspicious/noConsole: only used in dev
console.log('Database seeded');
