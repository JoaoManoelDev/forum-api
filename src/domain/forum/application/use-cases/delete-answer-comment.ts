import { Either, left, right } from "@/core/either";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface AnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type AnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class AnswerCommentUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId
  }: AnswerCommentUseCaseRequest): Promise<AnswerCommentUseCaseResponse> {
    const answerComment = await this.answersCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answersCommentsRepository.delete(answerComment)

    return right({})
  }
}
