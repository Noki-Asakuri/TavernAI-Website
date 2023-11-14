"use client";

import { useBlurNSFW } from "~/server/store";
import type { RouterOutputs } from "~/trpc/shared";

import Link from "next/link";

import { Card, CardFooter, Chip, Image } from "@nextui-org/react";

import { useState } from "react";
import { useStore } from "zustand";

type CharacterType = NonNullable<RouterOutputs["tavern"]["getBoard"]["data"]>[number]["characters"][number];

export const CharacterCard = ({ character }: { character: CharacterType }) => {
	const blurNSFW = useStore(useBlurNSFW, (state) => ({
		blurNSFW: state.blurNSFW,
	}));

	const [isNSFW, setNSFW] = useState(character.nsfw === 1);

	return (
		<Card radius="lg" className="aspect-[2/3] w-60 flex-shrink-0 flex-grow-0 border-none">
			{blurNSFW.blurNSFW && isNSFW && (
				<button className="relative aspect-[2/3]" onClick={() => setNSFW(false)}>
					<Chip
						color="danger"
						size="lg"
						className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
					>
						NSFW
					</Chip>
					<Image
						alt={character.short_description.replaceAll("{{char}}", character.name)}
						src={`https://tavernai.net/${character.user_name_view}/${character.public_id_short}.webp`}
						classNames={{ wrapper: "w-full aspect-[2/3]", img: "w-full blur-lg" }}
						loading="lazy"
						width={240}
						isBlurred
					/>
				</button>
			)}

			{(!blurNSFW.blurNSFW || !isNSFW) && (
				<Link
					className="aspect-[2/3]"
					href={`/characters/${character.user_name_view}/${character.name}/${character.public_id_short}`}
				>
					<Image
						alt={character.short_description.replaceAll("{{char}}", character.name)}
						src={`https://tavernai.net/${character.user_name_view}/${character.public_id_short}.webp`}
						classNames={{ wrapper: "w-full aspect-[2/3]", img: "w-full" }}
						loading="lazy"
						width={240}
						isBlurred
					/>
				</Link>
			)}

			<CardFooter className="absolute bottom-0 z-10 flex-col items-start bg-gradient-to-t from-black via-black/70 to-transparent">
				<h3>
					<Link href={"/characters/" + character.user_name_view}>@{character.user_name_view}</Link>
				</h3>
				<span className="text-lg">{character.name}</span>
				<p className="line-clamp-2 text-small">
					{character.short_description.replaceAll("{{char}}", character.name)}
				</p>
			</CardFooter>
		</Card>
	);
};
