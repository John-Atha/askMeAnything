import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnswerUpvoteDto } from './dto/create-answer-upvote.dto';
import { verify } from '../../general-methods/methods';
import { createAnswerUpvote, deleteAnswerUpvote, getOneAnswerUpvote } from 'async_calls/async_calls';

@Injectable()
export class AnswerUpvoteService {
  constructor() {}

  async create(req, createAnswerUpvoteDto: CreateAnswerUpvoteDto): Promise<any> {
    const user_id = await verify(req);
    createAnswerUpvoteDto['owner'] = {
      id: user_id,
    };
    return createAnswerUpvote(createAnswerUpvoteDto)
           .then(response => { return response.data })
           .catch(err => { throw new BadRequestException(err.response.data.message)});
  }

  async remove(req, id: number) : Promise<any> {
    const user_id = await verify(req);
    const params = {
      id,
      owner: true,
      answer: true,
      answerOwner: true,
    }
    const upvote = await getOneAnswerUpvote(params);
    if (!upvote.data) {
      throw new NotFoundException(`Upvote '${id}' not found.`);
    }
    if (upvote.data.owner.id !== user_id) {
      throw new BadRequestException(
        `You cannot delete another user's upvote.`,
      );
    }
    return deleteAnswerUpvote(id)
           .then(response => { return response.data })
           .catch(err => { throw new BadRequestException(err.response.data.message)});
}

}
