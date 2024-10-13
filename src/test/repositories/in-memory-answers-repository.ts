import { PaginationParams } from "@/core/repositories/pagination-params"
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository"
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.answers.find(answer => answer.id.toString() === answerId)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
    const answers = this.answers
      .filter(answer => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  } 

  async save(answerEdit: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex((answer) => answer.id === answerEdit.id)

    this.answers[answerIndex] = answerEdit
  }

  async delete(answerDelete: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(answer => answer.id === answerDelete.id)

    this.answers.splice(answerIndex, 1)
  }
}
