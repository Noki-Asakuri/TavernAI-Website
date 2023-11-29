"use client";

import { useUserStore } from "~/server/store";

import FavorButton from "../common/FavorButton";

import NextLink from "next/link";

import { Avatar, Link } from "@nextui-org/react";

import { useStore } from "zustand";

const FavorAuthor = () => {
	const state = useStore(useUserStore, (state) => state);

	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-x-2 gap-y-4">
			{[...state.favoriteAuthors].map(([name, { name_view }]) => {
				return (
					<section key={name} className="flex items-center gap-4">
						<Avatar
							showFallback
							className="h-14 w-14 text-large"
							src={`https://tavernai.net/users/${name}/img/avatar.webp`}
						/>
						<div className="flex flex-col gap-1">
							<div className="flex items-center justify-start gap-2 text-xl font-bold">
								<Link as={NextLink} href={"/characters/" + name} underline="hover">
									<span className="text-xl font-bold">{name_view}</span>
								</Link>
								<FavorButton type="author" name={name} name_view={name_view} />
							</div>
							<span className="hidden text-sm sm:block sm:space-x-2">
								<span className="hidden sm:inline-block">Profile: </span>
								<Link as={NextLink} underline="hover" href={`https://tavernai.net/${name}`}>
									https://tavernai.net/{name}
								</Link>
							</span>

							<span className="block text-sm sm:hidden">
								<Link as={NextLink} underline="hover" href={`https://tavernai.net/${name}`}>
									Profile
								</Link>
							</span>
						</div>
					</section>
				);
			})}
		</div>
	);
};

export default FavorAuthor;
