import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { MakeQuestion } from "@/test/factories/make-question"
import { MakeAnswer } from "@/test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ChooseQuestionBestAnswer } from "./choose-question-best-answer"
import { NotAllowedError } from "./errors/not-allowed-error"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswer

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswer(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('Should be able to choose the question best answer', async () => {
    const newQuestion = MakeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = MakeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString()
    })

    expect(inMemoryQuestionsRepository.questions[0].bestAnswerId).toEqual(newAnswer.id)
  })

  it("Should not be able to choose another user question best answer", async () => {
    const newQuestion = MakeQuestion({
      authorId: new UniqueEntityID('author-01')
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const newAnswer = MakeAnswer({
      questionId: newQuestion.id
    })

    await inMemoryAnswersRepository.create(newAnswer)
    
    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-02'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
