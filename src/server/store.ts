import { create } from "zustand";
import { persist } from "zustand/middleware";

type States = {
	isBlurNSFW: boolean;
};

type Actions = {
	toggle: () => void;
};

export const useBlurNSFW = create<States & Actions>()(
	persist(
		(set) => ({
			isBlurNSFW: true,
			toggle: () => set(({ isBlurNSFW }) => ({ isBlurNSFW: !isBlurNSFW })),
		}),
		{
			name: "blurNSFW-storage",
			partialize: (state) => ({ isBlurNSFW: state.isBlurNSFW }),
		},
	),
);
