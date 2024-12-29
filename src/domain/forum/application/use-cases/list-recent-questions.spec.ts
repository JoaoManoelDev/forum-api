import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { ListRecentQuestionsUseCase } from "./list-recent-questions"
import { MakeQuestion } from "@/test/factories/make-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ListRecentQuestionsUseCase

describe('List Recent Questions', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ListRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })
  
  it('Should be able to list recent questions', async () => {
    await inMemoryQuestionsRepository.create(MakeQuestion({ createdAt: new Date(2022, 0, 10) }))
    await inMemoryQuestionsRepository.create(MakeQuestion({ createdAt: new Date(2022, 0, 1) }))
    await inMemoryQuestionsRepository.create(MakeQuestion({ createdAt: new Date(2022, 0, 30) }))

    const result = await sut.execute({
      page: 1
    })
  
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 30) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 10) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 1) })
    ])
  })

    
  it('Should be able to list paginated recent questions', async () => {
    for(let i = 1; i <= 25; i++) {
      await inMemoryQuestionsRepository.create(MakeQuestion())
    }

    const result = await sut.execute({
      page: 2
    })
  
    expect(result.value?.questions).toHaveLength(5)
  })
})
