import { userDetails, note } from '../schema/schema.js';

export const addNote = async (data) => {
	try {
		const { userId, selectedDate } = data;

		const previousNote = await note.findOne({
			userId: userId,
			selectedDate: new Date(selectedDate).toISOString()
		});

		if (previousNote) {
			//updating previous note
			const response = await note.updateOne(
				{ _id: previousNote._id },
				{ $set: { note: data.note } }
			);
			return { data: response, statusCode: 200 };
		} else {
			// saving new note
			const newNote = new note(data);
			const response = await newNote.save();
			return { data: response, statusCode: 200 };
		}
	} catch (error) {
		return { data: 'User note addition failed', statusCode: 500 };
	}
};
export const getNote = async (data) => {
	try {
		const userId = data;
		const userNote = await note
			.findOne({ userId })
			.sort({ lastUpdated: -1 });
		const userInfo = await userDetails.findById(userId);
		const body = {
			userNote,
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
export const getAllNote = async (userId) => {
	try {
		const usersNote = await note.find({ userId }, null, {
			sort: { selectedDate: -1 }
		});
		return { data: usersNote, statusCode: 200 };
	} catch (error) {
		console.log(error);
		return { data: 'user not found', statusCode: 403 };
	}
};
export const getAllNoteFromDB = async () => {
	try {
		const usersNote = await note.find();
		console.log(usersNote);
		return { data: usersNote, statusCode: 200 };
	} catch (error) {
		console.log(error);
		return { data: 'user not found', statusCode: 403 };
	}
};
export const deleteNote = async (noteId) => {
	try {
		const deleteInfo = await note.deleteOne({ _id: noteId });
		console.log('deleteInfo', deleteInfo);
		return { data: `${noteId} deleted successfully.`, statusCode: 200 };
	} catch (error) {
		console.log(error);
		return { data: `${noteId} deletion failed!`, statusCode: 403 };
	}
};
export const updatedUserId = async (data) => {
	console.log('data', data);
	try {
		const response = await note.updateMany(
			{ userId: data.oldId },
			{ $set: { userId: data.newId } }
		);
		// const response = await note.find({ userId: data.oldId });

		return { data: response, statusCode: 200 };
	} catch (error) {
		console.log('error while updating userId');
		return { data: 'failed to update userId', statusCode: 500 };
	}
};
