export const SET_VISIBILITY_FILTER = 'example/visibilityFilter/set_visibility_filter';
export const SHOW_ALL = 'example/visibilityFilter/show_all';
export const SHOW_COMPLETED = 'example/visibilityFilter/show_completed';
export const SHOW_ACTIVE = 'example/visibilityFilter/show_active';

export const initialState = SHOW_ALL;

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter;
		default:
			return state;
	}
}

export const selectVisibilityFilter = state => state.visibilityFilter;

export const setVisibilityFilter = filter => ({
	type: SET_VISIBILITY_FILTER,
	filter,
});
