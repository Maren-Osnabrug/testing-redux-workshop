import axios from 'axios';

/**
 * Create a preconfigured axios instance to use in all api calls.
 */
export default axios.create({
	baseURL: 'https://todo-backend-express.herokuapp.com/',
});
