import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BottomFooter } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { Providers } from "~/components/Providers";
import "~/styles/globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";

const font = JetBrains_Mono({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: { absolute: "TavernAI", template: "%s - TavernAI" },
	description:
		"TavernAI is a adventure atmospheric chat and it works with api like KoboldAI, NovelAI, Pygmalion, OpenAI ChatGPT.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
	twitter: { card: "summary_large_image" },
	openGraph: {
		title: "TavernAI",
		type: "website",
		images: ["/cover.png"],
		url: "https://tavernai.vercel.app",
		description:
			"TavernAI is a adventure atmospheric chat and it works with api like KoboldAI, NovelAI, Pygmalion, OpenAI ChatGPT.",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`min-h-screen w-screen overflow-x-hidden ${font.className}`}>
				<Providers cookies={cookies().toString()}>
					<Navbar />
					<Breadcrumbs />

					{children}

					<BottomFooter />
				</Providers>
			</body>
		</html>
	);
}

