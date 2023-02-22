/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		})
		return config
	},
	images: {
		domains: ["localhost", "https://musica-api.up.railway.app"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "musica-api.up.railway.app",
				port: "",
				pathname: "/cover/**",
			},
		],
	},
}

module.exports = nextConfig
