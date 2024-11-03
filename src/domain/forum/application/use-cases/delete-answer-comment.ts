import { AnswersCommentsRepository } from "../repositories/answers-comments-repository";

interface AnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface AnswerCommentUseCaseResponse {}

export class AnswerCommentUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId
  }: AnswerCommentUseCaseRequest): Promise<AnswerCommentUseCaseResponse> {
    const answerComment = await this.answersCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error("Answer comment not found.")
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed")
    }

    await this.answersCommentsRepository.delete(answerComment)

    return {}
  }
}
