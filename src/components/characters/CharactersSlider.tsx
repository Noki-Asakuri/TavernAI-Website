"use client";

import type { RouterOutputs } from "~/trpc/shared";

import { CharacterCard } from "./CharacterCard";

import { Button, Card } from "@nextui-org/react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { type WheelEvent, useCallback, useRef } from "react";

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

	const mouseScroll = useCallback((event: WheelEvent<HTMLDivElement>) => {
		if (!event.deltaX) return;

		if (event.deltaX > 0) swipeRight();
		else swipeLeft();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card className="w-max max-w-full gap-4 overflow-hidden p-6">
			<div
				ref={sliderRef}
				onWheel={mouseScroll}
				style={{ scrollbarWidth: "thin" }}
				className="flex gap-4 overflow-scroll py-1 pb-3"
			>
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
