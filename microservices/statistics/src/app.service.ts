import { Injectable } from '@nestjs/common';
import { ChoreoObjectDto } from './choreoObject.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { handleChoreoMessage } from 'general_methods/methods';
import { REDIS_HOST, REDIS_PORT, TotalConnections } from './main';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private manager: EntityManager) {
    console.log(`Statistics service created, I am checking last messages.`);
    this.lastMessagesCheck();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async choreoHandle(body: ChoreoObjectDto): Promise<any> {
    handleChoreoMessage(body, this.manager);
  }

  async lastMessagesCheck(): Promise<any> {
    const pool = require('redis-connection-pool')('myRedisPool', {
      host: REDIS_HOST,
      port: REDIS_PORT,
      max_clients: TotalConnections,
      perform_checks: false,
      database: 0,
    });

    pool.hget('choreographer', 'messages', async (err, data) => {
      // keep the last 100 messages
      const currMessages = JSON.parse(data) || [];
      const s = currMessages.length;
      let to_be_checked = [];
      if (s>100) to_be_checked = currMessages.slice(s-100, s);
      else to_be_checked = currMessages;

      // get the array with the already seen messages 
      pool.hget('stats_seen', 'messages', async (err, data) => {

        // keep a set with the already seen messages
        let seen = new Set();      
        let res = JSON.parse(data) || [];
        for (let message of res) seen.add(parseInt(message));

        // for each one of the not seen last 100 messages -> handle it
        let has_unseen = false;
        for (let message of to_be_checked) {
          if (!seen.has(parseInt(message.id))) {
            has_unseen = true;
            console.log(`I haven't handled message ${message.id}`);
            await this.choreoHandle(message);
            seen.add(parseInt(message.id));
          }
        }

        // if unseen message was handled -> update the array stored at redis 
        if (has_unseen) {
          pool.hset('stats_seen', 'messages', JSON.stringify(Array.from(seen)), () => {
            console.log('I updated my seen messages');
          })
        }
        else {
          console.log('No unseen messages found.');
        }
      })
    })
  }
}
