#!/usr/bin/env node

const chroma = require('chroma-js');
const chalk = require('chalk');

const args = process.argv.slice(2);
const seedColor = args[0] || '#3498db';

if (!chroma.valid(seedColor)) {
    console.log(chalk.red('Error: Invalid hex color. Please provide a valid hex code (e.g., #3498db)'));
    process.exit(1);
}

console.log(chalk.bold.blue('\n🎨 Color Palette CLI by Ahmar Hussain (Stackaura)'));
console.log(chalk.gray('Generating accessible palette for: ') + chalk.bold(seedColor) + '\n');

const scale = chroma.scale(['white', seedColor, 'black']).mode('lch').colors(9);

console.log(chalk.underline('Palette Summary:'));
scale.forEach((color, index) => {
    const contrast = chroma.contrast(color, 'white');
    const contrastBlack = chroma.contrast(color, 'black');
    const bestText = contrast > contrastBlack ? 'White' : 'Black';
    const score = Math.max(contrast, contrastBlack).toFixed(2);
    
    let accessibility = '';
    if (score >= 7) accessibility = chalk.green(' (AAA)');
    else if (score >= 4.5) accessibility = chalk.yellow(' (AA)');
    else accessibility = chalk.red(' (FAIL)');

    console.log(
        chalk.bgHex(color).hex(bestText === 'White' ? '#ffffff' : '#000000')(` ${color} `) +
        `  Index: ${index + 1}  ` +
        `Contrast: ${score}${accessibility}`
    );
});

console.log('\n' + chalk.cyan('🚀 Tip: Use these colors in your CSS variables for a consistent and accessible design system.'));
console.log(chalk.gray('Visit https://www.stackaura.com for more developer tools.\n'));
