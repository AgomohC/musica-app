import type { AppProps } from "next/app"
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import Footer from "../components/Footer/Footer"
import "../styles/globals.scss"
import { AppProvider } from "../context/AppContext"
import { Quicksand } from "@next/font/google"
import Layout from "../components/UI/Layout/Layout"
import MobileNav from "../components/MobileNav/MobileNav"
import Head from "next/head"
const quicksand = Quicksand({
	subsets: ["latin"],
	variable: "--font-quicksand",
	display: "swap",
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppProvider>
			<Head>
				<meta
					name='description'
					content='A music app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/logo.svg'
				/>
				<title>Musica</title>
			</Head>
			<Header className={`${quicksand.variable} font-sans`} />
			<MobileNav className={`${quicksand.variable} font-sans`} />
			<Sidebar className={`${quicksand.variable} font-sans`} />
			<Layout className={`${quicksand.variable} font-sans`}>
				<Component {...pageProps} />
			</Layout>
			<Footer className={`${quicksand.variable} font-sans`} />
		</AppProvider>
	)
}
