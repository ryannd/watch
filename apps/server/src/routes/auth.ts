
import { authLib } from '@lib/auth.js';
import { Hono } from 'hono'

const app = new Hono()

app.on(["POST", "GET"], "/*", (c) => {
	return authLib.handler(c.req.raw);
});


export default app