import { createTRPCRouter, publicProcedure } from "../trpc";

import { encodingForModel } from "js-tiktoken";
import z from "zod";

export const tokenRouter = createTRPCRouter({
	getToken: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
		if (!input.text) return 0;

		const encoding = encodingForModel("gpt-4-1106-preview");
		const tokens = encoding.encode(input.text);

		return tokens.length;
	}),
});
