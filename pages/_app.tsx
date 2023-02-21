import type { AppProps } from "next/app"
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import Footer from "../components/Footer/Footer"
import "../styles/globals.scss"
import { AppProvider } from "../context/AppContext"
import { Quicksand } from "@next/font/google"
import Layout from "../components/UI/Layout/Layout"

const quicksand = Quicksand({
	subsets: ["latin"],
	variable: "--font-quicksand",
	display: "swap",
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppProvider>
			<Header className={`${quicksand.variable} font-sans`} />
			<Sidebar className={`${quicksand.variable} font-sans`} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<Footer className={`${quicksand.variable} font-sans`} />
		</AppProvider>
	)
}
