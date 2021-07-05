import { Injectable } from '@nestjs/common';
import { ChoreoObjectDto } from './choreoObject.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { handleChoreoMessage } from 'general_methods/methods';
import { REDIS_HOST, REDIS_PORT, TotalConnections } from './main';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private manager: EntityManager) {
    console.log(`Analytics service created, I am checking last messages.`);
    this.pool = require('redis-connection-pool')('myRedisPool', {
      host: REDIS_HOST,
      port: REDIS_PORT,
      max_clients: TotalConnections,
      perform_checks: false,
      database: 0,
    });
    this.lastMessagesCheck();
  }

  pool: any;

  getHello(): string {
    return 'Hello World!';
  }

  async choreoHandle(body: ChoreoObjectDto, fresh: boolean): Promise<any> {
    if (fresh) handleChoreoMessage(body, this.manager, this.pool, fresh);
    else return handleChoreoMessage(body, this.manager, this.pool, fresh);
  }

  async lastMessagesCheck(): Promise<any> {
    await this.pool.hget('choreographer', 'messages', async (err, data) => {
      // keep the last 100 messages
      const currMessages = JSON.parse(data) || [];
      const s = currMessages.length;
      let to_be_checked = [];
      if (s>100) to_be_checked = currMessages.slice(s-100, s);
      else to_be_checked = currMessages;

      // get the array with the already seen messages 
      await this.pool.hget('analytics_seen', 'messages', async (err, data) => {

        // keep a set with the already seen messages
        let seenSet = new Set();      
        let seenArray = JSON.parse(data) || [];
        for (let message of seenArray) seenSet.add(parseInt(message));

        const newMessages = [];
        const newIDs = [];
        // for each one of the not seen last 100 messages -> handle it
        let has_unseen = false;
        for (let message of to_be_checked) {
          if (!seenSet.has(parseInt(message.id))) {
            has_unseen = true;
            console.log(`I haven't handled message ${message.id}`);
            newIDs.push(message.id);
            newMessages.push(message);
          }
        }
        this.pool.hset('analytics_seen', 'messages', JSON.stringify(seenArray.concat(newIDs)), async (err, data) => {
          console.log('I updated the seen messages');
        })
        for (let newMessage of newMessages) {
          if (newMessage.src==='http://localhost:3012') continue;
          try {
            await this.choreoHandle(newMessage, false);
          }
          catch (error) {
            console.log(error);
          }
        }


        if (!has_unseen) {
          console.log('No unseen messages found.');
        }
      })
    })
  }
}
