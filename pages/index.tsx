import Head from "next/head"
import Hero from "../components/Hero/Hero"
import { GetServerSideProps } from "next"
import type { Playlist, Track } from "../context/context-types"
import { useEffect } from "react"
import { useLocalContext } from "../context/AppContext"
import axios from "axios"
import { ACTIONS } from "../context/actions"

interface IProps {
	data: {
		playlist: Playlist[]
		new_t: Track[]
		popular: Track[]
	}
}

export default function Home({ data: { playlist, new_t, popular } }: IProps) {
	const { dispatch } = useLocalContext()

	useEffect(() => {
		dispatch({
			type: ACTIONS.set_app_data,
			payload: {
				new_t,
				playlist,
				popular,
			},
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
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
			<Hero />
		</>
	)
}
export const getServerSideProps: GetServerSideProps<{
	data: {
		playlist: Playlist[]
		new_t: Track[]
		popular: Track[]
	}
}> = async context => {
	const playlist_promise = await axios("https://musica-api.up.railway.app/playlist")
	const playlist = playlist_promise?.data

	const new_t_promise = await axios("https://musica-api.up.railway.app/new")
	const new_t = new_t_promise?.data

	const popular_promise = await axios("https://musica-api.up.railway.app/popular")
	const popular = popular_promise?.data

	return {
		props: {
			data: { playlist, new_t, popular },
		},
	}
}
