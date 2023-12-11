import { api } from "~/trpc/server";

import { unstable_cache } from "next/cache";
import Link from "next/link";

import { Chip } from "@nextui-org/react";

const CategoryChip = (props: { name: string; name_view: string; count?: number; href: string }) => {
	return (
		<Chip
			size="md"
			as={Link}
			color="success"
			variant="shadow"
			className="capitalize"
			key={["category", props.name].join()}
			href={props.href}
		>
			{props.name_view} {(props.count ?? 0) > 0 && <>({props.count})</>}
		</Chip>
	);
};

const getData = unstable_cache(
	async () => {
		return await api.tavern.getCategories.query({ limit: 10 });
	},
	["categories"],
	{ revalidate: 60 },
);

export const Categories = async () => {
	const data = await getData();

	return (
		<div className="flex flex-wrap gap-2">
			<CategoryChip href="/characters/categories" name="Categories" name_view="Categories" />

			{data.data?.map((category) => {
				return (
					<CategoryChip
						name={category.name}
						count={category.count}
						name_view={category.name_view}
						key={["category", category.name].join()}
						href={"/characters/categories/" + category.name}
					/>
				);
			})}
		</div>
	);
};
