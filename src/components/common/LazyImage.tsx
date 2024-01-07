"use client";

import { Image, type ImageProps } from "@nextui-org/react";

import { useInView } from "react-intersection-observer";

export function LazyImage({ src, alt, ...props }: ImageProps) {
	const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

	return <Image src={inView ? src : undefined} alt={alt} ref={ref} {...props} />;
}

