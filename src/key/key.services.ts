import * as path from 'path';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyService {
    getKey(name: string): string{
    const keyPath = path.resolve(__dirname, `../../src/assets/${name}`);
    try {
      return fs.readFileSync(keyPath, 'utf-8');
    } catch (error) {
      throw new Error(error);
    }
  }
}
