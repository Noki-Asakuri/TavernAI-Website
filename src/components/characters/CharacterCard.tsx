"use client";

import { useBlurNSFW } from "~/server/store";
import type { RouterOutputs } from "~/trpc/shared";

import { LazyImage } from "../common/LazyImage";

import Link from "next/link";

import { Card, CardFooter, Chip, Tooltip, cn } from "@nextui-org/react";

import { useState } from "react";
import { useUpdateEffect } from "react-use";
import { useStore } from "zustand";

type CharacterType = NonNullable<RouterOutputs["tavern"]["getBoard"]["data"]>[number]["characters"][number];

export const CharacterCard = ({ character }: { character: CharacterType }) => {
	const state = useStore(useBlurNSFW, (state) => ({ isBlurNSFW: state.isBlurNSFW }));
	const [isNSFW, setNSFW] = useState(character.nsfw === 1);

	const blurNSFW = isNSFW && state.isBlurNSFW;

	useUpdateEffect(() => {
		const unsubscribe = useBlurNSFW.subscribe(() => setNSFW(character.nsfw === 1));

		return () => unsubscribe();
	}, [state.isBlurNSFW]);

	return (
		<Card radius="lg" className="aspect-[2/3] w-60 flex-shrink-0 flex-grow-0 border-none">
			<Link
				className="relative block aspect-[2/3]"
				href={`/characters/${character.user_name_view}/${character.name}/${character.public_id_short}`}
				onClick={(event) => {
					if (!blurNSFW) return;

					event.preventDefault();
					setNSFW(false);
				}}
			>
				{character.nsfw === 1 && (
					<Chip
						color="danger"
						size="lg"
						className={cn("absolute right-1 top-1 z-20 transition-[top,left]", {
							"left-[calc(50%-35.1px)] top-[calc(50%-16px)]": blurNSFW,
						})}
						onClick={(event) => {
							if (state.isBlurNSFW && !isNSFW) {
								event.preventDefault();
								event.stopPropagation();

								setNSFW(true);
							}
						}}
					>
						NSFW
					</Chip>
				)}

				<LazyImage
					alt={character.short_description.replaceAll("{{char}}", character.name)}
					src={`https://tavernai.net/${character.user_name_view}/${character.public_id_short}.webp`}
					classNames={{
						wrapper: "w-full",
						img: cn("w-full aspect-[2/3] blur-none !transition-[transform,opacity,filter]", {
							"blur-lg": blurNSFW,
						}),
					}}
					loading="lazy"
					width={240}
				/>
			</Link>

			<CardFooter className="absolute bottom-0 z-10 flex-col items-start bg-gradient-to-t from-black via-black/70 to-transparent text-white">
				<Link href={"/characters/" + character.user_name_view}>
					<h3>@{character.user_name_view}</h3>
				</Link>
				<span className="text-lg">{character.name}</span>
				<Tooltip
					showArrow
					content={
						character.short_description.length >= 150
							? character.short_description.slice(0, 150) + "..."
							: character.short_description
					}
					classNames={{ content: "max-w-[240px]" }}
					placement="bottom"
				>
					<p className="line-clamp-2 text-small">
						{character.short_description.replaceAll(/{{char}}/gi, character.name)}
					</p>
				</Tooltip>
			</CardFooter>
		</Card>
	);
};
