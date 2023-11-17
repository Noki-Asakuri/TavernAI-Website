import { Searchbar } from "~/components/Searchbar";

import dynamic from "next/dynamic";

import { Divider } from "@nextui-org/react";

import type { ReactNode } from "react";

const Settings = dynamic(() => import("~/components/Settings"), { ssr: false });

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<section className="container flex max-w-7xl flex-col gap-4 pb-4">
				<Searchbar />
				<Settings />

				<Divider orientation="horizontal" />
			</section>

			{children}
		</>
	);
}
