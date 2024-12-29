import {
  AnswersCommentsRepository
} from "@/domain/forum/application/repositories/answers-comments-repository"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { Either, right } from "@/core/either"

interface ListAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type ListAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    answerId,
    page
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return right({
      answerComments
    })
  }
}
