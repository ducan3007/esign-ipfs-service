import { config } from '@config';
import { logger } from '@logger';
import { Response } from 'express';
import { verify } from 'jsonwebtoken';

export function decodeToken(token: string, res: Response) {
  try {
    let payload: any = verify(token, config.get('IPFS_FILE_SECRET'));
    logger.info('Decoded token', payload);
    return payload;
  } catch (error) {
    throw Error('Invalid token');
  }
}
