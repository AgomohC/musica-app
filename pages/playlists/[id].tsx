import PlaylistView from "../../components/PlaylistView/PlaylistView"
import { GetStaticPaths, GetStaticProps } from "next"
import { getSinglePlaylist, getAllPlaylist } from "../../utils/utils"
import { Playlist } from "../../context/context-types"
import Head from "next/head"

interface IProps {
	playlist: Playlist
}

const PlayList = ({ playlist }: IProps) => {
	return (
		<>
			<Head>
				<title>{playlist.title}</title>
				<meta
					name='description'
					content={`A playlist by ${playlist.title}. ${playlist.info}`}
				/>
			</Head>
			{playlist ? <PlaylistView playlist={playlist} /> : <h2>Not Found</h2>}
		</>
	)
}

export const getStaticProps: GetStaticProps<{ playlist: Playlist | undefined }> = context => {
	const { params } = context
	return { props: { playlist: getSinglePlaylist(params?.id as string) } }
}

export const getStaticPaths: GetStaticPaths = () => {
	const ids = getAllPlaylist().map(playlist => ({
		params: {
			id: String(playlist.id),
		},
	}))

	return {
		paths: ids,
		fallback: false,
	}
}

export default PlayList
