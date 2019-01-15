import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

export default class TodoItem extends Component {
	static propTypes = {
		todo: PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}).isRequired,
		updateTodo: PropTypes.func.isRequired,
		deleteTodoById: PropTypes.func.isRequired,
		completeTodoById: PropTypes.func.isRequired,
	}

	state = {
		editing: false,
	}

	handleDoubleClick = () => {
		this.setState({ editing: true });
	}

	handleSave = (id, text) => {
		if (text.length === 0) {
			this.props.deleteTodoById(id);
		} else {
			this.props.updateTodo(id, text);
		}
		this.setState({ editing: false });
	}

	render() {
		const { todo, completeTodoById, deleteTodoById } = this.props;

		let element;
		if (this.state.editing) {
			element = (
				<TodoTextInput
					text={todo.title}
					editing={this.state.editing}
					onSave={text => this.handleSave(todo.id, text)}
				/>);
		} else {
			element = (
				<div className='view'>
					<input
						className='toggle'
						type='checkbox'
						checked={todo.completed}
						onChange={() => completeTodoById(todo.id)}
					/>
					<label onDoubleClick={this.handleDoubleClick}>
						{todo.title}
					</label>
					<button type='button' className='destroy' onClick={() => deleteTodoById(todo.id)} />
				</div>
			);
		}

		return (
			<li className={classnames({ completed: todo.completed, editing: this.state.editing })}>
				{element}
			</li>
		);
	}
}
