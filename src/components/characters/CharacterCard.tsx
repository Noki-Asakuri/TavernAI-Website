"use client";

import { useBlurNSFW } from "~/server/store";
import type { RouterOutputs } from "~/trpc/shared";

import { FavorButton } from "../common/FavorButton";
import { LazyImage } from "../common/LazyImage";

import NextLink from "next/link";

import { Button, Card, CardFooter, Chip, Link, Tooltip, cn } from "@nextui-org/react";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useUpdateEffect } from "react-use";
import { useStore } from "zustand";

type CharacterType = NonNullable<RouterOutputs["tavern"]["getBoard"]["data"]>[number]["characters"][number];

export const CharacterCard = ({ character, className }: { character: CharacterType; className?: string }) => {
	const state = useStore(useBlurNSFW, (state) => ({ isBlurNSFW: state.isBlurNSFW }));
	const [isNSFW, setNSFW] = useState(character.nsfw === 1);

	const blurNSFW = isNSFW && state.isBlurNSFW;

	useUpdateEffect(() => {
		const unsubscribe = useBlurNSFW.subscribe(() => setNSFW(character.nsfw === 1));

		return () => unsubscribe();
	}, [state.isBlurNSFW]);

	return (
		<Card radius="lg" className={cn("relative aspect-[2/3] w-60 flex-shrink-0 flex-grow-0 border-none", className)}>
			<FavorButton
				type="character"
				author={character.user_name_view}
				description={character.short_description}
				name={character.name}
				public_id={character.public_id}
				public_id_short={character.public_id_short}
				className="absolute left-1 top-1 z-40"
			/>

			<Button
				isIconOnly
				size="sm"
				aria-label={"Blur toggle for " + character.name}
				className="absolute right-1 top-1 z-20"
				onPress={() => setNSFW((prev) => !prev)}
			>
				{blurNSFW ? <Eye size={20} /> : <EyeOff size={20} />}
			</Button>

			<NextLink
				className="block aspect-[2/3]"
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
						className={cn(
							"absolute z-20 opacity-0 transition-opacity",
							"left-[calc(50%-35.1px)] top-[calc(50%-16px)]",
							{ "opacity-100": blurNSFW },
						)}
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
			</NextLink>

			<CardFooter className="pointer-events-none absolute bottom-0 z-10 h-full flex-col items-start justify-end bg-gradient-to-t from-black to-transparent text-white">
				<Link
					as={NextLink}
					href={"/characters/" + character.user_name_view}
					className="pointer-events-auto"
					color="foreground"
					underline="hover"
				>
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
					placement="top"
				>
					<p className="pointer-events-auto line-clamp-2 w-full text-small">
						{character.short_description.replaceAll(/{{char}}/gi, character.name)}
					</p>
				</Tooltip>
			</CardFooter>
		</Card>
	);
};
