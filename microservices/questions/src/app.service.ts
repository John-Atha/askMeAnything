import { Injectable, NotFoundException } from '@nestjs/common';
import { ChoreoObjectDto } from './choreoObject.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user/entities/user.entity';

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
    if (targetEntity !== 'user') return 'OK';
    console.log('* I am interested in it.');
    if (action === 'post') {
      const newUser = await this.manager.create(User, object);
      const res = await this.manager.save(newUser);
      console.log(`* New user with id: ${res.id} is saved.`);
    }
    else if (action === 'delete') {
      const user = await this.manager.findOne(User, { id: entryId });
      if (!user) {
        console.log(`* I did not find user with id: ${entryId}, never mind it was going to be deleted anyway.`);
        return 'OK';
      }
      const res = await this.manager.delete(User, { id: entryId });
      console.log(`* User with id: ${entryId} was deleted successfully.`);
    }
    return 'OK';
  }
}
