import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswersCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(answerCommentId: string): Promise<AnswerComment | null>
  findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
  delete(answerComment: AnswerComment): Promise<void>
}