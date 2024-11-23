import { Either, left, right } from "@/core/either";
import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";

interface AnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type AnswerCommentUseCaseResponse = Either<string, {}>

export class AnswerCommentUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId
  }: AnswerCommentUseCaseRequest): Promise<AnswerCommentUseCaseResponse> {
    const answerComment = await this.answersCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left("Answer comment not found.")
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left("Not allowed")
    }

    await this.answersCommentsRepository.delete(answerComment)

    return right({})
  }
}
