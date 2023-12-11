import { api } from "~/trpc/server";

import { CharactersSlider } from "./characters/CharactersSlider";

import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";

const getData = unstable_cache(
	async () => {
		return await api.tavern.getBoard.query({ nsfw: cookies().get("nsfw")?.value === "true" });
	},
	["characters"],
	{ revalidate: 60 },
);

export const Characters = async () => {
	const { data } = await getData();

	return (
		<section className="flex flex-col gap-6">
			{data?.map((category) => {
				return (
					<div key={["characters", category.name].join()} className="flex flex-col gap-2">
						<h2 className="text-xl font-bold capitalize">
							<Link href={"/characters/categories/" + category.name}>{category.name_view}</Link>
						</h2>

						<CharactersSlider category={category} />
					</div>
				);
			})}
		</section>
	);
};
