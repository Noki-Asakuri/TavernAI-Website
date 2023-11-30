"use client";

import { Image, type ImageProps } from "@nextui-org/react";

import React, { useEffect, useRef, useState } from "react";

export function LazyImage({ src, alt, ...props }: ImageProps) {
	// State for storing whether the image is loaded
	const [isLoaded, setIsLoaded] = useState(false);

	// Ref for the image element
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const img = imgRef.current;

		// Ensure IntersectionObserver is available in the browser
		if (!window.IntersectionObserver) {
			console.error("IntersectionObserver is not supported by your browser.");
			setIsLoaded(true); // Fallback to loading images immediately
			return;
		}

		// Create a new Intersection Observer instance
		const observer = new IntersectionObserver(
			(entries) => {
				// Find the observed entry
				const [entry] = entries;

				// If the entry is intersecting, we load the image and unobserve it
				if (entry?.isIntersecting) {
					setIsLoaded(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.05 }, // Configure to trigger when at least 1% is visible
		);

		// Observe the image reference
		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		// Clean up the observer on unmount
		return () => {
			if (img) observer.unobserve(img);
		};
	}, []); // Empty dependency array means this effect runs only on mount and unmount

	return <Image src={isLoaded ? src : undefined} alt={alt} ref={imgRef} {...props} />;
}
