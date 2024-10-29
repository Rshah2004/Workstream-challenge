import { Module } from '@nestjs/common';
import { PhoneBlacklistService } from './phone-blacklist.service';
import { PhoneBlacklistController } from './phone-blacklist.controller';
import { DatabaseModule } from '../database/database.module';

// Defined the PhoneBlacklistModule, which imports DatabaseModule, provides PhoneBlacklistService,
// and uses PhoneBlacklistController to handle requests for managing blacklisted phone numbers.
@Module({
  imports: [DatabaseModule],
  providers: [PhoneBlacklistService],
  controllers: [PhoneBlacklistController],
})
export class PhoneBlacklistModule {}
