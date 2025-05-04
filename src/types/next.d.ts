// src/types/next.d.ts

import { IncomingMessage } from 'node:http';
import { Request } from 'next/server';

declare global {
  namespace NodeJS {
    interface Global {
      file: Express.Multer.File;
    }
  }
}

declare module 'next/server' {
  interface NextRequest extends IncomingMessage {
    file?: Express.Multer.File;
  }
}
