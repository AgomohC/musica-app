import { ACTIONS } from "./actions"

import type { initialAppState, ActionCreator, ActionPayload } from "./context-types"

export const AppReducer = (
	state: initialAppState,
	action: ActionCreator<ActionPayload>[keyof ActionCreator<ActionPayload>]
): initialAppState => {
	switch (action.type) {
		case ACTIONS.set_app_data: {
			const newState = structuredClone(state)
			newState.all_new_tracks = action.payload?.new_t
			newState.all_playlists = action.payload?.playlist
			newState.all_popular_tracks = action.payload?.popular
			return newState
		}
		case ACTIONS.toggle_sidebar: {
			const newState = structuredClone(state)
			newState.isSideBarOpen = !state.isSideBarOpen
			return newState
		}
		default:
			return state
	}
}
