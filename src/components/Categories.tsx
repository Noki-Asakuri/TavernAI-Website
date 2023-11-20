import { api } from "~/trpc/server";

import Link from "next/link";

import { Chip } from "@nextui-org/react";

export const Categories = async () => {
	const data = await api.tavern.getCategories.query({ limit: 10 });

	return (
		<div className="flex flex-wrap gap-2">
			<Chip size="lg" color="success" variant="shadow" as={Link} href="/characters/categories">
				Categories
			</Chip>

			{data.data?.map((category) => {
				return (
					<Chip
						size="lg"
						as={Link}
						color="success"
						variant="shadow"
						className="capitalize"
						key={["category", category.name].join()}
						href={"/characters/categories/" + category.name}
					>
						{category.name_view} {(category.count ?? 0) > 0 && <>({category.count})</>}
					</Chip>
				);
			})}
		</div>
	);
};
