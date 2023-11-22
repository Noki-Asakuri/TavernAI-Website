"use client";

import type { RouterOutputs } from "~/trpc/shared";

import { CharacterCard } from "./CharacterCard";

import { Button, Card } from "@nextui-org/react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";
import { useUpdateEffect } from "react-use";

export const CharactersSlider = ({
	category,
}: {
	category: NonNullable<RouterOutputs["tavern"]["getBoard"]["data"]>[number];
}) => {
	const sliderRef = useRef<HTMLDivElement>(null);

	const swipeLeft = useCallback(() => {
		if (!sliderRef.current) return;

		const currentScrollPosition = sliderRef.current.scrollLeft;
		const moveX = Math.round(sliderRef.current.clientWidth / (240 + 6)) * 246;

		if (currentScrollPosition === 0) return;

		sliderRef.current.scroll({
			left: Math.max(currentScrollPosition - moveX, 0),
			behavior: "smooth",
		});
	}, []);

	const swipeRight = useCallback(() => {
		if (!sliderRef.current) return;

		const currentScrollPosition = sliderRef.current.scrollLeft;
		const maxScrollWidth = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
		const moveX = Math.round(sliderRef.current.clientWidth / (240 + 6)) * 246;

		if (currentScrollPosition === maxScrollWidth) return;

		sliderRef.current.scroll({
			left: Math.min(currentScrollPosition + moveX, maxScrollWidth),
			behavior: "smooth",
		});
	}, []);

	useUpdateEffect(() => {
		const onWheel = (event: WheelEvent) => {
			if (event.deltaY != 0 && sliderRef.current) {
				const currentPosition = sliderRef.current.scrollLeft;
				const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

				if (event.deltaY < 0 && currentPosition > 0) {
					event.preventDefault();
					return swipeLeft();
				}

				if (event.deltaY > 0 && currentPosition < maxScroll) {
					event.preventDefault();
					return swipeRight();
				}
			}
		};

		sliderRef.current?.addEventListener("wheel", onWheel);
		return () => sliderRef.current?.removeEventListener("wheel", onWheel);
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
				<Button
					aria-label={`Back button for category ${category.name_view}`}
					variant="flat"
					size="sm"
					startContent={<ChevronLeft />}
					onPress={swipeLeft}
				/>
				<Button
					aria-label={`Foward button for category ${category.name_view}`}
					variant="flat"
					size="sm"
					startContent={<ChevronRight />}
					onPress={swipeRight}
				/>
			</div>
		</Card>
	);
};
