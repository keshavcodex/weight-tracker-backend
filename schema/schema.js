import mongoose from 'mongoose';

const userSchema = {
	type: 'object',
	firstName: {
		type: 'string',
		required: true,
		minLength: 2
	},
	lastName: {
		type: 'string',
		required: true,
		minLength: 2
	},
	email: {
		type: 'string',
		required: true,
		unique: true,
		match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	},
	password: {
		type: 'string',
		required: true,
		minLength: 6
	},
	phone: {
		type: 'string',
		pattern: '^+[d]{1,2}-d{10}$',
		required: true
	},
	lastUpdated: {
		type: String,
		default: () => new Date().toISOString()
	}
};

export const user = mongoose.model('user', userSchema);

const userWeight = {
	type: 'object',
	userId: {
		type: 'string',
		required: true
	},
	weight: {
		type: 'number',
		required: true
	},
	selectedDate: {
		type: Date,
		required: true
	},
	lastUpdated: {
		type: String,
		default: () => new Date().toISOString()
	}
};

export const weight = mongoose.model('weight', userWeight);

const gymNote = {
	type: 'object',
	userId: {
		type: 'string',
		required: true
	},
	page: {
		type: 'String'
	},
	selectedDate: {
		type: Date,
		required: true
	},
	lastUpdated: {
		type: String,
		default: () => new Date().toISOString()
	}
};

export const note = mongoose.model('note', gymNote);
