import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService){}

    // create contact message 
    @Post('/create')
    @ApiCreatedResponse({ description: `Contact created` })
        @ApiBadRequestResponse({ description: `Failed to create a contact`})
    async createContact(@Body() contactPayload: CreateContactMessageDto){
        return await this.contactService.createContact(contactPayload);
    }
}
