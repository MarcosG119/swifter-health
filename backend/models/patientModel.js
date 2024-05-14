const mongoose = require('mongoose')

const Schema = mongoose.Schema

const patientSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	ethnicity: {
		type: String,
		required: true
	},
	height: {
		type: Number,
		required: true
	},
	weight: {
		type: Number,
		required: true
	},
	gender: {
		type: Boolean,
		required: true
	},
	symptoms: {
		type: [String],
		required: true
	},
	moreInfoRequired: {
		type: Boolean,
		required: false
	},
	tests: {
		type: [String],
		required: false
	},
	severity: {
		type: Number,
		required: true
	},
}, { timestamps: true })

module.exports = mongoose.model('Patient', patientSchema)
