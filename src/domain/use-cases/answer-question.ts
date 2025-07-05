import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Answer } from "@/domain/entities/answer"
import { AnswersRepository } from "@/domain/repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
