import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe("Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  
  it("should be able create a answer", async () => {
    const result = await sut.execute({
      questionId: "1",
      instructorId: "1",
      content: "New Answer"
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.answers[0]).toEqual(result.value?.answer)
  })
})
