import express from 'express';
import { bootstrap } from './app.controller.js';
const app = express();
bootstrap(express,app);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});