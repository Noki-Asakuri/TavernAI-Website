"use client";

import type { RouterOutputs } from "~/trpc/shared";

import { CharacterCard } from "./CharacterCard";

import { usePathname, useRouter } from "next/navigation";

import { Divider, Pagination } from "@nextui-org/react";

export const Category = ({
	data,
	charactersCount,
	page,
}: {
	data: NonNullable<RouterOutputs["tavern"]["getCharactersFromCategory"]["data"]>;
	charactersCount: number;
	page: number;
}) => {
	const router = useRouter();
	const pathName = usePathname();

	return (
		<>
			<section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] place-items-center gap-4 gap-y-4 sm:gap-y-6">
				<h3 className="col-span-full text-2xl font-semibold">Characters ({charactersCount})</h3>

				<Divider orientation="horizontal" className="col-span-full" />

				{data.map((character) => (
					<CharacterCard key={character.public_id} character={character} />
				))}
			</section>

			<section className="flex items-center justify-center">
				<Pagination
					size="lg"
					showShadow
					page={page}
					showControls
					onChange={(value) => router.replace(`${pathName}?page=${value}`, { scroll: true })}
					total={Math.ceil(charactersCount / 52)}
				/>
			</section>
		</>
	);
};
