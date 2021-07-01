import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionUpvoteDto } from './dto/create-question-upvote.dto';
import { verify } from '../../general-methods/methods';
import { createQuestionUpvote, getOneQuestionUpvote, deleteQuestionUpvote } from 'async_calls/async_calls';

@Injectable()
export class QuestionUpvoteService {
  constructor() {}

  async create(req, createQuestionUpvoteDto: CreateQuestionUpvoteDto): Promise<any> {
      const user_id = await verify(req);
      createQuestionUpvoteDto['owner'] = {
        id: user_id,
      };
      return createQuestionUpvote(createQuestionUpvoteDto)
             .then(response => { return response.data })
             .catch(err => { throw new BadRequestException(err.response.data.message)});
  }

  async remove(req, id: number) {
    const user_id = await verify(req);
    const params = {
      id,
      owner: true,
      question: true,
      questionOwner: true,
    }
    const upvote = await getOneQuestionUpvote(params);
    if (!upvote.data) {
      throw new NotFoundException(`Upvote '${id}' not found.`);
    }
    if (user_id !== upvote.data.owner.id) {
      throw new BadRequestException(`You cannot delete another user's upvote.`);
    }
    return deleteQuestionUpvote(id)
            .then(response => { return response.data })
            .catch(err => { throw new BadRequestException(err.response.data.message)});
  }

}
