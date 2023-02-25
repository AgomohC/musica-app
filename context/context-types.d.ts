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
	[ACTIONS.toggle_sidebar]: undefined
	[ACTIONS.add_to_likes]: Playlist
	[ACTIONS.remove_from_likes]: Playlist
	[ACTIONS.set_likes_state]: Playlist[]
}
export type initialAppState = {
	isSideBarOpen: boolean
	likes: Playlist[]
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
