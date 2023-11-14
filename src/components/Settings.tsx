"use client";

import { useBlurNSFW } from "~/server/store";

import { useRouter } from "next/navigation";

import { Divider, Switch } from "@nextui-org/react";

import { useCookie, useUpdateEffect } from "react-use";
import { useStore } from "zustand";

const Settings = () => {
	const router = useRouter();

	const blurNSFW = useStore(useBlurNSFW, (state) => ({
		blurNSFW: state.blurNSFW,
		disable: state.disable,
		enable: state.enable,
	}));

	const [NSFW, setNSFW] = useCookie("nsfw");

	useUpdateEffect(() => {
		router.refresh();
	}, [NSFW]);

	return (
		<section className="container max-w-7xl py-4">
			<div className="grid w-max grid-cols-[1fr_max-content_1fr] gap-2">
				<Switch
					defaultSelected={blurNSFW ? blurNSFW.blurNSFW : false}
					color="danger"
					onValueChange={(value) => (value ? blurNSFW.enable() : blurNSFW.disable())}
				>
					Blur NSFW
				</Switch>

				<Divider orientation="vertical" />

				<Switch
					defaultSelected={NSFW ? NSFW.toLowerCase() === "true" : false}
					color="primary"
					onValueChange={(value) => setNSFW(String(value))}
				>
					NSFW
				</Switch>
			</div>
		</section>
	);
};

export default Settings;
