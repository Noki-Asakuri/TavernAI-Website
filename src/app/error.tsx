"use client";

import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

import { AlertTriangle, RefreshCw } from "lucide-react";
// Error components must be Client Components
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<main className="container flex max-w-7xl flex-grow items-center justify-center">
			<Card className="w-max">
				<CardHeader className="items-center justify-center">
					<h2 className="flex items-center gap-2 text-2xl text-danger">
						<AlertTriangle size={35} />
						Something went wrong!
						<AlertTriangle size={35} />
					</h2>
				</CardHeader>

				<CardBody className="flex-col gap-2">
					<h3 className="text-center text-lg">Details</h3>
					<span>Cause: {String(error.cause ?? "Unknown")}</span>
					<span>Name: {error.name}</span>
					<span>Message: {error.message}</span>
					<span>Digest: {error.digest ?? "Unknown"}</span>
					<pre className="max-w-3xl whitespace-pre-wrap break-words">
						{(error.stack ?? "Unknown").split("\n    ").join("\n • ")}
					</pre>
				</CardBody>

				<CardFooter>
					<Button
						size="sm"
						startContent={<RefreshCw size={16} />}
						fullWidth
						color="success"
						onPress={() => reset()}
					>
						Try again
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
