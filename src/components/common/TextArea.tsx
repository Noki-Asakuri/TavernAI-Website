"use client";

import { api } from "~/trpc/react";

import { Spinner, type TextAreaProps, Textarea, cn } from "@nextui-org/react";

import { useLayoutEffect, useRef } from "react";

export const AutoResizeTextArea = ({ classNames, ...props }: TextAreaProps & { characterName: string }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const tokens = api.token.getToken.useQuery({
		text: (props.defaultValue ?? "").replace(/{{char}}/gi, props.characterName),
	});

	useLayoutEffect(() => {
		if (!textareaRef.current) return;
		const height = Math.max(textareaRef.current.scrollHeight, textareaRef.current.clientHeight);

		textareaRef.current.style.height = height + "px";
	}, []);

	return (
		<Textarea
			isReadOnly
			disableAutosize
			labelPlacement="outside"
			ref={textareaRef}
			variant="faded"
			{...props}
			label={
				<div className="flex items-center justify-between">
					<span>{props.label}</span>

					{tokens.isLoading && <Spinner size="sm" />}
					{tokens.isSuccess && <span className="text-small text-gray-400">{tokens.data} Tokens</span>}
				</div>
			}
			style={{ ...props.style, scrollbarWidth: "thin" }}
			classNames={{
				...classNames,
				label: cn("text-2xl font-semibold", classNames?.label),
				input: cn("text-lg resize-y", classNames?.input),
			}}
		/>
	);
};
