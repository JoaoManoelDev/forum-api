import { InMemoryAnswersCommentsRepository } from "@/test/repositories/in-memory-answers-comments-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { makeAnswerComment } from "@/test/factories/make-answer-comment"
import { ListAnswerCommentsUseCase } from "./list-answer-comments"

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository
let sut: ListAnswerCommentsUseCase

describe('List Answer Comments Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new ListAnswerCommentsUseCase(inMemoryAnswersCommentsRepository)
  })

  it('should be able list a answer comments', async () => {
    await inMemoryAnswersCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('answer-01') })
    )
    await inMemoryAnswersCommentsRepository.create(makeAnswerComment())
    await inMemoryAnswersCommentsRepository.create(makeAnswerComment())

    const { answerComments } = await sut.execute({
      answerId: 'answer-01',
      page: 1
    })

    expect(answerComments).toHaveLength(1)
  })

  it('should be able list paginated a answer comments', async () => {
    for(let i = 1; i <= 25; i++) {
      await inMemoryAnswersCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityID('answer-01') })
      )
    }

    const { answerComments } = await sut.execute({ answerId: 'answer-01', page: 2})

    expect(answerComments).toHaveLength(5)
  })
})
