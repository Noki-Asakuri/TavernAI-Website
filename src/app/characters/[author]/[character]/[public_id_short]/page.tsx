import { ActionButton } from "~/components/characters/ActionButton";
import { AutoResizeTextArea } from "~/components/common/TextArea";
import { api } from "~/trpc/server";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, Chip, Divider, Image, Input, Switch } from "@nextui-org/react";

import { Shield, ShieldX } from "lucide-react";
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

	return {
		title: data.data.name,
		openGraph: {
			type: "website",
			title: data.data.name + " - TavernAI",
			description: data.data.scenario,
			images: [`https://tavernai.net/${data.data.user_name_view}/${data.data.public_id_short}.webp`],
		},
	};
};

export default async function Page({ params }: { params: { author: string; public_id_short: string } }) {
	const { data } = await getData(params);

	if (!data) notFound();

	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-4">
			<Card>
				<div className="grid grid-cols-[max-content,max-content,1fr] gap-4 px-6 py-4">
					<section className="grid grid-rows-[max-content,max-content,1fr] gap-2">
						<Image
							className="aspect-[2/3] w-80"
							alt={data.short_description}
							src={`https://tavernai.net/${data.user_name_view}/${data.public_id_short}.webp`}
							width={320}
						/>

						<ActionButton data={data} />

						<div className="flex items-center justify-between self-end">
							<span>File Size: {data.size}</span>

							<Divider orientation="vertical" />

							<span className="flex items-center gap-2">
								{data.nsfw ? "NSFW" : "SFW"}:{" "}
								<Switch
									size="sm"
									color="danger"
									isReadOnly
									defaultSelected={data.nsfw}
									aria-label="Is NSFW"
									startContent={<ShieldX />}
									endContent={<Shield />}
								/>
							</span>
						</div>
					</section>

					<Divider orientation="vertical" />

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
							defaultValue={data.user_name_view}
						/>

						<div className="flex flex-col gap-2">
							<label className="text-2xl font-semibold">Categories</label>
							<div className="flex flex-wrap items-center gap-2">
								{data.categories.sort().map((category) => (
									<Chip
										size="lg"
										as={Link}
										color="success"
										variant="shadow"
										key={["tag", category].join("-")}
										href={`/characters/categories/${category}`}
									>
										{category}
									</Chip>
								))}
							</div>
						</div>

						<AutoResizeTextArea
							isReadOnly
							disableAutosize
							label="Personality"
							labelPlacement="outside"
							defaultValue={data.personality}
							classNames={{ label: "text-2xl font-semibold", input: "text-lg resize-y" }}
						/>

						<AutoResizeTextArea
							isReadOnly
							disableAutosize
							label="Scenario"
							labelPlacement="outside"
							defaultValue={data.scenario}
							classNames={{ label: "text-2xl font-semibold", input: "text-lg resize-y" }}
						/>

						<div className="flex flex-grow items-end justify-between text-lg">
							<span>
								Creation Date:{" "}
								{new Date(data.create_date_online).toLocaleString("en-EN", { hour12: false })}
							</span>

							<span>
								Edit Date: {new Date(data.edit_date_online).toLocaleString("en-EN", { hour12: false })}
							</span>
						</div>
					</section>

					<section className="col-span-3 flex flex-col gap-4">
						<AutoResizeTextArea
							isReadOnly
							disableAutosize
							label="Description"
							labelPlacement="outside"
							defaultValue={data.description}
							classNames={{ label: "text-2xl font-semibold", input: "text-lg resize-y" }}
						/>

						<AutoResizeTextArea
							isReadOnly
							disableAutosize
							label="First Message"
							labelPlacement="outside"
							defaultValue={data.first_mes}
							classNames={{ label: "text-2xl font-semibold", input: "text-lg resize-y" }}
						/>

						<AutoResizeTextArea
							isReadOnly
							disableAutosize
							label="Dialogues Example"
							labelPlacement="outside"
							defaultValue={data.mes_example}
							classNames={{ label: "text-2xl font-semibold", input: "text-lg resize-y" }}
						/>
					</section>
				</div>
			</Card>
		</main>
	);
}
