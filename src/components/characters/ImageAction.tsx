"use client";

import { useBlurNSFW } from "~/server/store";
import type { RouterOutputs } from "~/trpc/shared";

import { Button, ButtonGroup, Chip, Image, cn } from "@nextui-org/react";

import { ImageDown } from "lucide-react";
import { useState } from "react";
import { useStore } from "zustand";

export const ImageAction = ({ data }: { data: NonNullable<RouterOutputs["tavern"]["getCharacter"]["data"]> }) => {
	const settings = useStore(useBlurNSFW, (state) => ({ blurNSFW: state.blurNSFW }));

	const [isBlurred, setBlur] = useState(data.nsfw && settings.blurNSFW);

	const downloadFile = async (type: "png" | "webp") => {
		const urlSearchParams = new URLSearchParams();

		urlSearchParams.set("user_name_view", data.user_name_view);
		urlSearchParams.set("public_id_short", data.public_id_short);
		urlSearchParams.set("type", type);

		const res = await fetch(`/api/images/${data.user_name_view}/${data.public_id_short}.${type}`);
		if (!res.ok) return;

		const element = document.createElement("a");

		element.href = URL.createObjectURL(await res.blob());
		element.download = data.name.replaceAll(" ", "-") + "." + type;

		element.click();
		element.remove();
	};

	return (
		<div className="flex flex-col">
			<button
				className={cn("relative isolate", { "pointer-events-none": !isBlurred })}
				onClick={() => setBlur(false)}
			>
				{isBlurred && (
					<Chip
						color="danger"
						size="lg"
						className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
					>
						NSFW
					</Chip>
				)}

				<Image
					alt={data.short_description}
					classNames={{
						wrapper: "overflow-hidden rounded-b-none !max-w-none md:!max-w-xs",
						img: cn("aspect-[2/3] md:w-80 w-full !transition-all blur-none", { "blur-lg": isBlurred }),
					}}
					src={`https://tavernai.net/${data.user_name_view}/${data.public_id_short}.webp`}
				/>
			</button>

			<ButtonGroup fullWidth radius="none">
				<Button
					className="first:rounded-bl-medium last:rounded-br-medium"
					onPress={() => downloadFile("png")}
					startContent={<ImageDown />}
				>
					Png
				</Button>

				<Button
					className="first:rounded-bl-medium last:rounded-br-medium"
					onPress={() => downloadFile("webp")}
					endContent={<ImageDown />}
				>
					Webp
				</Button>
			</ButtonGroup>
		</div>
	);
};
