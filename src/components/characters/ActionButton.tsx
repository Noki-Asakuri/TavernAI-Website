"use client";

import type { RouterOutputs } from "~/trpc/shared";

import { Button, ButtonGroup } from "@nextui-org/react";

import { ImageDown } from "lucide-react";

export const ActionButton = ({ data }: { data: NonNullable<RouterOutputs["tavern"]["getCharacter"]["data"]> }) => {
	const downloadFile = async (type: "png" | "webp") => {
		const urlSearchParams = new URLSearchParams();

		urlSearchParams.set("user_name_view", data.user_name_view);
		urlSearchParams.set("public_id_short", data.public_id_short);
		urlSearchParams.set("type", type);

		const res = await fetch("/api/images?" + urlSearchParams.toString());
		if (!res.ok) return;

		const element = document.createElement("a");

		element.href = URL.createObjectURL(await res.blob());
		element.download = data.name.replaceAll(" ", "-") + "." + type;

		element.click();
		element.remove();
	};

	return (
		<ButtonGroup fullWidth>
			<Button onPress={() => downloadFile("png")} startContent={<ImageDown />}>
				Png
			</Button>
			<Button onPress={() => downloadFile("webp")} endContent={<ImageDown />}>
				Webp
			</Button>
		</ButtonGroup>
	);
};
