import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    test(){
        return 'Hello';
    }
}
