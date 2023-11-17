import { api } from "~/trpc/server";

import Link from "next/link";

import { Chip } from "@nextui-org/react";

export default async function Page() {
	const { data } = await api.tavern.getCategories.query();

	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-4">
			<section className="flex flex-wrap gap-2">
				{data?.map((category) => (
					<Chip
						size="lg"
						as={Link}
						variant="shadow"
						key={category.name}
						href={"/characters/categories/" + category.name}
						classNames={{ content: "flex gap-1 capitalize" }}
					>
						<span>{category.name_view}</span>
						{typeof category.count !== "undefined" && <span>({category.count})</span>}
					</Chip>
				))}
			</section>
		</main>
	);
}
