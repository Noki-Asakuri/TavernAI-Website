"use client";

import { useBlurNSFW } from "~/server/store";

import { useRouter } from "next/navigation";

import { Divider, Switch } from "@nextui-org/react";

import { useCookie, useUpdateEffect } from "react-use";
import { useStore } from "zustand";

const Settings = () => {
	const router = useRouter();

	const state = useStore(useBlurNSFW, (state) => ({
		isBlurNSFW: state.isBlurNSFW,
		toggle: state.toggle,
	}));

	const [NSFW, setNSFW] = useCookie("nsfw");
	useUpdateEffect(() => router.refresh(), [NSFW]);

	return (
		<div className="grid grid-cols-[1fr_max-content_1fr] grid-rows-1 gap-2 sm:w-max">
			<Switch color="danger" onValueChange={() => state.toggle()} defaultSelected={state.isBlurNSFW}>
				Blur NSFW
			</Switch>

			<Divider orientation="vertical" />

			<Switch
				color="primary"
				defaultSelected={NSFW?.toLowerCase() === "true"}
				onValueChange={(value) => setNSFW(String(value), { sameSite: "Strict" })}
			>
				NSFW
			</Switch>
		</div>
	);
};

export default Settings;
