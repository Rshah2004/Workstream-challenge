import { Module } from '@nestjs/common';
import { PhoneBlacklistModule } from './phone-blacklist/phone-blacklist.module';

@Module({
  imports: [
    PhoneBlacklistModule,  // Remove ConfigModule.forRoot()
  ],
})
export class AppModule {}
