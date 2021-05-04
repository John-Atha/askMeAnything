import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService {
  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }
}
