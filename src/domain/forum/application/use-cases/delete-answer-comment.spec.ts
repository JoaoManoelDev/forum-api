import { InMemoryAnswersCommentsRepository } from "@/test/repositories/in-memory-answers-comments-repository"
import { makeAnswerComment } from "@/test/factories/make-answer-comment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { AnswerCommentUseCase } from "./delete-answer-comment"
import { NotAllowedError } from "./errors/not-allowed-error"

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository
let sut: AnswerCommentUseCase

describe('Delete Answer Comment Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new AnswerCommentUseCase(inMemoryAnswersCommentsRepository)
  })

  it('should be able delete a answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-01')
    }, new UniqueEntityID('answer-comment-01'))

    await inMemoryAnswersCommentsRepository.create(answerComment)

    await sut.execute({ answerCommentId: 'answer-comment-01', authorId: 'author-01' })

    expect(inMemoryAnswersCommentsRepository.answersComments).toHaveLength(0)
  })

  it('should not be able delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-01')
    })

    await inMemoryAnswersCommentsRepository.create(answerComment)

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-02'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})