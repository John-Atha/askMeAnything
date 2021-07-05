import { Injectable } from '@nestjs/common';
import { ChoreoObjectDto } from './choreoObject.dto';
import { TotalConnections } from './main';

@Injectable()
export class AppService {

  constructor() {
    console.log(`Auth service created, I am checking last messages.`);
    this.myAddress = 'https://askmeanything-micro-auth.herokuapp.com';
    this.pool = require('redis-connection-pool')('myRedisPool', {
      url: process.env.REDIS_URL,
      max_clients: TotalConnections,
      perform_checks: false,
      database: 0,
    });
    this.lastMessagesCheck();
  }
  
  myAddress: string;
  
  pool: any;
  
  getHello(): string {
    return 'Hello World!';
  }

  async choreoHandle(body: ChoreoObjectDto, fresh: boolean): Promise<any> {
    console.log('--->>Choreographer passed me the:');
    console.log(body);
    if (fresh) {
      await this.pool.hget('auth_seen', 'messages', async (err, data) => {
        let seen = JSON.parse(data) || [];
        seen.push(body.id);
        await this.pool.hset('auth_seen', 'messages', JSON.stringify(seen), () => {
          console.log(`I added message '${body.id}' to my seen messages.`);
        })
      })
    }
    return 'OK';
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
      await this.pool.hget('auth_seen', 'messages', async (err, data) => {

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
        this.pool.hset('auth_seen', 'messages', JSON.stringify(seenArray.concat(newIDs)), async (err, data) => {
          console.log('I updated the seen messages');
        })
        for (let newMessage of newMessages) {
          if (newMessage.src===this.myAddress) continue;
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
