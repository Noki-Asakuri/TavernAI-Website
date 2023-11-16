import { Spinner } from "@nextui-org/react";

export default function Loading() {
	return (
		<main className="flex flex-grow items-center justify-center">
			<Spinner label="Loading..." />
		</main>
	);
}
