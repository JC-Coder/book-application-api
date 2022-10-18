import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { hasRole } from '../auth/decorators/role.decorators';
import { JwtAuthGuard } from '../auth/Guards/authGuard';
import { RolesGuard } from '../auth/Guards/roleguard';
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
    @hasRole('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Get('paginate/all')
    async getAllMessages(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1, @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
    ): Promise<Pagination<Contact>>{
        limit = limit > 100 ? 100 : limit;
        return this.contactService.getAllMessages({page,limit});
    }
}
