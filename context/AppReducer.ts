import { ACTIONS } from "./actions"
import type { initialAppState, ActionCreator, ActionPayload } from "./context-types"
export const AppReducer = (
	state: initialAppState,
	action: ActionCreator<ActionPayload>[keyof ActionCreator<ActionPayload>]
): initialAppState => {
	switch (action.type) {
		default:
			return state
	}
}
