import { QuestionComment } from "../../enterprise/entities/question-comment"
import { QuestionCommentsRepository } from "../repositories/question-comments-repository"

interface ListQuestionCommentsRequest {
  questionId: string
  page: number
}

interface ListQuestionCommentsResponse {
  questionComments: QuestionComment[]
}

export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page
  }: ListQuestionCommentsRequest): Promise<ListQuestionCommentsResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestion(
      questionId,
      { page }
    )

    return { questionComments }
  }
}