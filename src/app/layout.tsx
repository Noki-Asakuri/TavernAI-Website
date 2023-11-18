import { Breadcrumbs } from "~/components/Breadcrumbs";
import { BottomFooter } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { Providers } from "~/components/Providers";
import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";

const font = JetBrains_Mono({
	subsets: ["latin"],
});

export const dynamic = "force-dynamic",
	revalidate = 30;

export const metadata: Metadata = {
	title: { absolute: "TavernAI", template: "%s - TavernAI" },
	authors: [
		{ name: "Asakuri", url: "https://github.com/Noki-Asakuri/" },
		{ name: "Humi", url: "https://github.com/TavernAI/" },
	],
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
	metadataBase: new URL(
		process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT ?? 3000}`,
	),
};

export const viewport: Viewport = {
	colorScheme: "dark light",
	width: "device-width",
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

