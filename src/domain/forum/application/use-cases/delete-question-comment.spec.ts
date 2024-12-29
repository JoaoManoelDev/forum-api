import {InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository"
import { MakeQuestionComment } from "@/test/factories/make-question-comment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { DeleteQuestionCommentUseCase } from "./delete-question-comment"
import { NotAllowedError } from "./errors/not-allowed-error"

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = MakeQuestionComment({
      authorId: new UniqueEntityID('author-01'),
    }, new UniqueEntityID('question-01'))

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      authorId: 'author-01',
      questionCommentId: 'question-01'
    })

    expect(inMemoryQuestionCommentsRepository.questionsComments).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const questionComment = MakeQuestionComment({
      authorId: new UniqueEntityID('author-01'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    const result = await sut.execute({
      authorId: 'author-02',
      questionCommentId: questionComment.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
