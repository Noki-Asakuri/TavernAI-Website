"use client";

import { type TextAreaProps, Textarea, cn } from "@nextui-org/react";

import { useLayoutEffect, useRef } from "react";

export const AutoResizeTextArea = ({ classNames, ...props }: TextAreaProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

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
			style={{ ...props.style, scrollbarWidth: "thin" }}
			classNames={{
				...classNames,
				label: cn("text-2xl font-semibold", classNames?.label),
				input: cn("text-lg resize-y", classNames?.input),
			}}
		/>
	);
};
