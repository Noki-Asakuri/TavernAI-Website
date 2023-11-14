import NextLink from "next/link";

import { Image, Link } from "@nextui-org/react";

export default function Home() {
	return (
		<main className="container flex max-w-7xl flex-grow flex-col justify-evenly">
			<section className="flex flex-col items-center justify-center">
				<div className="flex items-center justify-center gap-2">
					<Image src="/favicon.ico" alt="TavernAI Logo" width={48} height={48} />
					<h1 className="text-4xl font-semibold">TavernAI</h1>
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
				<ul className="flex list-disc gap-7">
					<li>
						<Link underline="hover" as={NextLink} href="/characters">
							Characters
						</Link>
					</li>
					<li>
						<Link underline="hover" isExternal href="https://github.com/TavernAI/TavernAI">
							Github
						</Link>
					</li>
					<li>
						<Link underline="hover" isExternal href="https://discord.gg/zmK2gmr45t">
							Discord
						</Link>
					</li>
					<li>
						<Link
							isExternal
							underline="hover"
							href="https://colab.research.google.com/github/TavernAI/TavernAI/blob/main/colab/GPU.ipynb"
						>
							Try Online
						</Link>
					</li>
				</ul>
			</section>

			<section className="flex items-center justify-center">
				<Image src="https://tavernai.net/dev.jpg" alt="TavernAI" className="w-full" />
			</section>
		</main>
	);
}

