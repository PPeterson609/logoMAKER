import { Circle, Triangle, Square } from './lib/shapes.js';
const inquirer = (await import('inquirer')).default;
const fs = await import('fs/promises');

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter text for your logo (up to 3 characters):',
        validate: input => input.length <= 3 || 'Text must be up to 3 characters.',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (keyword or hexadecimal):',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['Circle', 'Triangle', 'Square'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (keyword or hexadecimal):',
    },
];

function generateSVG({ text, textColor, shape, shapeColor }) {
    let shapeInstance;

    switch (shape) {
        case 'Circle':
            shapeInstance = new Circle();
            break;
        case 'Triangle':
            shapeInstance = new Triangle();
            break;
        case 'Square':
            shapeInstance = new Square();
            break;
    }

    shapeInstance.setColor(shapeColor);

    return `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeInstance.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>
    `;
}

function generateUniqueFilename() {
    const timestamp = Date.now();
    return `logo_${timestamp}.svg`;
}

inquirer.prompt(questions).then(async (answers) => {
    const svgContent = generateSVG(answers);
    const uniqueFilename = generateUniqueFilename();
    await fs.mkdir('examples', { recursive: true });
    await fs.writeFile(`examples/${uniqueFilename}`, svgContent);
    console.log(`Generated ${uniqueFilename} inside examples folder`);
});
