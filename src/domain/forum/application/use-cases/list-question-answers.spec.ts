import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { MakeAnswer } from "@/test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ListQuestionAnswersUseCase } from "./list-question-answers"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ListQuestionAnswersUseCase

describe('List Question Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ListQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('Should be able a list question answers', async () => {
    await inMemoryAnswersRepository.create(MakeAnswer({
      questionId: new UniqueEntityID('question-01')
    }))
    await inMemoryAnswersRepository.create(MakeAnswer({
      questionId: new UniqueEntityID('question-01')
    }))
    await inMemoryAnswersRepository.create(MakeAnswer({
      questionId: new UniqueEntityID('question-02')
    }))

    const result = await sut.execute({ questionId: 'question-01', page: 1 })

    expect(result.value?.answers).toHaveLength(2)
  })

  it('Should be able a list paginated question answers', async () => {
    for(let i = 1; i <= 25; i++) {
      await inMemoryAnswersRepository.create(MakeAnswer({
        questionId: new UniqueEntityID('question-01')
      }))
    }

    const result = await sut.execute({ questionId: 'question-01', page: 2 })

    expect(result.value?.answers).toHaveLength(5)
  })
})
