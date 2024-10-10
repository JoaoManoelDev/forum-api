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

  async delete(answerDelete: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(answer => answer.id === answerDelete.id)

    this.answers.splice(answerIndex, 1)
  }
}
