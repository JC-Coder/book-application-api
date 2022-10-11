import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
    constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>){}

    // create contact message 
    async createContact(contactPayload):Promise<Contact>{
        return await this.contactRepository.save(contactPayload);
    }
}
