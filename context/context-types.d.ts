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
	[ACTIONS.clear_current_playlist]: undefined
}
export type initialAppState = {
	isSideBarOpen: boolean
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
