import express from 'express';
import { login, register, getAllUsers, getUser } from '../services/userServices.js';
import {
	addWeight,
	getWeight,
	getAllWeight,
	getAllWeightFromDB,
	deleteWeight,
	updatedUserId
} from '../services/weightServices.js';
import {
	addNote,
	getAllNoteFromDB,
	deleteNote,
	getNoteById,
	getAllNoteByUserId,
	getOneNoteByUserId
} from '../services/noteServices.js';

const router = express.Router();

router.get('/', async (req, res) => {
	res.status(200).send('Gym app server up and running');
});
router.post('/login', async (req, res) => {
	const response = await login(req.body);
	res.status(response.statusCode).send(response.data);
});
router.post('/register', async (req, res) => {
	const response = await register(req.body);
	res.status(response.statusCode).send(response.data);
});
router.get('/getUser/:id', async (req, res) => {
	const response = await getUser(req.params.id);
	res.status(response.statusCode).send(response.data);
});
router.get('/getAllUsers', async (req, res) => {
	const response = await getAllUsers();
	res.status(response.statusCode).send(response.data);
});

// weight app
router.post('/addWeight', async (req, res) => {
	const response = await addWeight(req.body);
	res.status(response.statusCode).send(response.data);
});
router.get('/getWeight/:id', async (req, res) => {
	const response = await getWeight(req.params.id);
	res.status(response.statusCode).send(response.data);
});
router.get('/getAllWeight/:id', async (req, res) => {
	const response = await getAllWeight(req.params.id);
	res.status(response.statusCode).send(response.data);
});
router.get('/getAllWeight', async (req, res) => {
	const response = await getAllWeightFromDB();
	res.status(response.statusCode).send(response.data);
});
router.delete('/deleteWeight/:id', async (req, res) => {
	const response = await deleteWeight(req.params.id);
	res.status(response.statusCode).send(response.data);
});
// router.post('/updateUserId', async (req, res) => {
// 	const response = await updatedUserId(req.body);
// 	res.status(response.statusCode).send(response.data);
// });

// notes app
router.post('/addNote', async (req, res) => {
	const response = await addNote(req.body);
	res.status(response.statusCode).send(response.data);
});
router.get('/getNote/:id', async (req, res) => {
	const response = await getNoteById(req.params.id);
	res.status(response.statusCode).send(response.data);
});
router.get('/getOneNoteByUserId/:id', async (req, res) => {
	const response = await getOneNoteByUserId(req.params.id);
	res.status(response.statusCode).send(response.data);
});
router.get('/getAllNote/:id', async (req, res) => {
	const response = await getAllNoteByUserId(req.params.id);
	res.status(response.statusCode).send(response.data);
});
router.get('/getAllNote', async (req, res) => {
	const response = await getAllNoteFromDB();
	res.status(response.statusCode).send(response.data);
});
router.delete('/deleteNote/:id', async (req, res) => {
	const response = await deleteNote(req.params.id);
	res.status(response.statusCode).send(response.data);
});

export default router;
