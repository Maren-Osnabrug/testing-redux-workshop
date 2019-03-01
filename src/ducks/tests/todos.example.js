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

const input = { property: 'value' };
const inputParams = input.property;

// Action creators
/* These are all the action creators in the todos duck:
	addTodos
	addTodo
	removeTodo
	editTodo
	completeTodo
*/
describe('[insert action creator name]', () => {
	it('creates an action to [insert a description]', () => {
		const expectedAction = { type: duck.ActionConstantThatGetsDispatchedInThisActionCreator };
		expect(duck.methodYouAreTesting(inputParams)).toEqual(expectedAction);
	});
});

// Selectors
/* These are all the selectors in the todos duck:
	selectTodos
	selectVisibleTodos
	getCompletedTodoCount
*/
describe('select[insert selector name]', () => {
	it('returns [insert a description]', () => {
		const expectedResult = 'the result the selector produces based in the input';
		expect(duck.selectorYouAreTesting(input)).toEqual(expectedResult);
	});
});

// Functions
/* These are all the Api functions in the todos duck:
	fetchAllTodos()
	createTodo(title)
	updateTodo(id, title)
	completeTodoById(id)
	deleteTodoById(id)
*/
describe('method', () => {
	it('creates ACTION_CONSTANT after successfuly fetching the currentUser', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				// insert a response if there is one and it is needed for the test
				// you can store this stubbed response in the stubs directory
				response: { data: todosStub },
			});
		});

		const expectedActions = [
			{ type: duck.ACTION_CONSTANT },
			// insert all actions that get dispatched by the method (with proper payload)
		];

		const store = mockStore({});

		return store.dispatch(duck.method()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});

// Reducer
/* These are all the reduced constants in the todos duck:
	keep in mind, when they modify existing state,
	you should test with both initialState and modified state.

	ADD_TODOS
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
		extraParams: 'value',
	};

	it('handles ACTION_CONSTANT with initialState', () => {
		expect(duck.default(duck.initialState, { type: duck.ACTION_CONSTANT })).toEqual(state);
	});

	it('handles ACTION_CONSTANT with non-empty state', () => {
		expect(duck.default({
			...duck.initialState,
			extraParameter: 'value',
		}, {
			type: duck.ACTION_CONSTANT,
			payload: input, // not all actions will have a payload
		})).toEqual({
			...duck.initialState,
			// result of the reducer
		});
	});
});
