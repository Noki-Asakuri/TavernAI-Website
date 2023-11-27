"use client";

import { ThemeSwitcher } from "./common/Theme-Switcher";

import NextImage from "next/image";
import NextLink from "next/link";

import { Button, Image, Link, NavbarBrand, NavbarContent, NavbarItem, Navbar as NextNavbar } from "@nextui-org/react";

import { Github } from "lucide-react";

export const Navbar = () => {
	return (
		<NextNavbar isBordered shouldHideOnScroll position="static" classNames={{ wrapper: "max-w-7xl px-4" }}>
			<NavbarBrand>
				<NextLink href="/" className="flex items-center gap-2">
					<Image as={NextImage} src="/favicon.ico" alt="TavernAI Icon" width={40} height={40} />
					<p className="text-2xl font-bold">TavernAI</p>
				</NextLink>
			</NavbarBrand>

			<NavbarContent justify="end">
				<NavbarItem>
					<ThemeSwitcher />
				</NavbarItem>

				<NavbarItem>
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
			</NavbarContent>
		</NextNavbar>
	);
};
