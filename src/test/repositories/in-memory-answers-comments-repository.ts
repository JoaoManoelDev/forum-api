import { PaginationParams } from "@/core/repositories/pagination-params"
import {AnswersCommentsRepository } from "@/domain/forum/application/repositories/answers-comments-repository"
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"

export class InMemoryAnswersCommentsRepository implements AnswersCommentsRepository {
  public answersComments: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.answersComments.push(answerComment)
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ): Promise<AnswerComment[]> {
    const answerComments = this.answersComments.filter(
      answerComment => answerComment.answerId.toString() === answerId
    ).slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async findById(answerCommentId: string): Promise<AnswerComment | null> {
    const answerComment = this.answersComments.find(
      answerComment => answerComment.id.toString() === answerCommentId
    )

    if (!answerComment) {
      throw new Error("Answer comment not found.")
    }

    return answerComment
  }

  async delete(answerCommentDelete: AnswerComment): Promise<void> {
    const answerCommentIndex = this.answersComments.findIndex(
      answerComment => answerComment.id === answerCommentDelete.id
    )

    this.answersComments.splice(answerCommentIndex, 1)
  }
}
