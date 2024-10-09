import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { CreateQuestionUseCase } from "./create-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  
  it('should be able create an question', async () => {

    const { question } = await sut.execute({
      authorId: '1',
      title: 'New Question',
      content: 'New Question Content'
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.questions[0].id).toEqual(question.id)
  })
})