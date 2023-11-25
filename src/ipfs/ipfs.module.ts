import { Module } from '@nestjs/common';
import { IPFSPublicService, IPFSService } from './ipfs.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IpfsController, IpfsPublicController } from './ipfs.controller';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [IpfsController],
  providers: [IPFSService],
  exports: [IPFSService],
})
export class IPFSModule {}

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [IpfsPublicController],
  providers: [IPFSPublicService],
  exports: [IPFSPublicService],
})
export class IPFSModulePublic {}
