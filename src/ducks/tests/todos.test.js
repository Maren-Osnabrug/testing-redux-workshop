import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as duck from '../todos';

import todosStub from '../stubs/todos.json';
import api from '../../http';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(() => {
	expect.assertions(1);
	moxios.install(api);
});

afterEach(() => moxios.uninstall(api));

const input = { url: 'http://todo-backend-express.herokuapp.com/1' };
const inputParams = input.url;

// Action creators
/* These are all the action creators in the todos duck:
	addTodos
	✔️ addTodo
	removeTodo
	editTodo
	completeTodo
*/
describe('addTodo', () => {
	it('creates an action to add a todo', () => {
		const expectedAction = { type: duck.ADD_TODOS, todos: [inputParams] };
		expect(duck.addTodo(inputParams)).toEqual(expectedAction);
	});
});

// Selectors
/* These are all the selectors in the todos duck:
	✔️ selectTodos
	selectVisibleTodos
	getCompletedTodoCount
*/
describe('selectTodos', () => {
	it('returns all todos as todo objects', () => {
		const todo = { title: 'test' };
		const selectorState = {
			todos: {
				todos: { 1: { ...todo } },
				todoIds: [1],
			},
		};
		const expectedResult = [todo];
		expect(duck.selectTodos(selectorState)).toEqual(expectedResult);
	});
});

// Functions
/* These are all the Api functions in the todos duck:
	✔️ fetchAllTodos()
	createTodo(title)
	updateTodo(id, title)
	completeTodoById(id)
	deleteTodoById(id)
*/
describe('fetchAllTodos', () => {
	it('creates FETCH_TODOS_SUCCESS after successfuly fetching all todos', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({ status: 200, response: [input] });
		});

		const expectedActions = [
			{ type: duck.FETCH_TODOS },
			{ type: duck.FETCH_TODOS_SUCCESS },
			{ type: duck.ADD_TODOS, todos: [input] },
		];

		const store = mockStore({});

		return store.dispatch(duck.fetchAllTodos()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});

// Reducer
/* These are all the reduced constants in the todos duck:
	keep in mind, when they modify existing state,
	you should test with both initialState and modified state.

	✔️ ADD_TODOS
	REMOVE_TODO
	EDIT_TODO
	COMPLETE_TODO
	FETCH_TODOS
	FETCH_TODOS_FAIL
	FETCH_TODOS_SUCCESS
	CREATE_TODO
	CREATE_TODO_FAIL
	CREATE_TODO_SUCCES
	UPDATE_TODO
	UPDATE_TODO_FAIL
	UPDATE_TODO_SUCCES
	DELETE_TODO
	DELETE_TODO_FAIL
	DELETE_TODO_SUCCES
*/
describe('Todos reducer', () => {
	const state = {
		...duck.initialState,
		todoIds: ['1'],
		todos: todosStub,
	};

	it('handles ADD_TODOS with initialState', () => {
		expect(duck.default(duck.initialState, { type: duck.ADD_TODOS, todos: [input] })).toEqual(state);
	});

	it('handles ADD_TODOS with non-empty state', () => {
		expect(duck.default(state, {
			type: duck.ADD_TODOS,
			todos: [{ url: 'http://todo-backend-express.herokuapp.com/2' }],
		})).toEqual({
			...state,
			todoIds: ['1', '2'],
			todos: {
				...todosStub,
				2: { id: '2', url: 'http://todo-backend-express.herokuapp.com/2' },
			},
		});
	});
});
