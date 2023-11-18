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

	useUpdateEffect(() => {
		router.refresh();
	}, [NSFW]);

	return (
		<div className="grid w-max grid-cols-[1fr_max-content_1fr] gap-2">
			<Switch color="danger" onValueChange={() => state.toggle()} defaultSelected={state.isBlurNSFW ?? false}>
				Blur NSFW
			</Switch>

			<Divider orientation="vertical" />

			<Switch
				defaultSelected={NSFW?.toLowerCase() === "true" ?? false}
				color="primary"
				onValueChange={(value) => setNSFW(String(value))}
			>
				NSFW
			</Switch>
		</div>
	);
};

export default Settings;
