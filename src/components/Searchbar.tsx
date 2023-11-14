"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@nextui-org/react";

import { Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "react-use";

export const Searchbar = () => {
	const router = useRouter();

	const searchParams = useSearchParams();

	const [query, setQuery] = useState(searchParams.get("query") ?? "");

	useDebounce(
		() => {
			if (query) router.push("/characters/search?query=" + query);
		},
		500,
		[query],
	);

	return (
		<section className="container max-w-7xl py-4">
			<Input
				isClearable
				startContent={<Search />}
				value={query}
				onClear={() => setQuery("")}
				onValueChange={setQuery}
				placeholder="Search..."
			/>
		</section>
	);
};
