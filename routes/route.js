import express from 'express';
import {
	register,
	login,
	addWeight,
	getWeight,
	getAllWeight,
	getAllWeightFromDB,
	deleteWeight
} from '../controller/controller.js';

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

export default router;
