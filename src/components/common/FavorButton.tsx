"use client";

import { type FavoriteObject, useUserStore } from "~/server/store";

import { Button, cn } from "@nextui-org/react";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useMount } from "react-use";
import { useStore } from "zustand";

type Author = FavoriteObject["author"] & {
	type: "author";
	name: string;
};

type Character = FavoriteObject["character"] & {
	type: "character";
	public_id: string;
};

export const FavorButton = (props: (Author | Character) & { className?: string }) => {
	const state = useStore(useUserStore, (state) => state);
	const [isMount, setMouted] = useState(false);

	const [isFavored, setFavor] = useState(
		props.type === "author" ? state.isAuthorFavored(props.name) : state.isCharacterFavored(props.public_id),
	);

	useEffect(() => {
		const unsubscribe = useUserStore.subscribe((state) => {
			setFavor(
				props.type === "author" ? state.isAuthorFavored(props.name) : state.isCharacterFavored(props.public_id),
			);
		});

		return () => unsubscribe();
	}, [props, state]);

	useMount(() => {
		if (!isMount) setMouted(true);
	});

	if (!isMount)
		return (
			<Button
				size="sm"
				isLoading
				isIconOnly
				className={props.className}
				variant={props.type === "author" ? "light" : undefined}
			/>
		);

	return (
		<Button
			isIconOnly
			size="sm"
			className={props.className}
			variant={props.type === "author" ? "light" : undefined}
			onPress={() =>
				props.type === "author"
					? state.toggleAuthorFavor({ ...props })
					: state.toggleCharacterFavor({ ...props })
			}
		>
			<Heart className={cn({ "fill-danger stroke-danger": isFavored })} />
		</Button>
	);
};
