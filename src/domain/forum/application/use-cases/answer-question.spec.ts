import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question"
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository"

const fakeAnswersRepository: AnswersRepository = {
  async create() {
    return
  }
}

describe("Answer Use Case", () => {
  it("should be able create an answer", async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const { answer } = await answerQuestion.execute({
      questionId: "1",
      instructorId: "1",
      content: "New Answer"
    })

    expect(answer.content).toEqual("New Answer")
  })
})
