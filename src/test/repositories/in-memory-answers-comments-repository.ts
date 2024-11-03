import {AnswersCommentsRepository } from "@/domain/forum/application/repositories/answers-comments-repository"
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"

export class InMemoryAnswersCommentsRepository implements AnswersCommentsRepository {
  public answersComments: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.answersComments.push(answerComment)
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
