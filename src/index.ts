import { Elysia } from "elysia";
const endpoints = await require('./extract').prepare();
import {check, interpreter} from './healthcheck'
const app = new Elysia();

const checkPoints = Object.keys(process.env)
    .filter(key => key.startsWith('API_ENDPOINT_'))
    .map(key => process.env[key]);

async function compute() {
  let res : any = {}
  if (checkPoints) {
    for (const url of checkPoints) {
      const val = await check(url);
      const match = url?.match(/^(?:https?:\/\/)?([^\/:?#]+)(?::(\d+))?/);
      const host : string = match ? match[1] : '';
      if (host) {
        res[host] = val
      }
    }
  }
  return res

}
const status = await compute()
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
}).get('/healthcheck', () => {
  return interpreter(status);
}).listen(9000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
