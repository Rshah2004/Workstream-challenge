# Phone Number Blacklist Importer

This project imports phone numbers from a CSV file and stores them in a PostgreSQL database as "blacklist" phone numbers, formatted to the E.164 standard.

## Overview

This project:
- Imports phone numbers from a specified CSV file URL.
- Formats phone numbers to E.164 format.
- Stores formatted phone numbers in a PostgreSQL database as a blacklist.
- Uses NestJS as the framework.

## Requirements and Setup

1. **Clone and Install**:
   - Install dependencies:
     ```bash
     npm install
     ```

2. **Run the Application**:
   - Start the app:
     ```bash
     npm run start
     ```

3. **Usage**:
   - Access the endpoint at `http://localhost:3000/blacklist/import` to initiate phone number import.
   - The endpoint fetches, formats, and stores phone numbers in the database.

## Technologies Used

- **NestJS**: Framework for server-side applications.
- **PostgreSQL**: Database for storing blacklist phone numbers.
- **libphonenumber-js**: Formats phone numbers to E.164.
- **axios**: Fetches CSV data from a remote URL.
