import { Circle, Triangle, Square } from './lib/shapes.js';
const inquirer = (await import('inquirer')).default;
const fs = await import('fs/promises');

const questions = 