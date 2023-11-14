import { api } from "~/trpc/server";

import Link from "next/link";

import { Chip } from "@nextui-org/react";

export default async function Page() {
	const { data } = await api.tavern.getCategories.query();

	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-4">
			<section className="flex flex-wrap gap-2">
				<Chip
					size="lg"
					classNames={{ content: "flex gap-1 capitalize" }}
					as={Link}
					href="/characters/categories/recent"
				>
					<span>Recent</span>
				</Chip>

				<Chip
					size="lg"
					classNames={{ content: "flex gap-1 capitalize" }}
					as={Link}
					href="/characters/categories/random"
				>
					<span>Random</span>
				</Chip>

				{data?.map((category) => (
					<Chip
						size="lg"
						as={Link}
						key={category.name}
						href={"/characters/categories/" + category.name}
						classNames={{ content: "flex gap-1 capitalize" }}
					>
						<span>{category.name_view}</span>
						<span>({category.count})</span>
					</Chip>
				))}
			</section>
		</main>
	);
}
