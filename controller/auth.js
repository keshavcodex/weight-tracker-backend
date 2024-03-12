import { userDetails } from '../schema/schema.js';
import bcrypt from 'bcrypt';

export const register = async (data) => {
	const saltRounds = 7;
	try {
		const hashedPassword = await bcrypt.hash(data.password, saltRounds);
		data.password = hashedPassword;
		const newUser = new userDetails(data);
		await newUser.save();
		const { password, ...remaingFields } = newUser._doc;
		return { data: remaingFields, statusCode: 200 };
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
export const login = async (request) => {
	try {
		const user = await userDetails.findOne({ email: request.email });
		if (!user) {
			return { request: 'User not found', statusCode: 401 };
		}
		const passwordMatches = await validateUser(request.password, user.password);
		if (!passwordMatches) {
			return { data: 'Invalid password', statusCode: 401 };
		}
		const { password, ...remaingFields } = user._doc;
		return { data: remaingFields, statusCode: 200 };
	} catch (error) {
		return { data: 'User login failed', statusCode: 500 };
	}
};

const validateUser = async (password, hash) => {
	try {
		return await bcrypt.compare(password, hash);
	} catch (error) {
		console.log('Error while validating user Password', error);
	}
};
