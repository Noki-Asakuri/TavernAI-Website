import { api } from "~/trpc/server";
import type { RouterOutputs } from "~/trpc/shared";

export const Tokens = async ({ data }: { data: NonNullable<RouterOutputs["tavern"]["getCharacter"]["data"]> }) => {
	const total = await api.token.getToken.query({
		text: [data.personality, data.scenario, data.description, data.first_mes, data.mes_example]
			.map((text) => text.trim().replace(/{{char}}/gi, data.name))
			.join("\n\n"),
	});

	const permanent = await api.token.getToken.query({
		text: [data.personality, data.scenario, data.description]
			.map((text) => text.trim().replace(/{{char}}/gi, data.name))
			.join("\n\n"),
	});

	return (
		<span>
			Approximately {total} Tokens, {permanent} Permanent
		</span>
	);
};
