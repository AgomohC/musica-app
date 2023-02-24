import { ACTIONS } from "./actions"
import type { initialAppState, ActionCreator, ActionPayload, Playlist } from "./context-types"

export const read = <T>(key: string): T | null => {
	if (typeof window == "undefined") {
		return null
	}
	let result = localStorage.getItem(key)
	return result ? JSON.parse(result) : null
}
export const write = (key: string, value: any) => {
	if (typeof window == "undefined") {
		return
	}
	localStorage.setItem(key, JSON.stringify(value))
}

export const AppReducer = (
	state: initialAppState,
	action: ActionCreator<ActionPayload>[keyof ActionCreator<ActionPayload>]
): initialAppState => {
	switch (action.type) {
		case ACTIONS.toggle_sidebar: {
			const newState = structuredClone(state)
			newState.isSideBarOpen = !state.isSideBarOpen
			return newState
		}
		case ACTIONS.set_collection_state: {
			const newState = structuredClone(state)
			newState.collections = action.payload
			return newState
		}
		case ACTIONS.add_to_collection: {
			// let collections = read<Playlist[]>("collections")
			// if (collections) {
			// 	collections = [...collections, action.payload]
			// 	write("collections", collections)
			// 	return { ...state, collections }
			// }
			// return { ...state }
		}
		case ACTIONS.remove_from_collection: {
			// let collections = read<Playlist[]>("collections")
			// if (collections) {
			// 	const item = collections.findIndex(p => String(p.id) === String(action.payload.id))
			// 	const new_c = [...collections.slice(0, item), ...collections.slice(item + 1)]
			// 	write("collections", new_c)
			// 	return { ...state, collections: new_c }
			// }
			// return { ...state }
		}
		default:
			return state
	}
}
