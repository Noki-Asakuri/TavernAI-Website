import { readImageData, writeDataToImage } from "~/server/utils";

import path from "path";

export const GET = async (req: Request, { params }: { params: { author: string; public_id_short: string } }) => {
	const filePath = path.parse(params.public_id_short);

	const res = await fetch(`https://tavernai.net/${params.author}/${filePath.name}.webp`);
	if (!res.ok) return new Response(JSON.stringify({ error: res.statusText }), { status: res.status });

	if (filePath.ext === ".png") {
		const imageArrayBuffer = await res.arrayBuffer();
		const data = readImageData(imageArrayBuffer, "webp");

		if (!data || data.status === "Failed")
			return new Response(JSON.stringify({ error: data?.message }), { status: 500 });

		const imageBuffer = await writeDataToImage(imageArrayBuffer, data.data, "png");

		return new Response(imageBuffer, { headers: { "Content-Type": "image/png" } });
	}

	return new Response(await res.blob(), { headers: { "Content-Type": "image/webp" } });
};
