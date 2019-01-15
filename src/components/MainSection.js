import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCompletedTodoCount, fetchAllTodos } from '../ducks/todos';
import Footer from './Footer';
import VisibleTodoList from '../containers/VisibleTodoList';

export function stateToProps(state) {
	return ({
		todosCount: state.todos.todoIds.length,
		completedCount: getCompletedTodoCount(state),
	});
}

export const actionsToProps = { fetchAllTodos };

class MainSection extends React.Component {
	componentDidMount() {
		this.props.fetchAllTodos();
	}

	render() {
		const { todosCount, completedCount } = this.props;
		return (
			<section className='main'>
				{!!todosCount && (
					<span>
						<input
							className='toggle-all'
							type='checkbox'
							checked={completedCount === todosCount}
							readOnly
						/>
					</span>
				)}
				<VisibleTodoList />
				{!!todosCount && (
					<Footer
						completedCount={completedCount}
						activeCount={todosCount - completedCount}
					/>
				)}
			</section>
		);
	}
}

export default connect(stateToProps, actionsToProps)(MainSection);

MainSection.propTypes = {
	todosCount: PropTypes.number.isRequired,
	completedCount: PropTypes.number.isRequired,
	fetchAllTodos: PropTypes.func.isRequired,
};
