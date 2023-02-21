import Head from "next/head"
import Image from "next/image"

export default function Home() {
	return (
		<>
			<Head>
				<title>Musica</title>
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
			</Head>
			<div></div>
		</>
	)
}
