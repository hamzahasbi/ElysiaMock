import { readdir } from "node:fs/promises";

export const prepare = async () => {
  const path = "./data";
  const files = await readdir(path, { recursive: true });
  let endpoints : Endpoints = {};
  for (const file of files)  {
    const input = Bun.file(`${path}/${file}`);

    const uri = file.replaceAll('-', '/').replaceAll('_', '/:').replaceAll('$', '_').replaceAll(".json", "");
    const content = await input.json();
    endpoints[uri] = content;
  }
  return endpoints;
}


interface Endpoints {
  [uri: string]: any;
}
