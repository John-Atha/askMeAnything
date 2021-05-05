import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswerService {
  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }
}
