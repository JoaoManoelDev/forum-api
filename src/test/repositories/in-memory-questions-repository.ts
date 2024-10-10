import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"
import { Question } from "@/domain/forum/enterprise/entities/question"

export class InMemoryQuestionsRepository implements QuestionsRepository {

  public questions: Question[] = []

  async create(question: Question): Promise<void> {
    this.questions.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(question => question.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findById(questionId: string): Promise<Question | null> {
    const question = this.questions.find((question) => question.id.toString() === questionId)

    if (!question) {
      return null
    }

    return question
  }

  async delete(questionDelete: Question): Promise<void> {
    const questionIndex = this.questions.findIndex((question) => question.id === questionDelete.id)

    this.questions.splice(questionIndex, 1)
  }
}
