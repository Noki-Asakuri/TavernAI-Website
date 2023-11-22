/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
	webpack: (config) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		config.experiments = {
			asyncWebAssembly: true,
			layers: true,
		};

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return config;
	},
};

export default config;

