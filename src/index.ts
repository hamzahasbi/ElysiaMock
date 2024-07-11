import { Elysia } from "elysia";
const endpoints = await require('./extract').prepare();
const app = new Elysia();
app.onError(({error }) => {
  return new Response(error.toString())
}).get("/*", ({ params }) => {
  const uri =  params['*'];

  if (Object.hasOwn(endpoints, uri)) {
    return endpoints[uri];
  }
  throw new Error('Server is during maintenance')
}).post("/*", ({ params }) => {
  const uri =  params['*'];

  if (Object.hasOwn(endpoints, uri)) {
    return endpoints[uri];
  }
  throw new Error('Server is during maintenance')
}).put("/*", ({ params }) => {
  const uri =  params['*'];

  if (Object.hasOwn(endpoints, uri)) {
    return endpoints[uri];
  }
  throw new Error('Server is during maintenance')
}).listen(9000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
