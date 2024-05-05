import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

type Bindings = {
  MY_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(logger());

app.get("/", (c) => {
  return c.text("bojin.co - kv-worker");
});

const kvSchema = z.object({
  key: z.string(),
  value: z.unknown(),
});

// get value from KV
app.get(
  "/get",
  zValidator("query", kvSchema.pick({ key: true }), (result, c) => {
    if (!result.success) {
      c.status(400);
      return c.json({ error: result.error });
    }
  }),
  async (c) => {
    const key = c.req.valid("query").key;
    const value = await c.env.MY_KV.get(key);
    return c.json({ key, value: value ? JSON.parse(value) : null });
  },
);

// set value to KV
app.post(
  "/set",
  zValidator("json", kvSchema, (result, c) => {
    if (!result.success) {
      c.status(400);
      return c.json({ error: result.error });
    }
  }),
  async (c) => {
    const data = c.req.valid("json");
    const { key, value } = data;
    await c.env.MY_KV.put(key, JSON.stringify(value));
    return c.json({ key, value });
  },
);

// set and get old value from KV
app.post(
  "/update",
  zValidator("json", kvSchema, (result, c) => {
    if (!result.success) {
      c.status(400);
      return c.json({ error: result.error });
    }
  }),
  async (c) => {
    const data = c.req.valid("json");
    const { key, value } = data;
    const oldValue = await c.env.MY_KV.get(key);
    await c.env.MY_KV.put(key, JSON.stringify(value));
    return c.json({ key, value: oldValue });
  },
);

export default app;
