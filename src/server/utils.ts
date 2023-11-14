import ExifReader from "exifreader";
import PNGtext from "png-chunk-text";
import extract from "png-chunks-extract";

export const readImages = (input_format: "png" | "webp", data: ArrayBuffer) => {
	const utf8Decode = new TextDecoder("utf-8", { ignoreBOM: true });

	switch (input_format) {
		case "webp":
			try {
				let char_data;
				const exif_data = ExifReader.load(data);

				if (exif_data.UserComment?.description) {
					const description = exif_data.UserComment.description;

					try {
						JSON.parse(description);
						char_data = description;
					} catch {
						const byteArr = description.split(",").map(Number);
						const uint8Array = new Uint8Array(byteArr);

						const char_data_string = utf8Decode.decode(uint8Array);
						char_data = char_data_string;
					}
				} else {
					console.log("No description found in EXIF data.");
					return false;
				}
				return char_data;
			} catch (err) {
				console.log(err);
				return false;
			}
		case "png":
			const chunks = extract(new Uint8Array(data));

			const textChunks = chunks
				.filter(function (chunk) {
					return chunk.name === "tEXt";
				})
				.map(function (chunk) {
					return PNGtext.decode(chunk.data);
				});

			const base64DecodedData = Buffer.from(textChunks[0]!.text, "base64").toString("utf8");
			return base64DecodedData;

		default:
			break;
	}
};

export function formatBytes(bytes: number) {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
