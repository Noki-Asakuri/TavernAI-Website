import { CharacterCard } from "~/components/characters/CharacterCard";
import { api } from "~/trpc/server";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

import { Chip } from "@nextui-org/react";

export const generateMetadata = ({ searchParams }: { searchParams: { query?: string } }): Metadata => {
	return {
		title: ("Search " + searchParams.query).trim(),
	};
};

export default async function Page({ searchParams }: { searchParams: { query?: string } }) {
	const { data } = await api.tavern.getSearchData.query({
		query: searchParams.query ?? "",
		nsfw: cookies().get("nsfw")?.value === "true",
	});

	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-4">
			{data?.categories && (
				<section className="flex flex-col gap-2">
					<h2 className="text-xl font-bold capitalize">Categories</h2>
					<div className="flex flex-wrap gap-2">
						{data.categories.map((category) => (
							<Chip
								key={["search-category", category].join("-")}
								as={Link}
								size="lg"
								color="success"
								variant="shadow"
								className="capitalize"
								href={"/categories/" + category.name}
							>
								{category.name_view} ({category.count})
							</Chip>
						))}
					</div>
				</section>
			)}

			{data?.characters && (
				<section className="flex flex-col gap-2">
					<h2 className="text-xl font-bold capitalize">Characters</h2>
					<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 gap-y-4 sm:gap-y-6">
						{data.characters.map((character) => (
							<CharacterCard
								key={character.public_id}
								character={{
									id: 0,
									moderation: character.moderation,
									create_date: character.create_date,
									edit_date: character.edit_date,
									name: character.name,
									nsfw: 0,
									private: 0,
									public_id: character.public_id,
									public_id_short: character.public_id_short,
									short_description: character.short_description,
									status: character.status,
									user_id: "",
									user_name: character.user_name,
									user_name_view: character.user_name_view,
								}}
							/>
						))}
					</div>
				</section>
			)}
		</main>
	);
}
