import { ACTIONS } from "./actions"
import type { initialAppState, ActionCreator, ActionPayload } from "./context-types"
export const AppReducer = (
	state: initialAppState,
	action: ActionCreator<ActionPayload>[keyof ActionCreator<ActionPayload>]
): initialAppState => {
	switch (action.type) {
		case ACTIONS.set_app_data: {
			return {
				...state,
				all_new_tracks: action.payload?.new_t,
				all_playlists: action.payload?.playlist,
				all_popular_tracks: action.payload?.popular,
			}
		}
		default:
			return state
	}
}
