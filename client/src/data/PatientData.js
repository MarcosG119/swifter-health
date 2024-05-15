import Patient from '../models/PatientModel.js';

const patients = [];

for (let i = 1; i <= 30; i++) {
    const newPatient = new Patient(
        `patient${i}`, // patient id
        `User ${i}`, // name
        Math.floor(Math.random() * 100), // age
        Math.random() > 0.5 ? 'Male' : 'Female', // gender
        Math.random() > 0.5 ? 'Caucasian' : 'African', // ethnicity
        Math.floor(Math.random() * 200), // Caucasian
        Math.floor(Math.random() * 100), // African
        ['Fever', 'Cough'], // symptoms
        Math.random() > 0.5, // needs more info
        ['Blood Test', 'X-ray'], // tests
        Math.floor(Math.random() * 4) + 1
    );

    patients.push(newPatient);
}

const patientData = JSON.stringify(patients, null, 2);

export default patientData;

