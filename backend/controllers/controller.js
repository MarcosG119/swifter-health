const Patient = require('../models/patientModel')
const mongoose = require('mongoose')
const OpenAI = require('openai');
const fs = require('fs')
require('dotenv').config()

const openai = new OpenAI();

const intake = async (req, res) => {
	console.log('File received:', req.file.path);
	const transcription = await openai.audio.transcriptions.create({
		file: fs.createReadStream(req.file.path),
		model: "whisper-1",
	});

	const completion = await openai.chat.completions.create({
		messages: [
			{ role: "system",content: process.env.DOCTOR_PROMPT},
			{ role: "user", content: transcription.text },
		],
		model: "gpt-4o",
		response_format: { type: "json_object" },
	});	

	try {
		const patientData = JSON.parse(completion.choices[0]['message']['content'])
		const name = patientData['Name'] || 'Anonymous'
		const age = patientData['Age'] || 0
		const ethnicity = patientData['Ethnicity'] || 'Unknown'
		const height = patientData['Height'] || 0
		const weight = patientData['Weight'] || 0
		const gender = patientData['Gender'] || true
		const symptoms = patientData['Symptoms'] || []
		const tests = patientData['Tests'] || []
		const moreInfo = patientData['moreInfo'] || true
		const severity = patientData['Severity'] || 2

		const patient = await Patient.create({name, age, ethnicity, height, weight, gender, symptoms, moreInfo, tests, severity})
		res.status(200).json(patient)
		
	} catch (e) {
		res.status(500).json({'Error': e.message})
	}

}

const fetchAll = async (req, res) => {
	const patients = await Patient.find({}).sort({severity:1})
	res.status(200).json(patients)
}

module.exports = {
	intake,
	fetchAll,
}
