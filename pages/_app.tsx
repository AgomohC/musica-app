import type { AppProps } from "next/app"
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import Footer from "../components/Footer/Footer"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<Sidebar />
			<Component {...pageProps} />
			<Footer />
		</>
	)
}
