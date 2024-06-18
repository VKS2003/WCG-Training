import express from 'express';
import { empList, addEmp, deleteEmp, getData } from '../controller/empController.js'
import { fileValidator }from '../middlewares/fileValidator.js';
const router = express.Router();

router.get('/', empList);
router.get('/add-employee', addEmp);
router.post('/add-employee',fileValidator, addEmp);
router.get('/delete/:id', deleteEmp);
router.get('/get-data', getData);

export default router;
