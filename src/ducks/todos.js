import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from './visibilityFilter';
import api from '../http';

const base = 'example/todos';
export const ADD_TODOS = `${base}/add_todos`;
export const REMOVE_TODO = `${base}/remove_todo`;
export const EDIT_TODO = `${base}/edit_todo`;
export const COMPLETE_TODO = `${base}/complete_todo`;

export const FETCH_TODOS = `${base}/fetch_todos`;
export const FETCH_TODOS_FAIL = `${base}/fetch_todos_fail`;
export const FETCH_TODOS_SUCCESS = `${base}/fetch_todos_success`;

export const CREATE_TODO = `${base}/create_todo`;
export const CREATE_TODO_FAIL = `${base}/create_todo_fail`;
export const CREATE_TODO_SUCCES = `${base}/create_todo_success`;

export const UPDATE_TODO = `${base}/update_todo`;
export const UPDATE_TODO_FAIL = `${base}/update_todo_fail`;
export const UPDATE_TODO_SUCCES = `${base}/update_todo_success`;

export const DELETE_TODO = `${base}/delete_todo`;
export const DELETE_TODO_FAIL = `${base}/delete_todo_fail`;
export const DELETE_TODO_SUCCES = `${base}/delete_todo_success`;

export const initialState = {
	todos: {},
	todoIds: [],
	todosFetching: false,
	todosError: undefined,
	todosCreating: true,
	todosUpdating: false,
	todosDeleting: false,
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case ADD_TODOS: {
			const todos = { ...state.todos };
			const todoIds = [...state.todoIds];

			action.todos.forEach((todo) => {
				const id = todo.url.split('http://todo-backend-express.herokuapp.com/')[1];
				todos[id] = { ...todo, id };

				if (!todoIds.includes(id)) {
					todoIds.push(id);
				}
			});
			return {
				...state,
				todos,
				todoIds,
			};
		}
		case REMOVE_TODO: {
			const { todos, todoIds } = state;
			delete todos[action.payload];
			todoIds.splice(todoIds.indexOf(action.payload), 1);

			return { ...state, todos, todoIds };
		}

		case EDIT_TODO: {
			const { todos } = state;
			todos[action.payload.id].title = action.payload.title;
			return { ...state, todos };
		}

		case COMPLETE_TODO: {
			const { todos } = state;
			todos[action.payload].completed = !todos[action.payload].completed;
			return { ...state, todos };
		}

		case FETCH_TODOS:
			return {
				...state,
				todosFetching: true,
				todosError: undefined,
			};

		case FETCH_TODOS_FAIL:
			return {
				...state,
				todosFetching: false,
				todosError: action.payload,
			};

		case FETCH_TODOS_SUCCESS:
			return {
				...state,
				todosFetching: false,
				todosError: undefined,
			};
		case CREATE_TODO: return { ...state, todosCreating: true, todosError: undefined };

		case CREATE_TODO_FAIL: return { ...state, todosCreating: false, todosError: action.payload };

		case CREATE_TODO_SUCCES: return { ...state, todosCreating: false, todosError: undefined };

		case UPDATE_TODO: return { ...state, todosUpdating: true, todosError: undefined };

		case UPDATE_TODO_FAIL: return { ...state, todosUpdating: false, todosError: action.payload };

		case UPDATE_TODO_SUCCES: return { ...state, todosUpdating: false, todosError: undefined };

		case DELETE_TODO: return { ...state, todosDeleting: true, todosError: undefined };

		case DELETE_TODO_FAIL: return { ...state, todosDeleting: false, todosError: action.payload };

		case DELETE_TODO_SUCCES: return { ...state, todosDeleting: false, todosError: undefined };

		default:
			return state;
	}
}

export const addTodos = todos => ({
	type: ADD_TODOS,
	todos,
});

export const addTodo = todo => ({
	type: ADD_TODOS,
	todos: [todo],
});

export const removeTodo = id => ({
	type: REMOVE_TODO,
	payload: id,
});

export const editTodo = (id, title) => ({
	type: EDIT_TODO,
	payload: {
		id,
		title,
	},
});

export const completeTodo = id => ({
	type: COMPLETE_TODO,
	payload: id,
});

export const selectTodos = state => (
	state.todos.todoIds ? state.todos.todoIds.map(todoId => state.todos.todos[todoId]) : []
);

export const selectVisibleTodos = (state) => {
	const todos = selectTodos(state);
	switch (state.visibilityFilter) {
		case SHOW_ALL:
			return todos;
		case SHOW_COMPLETED:
			return todos.filter(t => t.completed);
		case SHOW_ACTIVE:
			return todos.filter(t => !t.completed);
		default:
			throw new Error(`Unknown filter: ${state.visibilityFilter}`);
	}
};

export const getCompletedTodoCount = state => selectTodos(state)
	.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

export function fetchAllTodos() {
	return async (dispatch) => {
		let response;
		dispatch({ type: FETCH_TODOS });
		try {
			response = await api.get('/');
		} catch (error) {
			dispatch({ type: FETCH_TODOS_FAIL, payload: error.response });
			throw error;
		}
		dispatch({ type: FETCH_TODOS_SUCCESS	});
		dispatch(addTodos(response.data));
		return response;
	};
}

export function createTodo(title) {
	return async (dispatch) => {
		let response;
		dispatch({ type: CREATE_TODO });
		try {
			response = await api.post('/', { title });
		} catch (error) {
			dispatch({ type: CREATE_TODO_FAIL, payload: error.response });
			throw error;
		}
		dispatch({ type: CREATE_TODO_SUCCES	});
		dispatch(addTodo(response.data));
		return response;
	};
}

export function updateTodo(id, title) {
	return async (dispatch) => {
		let response;
		dispatch({ type: UPDATE_TODO });
		try {
			response = await api.patch(`/${id}`, { title });
		} catch (error) {
			dispatch({ type: UPDATE_TODO_FAIL, payload: error.response });
			throw error;
		}
		dispatch({ type: UPDATE_TODO_SUCCES	});
		dispatch(editTodo(id, title));
		return response;
	};
}

export function completeTodoById(id) {
	return async (dispatch) => {
		let response;
		dispatch({ type: UPDATE_TODO });
		try {
			response = await api.patch(`/${id}`, { completed: true });
		} catch (error) {
			dispatch({ type: UPDATE_TODO_FAIL, payload: error.response });
			throw error;
		}
		dispatch({ type: UPDATE_TODO_SUCCES	});
		dispatch(completeTodo(id));
		return response;
	};
}

export function deleteTodoById(id) {
	return async (dispatch) => {
		let response;
		dispatch({ type: DELETE_TODO });
		try {
			response = await api.delete(`/${id}`);
		} catch (error) {
			dispatch({ type: DELETE_TODO_FAIL, payload: error.response });
			throw error;
		}
		dispatch({ type: DELETE_TODO_SUCCES	});
		dispatch(removeTodo(id));
		return response;
	};
}
