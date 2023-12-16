import { Author } from "~/components/characters/Author";
import { FavorButton } from "~/components/common/FavorButton";
import { api } from "~/trpc/server";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import NextLink from "next/link";
import { notFound } from "next/navigation";

import { Avatar, Button, Divider, Link } from "@nextui-org/react";

import { cache } from "react";

const getData = cache(async ({ author, page }: { author: string; page: string }) => {
	return await api.tavern.getCharactersFromAuthor.query({
		authorName: author,
		nsfw: cookies().get("nsfw")?.value === "true",
		page: Number(page),
		perPage: 20,
	});
});

export const generateMetadata = async ({ params: { author } }: { params: { author: string } }): Promise<Metadata> => {
	const data = await getData({ author, page: "1" });
	if (!data.data) return { title: data.messages };

	return { title: data.data.name_view };
};

export default async function Page({
	params: { author },
	searchParams: { page },
}: {
	params: { author: string };
	searchParams: { page?: string };
}) {
	const { data } = await getData({ author, page: page ?? "1" });
	if (!data) return notFound();

	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-4">
			<section className="flex items-center gap-4">
				<Avatar
					src={`https://tavernai.net/users/${data.name}/img/avatar.webp`}
					showFallback
					className="h-28 w-28 text-large"
				/>
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-start gap-2 text-2xl font-bold">
						<span>{data.name_view}</span>
						<FavorButton type="author" name={data.name} name_view={data.name_view} />
					</div>
					<span>
						Profile:{" "}
						<Link as={NextLink} underline="hover" href={`https://tavernai.net/${data.name}`}>
							https://tavernai.net/{data.name}
						</Link>
					</span>
					<Button color="success">Characters: {data.charactersCount}</Button>
				</div>
			</section>

			<Divider orientation="horizontal" />

			<Author data={data} page={Number(page ?? "1")} />
		</main>
	);
}
