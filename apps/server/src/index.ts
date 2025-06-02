import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import dotenv from 'dotenv';
import auth from '@routes/auth.js'
import search from '@routes/search.js'
import details from '@routes/details.js'
import entry from '@routes/entry.js'
import { authLib } from '@lib/auth.js';

const app = new Hono<{
	Variables: {
		user: typeof authLib.$Infer.Session.user | null;
		session: typeof authLib.$Infer.Session.session | null
	}
}>().basePath('/api')

dotenv.config();

app.use(
	"*",
	cors({
		origin: "http://localhost:3000",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.use("*", async (c, next) => {
	const session = await authLib.api.getSession({ headers: c.req.raw.headers });
 
  	if (!session) {
    	c.set("user", null);
    	c.set("session", null);
    	return next();
  	}
 
  	c.set("user", session.user);
  	c.set("session", session.session);
  	return next();
});

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/auth', auth)
app.route('/search', search)
app.route('/details', details)
app.route('/entry', entry)

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
