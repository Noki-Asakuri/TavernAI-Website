import ExifReader from "exifreader";
import PNGtext from "png-chunk-text";
import encode from "png-chunks-encode";
import extract from "png-chunks-extract";
import sharp from "sharp";

type Success = {
	status: "Success";
	data: string;
};

type Failure = {
	status: "Failed";
	message: unknown;
};

export const writeDataToImage = async (
	imageBuffer: Buffer | ArrayBuffer,
	data: string,
	format: "webp" | "png" = "png",
): Promise<Buffer | undefined> => {
	const utf8Encode = new TextEncoder();

	try {
		// Load the image in any format
		switch (format) {
			case "webp":
				const stringByteArray = utf8Encode.encode(data).toString();

				const processedImage = await sharp(imageBuffer)
					.resize(400, 600)
					.webp({ quality: 95 })
					.withMetadata({ exif: { IFD0: { UserComment: stringByteArray } } })
					.toBuffer();

				return processedImage;

			case "png":
				const image = await sharp(imageBuffer).resize(400, 600).toFormat("png").toBuffer(); // old 170 234

				// Get the chunks
				const chunks = extract(image);
				const tEXtChunks = chunks.filter((chunk) => chunk.name === "tEXt");

				// Remove all existing tEXt chunks
				for (const tEXtChunk of tEXtChunks) {
					chunks.splice(chunks.indexOf(tEXtChunk), 1);
				}
				// Add new chunks before the IEND chunk
				const base64EncodedData = Buffer.from(data, "utf8").toString("base64");
				chunks.splice(-1, 0, PNGtext.encode("chara", base64EncodedData));

				return Buffer.from(encode(chunks));

			default:
				break;
		}
	} catch (err) {
		throw err;
	}
};

export const readImageData = (data: ArrayBuffer, input_format: "png" | "webp"): Success | Failure | undefined => {
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

					return { status: "Success", data: char_data };
				} else {
					console.log("No description found in EXIF data.");
					return { status: "Failed", message: "No description found in EXIF data." };
				}
			} catch (err: unknown) {
				console.log(err);
				return { status: "Failed", message: err instanceof Error ? err.message : err };
			}

		case "png":
			const chunks = extract(new Uint8Array(data));

			const textChunks = chunks
				.filter((chunk) => chunk.name === "tEXt")
				.map((chunk) => PNGtext.decode(chunk.data));

			const base64DecodedData = Buffer.from(textChunks[0]!.text, "base64").toString("utf8");
			return { status: "Success", data: base64DecodedData };

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
