import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(questionCommentId: string): Promise<QuestionComment | null>
  findManyByQuestion(questionId: string, params: PaginationParams): Promise<QuestionComment[]>
  delete(questionComment: QuestionComment): Promise<void>
}