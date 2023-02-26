import { ACTIONS } from "./actions"
import type {
	initialAppState,
	ActionCreator,
	ActionPayload,
	Playlist,
	Track,
} from "./context-types"

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
		case ACTIONS.set_likes_state: {
			const newState = structuredClone(state)
			newState.likes = action.payload
			return newState
		}
		case ACTIONS.add_to_likes: {
			let likes = read<Playlist[]>("likes")
			if (likes) {
				likes = [...likes, action.payload]
				write("likes", likes)
				return { ...state, likes }
			} else {
				write("likes", [action.payload])
			}

			return { ...state, likes: [action.payload] }
		}
		case ACTIONS.remove_from_likes: {
			let likes = read<Playlist[]>("likes")
			if (likes) {
				const item = likes.findIndex(p => String(p.id) === String(action.payload.id))
				const new_c = [...likes.slice(0, item), ...likes.slice(item + 1)]
				write("likes", new_c)
				return { ...state, likes: new_c }
			}
			return state
		}
		case ACTIONS.set_liked_tracks: {
			const newState = structuredClone(state)
			newState.likedTracks = action.payload
			return newState
		}
		case ACTIONS.add_to_liked_tracks: {
			let likedTracks = read<Track[]>("likedTracks")
			if (likedTracks) {
				likedTracks = [...likedTracks, action.payload]
				write("likedTracks", likedTracks)
				return { ...state, likedTracks }
			} else {
				write("likedTracks", [action.payload])
			}

			return { ...state, likedTracks: [action.payload] }
		}

		case ACTIONS.remove_from_liked_tracks: {
			let likedTracks = read<Track[]>("likedTracks")

			if (likedTracks) {
				const item = likedTracks.findIndex(p => String(p.id) === String(action.payload.id))
				const new_c = [...likedTracks.slice(0, item), ...likedTracks.slice(item + 1)]
				write("likedTracks", new_c)
				return { ...state, likedTracks: new_c }
			}
			return state
		}
		default:
			return state
	}
}
