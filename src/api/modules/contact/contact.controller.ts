import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService){}

    // create contact message 
    @Post('/create')
    async createContact(@Body() contactPayload: CreateContactMessageDto){
        return await this.contactService.createContact(contactPayload);
    }
}
