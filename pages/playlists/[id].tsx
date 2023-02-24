import { useRouter } from "next/router"
import { useEffect } from "react"
import { ACTIONS } from "../../context/actions"
import { useLocalContext } from "../../context/AppContext"
import PlaylistView from "../../components/PlaylistView/PlaylistView"

const PlayList = () => {
	const {
		dispatch,
		state: { current_playlist },
	} = useLocalContext()
	const {
		query: { id },
	} = useRouter()

	useEffect(() => {
		if (!id) {
			return
		}

		dispatch({ type: ACTIONS.get_single_playlist, payload: id as string })
		return () => dispatch({ type: ACTIONS.clear_current_playlist })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	return (
		<>{current_playlist ? <PlaylistView playlist={current_playlist} /> : <h2>Not Found</h2>}</>
	)
}

export default PlayList
