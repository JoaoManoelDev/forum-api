import { MakeAnswer } from "@/test/factories/make-answer"
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { EditAnswerUseCase } from "./edit-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { NotAllowedError } from "./errors/not-allowed-error"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it("Should be able edit a answer", async () => {
    const newAnswer = MakeAnswer({
      authorId: new UniqueEntityID('author-01')
    }, new UniqueEntityID('answer-01'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-01',
      content: 'Content Edit'
    })

    expect(inMemoryAnswersRepository.answers[0]).toMatchObject({
      content: 'Content Edit'
    })
  })

  it("Should not be able edit a answer from another user", async () => {
    const newAnswer = MakeAnswer({
      authorId: new UniqueEntityID('author-01')
    })

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-02',
      answerId: newAnswer.id.toString(),
      content: 'Content Edit'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})