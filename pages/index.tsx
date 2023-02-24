import Head from "next/head"
import Hero from "../components/Hero/Hero"
import { GetStaticProps } from "next"
import type { Playlist, Track } from "../context/context-types"
import { getAllFiles } from "../utils/utils"

interface IProps {
	data: {
		playlist: Playlist[]
		new_t: Track[]
		popular: Track[]
	}
}

export default function Home({ data: { playlist, new_t, popular } }: IProps) {
	return (
		<>
			<Hero
				playlist={playlist}
				new_t={new_t}
				popular={popular}
			/>
		</>
	)
}
export const getStaticProps: GetStaticProps<{
	data: {
		playlist: Playlist[]
		new_t: Track[]
		popular: Track[]
	}
}> = context => {
	return { props: { data: getAllFiles() } }
}
