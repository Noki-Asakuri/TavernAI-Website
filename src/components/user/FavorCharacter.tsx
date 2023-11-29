"use client";

import { useUserStore } from "~/server/store";

import { CharacterCard } from "../characters/CharacterCard";

import { useStore } from "zustand";

const FavorCharacter = () => {
	const state = useStore(useUserStore, (state) => state);

	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-x-2 gap-y-4">
			{[...state.favoriteCharacters].map(([public_id, { author, description, name, public_id_short }]) => {
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
	);
};

export default FavorCharacter;
