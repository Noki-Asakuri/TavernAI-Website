"use client";

import { type TextAreaProps, Textarea } from "@nextui-org/react";

import { useLayoutEffect, useRef } from "react";

export const AutoResizeTextArea = (props: TextAreaProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useLayoutEffect(() => {
		if (!textareaRef.current) return;
		const height = Math.max(textareaRef.current.scrollHeight, textareaRef.current.clientHeight);

		textareaRef.current.style.height = height + "px";
	}, []);

	return <Textarea {...props} ref={textareaRef} />;
};
