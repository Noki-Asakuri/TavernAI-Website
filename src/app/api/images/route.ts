import { readImageData, writeDataToImage } from "~/server/utils";

export const GET = async (req: Request) => {
	const url = new URL(req.url);

	const user_name_view = url.searchParams.get("user_name_view")!,
		public_id_short = url.searchParams.get("public_id_short")!,
		type = url.searchParams.get("type") ?? "png";

	const res = await fetch(`https://tavernai.net/${user_name_view}/${public_id_short}.webp`);
	if (!res.ok) return new Response(JSON.stringify({ error: res.statusText }), { status: res.status });

	if (type === "png") {
		const imageArrayBuffer = await res.arrayBuffer();
		const data = readImageData(imageArrayBuffer, "webp");

		if (!data || data.status === "Failed")
			return new Response(JSON.stringify({ error: data?.message }), { status: 500 });

		const imageBuffer = await writeDataToImage(imageArrayBuffer, data.data, "png");

		return new Response(imageBuffer, { headers: { "Content-Type": "image/png" } });
	}

	return new Response(await res.blob(), { headers: { "Content-Type": "image/webp" } });
};
