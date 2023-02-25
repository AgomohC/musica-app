import Head from "next/head"
import Collections from "../../components/Collections/Collections"
import { useLocalContext } from "../../context/AppContext"

const Likes = () => {
	const { state } = useLocalContext()
	return (
		<>
			<Head>
				<title>Liked Collections</title>
				<meta
					name='description'
					content='All playlists'
				/>
			</Head>
			<Collections playlists={state.likes} />
		</>
	)
}

export default Likes
