import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import {
	completeTodoById,
	selectVisibleTodos,
	fetchAllTodos,
	createTodo,
	updateTodo,
	deleteTodoById,
} from '../ducks/todos';

const actionsToProps = {
	completeTodoById,
	fetchAllTodos,
	createTodo,
	updateTodo,
	deleteTodoById,
};

const mapStateToProps = state => ({
	filteredTodos: selectVisibleTodos(state),
});

export default connect(mapStateToProps, actionsToProps)(TodoList);
