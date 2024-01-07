"use client";

import { useBlurNSFW } from "~/server/store";

import { useRouter } from "next/navigation";

import { Divider, Switch } from "@nextui-org/react";

import { useState } from "react";
import { useCookie, useMount, useUpdateEffect } from "react-use";
import { useStore } from "zustand";

const Settings = () => {
	const router = useRouter();
	const [isMounted, setMounted] = useState(false);

	const state = useStore(useBlurNSFW, (state) => ({
		isBlurNSFW: state.isBlurNSFW,
		toggle: state.toggle,
	}));

	const [NSFW, setNSFW] = useCookie("nsfw");
	useUpdateEffect(() => router.refresh(), [NSFW]);

	useMount(() => {
		if (!isMounted) setMounted(true);
	});

	return (
		<div className="grid grid-cols-[1fr_max-content_1fr] grid-rows-1 gap-2 sm:w-max">
			<Switch color="danger" isSelected={isMounted && state.isBlurNSFW} onValueChange={() => state.toggle()}>
				Blur NSFW
			</Switch>

			<Divider orientation="vertical" />

			<Switch
				color="primary"
				isSelected={NSFW?.toLowerCase() === "true"}
				onValueChange={(value) => setNSFW(String(value), { sameSite: "Strict", expires: new Date(Date.now() + 10 * 365.24 * 60 * 60 * 24 * 1000) })}
			>
				NSFW
			</Switch>
		</div>
	);
};

export default Settings;

