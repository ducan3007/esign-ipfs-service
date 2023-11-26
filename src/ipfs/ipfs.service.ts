import { Injectable, OnModuleInit } from '@nestjs/common';
import * as ipfs from 'ipfs-http-client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { config } from '@config';
import { logger } from '@logger';

@Injectable()
export class IPFSService implements OnModuleInit {
  private ipfsClient: any;

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    logger.info('IPFS Service Initiated', {
      host: config.get('IPFS_HOST'),
      port: config.get('IPFS_PORT'),
      protocol: config.get('IPFS_PROTOCOL'),
    });
    this.ipfsClient = ipfs.create({
      host: config.get('IPFS_HOST'),
      port: config.get('IPFS_PORT'),
      protocol: config.get('IPFS_PROTOCOL'),
    });
  }

  async add(file: any) {
    const fileHash = await this.ipfsClient.add(file);
    return fileHash;
  }

  async addBuffer(buffer: Buffer) {
    const fileHash = await this.ipfsClient.add(buffer);
    return fileHash;
  }

  async get(cid: string) {
    const file = await this.ipfsClient.get(cid);
    return file;
  }

  async getDownloadURL(cid: string) {
    try {
      logger.info(
        `Downloading file from IPFS Gateway ${config.get(
          'IPFS_GATEWAY_HOST',
        )}/ipfs/${cid}`,
      );
      const response = await axios.get(
        `${config.get('IPFS_GATEWAY_HOST')}/ipfs/${cid}`,
        {
          maxRedirects: 0,
          validateStatus: function (status) {
            return status >= 200 && status < 303;
          },
        },
      );
      return response.headers.location;
    } catch (error) {
      console.log(error);
      throw Error("Couldn't download file from IPFS Gateway");
    }
  }

  async getFileBuffer(cid: string) {
    const buffer = await this.ipfsClient.cat(cid);
    console.log('get file Buffer', buffer);
    let fileBuffer = [];
    for await (const chunk of buffer) {
      fileBuffer.push(chunk);
    }
    return Buffer.concat(fileBuffer);
  }
}

@Injectable()
export class IPFSPublicService implements OnModuleInit {
  private ipfsClient: any;

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    logger.info('IPFS Public Service Initiated', {
      host: config.get('IPFS_HOST'),
      port: config.get('IPFS_PORT'),
      protocol: config.get('IPFS_PROTOCOL'),
    });
    this.ipfsClient = ipfs.create({
      host: config.get('IPFS_HOST'),
      port: config.get('IPFS_PORT'),
      protocol: config.get('IPFS_PROTOCOL'),
    });
  }

  async getFileBuffer(cid: string) {
    const buffer = await this.ipfsClient.cat(cid);
    let fileBuffer = [];
    for await (const chunk of buffer) {
      fileBuffer.push(chunk);
    }
    return Buffer.concat(fileBuffer);
  }
}
