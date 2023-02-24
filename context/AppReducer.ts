import { ACTIONS } from "./actions"

import type { initialAppState, ActionCreator, ActionPayload } from "./context-types"

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

		default:
			return state
	}
}
