"use client";

import type { RouterOutputs } from "~/trpc/shared";

import { CharacterCard } from "./CharacterCard";

import { Button, Card } from "@nextui-org/react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";

export const CharactersSlider = ({
	category,
}: {
	category: NonNullable<RouterOutputs["tavern"]["getBoard"]["data"]>[number];
}) => {
	const sliderRef = useRef<HTMLDivElement>(null);

	const swipeLeft = useCallback(() => {
		if (!sliderRef.current) return;

		const currentScrollPosition = sliderRef.current.scrollLeft ?? 0,
			moveX = (sliderRef.current?.scrollWidth ?? 1) / 10;

		if (currentScrollPosition === 0) return;

		sliderRef.current?.scroll({
			left: Math.max(currentScrollPosition - moveX, 0),
			behavior: "smooth",
		});
	}, []);

	const swipeRight = useCallback(() => {
		if (!sliderRef.current) return;

		const currentScrollPosition = sliderRef.current.scrollLeft ?? 0,
			maxScrollWidth = sliderRef.current.scrollWidth - sliderRef.current.clientWidth,
			moveX = (sliderRef.current?.scrollWidth ?? 1) / 10;

		if (currentScrollPosition === maxScrollWidth) return;

		sliderRef.current?.scroll({
			left: Math.min(currentScrollPosition + moveX, maxScrollWidth),
			behavior: "smooth",
		});
	}, []);

	if (category.characters.length === 0) return false;

	return (
		<Card className="w-max max-w-full gap-4 overflow-hidden bg-opacity-40 p-6 backdrop-blur-lg backdrop-filter">
			<div ref={sliderRef} style={{ scrollbarWidth: "thin" }} className="flex gap-4 overflow-scroll py-1 pb-3">
				{category.characters.map((character) => (
					<CharacterCard key={character.public_id_short} character={character} />
				))}
			</div>

			<div className="flex items-center justify-between">
				<Button variant="flat" size="sm" startContent={<ChevronLeft />} onPress={swipeLeft} />
				<Button variant="flat" size="sm" startContent={<ChevronRight />} onPress={swipeRight} />
			</div>
		</Card>
	);
};
