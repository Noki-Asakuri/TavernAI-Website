"use client";

import { userImage } from "~/server/store";

import { Avatar, Button } from "@nextui-org/react";

import { useRef } from "react";
import { useStore } from "zustand";

const UserAvatar = () => {
	const state = useStore(userImage);
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="flex items-center justify-start gap-4">
			<Avatar className="h-20 w-20 shrink-0" src={state.image} />

			<div className="flex h-20 flex-col items-start justify-center">
				<input
					hidden
					ref={inputRef}
					type="file"
					onChange={async (event) => {
						event.preventDefault();

						const toBase64 = (file: File): Promise<string> =>
							new Promise((resolve, reject) => {
								const reader = new FileReader();
								reader.readAsDataURL(file);
								reader.onload = () => resolve(reader.result as string);
								reader.onerror = reject;
							});

						if (event.target.files?.[0]) {
							state.setImage(await toBase64(event.target.files[0]));
						}
					}}
				/>

				<Button size="sm" onPress={() => inputRef.current?.click()}>
					Change profile image
				</Button>
			</div>
		</div>
	);
};

export default UserAvatar;
