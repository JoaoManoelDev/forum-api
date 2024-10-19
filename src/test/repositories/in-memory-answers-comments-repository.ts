import {AnswersCommentsRepository } from "@/domain/forum/application/repositories/answers-comments-repository"
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"

export class InMemoryAnswersCommentsRepository implements AnswersCommentsRepository {
  public answersComments: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.answersComments.push(answerComment)
  }
}
