import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBlurNSFW = create<{ blurNSFW: boolean; disable: () => void; enable: () => void }>()(
	persist(
		(set) => ({
			blurNSFW: true,
			disable: () => set({ blurNSFW: false }),
			enable: () => set({ blurNSFW: true }),
		}),
		{
			name: "blurNSFW-storage",
			partialize: (state) => ({ blurNSFW: state.blurNSFW }),
		},
	),
);
