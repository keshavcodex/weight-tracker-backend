import { userDetails, weight } from '../schema/schema.js';

export const addWeight = async (data) => {
	try {
		const { userId, selectedDate } = data;

		const previousWeight = await weight.findOne({
			userId: userId,
			selectedDate: new Date(selectedDate).toISOString()
		});

		if (previousWeight) {
			//updating previous weight
			const response = await weight.updateOne(
				{ _id: previousWeight._id },
				{ $set: { weight: data.weight } }
			);
			return { data: response, statusCode: 200 };
		} else {
			// saving new weight
			const newWeight = new weight(data);
			const response = await newWeight.save();
			return { data: response, statusCode: 200 };
		}
	} catch (error) {
		return { data: 'User weight addition failed', statusCode: 500 };
	}
};
export const getWeight = async (data) => {
	try {
		const userId = data;
		const userWeight = await weight
			.findOne({ userId })
			.sort({ lastUpdated: -1 });
		const userInfo = await userDetails.findById(userId);
		const body = {
			userWeight,
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			email: userInfo.email
		};
		return { data: body, statusCode: 200 };
	} catch (error) {
		console.log(error);
		return { data: 'user not found', statusCode: 403 };
	}
};
export const getAllWeight = async (userId) => {
	try {
		const usersWeight = await weight.find({ userId }, null, {
			sort: { selectedDate: -1 }
		});
		return { data: usersWeight, statusCode: 200 };
	} catch (error) {
		console.log(error);
		return { data: 'user not found', statusCode: 403 };
	}
};
export const getAllWeightFromDB = async () => {
	try {
		const usersWeight = await weight.find();
		console.log(usersWeight);
		return { data: usersWeight, statusCode: 200 };
	} catch (error) {
		console.log(error);
		return { data: 'user not found', statusCode: 403 };
	}
};
export const deleteWeight = async (weightId) => {
	try {
		const deleteInfo = await weight.deleteOne({ _id: weightId });
		console.log('deleteInfo', deleteInfo);
		return { data: `${weightId} deleted successfully.`, statusCode: 200 };
	} catch (error) {
		console.log(error);
		return { data: `${weightId} deletion failed!`, statusCode: 403 };
	}
};

export const updatedUserId = async (data) => {
	console.log('data', data);
	try {
		const response = await weight.updateMany(
			{ userId: data.oldId },
			{ $set: { userId: data.newId } }
		);
		// const response = await weight.find({ userId: data.oldId });

		return { data: response, statusCode: 200 };
	} catch (error) {
		console.log('error while updating userId');
		return { data: 'failed to update userId', statusCode: 500 };
	}
};
