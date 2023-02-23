import { useContext, useReducer, createContext, Dispatch } from "react"
import { AppReducer } from "./AppReducer"
import { initialAppState, ActionPayload, ActionCreator } from "./context-types"
import info from "../public/assets.json"

const initialState: initialAppState = {
	pending: false,
	error: false,
	error_message: "",
	isSideBarOpen: false,
	isSearchModalOpen: false,
	all_playlists: info.playlist,
	all_new_tracks: info.new,
	all_popular_tracks: info.popular,
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

	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useLocalContext = () => useContext(AppContext)
