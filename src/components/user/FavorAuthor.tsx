"use client";

import { useUserStore } from "~/server/store";

import { FavorButton } from "../common/FavorButton";

import NextLink from "next/link";

import { Avatar, Divider, Link, cn } from "@nextui-org/react";

import { useStore } from "zustand";

const FavorAuthor = () => {
	const state = useStore(useUserStore, (state) => ({ favoriteAuthors: state.favoriteAuthors }));

	return (
		<>
			<h2 className="text-center text-2xl font-semibold">Authors ({state.favoriteAuthors.size})</h2>

			<Divider orientation="horizontal" />

			<div
				className={cn("grid grid-cols-1", {
					"grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-x-2 gap-y-4": state.favoriteAuthors.size > 0,
				})}
			>
				{state.favoriteAuthors.size === 0 && (
					<div>
						<p className="text-center">{"You don't have any favorite authors yet."}</p>
					</div>
				)}

				{state.favoriteAuthors.size > 0 &&
					[...state.favoriteAuthors].reverse().map(([name, { name_view }]) => {
						return (
							<section key={name} className="flex items-center gap-4">
								<Avatar
									showFallback
									className="h-16 w-16 text-large"
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
		</>
	);
};

export default FavorAuthor;

