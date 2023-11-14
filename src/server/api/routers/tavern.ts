import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { formatBytes, readImages } from "~/server/utils";

import { TRPCError } from "@trpc/server";

import z from "zod";

type BoardType = {
	name: string;
	name_view: string;
	characters: {
		id: number;
		public_id: string;
		public_id_short: string;
		user_id: string;
		user_name: string;
		user_name_view: string;
		name: string;
		short_description: string;
		create_date: string;
		edit_date: string;
		private: number;
		status: number;
		moderation: number;
		nsfw: number;
	}[];
}[];

export const tavernRouter = createTRPCRouter({
	getCharactersFromAuthor: publicProcedure
		.input(
			z.object({
				authorName: z.string(),
				perPage: z.number().min(0),
				page: z.number(),
				nsfw: z.boolean().refine((value) => (value ? "on" : "off")),
			}),
		)
		.query(async ({ input }) => {
			const { authorName, nsfw, page, perPage } = input;

			console.log({ nsfw });

			const res = await fetch(
				`https://tavernai.net/api/users/${authorName}/characters?perpage=${perPage}&page=${page}&nsfw=${nsfw}`,
			);

			if (!res.ok) return { status: res.status, messages: res.statusText };

			const data = (await res.json()) as {
				name: string;
				name_view: string;
				status: number;
				registrationDate: string;
				characters: {
					public_id: string;
					public_id_short: string;
					name: string;
					moderation: number;
					status: number;
					shortDescription: string;
					createDate: string;
					editDate: string;
					categories: string[];
				}[];
				charactersCount: number;
			};

			return { status: res.status, data };
		}),

	getCategories: publicProcedure.query(async () => {
		const res = await fetch(`https://tavernai.net/api/categories`);

		if (!res.ok) return { status: res.status, messages: res.statusText };

		const data = (await res.json()) as {
			id: number;
			name: string;
			name_view: string;
			count: number;
		}[];

		return { status: res.status, data: data.sort((a, b) => b.count - a.count) };
	}),

	getCharactersFromCategory: publicProcedure
		.input(z.object({ category: z.string(), nsfw: z.boolean().transform((value) => (value ? "on" : "off")) }))
		.query(async ({ input }) => {
			if (["random", "recent"].includes(input.category)) {
				input.category = "$" + input.category;
			}

			const res = await fetch(
				`https://tavernai.net/api/categories/${input.category}/characters?nsfw=${input.nsfw}`,
			);

			if (!res.ok) return { status: res.status, messages: res.statusText };

			const data = (await res.json()) as BoardType[number]["characters"];

			return { status: res.status, data };
		}),

	getCharacter: publicProcedure
		.input(z.object({ author: z.string(), public_id_short: z.string() }))
		.query(async ({ input }) => {
			const res = await fetch(`https://tavernai.net/${input.author}/${input.public_id_short}.webp`);

			if (!res.ok) return { status: res.status, messages: res.statusText };

			const rawData = readImages("webp", await res.arrayBuffer());
			if (typeof rawData !== "string") throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

			const data = JSON.parse(rawData) as {
				public_id: string;
				public_id_short: string;
				user_name: string;
				user_name_view: string;
				name: string;
				description: string;
				short_description: string;
				personality: string;
				first_mes: string;
				chat: number;
				mes_example: string;
				scenario: string;
				categories: string[];
				create_date_online: number;
				edit_date_online: number;
				create_date_local: number;
				edit_date_local: number;
				online: boolean;
				nsfw: boolean;
			};

			return {
				status: res.status,
				data: { ...data, size: formatBytes(Number(res.headers.get("Content-Length") ?? "0")) },
			};
		}),

	getBoard: publicProcedure
		.input(z.object({ nsfw: z.boolean().transform((value) => (value ? "on" : "off")) }))
		.query(async ({ input }) => {
			const res = await fetch(`https://tavernai.net/api/characters/board?nsfw=${input.nsfw}`);

			if (!res.ok) return { status: res.status, messages: res.statusText };

			const data = (await res.json()) as BoardType;

			return {
				status: res.status,
				data: data.map((data) => {
					return {
						...data,
						name_view: data.name_view.startsWith("$") ? data.name_view.slice(1) : data.name_view,
					};
				}),
			};
		}),

	getSearchData: publicProcedure
		.input(z.object({ query: z.string(), nsfw: z.boolean().transform((value) => (value ? "on" : "off")) }))
		.query(async ({ input }) => {
			const res = await fetch(`https://tavernai.net/api/characters?q=${encodeURIComponent(input.query)}&nsfw=on`);

			if (!res.ok) return { status: res.status, messages: res.statusText };

			const data = (await res.json()) as {
				characters: {
					id: number;
					public_id: string;
					public_id_short: string;
					user_id: number;
					user_name: string;
					user_name_view: string;
					name: string;
					short_description: string;
					create_date: string;
					edit_date: string;
					private: number;
					status: number;
					moderation: number;
					nsfw: number;
					categories: string;
				}[];
				categories: { id: number; name: string; name_view: string; count: number }[];
			};

			return { status: res.status, data };
		}),
});
