import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
    constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>){}

    // create contact message 
    async createContact(contactPayload):Promise<Contact>{
        return await this.contactRepository.save(contactPayload);
    }


    // get all contact messages (pagination)
      async getAllMessages(options: IPaginationOptions): Promise<Pagination<Contact>>{
        return await paginate<Contact>(this.contactRepository, options);
    }
}
