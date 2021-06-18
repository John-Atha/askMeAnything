import { Injectable } from '@nestjs/common';
import { ChoreoObjectDto } from './choreoObject.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async choreoHandle(body: ChoreoObjectDto): Promise<any> {
    const { action, object, id, src, entryId, targetEntity, timestamp } = body;
    console.log('--->>Choreographer passed me the:');
    console.log(body);
    return 'OK';
  }
}
