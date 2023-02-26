import { useContext, useReducer, createContext, Dispatch } from "react"
import { AppReducer } from "./AppReducer"
import { initialAppState, ActionPayload, ActionCreator, Playlist } from "./context-types"
import { useEffect } from "react"
import { ACTIONS } from "./actions"

const initialState: initialAppState = {
	isSideBarOpen: false,
	likes: [],
	likedTracks: [],
	currentTrack: {
		id: 116348656,
		artist: "The Beatles",
		title: "Let It Be",
		audio: "https://cdns-preview-e.dzcdn.net/stream/c-e7e6e2142422aa4599294dee57197be9-13.mp3",
		cover: "https://e-cdns-images.dzcdn.net/images/cover/fcf05300b7c17ec77a6d01028a4bef61/500x500-000000-80-0-0.jpg",
		duration: "4:03",
	},
}
export const AppContext = createContext<{
	state: initialAppState
	dispatch: Dispatch<ActionCreator<ActionPayload>[keyof ActionCreator<ActionPayload>]>
}>({
	state: initialState,
	dispatch: () => null,
})

export const AppProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState)
	useEffect(() => {
		let result = localStorage.getItem("likes")
		let tracks = localStorage.getItem("likedTracks")
		if (result) {
			dispatch({ type: ACTIONS.set_likes_state, payload: JSON.parse(result) })
		}
		if (tracks) {
			dispatch({ type: ACTIONS.set_liked_tracks, payload: JSON.parse(tracks) })
		}
	}, [])
	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useLocalContext = () => useContext(AppContext)
