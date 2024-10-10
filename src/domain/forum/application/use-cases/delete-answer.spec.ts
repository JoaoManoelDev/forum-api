import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { MakeAnswer } from "@/test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { DeleteAnswerUseCase } from "./delete-answer"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Should be able delete a answer', async () => {
    const newAnswer = MakeAnswer({
      authorId: new UniqueEntityID('author-01')
    }, new UniqueEntityID('answer-01'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({ answerId: 'answer-01', authorId: 'author-01' })

    expect(inMemoryAnswersRepository.answers).toHaveLength(0)
  })

  it('Should not be able delete a answer from another user', async () => {
    const newAnswer = MakeAnswer({
      authorId: new UniqueEntityID('author-01')
    }, new UniqueEntityID('answer-01'))

    await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({ answerId: 'answer-01', authorId: 'author-02' })
    }).rejects.toBeInstanceOf(Error)
  })
})