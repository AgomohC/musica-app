import { useContext, useReducer, createContext } from "react"
import { AppReducer } from "./AppReducer"
import axios, { AxiosError } from "axios"
import * as actions from "./actions"
import { initialAppState } from "./context-types"

const initialState: initialAppState = {
	pending: false,
	error: false,
	error_message: "",
}
export const AppContext = createContext<initialAppState>({
	...initialState,
})

export const AppProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState)

	// Action creators go here

	return <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
}

export const useLocalContext = () => useContext(AppContext)
