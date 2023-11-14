import { CharactersSlider } from "~/components/characters/CharactersSlider";
import { api } from "~/trpc/server";

import { cookies } from "next/headers";
import Link from "next/link";

import { Chip } from "@nextui-org/react";

export default async function Home() {
	const { data } = await api.tavern.getBoard.query({ nsfw: cookies().get("nsfw")?.value === "true" });

	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-4">
			<section className="flex flex-wrap gap-2">
				<Chip size="lg" color="success" variant="shadow" as={Link} href="/characters/categories">
					Categories
				</Chip>

				{data?.map((category) => {
					return (
						<Chip
							key={["categories", category.name].join()}
							size="lg"
							color="success"
							variant="shadow"
							as={Link}
							className="capitalize"
							href={"/characters/categories/" + category.name_view.toLowerCase()}
						>
							{category.name_view}
						</Chip>
					);
				})}
			</section>

			<section className="flex flex-col gap-6">
				{data?.map((category) => {
					return (
						<div key={["characters", category.name].join()} className="flex flex-col gap-2">
							<h2 className="text-xl font-bold capitalize">
								<Link href={"/characters/categories/" + category.name_view.toLowerCase()}>
									{category.name_view}
								</Link>
							</h2>

							<CharactersSlider category={category} />
						</div>
					);
				})}
			</section>
		</main>
	);
}
