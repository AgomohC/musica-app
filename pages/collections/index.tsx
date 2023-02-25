import Head from "next/head"
import { GetStaticProps } from "next"
import type { Playlist } from "../../context/context-types"
import { getAllPlaylist } from "../../utils/utils"
import Collections from "../../components/Collections/Collections"

interface IProps {
	playlists: Playlist[]
}
const index = ({ playlists }: IProps) => {
	return (
		<>
			<Head>
				<title>Collections</title>
				<meta
					name='description'
					content='All playlists'
				/>
			</Head>
			<Collections playlists={playlists} />
		</>
	)
}

export const getStaticProps: GetStaticProps<{
	playlists: Playlist[]
}> = context => {
	return { props: { playlists: getAllPlaylist() } }
}

export default index
