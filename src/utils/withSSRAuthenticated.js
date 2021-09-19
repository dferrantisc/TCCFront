import { parseCookies } from "./parseCookies";

export function withSSRAuthenticated(fn) {
  return async (ctx) => {
    const cookies = parseCookies(ctx);

    const token = cookies["tcc.token"];
    console.log(token);

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (error) {
      destroyCookie(ctx, "tcc.token");

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
