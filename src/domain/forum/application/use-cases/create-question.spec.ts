import { QuestionRepository } from "../repositories/question-repository"
import { CreateQuestionUseCase } from "./create-question"

const fakeQuestionRepository: QuestionRepository = {
  async create() {
    return
  }
}

describe('Question Use Case', () => {
  it('should be able an create question', async () => {
    const createQuestionUseCase = new CreateQuestionUseCase(fakeQuestionRepository)

    const { question } = await createQuestionUseCase.execute({
      authorId: '1',
      title: 'New Question',
      content: 'New Question Content'
    })

    expect(question.id).toBeTruthy()
  })
})