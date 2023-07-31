import { OpenAPIObject } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

const apiDocPath = join(__dirname, '../../doc/api.yaml');

export async function getApiDoc() {
  try {
    const apiDocContent = await readFile(apiDocPath, 'utf-8');
    const apiDoc: OpenAPIObject = parse(apiDocContent);
    return apiDoc;
  } catch (error) {
    console.error(error.message);
  }
}
