import { Categories } from "~/components/Categories";
import { Characters } from "~/components/Characters";

import { Divider, Spinner } from "@nextui-org/react";

import { Suspense } from "react";

export default function Home() {
	return (
		<main className="container flex max-w-7xl flex-grow flex-col gap-6">
			<Suspense fallback={<Spinner label="Loading..." />}>
				<Categories />
			</Suspense>

			<Divider orientation="horizontal" />

			<Suspense
				fallback={
					<div className="flex flex-grow items-center justify-center">
						<Spinner label="Loading..." />
					</div>
				}
			>
				<Characters />
			</Suspense>
		</main>
	);
}
