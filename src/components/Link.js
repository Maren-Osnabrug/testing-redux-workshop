import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../ducks/visibilityFilter';

const mapStateToProps = (state, ownProps) => ({
	active: ownProps.filter === state.visibilityFilter,
	filter: ownProps.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setFilter: () => { dispatch(setVisibilityFilter(ownProps.filter)); },
});

const Link = ({
	active, children, filter, ...other
}) => (
	// eslint-disable-next-line jsx-a11y/anchor-is-valid
	<a
		role='button'
		className={classnames({ selected: active })}
		style={{ cursor: 'pointer' }}
		onClick={other.setFilter}
	>
		{children}
	</a>
);

Link.propTypes = {
	active: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
	filter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Link);
