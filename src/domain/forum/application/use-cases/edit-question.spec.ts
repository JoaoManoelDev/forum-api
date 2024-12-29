import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { MakeQuestion } from "@/test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { EditQuestionUseCase } from "./edit-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able edit a question', async () => {
    const newQuestion = MakeQuestion({
      authorId: new UniqueEntityID('author-01')
    }, new UniqueEntityID('question-01'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-01',
      title: 'Edit title',
      content: 'Edit content',
    })

    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: 'Edit title',
      content: 'Edit content',
    })
  })

  it('Should not be able edit a question from another user', async() => {
    const newQuestion = MakeQuestion({
      authorId: new UniqueEntityID('author-01')
    }, new UniqueEntityID('question-04'))

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-02',
      title: 'Edit title',
      content: 'Edit content',
    })

    expect(result.isLeft()).toBe(true)
  })
})