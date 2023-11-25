import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IpfsController, IpfsPublicController } from './ipfs/ipfs.controller';
import { IPFSModule, IPFSModulePublic } from './ipfs/ipfs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [IPFSModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

@Module({
  imports: [IPFSModulePublic, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModulePublic {}
