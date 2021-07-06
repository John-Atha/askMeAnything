import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Answer } from 'src/answer/entities/answer.entity';
import { ChoreoObjectDto } from 'src/choreoObject.dto';
import { Keyword } from 'src/keyword/entities/keyword.entity';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/user/entities/user.entity';
import { EntityManager } from 'typeorm';

export const validateParams = (params) => {
  if (params.start !== undefined) {
    if (!parseInt(params.start)) {
      throw new BadRequestException(`Invalid start parameter.`);
    }
  }
  if (params.end !== undefined) {
    if (!parseInt(params.end)) {
      throw new BadRequestException(`Invalid end parameter.`);
    }
  }
};

export const daysComplete = (data, key) => {
  // keep empty days, so that we complete the object with these days and their counter=0
  let flag = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  data.forEach((obj) => {
    const day = obj.day;
    obj[key] = parseInt(obj[key]);
    const index = flag.indexOf(day);
    flag = flag.slice(0, index).concat(flag.slice(index+1, flag.length));
  })
  flag.forEach((day) => {
    data.push({
      day: day,
      [key]: 0,
    })
  })
  return data;
}

export const monthlyCountsParseInt = (data, key) => {
  return data.map((obj) => {
    return {
      month: obj.month,
      [key]: parseInt(obj[key]),
    }
  })
}

export async function handleChoreoMessage(body: ChoreoObjectDto, manager: EntityManager, pool: any, fresh:boolean): Promise<any> {
  const { action, object, entryId, targetEntity } = body;
  console.log(`--->>Choreographer passed me the message ${body.id}`);
  let entity = null;
  if (fresh) {
    await pool.hget('statistics_seen', 'messages', async (err, data) => {
      let seen = JSON.parse(data) || [];
      seen.push(body.id);
      await pool.hset('statistics_seen', 'messages', JSON.stringify(seen), () => {
        console.error(`I added message '${body.id}' to my seen messages.`);
      });
    });
  }
  if (targetEntity === 'user') entity = User;
  else if (targetEntity === 'question') entity = Question;
  else if (targetEntity === 'answer') entity = Answer;
  else if (targetEntity === 'keyword') entity = Keyword;
  else if (targetEntity === 'question-keywords') {
    if (action!=='patch') return 'OK';
    console.log('* I am interested in it.');
    console.log(entryId);
    const question = await manager.findOne(Question, { id: entryId });
    if (!question) throw new NotFoundException(`Question '${entryId}' not found.`);
    console.log(object);
    question.keywords = object;
    const res = await manager.save(question);
    console.log(`Keywords of question '${entryId}' were updated.`);
    return 'OK';
  }
  else return 'OK';
  console.log('* I am interested in it.');
  if (action === 'post') {
    const target = await manager.create(entity, object);
    const res = await manager.save(target);
    console.log(`* New ${targetEntity} with id '${res['id']}' is saved.`);
  }
  else if (action === 'delete') {
    const target = await manager.findOne(entity, { id: entryId });
    if (!target) {
      console.log(`* I did not find ${targetEntity} with id '${entryId}', never mind it was going to be deleted anyway.`);
      return 'OK';
    }
    const res = await manager.delete(entity, { id: entryId });
    console.log(`* ${targetEntity} with id '${entryId}' was deleted successfully.`);
  }
  else if (action==='patch') {
    const target = await manager.findOne(entity, { id: entryId });
    if (!target) throw new NotFoundException(`${targetEntity} '${entryId}' not found.`);
    const newObject = await manager.merge(entity, target, object);
    const res = await manager.save(newObject);
    console.log(`* ${targetEntity} with id '${res['id']}' updated successfully.`);
  }
  return 'OK';
}