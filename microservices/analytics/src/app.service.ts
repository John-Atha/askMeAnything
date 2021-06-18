import { Injectable, NotFoundException } from '@nestjs/common';
import { ChoreoObjectDto } from './choreoObject.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Question } from './question/entities/question.entity';
import { Answer } from './answer/entities/answer.entity';
import { Keyword } from './keyword/entities/keyword.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  getHello(): string {
    return 'Hello World!';
  }

  async choreoHandle(body: ChoreoObjectDto): Promise<any> {
    const { action, object, id, src, entryId, targetEntity, timestamp } = body;
    console.log('--->>Choreographer passed me the:');
    console.log(body);
    let entity = null;
    if (targetEntity === 'user') entity = User;
    else if (targetEntity === 'question') entity = Question;
    else if (targetEntity === 'answer') entity = Answer;
    else if (targetEntity === 'keyword') entity = Keyword;
    else if (targetEntity === 'question-keywords') {
      if (action!=='patch') return 'OK';
      console.log('* I am interested in it.');
      console.log(entryId);
      const question = await this.manager.findOne(Question, { id: entryId });
      if (!question) throw new NotFoundException(`Question '${entryId}' not found.`);
      console.log(object);
      question.keywords = object;
      const res = await this.manager.save(question);
      console.log(`Keywords of question '${entryId}' were updated.`);
      return 'OK';
    }
    else return 'OK';
    console.log('* I am interested in it.');
    if (action === 'post') {
      const target = await this.manager.create(entity, object);
      const res = await this.manager.save(target);
      console.log(`* New ${targetEntity} with id '${res['id']}' is saved.`);
    }
    else if (action === 'delete') {
      const target = await this.manager.findOne(entity, { id: entryId });
      if (!target) {
        console.log(`* I did not find ${targetEntity} with id '${entryId}', never mind it was going to be deleted anyway.`);
        return 'OK';
      }
      const res = await this.manager.delete(entity, { id: entryId });
      console.log(`* ${targetEntity} with id '${entryId}' was deleted successfully.`);
    }
    else if (action==='patch') {
      const target = await this.manager.findOne(entity, { id: entryId });
      if (!target) throw new NotFoundException(`${targetEntity} '${entryId}' not found.`);
      const newObject = await this.manager.merge(entity, target, object);
      const res = await this.manager.save(newObject);
      console.log(`* ${targetEntity} with id '${res['id']}' updated successfully.`);
    }
    return 'OK';
  }
}
