import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository"
import { AnswersRepository } from "../repositories/answers-repository"
import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface CommentOnAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private commentsAnswersRepository: AnswersCommentsRepository
  ) {}

  async execute({
    answerId,
    authorId,
    content
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      answerId: new UniqueEntityID(answerId),
      authorId: new UniqueEntityID(authorId),
      content
    })

    await this.commentsAnswersRepository.create(answerComment)

    return right({
      answerComment
    })
  }
}