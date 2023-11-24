import { v4 as uuidv4 } from 'uuid';
import { EMediaType } from './enums/media-type.enum';

export function getKey(filename: string): string {
  return `${uuidv4()}-${filename}`;
}

export function mimeToType(mime: string): EMediaType {
  if (mime.startsWith('application')) {
    return mime.substring(mime.indexOf('/') + 1) as EMediaType;
  }
  // file-filter.helper.ts guarantees Type
  return mime.substring(0, mime.indexOf('/')) as EMediaType;
}
