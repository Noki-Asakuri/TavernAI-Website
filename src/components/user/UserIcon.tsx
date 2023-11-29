import { userImage } from "~/server/store";

import { Avatar } from "@nextui-org/react";

import { useStore } from "zustand";

const UserIcon = () => {
	const state = useStore(userImage);

	return <Avatar isBordered color="primary" size="sm" showFallback src={state.image} />;
};

export default UserIcon;
