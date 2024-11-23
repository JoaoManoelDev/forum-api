import {
  AnswersCommentsRepository
} from "@/domain/forum/application/repositories/answers-comments-repository"
import { AnswerComment } from "../../enterprise/entities/answer-comment"

interface ListAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface ListAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    answerId,
    page
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return { answerComments }
  }
}
