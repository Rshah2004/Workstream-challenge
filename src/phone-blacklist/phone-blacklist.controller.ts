import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PhoneBlacklistService } from './phone-blacklist.service';

// Defined a controller for managing phone blacklist operations
@Controller('blacklist')
export class PhoneBlacklistController {
  // Injected the PhoneBlacklistService for accessing business logic related to the phone blacklist
  constructor(private readonly phoneBlacklistService: PhoneBlacklistService) {}

  // Defined a GET route at '/blacklist/import' to trigger the import of phone numbers
  @Get('import')
  async importBlacklist() {
    // console.log('Starting phone numbers import process...');  
    try {
      await this.phoneBlacklistService.importBlacklist();
      // console.log('Phone numbers imported successfully.');  
      return { message: 'Phone numbers imported and stored in the database successfully' };
    } catch (error) {
       console.error('Error importing phone numbers:', error);
       throw new HttpException('Failed to import and store phone numbers in the database', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}