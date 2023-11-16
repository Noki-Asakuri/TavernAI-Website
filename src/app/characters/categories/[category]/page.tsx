import { CharacterCard } from "~/components/characters/CharacterCard";
import { api } from "~/trpc/server";

import { cookies } from "next/headers";

export default async function Page({ params: { category } }: { params: { category: string } }) {
	const { data } = await api.tavern.getCharactersFromCategory.query({
		category,
		nsfw: cookies().get("nsfw")?.value === "true",
	});

	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-4">
			<section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 gap-y-4 sm:gap-y-6">
				{data?.map((character) => <CharacterCard key={character.id} character={character} />)}
			</section>
		</main>
	);
}
