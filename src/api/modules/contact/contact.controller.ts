import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  // create contact message
  @Post('/create')
  @ApiCreatedResponse({ description: 'Created Succesfully'})
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createContact(@Body() contactPayload: CreateContactMessageDto) {
    return await this.contactService.createContact(contactPayload);
  }


    // get all contact messages (pagination)
    @Get('paginate/all')
    async getAllMessages(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1, @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
    ): Promise<Pagination<Contact>>{
        limit = limit > 100 ? 100 : limit;
        return this.contactService.getAllMessages({page,limit});
    }
}
