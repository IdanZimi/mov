import dotenv from 'dotenv';
import mongoose from 'mongoose';
import CodeBlock from './modules/codeBlock/model/codeBlock.model.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });


async function populateDB() {
  try {
    const jsonPath = path.join(__dirname, './data/codeBlocks.json');
    const rawData = await readFile(jsonPath, 'utf8');
    const { blocks } = JSON.parse(rawData);

    await mongoose.connect(process.env.MONGO_URI);
    await CodeBlock.deleteMany({});
    await CodeBlock.insertMany(blocks);
    console.log('Seeded!');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    process.exit();
  }
}

populateDB();
