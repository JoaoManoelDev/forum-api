import { InMemoryAnswersCommentsRepository } from "@/test/repositories/in-memory-answers-comments-repository"
import { makeAnswerComment } from "@/test/factories/make-answer-comment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { AnswerCommentUseCase } from "./delete-answer-comment"

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
    }, new UniqueEntityID('answer-comment-01'))

    await inMemoryAnswersCommentsRepository.create(answerComment)

    expect(async () => {
      return await sut.execute({
        answerCommentId: 'answer-comment-02',
        authorId: 'author-01'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})