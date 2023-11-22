import { createTRPCRouter, publicProcedure } from "../trpc";

import { encoding_for_model } from "tiktoken";
import z from "zod";

export const tokenRouter = createTRPCRouter({
	getToken: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
		const encoding = encoding_for_model("gpt-4-1106-preview");

		const tokens = encoding.encode(input.text);
		encoding.free();

		return tokens.length;
	}),
});
