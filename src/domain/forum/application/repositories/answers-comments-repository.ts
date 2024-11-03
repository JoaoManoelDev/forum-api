import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswersCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(answerCommentId: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
}