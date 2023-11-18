import { ImageAction } from "~/components/characters/ImageAction";
import { AutoResizeTextArea } from "~/components/common/TextArea";
import { api } from "~/trpc/server";

import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";

import { Avatar, Card, Chip, Divider, Input, Link } from "@nextui-org/react";

import { CheckCircle, XCircle } from "lucide-react";
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
		twitter: { card: "summary" },
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
				<div className="grid grid-cols-1 gap-4 px-6 py-4 md:grid-cols-[max-content,max-content,1fr]">
					<section className="grid grid-rows-[max-content,1fr] gap-4">
						<ImageAction data={data} />

						<div className="flex items-center justify-between self-end">
							<span>File Size: {data.size}</span>

							<span className="flex items-center gap-2">
								SFW:{" "}
								{!data.nsfw ? (
									<CheckCircle className="stroke-success" />
								) : (
									<XCircle className="stroke-danger" />
								)}
							</span>
						</div>
					</section>

					<Divider orientation="vertical" className="hidden md:block" />
					<Divider orientation="horizontal" className="block md:hidden" />

					<section className="flex flex-col gap-4">
						<Input
							isReadOnly
							label="Name"
							variant="bordered"
							labelPlacement="outside"
							classNames={{
								base: "data-[has-label=true]:mt-0 pt-8",
								label: "text-2xl font-semibold",
								input: "text-lg",
							}}
							defaultValue={data.name}
						/>

						<section className="flex flex-col gap-2">
							<label className="text-2xl font-semibold">Author</label>

							<div className="flex flex-col items-center gap-4 sm:flex-row">
								<Avatar
									src={`https://tavernai.net/users/${data.user_name}/img/avatar.webp`}
									className="aspect-square h-auto w-16 text-large"
									showFallback
								/>

								<div className="flex flex-col items-center gap-2 sm:items-start">
									<span className="text-2xl font-bold">{data.user_name_view}</span>
									<span className="text-center sm:text-left">
										Profile:{" "}
										<Link
											as={NextLink}
											underline="hover"
											className="text-sm sm:text-base"
											href={`https://tavernai.net/${data.name}`}
										>
											{"https://tavernai.net/" + data.user_name}
										</Link>
									</span>
								</div>
							</div>
						</section>

						{data.categories.length > 0 && (
							<div className="flex flex-col gap-2">
								<label className="text-2xl font-semibold">
									Categories <span className="text-gray text-lg"> ({data.categories.length})</span>
								</label>
								<div className="flex flex-wrap items-center gap-2">
									{data.categories.sort().map((category) => (
										<Chip
											size="lg"
											as={NextLink}
											color="success"
											variant="shadow"
											className="capitalize"
											key={["tag", category].join("-")}
											href={`/characters/categories/${category}`}
										>
											{category}
										</Chip>
									))}
								</div>
							</div>
						)}

						<AutoResizeTextArea label="Personality" defaultValue={data.personality} />

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

					<section className="flex flex-col gap-4 md:col-span-3">
						<AutoResizeTextArea label="Scenario" defaultValue={data.scenario} />
						<AutoResizeTextArea label="Description" defaultValue={data.description} />
						<AutoResizeTextArea label="First Message" defaultValue={data.first_mes} />
						<AutoResizeTextArea label="Dialogues Example" defaultValue={data.mes_example} />
					</section>
				</div>
			</Card>
		</main>
	);
}
