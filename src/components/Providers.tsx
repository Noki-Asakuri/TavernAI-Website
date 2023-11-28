"use client";

import { TRPCReactProvider } from "~/trpc/react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children, cookies }: { children: React.ReactNode; cookies: string }) {
	const router = useRouter();

	return (
		<TRPCReactProvider cookies={cookies}>
			<NextUIProvider className="flex min-h-screen flex-col" navigate={(path) => router.push(path)}>
				<NextThemesProvider attribute="class" defaultTheme="dark">
					{children}
				</NextThemesProvider>
			</NextUIProvider>
		</TRPCReactProvider>
	);
}
