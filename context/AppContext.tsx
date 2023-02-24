import { useContext, useReducer, createContext, Dispatch } from "react"
import { AppReducer } from "./AppReducer"
import { initialAppState, ActionPayload, ActionCreator, Playlist } from "./context-types"
import { useEffect } from "react"
import { ACTIONS } from "./actions"

const initialState: initialAppState = {
	isSideBarOpen: false,
	collections: [],
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
		let result = localStorage.getItem("collections")
		if (result) {
			dispatch({ type: ACTIONS.set_collection_state, payload: JSON.parse(result) })
		}
	}, [])
	return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useLocalContext = () => useContext(AppContext)
