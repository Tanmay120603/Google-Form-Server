import { Router } from 'express';
import * as formController from '../controller/form';

const router = Router();

router.post('/submit', formController.submitForm)
      .get('/read/:index', formController.readForm)
      .get('/ping', formController.ping)
      .put("/edit/:index",formController.editForm)
      .delete('/delete/:index',formController.deleteForm);

export { router };
