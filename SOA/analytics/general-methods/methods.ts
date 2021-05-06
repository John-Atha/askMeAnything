import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { Question } from '../src/question/entities/question.entity';
import { Answer } from '../src/answer/entities/answer.entity';
const jwt = require('jsonwebtoken');

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

export const paginate = (res, params) => {
  validateParams(params);
  if (!res.length) {
    return res;
  }
  if (params.start > res.length) {
    return [];
  }
  const start = parseInt(params.start) - 1 || 0;
  const end =
    parseInt(params.end) || (parseInt(params.end) === 0 ? 0 : res.length);
  console.log(`start: ${start}`);
  console.log(`end: ${end}`);
  if (start >= end || start <= -1 || end === 0) {
    throw new BadRequestException('Invalid parameters');
  }
  return res.slice(start, end);
};

export const verify = (req) => {
  const headers = req['rawHeaders'];
  let token = '';
  headers.forEach((header) => {
    if (header.startsWith('Bearer')) {
      token = header.slice(7);
    }
  });
  let decoded = {};
  try {
    decoded = jwt.verify(token, jwtConstants.secret);
  } catch (error) {
    console.log(error);
    throw new UnauthorizedException();
  }
  return decoded['sub'];
};

export async function withCountQuestionsUpvotes(
  questions: Question[],
  manager,
) {
  for (let i = 0; i < questions.length; i++) {
    const count = await manager.query(
      `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${questions[i].id}`,
    );
    questions[i]['upvotesCount'] = await parseInt(count[0]['count']);
  }
  return questions;
}

export async function withCountAnswersUpvotes(
  answers: Answer[],
  manager,
): Promise<any> {
  for (let i = 0; i < answers.length; i++) {
    const count = await manager.query(
      `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`,
    );
    answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
  }
  return answers;
}

export async function withCountAnswersAndQuestionsUpvotes(
  answers: Answer[],
  manager,
): Promise<any> {
  for (let i = 0; i < answers.length; i++) {
    const count = await manager.query(
      `SELECT COUNT(*) FROM public."answer_upvote" WHERE public."answer_upvote"."answerId"=${answers[i].id}`,
    );
    answers[i]['upvotesCount'] = await parseInt(count[0]['count']);
    const question = answers[i].question;
    const count2 = await manager.query(
      `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${question.id}`,
    );
    question['upvotesCount'] = await parseInt(count2[0]['count']);
  }
  return answers;
}

export async function withCountQuestionsUpvotesAndReform(
  questions: any[],
  manager,
): Promise<any> {
  for (let i = 0; i < questions.length; i++) {
    const count = await manager.query(
      `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${questions[i].id}`,
    );
    questions[i]['owner'] = {
      id: questions[i].ownerid,
      email: questions[i].email,
      username: questions[i].username,
      points: questions[i].points,
    };
    questions[i]['upvotesCount'] = await parseInt(count[0]['count']);
    delete questions[i].ownerid;
    delete questions[i].email;
    delete questions[i].username;
    delete questions[i].points;
  }
  return questions;
}
