import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { MakeQuestionComment } from "@/test/factories/make-question-comment"
import { ListQuestionCommentsUseCase } from "./list-question-comments"

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: ListQuestionCommentsUseCase

describe('List Question Comments Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able list a question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      MakeQuestionComment({ questionId: new UniqueEntityID('question-01') })
    )
    await inMemoryQuestionCommentsRepository.create(MakeQuestionComment())
    await inMemoryQuestionCommentsRepository.create(MakeQuestionComment())

    const { questionComments } = await sut.execute({
      questionId: 'question-01',
      page: 1
    })

    expect(questionComments).toHaveLength(1)
  })

  it('should be able list paginated a question comments', async () => {
    for(let i = 1; i <= 25; i++) {
      await inMemoryQuestionCommentsRepository.create(
        MakeQuestionComment({ questionId: new UniqueEntityID('question-01') })
      )
    }

    const { questionComments } = await sut.execute({ questionId: 'question-01', page: 2})

    expect(questionComments).toHaveLength(5)
  })
})
