import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTodo } from '../ducks/todos';
import TodoTextInput from './TodoTextInput';

const Header = props => (
	<header className='header'>
		<h1>todos</h1>
		<TodoTextInput
			newTodo
			onSave={(text) => {
				if (text.length !== 0) {
					props.createTodo(text);
				}
			}}
			placeholder='What needs to be done?'
		/>
	</header>
);

Header.propTypes = {
	createTodo: PropTypes.func.isRequired,
};

export default connect(null, { createTodo })(Header);
