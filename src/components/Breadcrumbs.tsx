"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { BreadcrumbItem, Button, Breadcrumbs as NextBreadcrumbs } from "@nextui-org/react";

import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";

export const Breadcrumbs = () => {
	const router = useRouter();
	const pathName = usePathname();
	const params = useParams();

	const pathNames = useMemo(() => {
		if (pathName === "/") ["TavernAI"];

		const paths = [
			"TavernAI",
			...pathName
				.split("/")
				.reduce((prev, curr) => (curr ? [...prev, [prev.at(-1), curr].join("/")] : prev), [] as string[])
				.filter((path) => path.length),
		];

		if (typeof params.public_id_short !== "undefined") paths.pop();

		return paths;
	}, [params.public_id_short, pathName]);

	return (
		<section className="container grid max-w-7xl grid-cols-[max-content_1fr] items-center gap-2 py-4">
			<Button
				size="lg"
				isIconOnly
				variant="ghost"
				className="h-full"
				startContent={<ChevronLeft strokeWidth={3} />}
				onPress={() => router.back()}
			/>

			<NextBreadcrumbs
				size="lg"
				radius="lg"
				variant="bordered"
				underline="hover"
				classNames={{ base: "w-full h-full flex", list: "w-full max-w-none flex-grow" }}
			>
				{pathNames.map((path) => {
					const href = path === "TavernAI" ? "/" : path;

					return (
						<BreadcrumbItem href={href} key={path} className="capitalize">
							{decodeURIComponent(path.split("/").at(-1)!)}
						</BreadcrumbItem>
					);
				})}
			</NextBreadcrumbs>
		</section>
	);
};
