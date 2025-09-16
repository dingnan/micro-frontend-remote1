const fs = require('fs').promises;
const path = require('path');

async function convertSvgToDataUri() {
  const svgDir = path.join(__dirname, 'src', 'assets', 'icons'); // Directory containing SVG files
  const outputFile = path.join(__dirname, 'src', 'app', 'svg-data-uris.ts'); // Output TypeScript file
  const svgs = [];

  try {
    // Read all files in the SVG directory
    const files = await fs.readdir(svgDir);
    for (const file of files) {
      if (file.endsWith('.svg')) {
        const filePath = path.join(svgDir, file);
        const svgContent = await fs.readFile(filePath, 'utf8');
        
        // Clean and encode SVG content
        const cleanedSvg = svgContent
          .replace(/(\r\n|\n|\r)/gm, '') // Remove newlines
          .replace(/"/g, "'") // Replace double quotes with single quotes
          .trim();
        
        const dataUri = `data:image/svg+xml;base64,${Buffer.from(cleanedSvg).toString('base64')}`;
        
        // Create a variable name from the file name (e.g., icon-example.svg -> ICON_EXAMPLE)
        const variableName = file
          .replace('.svg', '')
          .replace(/[^a-zA-Z0-9]/g, '_')
          .toUpperCase();
        
        svgs.push(`export const ${variableName}: string = "${dataUri}";`);
      }
    }

    // Write the data URIs to a TypeScript file
    const outputContent = `// Auto-generated file containing SVG data URIs\n${svgs.join('\n')}\n`;
    await fs.writeFile(outputFile, outputContent);
    console.log('SVG data URIs generated successfully!');
  } catch (error) {
    console.error('Error processing SVG files:', error);
  }
}

convertSvgToDataUri();