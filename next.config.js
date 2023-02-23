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
		domains: ["localhost", "https://musica-api.up.railway.app", "e-cdns-images.dzcdn.net"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "musica-api.up.railway.app",
				port: "",
				pathname: "/cover/**",
			},
			{
				protocol: "https",
				hostname: "e-cdns-images.dzcdn.net",
				port: "",
				pathname: "/images/cover/**",
			},
		],
	},
}

module.exports = nextConfig
