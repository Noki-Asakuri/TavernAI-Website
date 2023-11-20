"use client";

import type { RouterOutputs } from "~/trpc/shared";

import { CharacterCard } from "./CharacterCard";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button, Divider, Pagination } from "@nextui-org/react";

import { ChevronLeft, ChevronRight } from "lucide-react";

export const Category = ({
	data,
	charactersCount,
	page,
}: {
	data: NonNullable<RouterOutputs["tavern"]["getCharactersFromCategory"]["data"]>;
	charactersCount?: number;
	page: number;
}) => {
	const router = useRouter();
	const pathName = usePathname();

	return (
		<>
			<section className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-3 gap-y-4 sm:gap-y-6">
				<h3 className="col-span-full text-2xl font-semibold">
					Characters {charactersCount && <>({charactersCount})</>}
				</h3>

				<Divider orientation="horizontal" className="col-span-full" />

				{data.map((character) => (
					<CharacterCard key={character.public_id} character={character} />
				))}
			</section>

			<section className="flex items-center justify-center gap-2">
				<Button isIconOnly isDisabled={page === 1} as={Link} href={pathName + `?page=${page - 1}`}>
					<ChevronLeft />
				</Button>

				<Pagination
					size="lg"
					showShadow
					isCompact
					page={page}
					total={page}
					onChange={(page) => router.push(pathName + `?page=${page}`)}
				/>

				<Button isIconOnly isDisabled={data.length < 50} as={Link} href={pathName + `?page=${page + 1}`}>
					<ChevronRight />
				</Button>
			</section>
		</>
	);
};
