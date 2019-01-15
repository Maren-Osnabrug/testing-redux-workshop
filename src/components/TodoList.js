import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = props => (
	<ul className='todo-list'>
		{props.filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} {...props} />)}
	</ul>
);

TodoList.propTypes = {
	filteredTodos: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
	}).isRequired).isRequired,
};

export default TodoList;
