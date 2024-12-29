import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { MakeQuestion } from "@/test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { DeleteQuestionUseCase } from "./delete-question"
import { NotAllowedError } from "./errors/not-allowed-error"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able delete a question', async () => {
    const newQuestion = MakeQuestion({
      authorId: new UniqueEntityID('author-01')
    }, new UniqueEntityID('question-01'))
    
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({ questionId: 'question-01', authorId: 'author-01' })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
  })

  it('Should not be able delete a question from another user', async () => {
    const newQuestion = MakeQuestion({
      authorId: new UniqueEntityID('author-01')
    })
    
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-02',
      questionId: newQuestion.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
