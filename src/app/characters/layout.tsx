import { Searchbar } from "~/components/Searchbar";
import Settings from "~/components/Settings";

import { Divider } from "@nextui-org/react";

import type { ReactNode } from "react";

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

