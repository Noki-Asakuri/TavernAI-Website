import { CharacterCard } from "~/components/characters/CharacterCard";
import { api } from "~/trpc/server";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import NextLink from "next/link";
import { notFound } from "next/navigation";

import { Avatar, Button, Link } from "@nextui-org/react";

import { cache } from "react";

const getData = cache(async ({ author, page }: { author: string; page: string }) => {
	return await api.tavern.getCharactersFromAuthor.query({
		authorName: author,
		nsfw: cookies().get("nsfw")?.value === "true",
		page: Number(page ?? "1"),
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
	searchParams: { page: string };
}) {
	const { data } = await getData({ author, page });
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
					<span className="text-2xl font-bold">{data.name_view}</span>
					<span>
						Profile:{" "}
						<Link as={NextLink} underline="hover" href={`https://tavernai.net/${data.name}`}>
							https://tavernai.net/{data.name}
						</Link>
					</span>
					<Button color="success">Characters: {data.charactersCount}</Button>
				</div>
			</section>

			<section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 gap-y-4 sm:gap-y-6">
				<h3 className="col-span-full text-xl font-semibold">Characters</h3>

				{data.characters.map((character) => (
					<CharacterCard
						key={character.public_id}
						character={{
							id: 0,
							moderation: character.moderation,
							create_date: character.createDate,
							edit_date: character.editDate,
							name: character.name,
							nsfw: 0,
							private: 0,
							public_id: character.public_id,
							public_id_short: character.public_id_short,
							short_description: character.shortDescription,
							status: character.status,
							user_id: "",
							user_name: data.name,
							user_name_view: data.name_view,
						}}
					/>
				))}
			</section>
		</main>
	);
}
