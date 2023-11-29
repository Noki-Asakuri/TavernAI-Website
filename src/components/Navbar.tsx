"use client";

import { ThemeSwitcher } from "./common/Theme-Switcher";

import dynamic from "next/dynamic";
import NextImage from "next/image";
import NextLink from "next/link";

import {
	Button,
	Image,
	Link,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Navbar as NextNavbar,
	Spinner,
} from "@nextui-org/react";

import { Github } from "lucide-react";
import { useState } from "react";

const UserIcon = dynamic(() => import("~/components/user/UserIcon"), {
	loading: () => <Spinner size="sm" />,
	ssr: false,
});

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<NextNavbar
			onMenuOpenChange={setIsMenuOpen}
			isBordered
			shouldHideOnScroll
			position="static"
			classNames={{ wrapper: "max-w-7xl px-4" }}
		>
			<NavbarBrand>
				<NextLink href="/" className="flex shrink-0 items-center gap-2">
					<Image
						as={NextImage}
						src="/favicon.ico"
						alt="TavernAI Icon"
						width={40}
						height={40}
						className="shrink-0"
					/>
					<h1 className="text-2xl font-bold">TavernAI</h1>
				</NextLink>
			</NavbarBrand>

			<NavbarContent justify="end">
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>

				<NavbarItem className="hidden sm:block">
					<Button
						isIconOnly
						radius="full"
						variant="flat"
						as={Link}
						href="https://github.com/Noki-Asakuri/TavernAI-Website"
						isExternal
					>
						<Github />
					</Button>
				</NavbarItem>

				<NavbarItem className="hidden sm:block">
					<NextLink href="/characters/user">
						<UserIcon />
					</NextLink>
				</NavbarItem>

				<NavbarItem>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="h-10 w-10 sm:hidden"
					/>
				</NavbarItem>
			</NavbarContent>

			<NavbarMenu>
				<NavbarMenuItem>
					<div className="flex h-10 items-center">
						<Link
							isExternal
							className="w-full space-x-2 text-lg"
							href="https://github.com/Noki-Asakuri/TavernAI-Website"
						>
							<Github />
							<span>Github</span>
						</Link>
					</div>
				</NavbarMenuItem>

				<NavbarMenuItem>
					<NextLink href="/characters/user" className="flex h-10 items-center space-x-2">
						<UserIcon />
						<span>User</span>
					</NextLink>
				</NavbarMenuItem>
			</NavbarMenu>
		</NextNavbar>
	);
};
