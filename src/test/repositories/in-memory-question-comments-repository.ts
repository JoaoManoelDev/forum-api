import { PaginationParams } from "@/core/repositories/pagination-params"
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository"
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public questionsComments: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.questionsComments.push(questionComment)
  }

  async findById(questionCommentId: string): Promise<QuestionComment | null> {
    const questionComment = this.questionsComments.find(
      (questionsComment) => questionsComment.id.toString() === questionCommentId
    )

    if (!questionComment) return null
    
    return questionComment
  }

  async findManyByQuestion(
    questionId: string,
    { page }: PaginationParams
  ): Promise<QuestionComment[]> {
    const questionComments = this.questionsComments.filter(
      questionComment => questionComment.questionId.toString() === questionId
    ).slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async delete(questionCommentDelete: QuestionComment): Promise<void> {
    const questionCommentIndex = this.questionsComments.findIndex(
      questionComment => questionComment.id === questionCommentDelete.id
    )
    
    this.questionsComments.splice(questionCommentIndex, 1)
  }
}
