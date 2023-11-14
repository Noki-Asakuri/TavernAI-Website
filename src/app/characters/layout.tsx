import { Searchbar } from "~/components/Searchbar";

import dynamic from "next/dynamic";

import type { ReactNode } from "react";

const Settings = dynamic(() => import("~/components/Settings"), { ssr: false });

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Searchbar />
			<Settings />

			{children}
		</>
	);
}
