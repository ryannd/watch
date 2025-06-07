import { db } from "@repo/database";
import { Hono } from "hono";

const app = new Hono()

app.get('/', async (c) => {
    const { id } = c.req.query();

    const result = await db.query.media.findFirst({
        where: (_, { sql }) => sql`id = ${id}`,
        with: {
            seasons: true,
        }
    })

    return c.json(result);
})
