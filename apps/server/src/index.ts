import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import dotenv from 'dotenv';
import auth from '@routes/auth.js'
import search from '@routes/search.js'

const app = new Hono().basePath('/api')

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

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/auth', auth)
app.route('/search', search)

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
