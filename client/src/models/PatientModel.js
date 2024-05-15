class Patient {
    constructor(patientID, name, age, gender, ethnicity, height, weight, symptoms, needs_more_info, suggested_tests, severity) {
        this._patientID = patientID;
        this._name = name;
        this._age = age;
        this._gender = gender;
        this._ethnicity = ethnicity;
        this._height = height;
        this._weight = weight;
        this._symptoms = symptoms;
        this._needs_more_info = needs_more_info;
        this._suggested_tests = suggested_tests;
        this._severity = severity;
    }

    get patientID() {
        return this._patientID;
    }

    set patientID(patientID) {
        this._patientID = patientID;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get age() {
        return this._age;
    }

    set age(age) {
        this._age = age;
    }

    get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;
    }

    get ethnicity() {
        return this._ethnicity;
    }

    set ethnicity(ethnicity) {
        this._ethnicity = ethnicity;
    }

    get height() {
        return this._height;
    }

    set height(height) {
        this._height = height;
    }

    get weight() {
        return this._weight;
    }

    set weight(weight) {
        this._weight = weight;
    }

    get symptoms() {
        return this._symptoms;
    }

    set symptoms(symptoms) {
        this._symptoms = symptoms;
    }

    get needs_more_info() {
        return this._needs_more_info;
    }

    set needs_more_info(needs_more_info) {
        this._needs_more_info = needs_more_info;
    }

    get suggested_tests() {
        return this._suggested_tests;
    }

    set suggested_tests(suggested_tests) {
        this._suggested_tests = suggested_tests;
    }

    get severity() {
        return this._severity;
    }

    set severity(severity) {
        this._severity = severity;
    }
}

export default Patient;