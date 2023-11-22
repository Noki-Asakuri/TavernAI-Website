import NextLink from "next/link";

import { Divider, Image, Link, cn } from "@nextui-org/react";

export const revalidate = 120;

export default async function Home() {
	const res = await fetch("https://api.github.com/repos/TavernAI/TavernAI/releases/latest");
	const version = res.ok ? ((await res.json()) as { name: string }) : { name: "@1.5.2" };

	return (
		<main className="container flex max-w-7xl flex-grow flex-col justify-evenly gap-4">
			<section className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center text-center sm:flex-row sm:gap-2">
					<div className="flex gap-2">
						<Image src="/favicon.ico" alt="TavernAI Logo" width={40} height={40} />
						<h1 className="text-3xl font-semibold sm:text-4xl">TavernAI</h1>
					</div>

					<div className="flex items-center gap-2">
						<span className="hidden text-3xl sm:block">-</span>
						<span className="text-sm sm:text-3xl"> v{version.name.slice(1)}</span>
					</div>
				</div>

				<span className="text-xs text-gray-600 sm:text-small">(Site in development)</span>
			</section>

			<section className="flex items-center justify-center">
				<p className="max-w-xl text-center text-small md:text-base">
					TavernAI is a adventure atmospheric chat and it works with api like KoboldAI, NovelAI, Pygmalion,
					OpenAI ChatGPT
				</p>
			</section>

			<section className="flex items-center justify-center">
				<div
					className={cn(
						"grid grid-cols-[1fr_max-content_1fr] place-items-center gap-2",
						"sm:grid-cols-[1fr_max-content_1fr_max-content_1fr_max-content_1fr] sm:gap-4",
					)}
				>
					<Link underline="hover" as={NextLink} href="/characters">
						Characters
					</Link>

					<Divider orientation="vertical" />

					<Link underline="hover" isExternal href="https://github.com/TavernAI/TavernAI">
						Github
					</Link>

					<Divider orientation="vertical" className="hidden sm:block" />
					<Divider orientation="horizontal" className="col-span-3 sm:hidden" />

					<Link underline="hover" isExternal href="https://discord.gg/zmK2gmr45t">
						Discord
					</Link>

					<Divider orientation="vertical" />

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
				<Link as={NextLink} href="/characters" className="w-max max-w-full flex-shrink">
					<Image
						classNames={{
							wrapper: "w-[550px] max-w-full aspect-[1.73/1]",
							img: "aspect-[1.73/1] h-auto",
						}}
						src="https://tavernai.net/dev.jpg"
						alt="TavernAI"
						width={550}
					/>
				</Link>
			</section>
		</main>
	);
}

