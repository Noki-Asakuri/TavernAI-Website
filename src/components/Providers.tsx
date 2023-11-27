"use client";

import { TRPCReactProvider } from "~/trpc/react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children, cookies }: { children: React.ReactNode; cookies: string }) {
	return (
		<TRPCReactProvider cookies={cookies}>
			<NextUIProvider className="flex min-h-screen flex-col">
				<NextThemesProvider attribute="class" defaultTheme="dark">
					{children}
				</NextThemesProvider>
			</NextUIProvider>
		</TRPCReactProvider>
	);
}
