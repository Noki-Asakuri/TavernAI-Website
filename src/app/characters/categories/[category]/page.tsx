import { Category } from "~/components/characters/Category";
import { api } from "~/trpc/server";

import { cookies } from "next/headers";

export default async function Page({
	params: { category },
	searchParams: { page },
}: {
	params: { category: string };
	searchParams: { page?: string };
}) {
	const [{ data }, charactersCount] = await Promise.all([
		api.tavern.getCharactersFromCategory.query({
			category,
			nsfw: cookies().get("nsfw")?.value === "true",
			page: Number(page ?? "1"),
		}),
		api.tavern.getCategoryCount.query({ category }),
	]);

	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-4">
			<Category charactersCount={charactersCount.data} data={data!} page={Number(page ?? "1")} />
		</main>
	);
}
