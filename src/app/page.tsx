import NextLink from "next/link";

import { Divider, Image, Link } from "@nextui-org/react";

export default async function Home() {
	const version = (await (
		await fetch("https://api.github.com/repos/TavernAI/TavernAI/releases/latest", { cache: "no-cache" })
	).json()) as { name: string };

	return (
		<main className="container flex max-w-7xl flex-grow flex-col justify-evenly">
			<section className="flex flex-col items-center justify-center">
				<div className="flex items-center justify-center gap-2">
					<Image src="/favicon.ico" alt="TavernAI Logo" width={40} height={40} />
					<h1 className="text-4xl font-semibold">TavernAI - v{version.name.slice(1)}</h1>
				</div>

				<span className="text-small text-gray-600">(Site in development)</span>
			</section>

			<section className="flex items-center justify-center">
				<p className="max-w-xl text-center">
					TavernAI is a adventure atmospheric chat and it works with api like KoboldAI, NovelAI, Pygmalion,
					OpenAI ChatGPT
				</p>
			</section>

			<section className="flex items-center justify-center">
				<div className="flex gap-7">
					<Link underline="hover" as={NextLink} href="/characters">
						Characters
					</Link>

					<Divider orientation="vertical" className="h-auto" />

					<Link underline="hover" isExternal href="https://github.com/TavernAI/TavernAI">
						Github
					</Link>

					<Divider orientation="vertical" className="h-auto" />

					<Link underline="hover" isExternal href="https://discord.gg/zmK2gmr45t">
						Discord
					</Link>

					<Divider orientation="vertical" className="h-auto" />

					<Link
						isExternal
						underline="hover"
						href="https://colab.research.google.com/github/TavernAI/TavernAI/blob/main/colab/GPU.ipynb"
					>
						Try Online
					</Link>
				</div>
			</section>

			<section className="flex items-center justify-center">
				<Image
					classNames={{ img: "aspect-[1.73/1]" }}
					src="https://tavernai.net/dev.jpg"
					className="w-full"
					alt="TavernAI"
					height={550}
				/>
			</section>
		</main>
	);
}

