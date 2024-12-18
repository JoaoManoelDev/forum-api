import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { QuestionCommentsRepository } from "../repositories/question-comments-repository"
import { QuestionsRepository } from "../repositories/questions-repository"

interface CommentOnQuestionUseCaseRequest {
  questionId: string
  authorId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute({
    questionId,
    authorId,
    content
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error("Question not found")
    } 

    const questionComment = QuestionComment.create({
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(authorId),
      content: content
    })

    this.questionCommentsRepository.create(questionComment)

    return { questionComment }
  }
}