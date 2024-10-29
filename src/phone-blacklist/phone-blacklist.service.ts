import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import axios from 'axios';
import * as csv from 'csv-parser';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
 
@Injectable()
export class PhoneBlacklistService {
  constructor(@Inject('DATABASE_POOL') private dbPool: Pool) {}

  // Fetches CSV data from the specified URL, processes it, and stores formatted phone numbers in the database
  async importBlacklist() {
    // console.log('Starting import of phone numbers from CSV...');
    const response = await axios.get(process.env.CSV_URL, { responseType: 'stream' });
    const csvStream = response.data.pipe(csv());
  
    for await (const row of csvStream) {
      const phone = Object.values(row)[0] as string;   
      const formattedNumber = this.formatPhoneNumber(phone);
      
      if (formattedNumber) {
        // console.log(`Formatted phone number: ${formattedNumber}`);  
        await this.savePhoneNumber(formattedNumber);
      }
    }
  }
  
  
  // Formats phone numbers to E.164 format; returns null if invalid
  private formatPhoneNumber(phone: string): string | null {
    if (typeof phone !== 'string' || phone.trim() === '') {
      console.warn('Invalid phone number format:', phone); 
      return null;
    }
  
    // Ensure the number starts with '+1' for US-based parsing
    const normalizedPhone = phone.startsWith('+') ? phone : `+1${phone}`;
    const phoneNumber = parsePhoneNumberFromString(normalizedPhone, 'US');
    return phoneNumber ? phoneNumber.format('E.164') : null;
  }
  
  // Saves the phone number to the database, with error handling for potential issues
  private async savePhoneNumber(phoneNumber: string) {
    try {
      await this.dbPool.query('INSERT INTO blacklist(phone_number) VALUES ($1) ON CONFLICT DO NOTHING', [phoneNumber]);
    } catch (error) {
      console.error(`Failed to insert ${phoneNumber}:`, error);
    }
  }
}
