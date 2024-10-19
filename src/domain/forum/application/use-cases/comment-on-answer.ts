import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository"
import { AnswersRepository } from "../repositories/answers-repository"

interface CommentOnAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

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
      throw new Error("Answer not found.")
    }

    const answerComment = AnswerComment.create({
      answerId: new UniqueEntityID(answerId),
      authorId: new UniqueEntityID(authorId),
      content
    })

    await this.commentsAnswersRepository.create(answerComment)

    return { answerComment }
  }
}