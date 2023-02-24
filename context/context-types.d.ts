import { ACTIONS } from "./actions"
export type Track = {
	id: string | number
	artist: string
	duration: string
	title: string
	cover: string
	audio: string
}
export type Playlist = {
	id: string | number
	title: string
	cover: string
	info: string
	files: Track[]
}

export type ActionPayload = {
	[ACTIONS.set_app_data]: {
		new_t: Track[]
		popular: Track[]
		playlist: Playlist[]
	}
	[ACTIONS.toggle_sidebar]: undefined
	[ACTIONS.clear_current_playlist]: undefined
	[ACTIONS.get_single_playlist]: string | number
}
export type initialAppState = {
	pending: boolean
	error: boolean
	error_message: string
	isSideBarOpen: boolean
	isSearchModalOpen: boolean
	all_playlists: Playlist[]
	all_new_tracks: Track[]
	all_popular_tracks: Track[]
	current_playlist: Playlist | null
}
export type ActionCreator<T extends { [index: string]: any }> = {
	[Key in keyof T]: T[Key] extends undefined
		? {
				type: Key
		  }
		: {
				type: Key
				payload: T[Key]
		  }
}
