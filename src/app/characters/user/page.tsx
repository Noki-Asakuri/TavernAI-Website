import { type Metadata } from "next";
import dynamic from "next/dynamic";

import { Divider, Spinner } from "@nextui-org/react";

const FavorAuthor = dynamic(() => import("~/components/user/FavorAuthor"), {
	loading: () => <Spinner size="sm" />,
	ssr: false,
});

const FavorCharacter = dynamic(() => import("~/components/user/FavorCharacter"), {
	loading: () => <Spinner size="sm" />,
	ssr: false,
});

const UserAvatar = dynamic(() => import("~/components/user/UserAvatar"), {
	loading: () => <Spinner size="sm" />,
	ssr: false,
});

export const metadata: Metadata = {
	title: "Favorite",
};

export default function Page() {
	return (
		<main className="container max-w-7xl flex-grow space-y-4">
			<section className="space-y-2">
				<h2 className="text-3xl font-semibold">User</h2>
				<UserAvatar />
			</section>

			<Divider orientation="horizontal" />

			<section className="space-y-2">
				<h2 className="text-3xl font-semibold">Authors</h2>
				<FavorAuthor />
			</section>

			<Divider orientation="horizontal" />

			<section className="space-y-2">
				<h2 className="text-3xl font-semibold">Characters</h2>
				<FavorCharacter />
			</section>
		</main>
	);
}
