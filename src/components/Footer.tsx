import { Divider, Link, User } from "@nextui-org/react";

export const BottomFooter = () => {
	return (
		<footer className="container max-w-7xl flex-none py-4">
			<Divider orientation="horizontal" />

			<div className="grid grid-cols-[1fr_max-content_max-content_max-content_1fr] py-4">
				<div className="flex flex-col items-center justify-center">
					<h3 className="text-lg font-bold">TavernAI</h3>
					<p className="text-center text-small">
						Atmospheric adventure chat for AI language models (KoboldAI, NovelAI, Pygmalion, OpenAI)
					</p>
				</div>

				<Divider orientation="vertical" className="mx-4" />

				<div className="flex flex-col gap-2 text-center">
					<h3 className="text-lg font-bold">Credits</h3>
					<div className="grid grid-cols-[1fr,max-content,1fr] place-items-start gap-y-2">
						<User
							name="Humi"
							description={
								<>
									<span>Original Dev - </span>
									<Link underline="hover" href="https://github.com/TavernAI" size="sm" isExternal>
										@TavernAI
									</Link>
								</>
							}
							avatarProps={{ src: "https://avatars.githubusercontent.com/u/121140100?v=4" }}
						/>
					</div>
				</div>

				<Divider orientation="vertical" className="mx-4" />

				<div className="flex flex-col items-center justify-center">
					<h3 className="text-lg font-bold">Link</h3>
					<div className="grid grid-cols-[1fr_max-content_1fr] gap-x-4 gap-y-2">
						<Link href="https://github.com/TavernAI/TavernAI" isExternal underline="hover">
							Github
						</Link>

						<Divider orientation="vertical" />

						<Link
							href="https://discord.gg/zmK2gmr45t"
							isExternal
							underline="hover"
							className="place-self-end"
						>
							Discord
						</Link>

						<Divider orientation="horizontal" className="col-span-3" />

						<Link href="https://boosty.to/tavernai" isExternal underline="hover">
							Donation
						</Link>

						<Divider orientation="vertical" />

						<Link
							href="https://colab.research.google.com/github/TavernAI/TavernAI/blob/main/colab/GPU.ipynb"
							isExternal
							underline="hover"
							className="place-self-end"
						>
							Try Online
						</Link>
					</div>
				</div>
			</div>

			<Divider orientation="horizontal" />

			<p className="w-full pt-4 text-center text-sm">
				All information and images on the website are collected from the Internet. We do not own or take
				responsibility for any information on this website. If it affects any individual or organization, upon
				request, we will promptly review and remove it. All characters 18+. The administration is not
				responsible for the content uploaded by users.
			</p>
		</footer>
	);
};
