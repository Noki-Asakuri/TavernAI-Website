"use client";

import { useUserStore } from "~/server/store";

import { CharacterCard } from "../characters/CharacterCard";

import { Divider, cn } from "@nextui-org/react";

import { useStore } from "zustand";

const FavorCharacter = () => {
	const state = useStore(useUserStore, (state) => ({ favoriteCharacters: state.favoriteCharacters }));

	return (
		<>
			<h2 className="text-center text-2xl font-semibold">Characters ({state.favoriteCharacters.size})</h2>

			<Divider orientation="horizontal" />

			<div
				className={cn("grid grid-cols-1", {
					"grid-cols-[repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-x-2 gap-y-4":
						state.favoriteCharacters.size > 0,
				})}
			>
				{state.favoriteCharacters.size === 0 && (
					<div>
						<p className="text-center">{"You don't have any favorite characters yet."}</p>
					</div>
				)}

				{state.favoriteCharacters.size > 0 &&
					[...state.favoriteCharacters]
						.reverse()
						.map(([public_id, { author, description, name, public_id_short }]) => {
							return (
								<CharacterCard
									key={public_id}
									character={{
										create_date: "",
										edit_date: "",
										id: 0,
										moderation: 0,
										name,
										nsfw: 0,
										private: 0,
										public_id,
										public_id_short,
										short_description: description,
										status: 0,
										user_id: "",
										user_name: author,
										user_name_view: author,
									}}
								/>
							);
						})}
			</div>
		</>
	);
};

export default FavorCharacter;

