import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { logger } from '@logger';
import { config } from '@config';
import { IPFSPublicService, IPFSService } from './ipfs.service';
import { decodeToken } from 'src/utils/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Controller('file')
@ApiTags('Public IPFS endpoint')
export class IpfsPublicController {
  constructor(
    private readonly ipfsService: IPFSPublicService,
    private readonly prismService: PrismaService,
  ) {}

  @Get('download')
  async downloadPublic(
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      if (!token) {
        return {
          error: 'No token provided',
        };
      }
      const payload: any = decodeToken(token, res);
      if (payload.cid && payload.user_id && payload.expire) {
        if (payload.expire < Date.now()) {
          return {
            error: 'Token expired',
            expired: payload.expire,
            now: Date.now(),
          };
        }

        console.log('Dowloading file', payload);
        const buffer = await this.ipfsService.getFileBuffer(payload.cid);
        console.log('Buffer', buffer);
        res.setHeader('Content-Type', 'application/pdf');
        return new StreamableFile(new Uint8Array(buffer.buffer));
      } else {
        return {
          error: 'Invalid token',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        error: "Couldn't download file from IPFS Gateway",
      };
    }
  }
}

@Controller('ipfs')
@ApiTags('IPFS endpoint')
export class IpfsController {
  constructor(
    private readonly ipfsService: IPFSService,
    private readonly prismService: PrismaService,
  ) {}

  @Get('get/:cid')
  async get(@Param('cid') cid: string) {
    try {
      const file = await this.ipfsService.getFileBuffer(cid);
      return file;
    } catch (error) {
      console.log(error);
      return {
        error: "Couldn't download file from IPFS Gateway",
      };
    }
  }
}
