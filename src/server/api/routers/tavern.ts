import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { formatBytes, readImageData } from "~/server/utils";

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
				perPage: z.number().min(1),
				page: z.number(),
				nsfw: z.boolean().transform((value) => (value ? "on" : "off")),
			}),
		)
		.query(async ({ input }) => {
			const { authorName, nsfw, page, perPage } = input;

			const searchParams = new URLSearchParams();

			searchParams.set("page", page.toString());
			searchParams.set("perpage", perPage.toString());
			searchParams.set("nsfw", nsfw);

			const res = await fetch(
				`https://tavernai.net/api/users/${authorName}/characters?${searchParams.toString()}`,
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

	getCategories: publicProcedure
		.input(z.object({ limit: z.number().nullish() }).nullish())
		.query(async ({ input }) => {
			const res = await fetch(`https://tavernai.net/api/categories`);

			if (!res.ok) return { status: res.status, messages: res.statusText };

			let data = ((await res.json()) as { id: number; name: string; name_view: string; count: number }[]).sort(
				(a, b) => b.count - a.count,
			);

			if (input?.limit) data = data.slice(0, input.limit);

			return {
				status: res.status,
				data: [
					{ id: 0, count: undefined, name: "$recent", name_view: "$Recent" },
					{ id: 1, count: undefined, name: "$random", name_view: "$Random" },
					...data,
				],
			};
		}),

	getCharactersFromCategory: publicProcedure
		.input(
			z.object({
				category: z.string(),
				page: z.number(),
				nsfw: z.boolean().transform((value) => (value ? "on" : "off")),
			}),
		)
		.query(async ({ input }) => {
			const searchParams = new URLSearchParams();

			searchParams.set("page", input.page.toString());
			searchParams.set("nsfw", input.nsfw);

			const res = await fetch(
				`https://tavernai.net/api/categories/${input.category}/characters?${searchParams.toString()}`,
			);

			if (!res.ok) return { status: res.status, messages: res.statusText };
			const data = (await res.json()) as BoardType[number]["characters"];

			return { status: res.status, data };
		}),

	getCategoryCount: publicProcedure.input(z.object({ category: z.string() })).query(async ({ input }) => {
		const res = await fetch(`https://tavernai.net/api/categories`);
		if (!res.ok) return { status: res.status, messages: res.statusText, data: 0 };

		const data = (await res.json()) as { id: number; name: string; name_view: string; count: number }[];

		return {
			status: res.status,
			data: data.find(({ name_view }) => name_view.toLowerCase() === input.category.toLowerCase())?.count,
		};
	}),

	getCharacter: publicProcedure
		.input(z.object({ author: z.string(), public_id_short: z.string() }))
		.query(async ({ input }) => {
			const res = await fetch(`https://tavernai.net/${input.author}/${input.public_id_short}.webp`);

			if (!res.ok) return { status: res.status, messages: res.statusText };

			const rawData = readImageData(await res.arrayBuffer(), "webp");
			if (!rawData || rawData.status == "Failed")
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: String(rawData?.message) ?? "Unable to read with provided card.",
				});

			const data = JSON.parse(rawData.data) as {
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

			return { status: res.status, data };
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
