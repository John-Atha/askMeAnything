import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { paginate, verify } from '../../general-methods/methods';
import { answerIsUpvoted, getAnswerUpvotes, getOneAnswer, getOneUser } from 'async_calls/async_calls';

@Injectable()
export class AnswerService {
  constructor() {}

  async findOneUpvotes(id: number, params): Promise<any> {
    const answer = await getAnswerUpvotes(id);
    if (!answer.data) {
      throw new NotFoundException(`Answer '${id}' not found.`);
    }
    return paginate(answer.data.upvotes, params);
  }

  async isUpvoted(id: number, req): Promise<any> {
    const user_id = await verify(req);
    const answer = await getOneAnswer({ id });
    if (!answer.data) {
      throw new NotFoundException(`Answer '${id}' not found.`);
    }
    const upvote = await answerIsUpvoted(user_id, id);
    if (!upvote.data.length) {
      return {
        upvoted: false,
      };
    }
    return {
      upvoted: true,
      id: upvote.data[0].id,
    };
  }

  async findOne(id: number): Promise<any> {
    const answer = await getOneAnswer({ id, owner: true });
    if (!answer.data) {
      throw new NotFoundException(`Answer ${id} not found.`);
    }
    return answer.data;
  }
}
