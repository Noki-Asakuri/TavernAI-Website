import { ActionButton } from "~/components/characters/ActionButton";
import { AutoResizeTextArea } from "~/components/common/TextArea";
import { api } from "~/trpc/server";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Card, Chip, Image, Input, Switch } from "@nextui-org/react";

import { cache } from "react";

const getData = cache(async ({ author, public_id_short }: { author: string; public_id_short: string }) => {
	return await api.tavern.getCharacter.query({ author, public_id_short });
});

export const generateMetadata = async ({
	params,
}: {
	params: { author: string; public_id_short: string };
}): Promise<Metadata> => {
	const data = await getData(params);
	if (!data.data) return { title: data.messages };

	return { title: data.data.name };
};

export default async function Page({ params }: { params: { author: string; public_id_short: string } }) {
	const { data } = await getData(params);

	if (!data) notFound();

	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-4">
			<Card>
				<div className="grid grid-cols-[max-content,1fr] gap-4 px-6 py-4">
					<section className="flex flex-col gap-2">
						<Image
							className="aspect-[2/3] w-80"
							alt={data.short_description}
							src={`https://tavernai.net/${data.user_name_view}/${data.public_id_short}.webp`}
							width={320}
						/>

						<ActionButton data={data} />
					</section>

					<section className="flex flex-col gap-4">
						<Input
							isReadOnly
							label="Name"
							labelPlacement="outside"
							classNames={{
								base: "data-[has-label=true]:mt-0 pt-8",
								label: "text-2xl font-semibold",
								input: "text-lg",
							}}
							defaultValue={data.name}
						/>

						<Input
							isReadOnly
							label="Author"
							labelPlacement="outside"
							classNames={{
								base: "data-[has-label=true]:mt-0 pt-8",
								label: "text-2xl font-semibold",
								input: "text-lg",
							}}
							defaultValue={data.user_name}
						/>

						<div className="flex flex-col gap-2">
							<label className="text-2xl font-semibold">Categories</label>
							<div className="flex flex-wrap items-center gap-2">
								{data.categories.sort().map((category) => (
									<Chip size="lg" key={["tag", category].join("-")}>
										{category}
									</Chip>
								))}
							</div>
						</div>

						<AutoResizeTextArea
							isReadOnly
							label="First Message"
							labelPlacement="outside"
							defaultValue={data.first_mes}
							classNames={{ label: "text-2xl font-semibold", input: "text-lg" }}
							className="w-full"
						/>

						<div className="flex items-center justify-between text-lg">
							<span>
								Creation Date:{" "}
								{new Date(data.create_date_online).toLocaleString("en-EN", { hour12: false })}
							</span>
							<span className="flex items-center gap-2">
								Is NSFW:{" "}
								<Switch size="sm" isReadOnly defaultSelected={data.nsfw} aria-label="Is NSFW" />
							</span>
							<span>File Size: {data.size}</span>
						</div>
					</section>

					<section className="col-span-2 flex flex-col gap-4">
						<AutoResizeTextArea
							isReadOnly
							label="Description"
							labelPlacement="outside"
							defaultValue={data.description}
							classNames={{ label: "text-2xl font-semibold", input: "text-lg" }}
							className="w-full"
						/>

						<AutoResizeTextArea
							isReadOnly
							label="Dialogues Example"
							labelPlacement="outside"
							defaultValue={data.mes_example}
							classNames={{ label: "text-2xl font-semibold", input: "text-lg" }}
							className="w-full"
						/>
					</section>
				</div>
			</Card>
		</main>
	);
}
