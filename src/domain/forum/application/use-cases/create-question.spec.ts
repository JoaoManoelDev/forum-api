import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { CreateQuestionUseCase } from "./create-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  
  it('should be able create a question', async () => {

    const result = await sut.execute({
      authorId: '1',
      title: 'New Question',
      content: 'New Question Content'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.questions[0]).toEqual(result.value?.question)
  })
})