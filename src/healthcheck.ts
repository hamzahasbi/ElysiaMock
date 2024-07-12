export async function check(api : any) {

  try {
    const response = await fetch(api, {
      method: "GET",
      verbose: true
    });
   return {
    status : response?.status,
    provider: response.headers
   }
  } catch (error) {
    console.error(error);
  }
}


export function interpreter(schemas : any) {
  const res = Object.keys(schemas)?.map((key) => {
    const schema = schemas[key]
    if (schema?.status >= 200 && schema?.status < 400) {
      return {
        host: key,
        status : true,
        prob: "100%"
      };
    }

    if (schema?.status >= 500) {
      return {
        host: key,
        status : false,
        prob: "100%"
      };
    }

    if (schema?.status >= 400 && schema?.status < 500) {
      return {
        host: key,
        status : true,
        prob: "50%",
        follow: schema?.provider
      };
    }

    return {
      'error' : "Service Under Maintanance"
    }
  })
  return res
}
