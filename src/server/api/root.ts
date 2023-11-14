import { tavernRouter } from "~/server/api/routers/tavern";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	tavern: tavernRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

