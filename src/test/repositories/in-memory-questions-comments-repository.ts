import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/questions-comments-repository"
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"

export class InMemoryQuestionsCommentsRepository implements QuestionsCommentsRepository {
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

  async delete(questionCommentDelete: QuestionComment): Promise<void> {
    const questionCommentIndex = this.questionsComments.findIndex(
      questionComment => questionComment.id === questionCommentDelete.id
    )
    
    this.questionsComments.splice(questionCommentIndex, 1)
  }
}
