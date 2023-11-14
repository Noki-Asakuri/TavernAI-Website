import sharp from "sharp";

export const GET = async (req: Request) => {
	const url = new URL(req.url);

	const user_name_view = url.searchParams.get("user_name_view")!,
		public_id_short = url.searchParams.get("public_id_short")!,
		type = url.searchParams.get("type") ?? "png";

	const res = await fetch(`https://tavernai.net/${user_name_view}/${public_id_short}.webp`);
	if (!res.ok) return new Response(JSON.stringify({ error: res.statusText }), { status: res.status });

	if (type === "png") {
		const imageArrayBuffer = await res.arrayBuffer();
		const imageBuffer = await sharp(imageArrayBuffer).toFormat("png").toBuffer();

		return new Response(imageBuffer, { headers: { "Content-Type": "image/png" } });
	}

	return new Response(await res.blob(), { headers: { "Content-Type": "image/webp" } });
};
