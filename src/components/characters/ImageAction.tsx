"use client";

import { useBlurNSFW } from "~/server/store";
import type { RouterOutputs } from "~/trpc/shared";

import { Button, ButtonGroup, Chip, Image, cn } from "@nextui-org/react";

import { Eye, EyeOff, ImageDown } from "lucide-react";
import { useState } from "react";
import { useUpdateEffect } from "react-use";
import { useStore } from "zustand";

export const ImageAction = ({ data }: { data: NonNullable<RouterOutputs["tavern"]["getCharacter"]["data"]> }) => {
	const state = useStore(useBlurNSFW, (state) => ({ isBlurNSFW: state.isBlurNSFW }));
	const [isNSFW, setNSFW] = useState(data.nsfw);

	const blurNSFW = isNSFW && state.isBlurNSFW;

	useUpdateEffect(() => {
		const unsubscribe = useBlurNSFW.subscribe(() => setNSFW(data.nsfw));

		return () => unsubscribe();
	}, [state.isBlurNSFW]);

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
			<div className="relative isolate">
				<Button
					isIconOnly
					size="sm"
					className="absolute right-1 top-1 z-20"
					onPress={() => setNSFW((prev) => !prev)}
				>
					{blurNSFW ? <Eye size={20} /> : <EyeOff size={20} />}
				</Button>

				<button
					className={cn("absolute z-30 h-full w-full", { hidden: !blurNSFW })}
					onClick={() => setNSFW(false)}
				/>

				{data.nsfw && (
					<Chip
						color="danger"
						size="lg"
						className={cn(
							"absolute z-20 opacity-0 transition-opacity",
							"left-[calc(50%-35.1px)] top-[calc(50%-16px)]",
							{ "opacity-100": blurNSFW },
						)}
					>
						NSFW
					</Chip>
				)}

				<Image
					alt={data.short_description}
					classNames={{
						wrapper: "overflow-hidden rounded-b-none !max-w-none md:!max-w-xs",
						img: cn(
							"aspect-[2/3] rounded-b-none md:w-80 w-full",
							"!transition-[transform,opacity,filter] blur-none",
							{ "blur-lg": blurNSFW },
						),
					}}
					src={`https://tavernai.net/${data.user_name_view}/${data.public_id_short}.webp`}
				/>
			</div>

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
