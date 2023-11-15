"use client";

import { api } from "~/trpc/react";
import type { RouterOutputs } from "~/trpc/shared";

import { CharacterCard } from "./CharacterCard";

import { useRouter } from "next/navigation";

import { Pagination } from "@nextui-org/react";

export const Author = ({
	initialData,
	nsfw,
	page,
}: {
	initialData: NonNullable<RouterOutputs["tavern"]["getCharactersFromAuthor"]["data"]>;
	nsfw: boolean;
	page: number;
}) => {
	const router = useRouter();

	const { data } = api.tavern.getCharactersFromAuthor.useQuery(
		{ authorName: initialData.name_view, nsfw, page, perPage: 20 },
		{
			initialData: { status: 200, data: initialData },
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		},
	);

	return (
		<>
			<section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 gap-y-4 sm:gap-y-6">
				<h3 className="col-span-full text-xl font-semibold">Characters</h3>

				{data.data?.characters.map((character) => (
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
							user_name: data.data?.name,
							user_name_view: data.data?.name_view,
						}}
					/>
				))}
			</section>

			<section className="flex items-center justify-center">
				<Pagination
					size="lg"
					showShadow
					page={page}
					showControls
					onChange={(value) =>
						router.replace(`/characters/${initialData.name_view}?page=${value}`, { scroll: true })
					}
					total={Math.ceil(initialData.charactersCount / 20)}
				/>
			</section>
		</>
	);
};
