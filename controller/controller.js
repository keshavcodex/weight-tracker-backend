import { userDetails, weight } from '../schema/schema.js';

export const register = async (data) => {
	try {
		const newUser = new userDetails(data);
		await newUser.save();
		return { data: newUser, statusCode: 200 };
	} catch (error) {
		if (error.erros) {
			var errorBody = {
				firstName:
					error.errors.firstName &&
					error.errors.firstName.message.replace('Path ', ''),
				lastName:
					error.errors.lastName &&
					error.errors.lastName.message.replace('Path ', ''),
				email:
					error.errors.email && error.errors.email.message.replace('Path ', ''),
				password:
					error.errors.password &&
					error.errors.password.message.replace('Path ', ''),
				phone:
					error.errors.phone && error.errors.phone.message.replace('Path ', '')
			};
			return { data: errorBody, statusCode: 400 };
		} else if (error.index != -1) {
			return {
				data: `user with email ${error.keyValue.email} already registered.`,
				statusCode: 409
			};
		} else {
			return { data: 'User registration failed', statusCode: '500' };
		}
	}
};

export const login = async (data) => {
	try {
		const user = await userDetails.findOne({ email: data.email });
		console.log('user', user);
		if (!user) {
			return { data: 'User not found', statusCode: 401 };
		}

		const passwordMatches = data.password == user.password;

		if (!passwordMatches) {
			console.log('password nahi mila');
			return { data: 'Invalid password', statusCode: 401 };
		}
		return { data: user, statusCode: 200 };
	} catch (error) {
		console.log(JSON.stringify(error, null, 2));
		return { data: 'User login failed', statusCode: '500' };
	}
};

export const addWeight = async (data) => {
	try {
		const newWeight = new weight(data);
		newWeight.save();
		return { data: newWeight, statusCode: 200 };
	} catch (error) {
		return { data: 'User weight addition failed', statusCode: 500 };
	}
};

export const getWeight = async (data) => {
	try {
		const userId = data.userId;
		const userWeight = await weight.findOne({ userId });
		return { data: userWeight, statusCode: 200 };
	} catch (error) {
		console.log(error);
		console.log(JSON.stringify(error, null, 2));
		return { data: 'user not found', statusCode: 403 };
	}
};

export const getAllWeight = async () => {
	try {
		const usersWeight = await weight.find();
		console.log('All user weight', usersWeight);
		return { data: usersWeight, statusCode: 200 };
	} catch (error) {
		console.log(error);
		console.log(JSON.stringify(error, null, 2));
		return { data: 'user not found', statusCode: 403 };
	}
};
