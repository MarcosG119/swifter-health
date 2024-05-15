const express = require('express')
const multer = require('multer')
require('dotenv').config()

const port = process.env.PORT
const app = express()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.wav')
	}
});

const upload = multer({ storage: storage });

const {
	intake,
	addToDb,
	fetchAll,
} = require('../controllers/controller')

const router = express.Router()

router.post('/intake', upload.single('wavfile'), intake)
router.post('/addToDb', addToDb)
router.get('/fetchAll', fetchAll)

module.exports = router
