"use client";

import type { RouterOutputs } from "~/trpc/shared";

import { CharacterCard } from "./CharacterCard";

import { useRouter } from "next/navigation";

import { Divider, Pagination } from "@nextui-org/react";

export const Author = ({
	data,
	page,
}: {
	data: NonNullable<RouterOutputs["tavern"]["getCharactersFromAuthor"]["data"]>;
	page: number;
}) => {
	const router = useRouter();
	const totalPages = Math.ceil(data.charactersCount / 20);

	return (
		<>
			<section className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-3 gap-y-4 sm:gap-y-6">
				<h3 className="col-span-full text-2xl font-semibold">Characters ({data.charactersCount})</h3>

				<Divider orientation="horizontal" className="col-span-full" />

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

			{totalPages > 1 && (
				<section className="flex items-center justify-center">
					<Pagination
						size="lg"
						showShadow
						page={page}
						showControls={totalPages > 1}
						isDisabled={totalPages === 1}
						onChange={(value) =>
							router.replace(`/characters/${data.name_view}?page=${value}`, { scroll: false })
						}
						total={totalPages}
					/>
				</section>
			)}
		</>
	);
};
