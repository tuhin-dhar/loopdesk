import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginFormSchema, registerFormBackendSchema } from "../scehmas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleWare } from "@/lib/sessionMiddleware";

const app = new Hono()
  .get("/current", sessionMiddleWare, (c) => {
    const user = c.get("user");

    return c.json({ data: user });
  })
  .post("/login", zValidator("json", loginFormSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 24 * 30,
    });
    return c.json({ status: 200 });
  })
  .post(
    "/register",
    zValidator("json", registerFormBackendSchema),
    async (c) => {
      const { email, name, password } = c.req.valid("json");

      const { account } = await createAdminClient();
      const user = await account.create(ID.unique(), email, password, name);

      const session = await account.createEmailPasswordSession(email, password);

      console.log(session.secret);

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ data: user });
    }
  )
  .post("/logout", sessionMiddleWare, async (c) => {
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);

    await account.deleteSession("current");
    return c.json({ status: "logged out" });
  });

export default app;
