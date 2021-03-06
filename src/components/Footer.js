import React from 'react';
import PropTypes from 'prop-types';
import FilterLink from './Link';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../ducks/visibilityFilter';

const FILTER_TITLES = {
	[SHOW_ALL]: 'All',
	[SHOW_ACTIVE]: 'Active',
	[SHOW_COMPLETED]: 'Completed',
};

const Footer = (props) => {
	const { activeCount } = props;
	const itemWord = activeCount === 1 ? 'item' : 'items';
	return (
		<footer className='footer'>
			<span className='todo-count'>
				<strong>{activeCount || 'No'}</strong>{' '} {itemWord} {' '} left
			</span>
			<ul className='filters'>
				{Object.keys(FILTER_TITLES).map(filter => (
					<li key={filter}>
						<FilterLink filter={filter}>
							{FILTER_TITLES[filter]}
						</FilterLink>
					</li>
				))}
			</ul>
		</footer>
	);
};

Footer.propTypes = {
	activeCount: PropTypes.number.isRequired,
};

export default Footer;
