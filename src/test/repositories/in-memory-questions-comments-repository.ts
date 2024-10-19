import { QuestionsCommentsRepository } from "@/domain/forum/application/repositories/questions-comments-repository"
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionsComments implements QuestionsCommentsRepository {
  public questionsComments: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.questionsComments.push(questionComment)
  }
}