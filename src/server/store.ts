import superjson from "superjson";
import { create } from "zustand";
import { type StorageValue, persist } from "zustand/middleware";

export const useBlurNSFW = create<{ isBlurNSFW: boolean; toggle: () => void }>()(
	persist(
		(set) => ({
			isBlurNSFW: true,
			toggle: () => set(({ isBlurNSFW }) => ({ isBlurNSFW: !isBlurNSFW })),
		}),
		{
			name: "blurNSFW-storage",
			partialize: (state) => ({ isBlurNSFW: state.isBlurNSFW }),
		},
	),
);

export const userImage = create<{ image: string; setImage: (image: string) => void }>()(
	persist(
		(set) => ({
			image: "",
			setImage: (image) => set(() => ({ image })),
		}),
		{
			name: "user-image",
			partialize: (state) => ({ image: state.image }),
		},
	),
);

export type FavoriteObject = {
	author: { name_view: string };
	character: { public_id_short: string; author: string; name: string; description: string };
};

type UserStates = {
	favoriteAuthors: Map<string, FavoriteObject["author"]>;
	favoriteCharacters: Map<string, FavoriteObject["character"]>;
};

type UserActions = {
	isCharacterFavored: (id: string) => boolean;
	isAuthorFavored: (user_name: string) => boolean;

	toggleAuthorFavor: (data: { name: string; name_view: string }) => void;
	toggleCharacterFavor: (data: { public_id: string } & FavoriteObject["character"]) => void;
};

export const useUserStore = create<UserStates & UserActions>()(
	persist(
		(set, get) => ({
			favoriteAuthors: new Map<string, FavoriteObject["author"]>(),
			favoriteCharacters: new Map<string, FavoriteObject["character"]>(),

			isCharacterFavored: (id) => get().favoriteCharacters.has(id),
			isAuthorFavored: (user_name) => get().favoriteAuthors.has(user_name),

			toggleAuthorFavor: ({ name, name_view }) => {
				get().isAuthorFavored(name)
					? get().favoriteAuthors.delete(name)
					: get().favoriteAuthors.set(name, { name_view });

				set((state) => ({ ...state, favoriteAuthors: get().favoriteAuthors }));
			},
			toggleCharacterFavor: ({ author, description, public_id, name, public_id_short }) => {
				get().isCharacterFavored(public_id)
					? get().favoriteCharacters.delete(public_id)
					: get().favoriteCharacters.set(public_id, { author, description, name, public_id_short });

				set((state) => ({ ...state, favoriteCharacters: get().favoriteCharacters }));
			},
		}),
		{
			name: "favorite-storage",
			storage: {
				getItem: (name) => {
					const str = localStorage.getItem(name);
					if (!str) return null;

					const { state } = superjson.parse<{ state: UserStates }>(str);

					return {
						state: { favoriteAuthors: state.favoriteAuthors, favoriteCharacters: state.favoriteCharacters },
					};
				},
				setItem: (name, newValue: StorageValue<UserStates>) => {
					const str = superjson.stringify({
						state: {
							favoriteAuthors: newValue.state.favoriteAuthors,
							favoriteCharacters: newValue.state.favoriteCharacters,
						},
					});

					localStorage.setItem(name, str);
				},
				removeItem: (name) => localStorage.removeItem(name),
			},
		},
	),
);
