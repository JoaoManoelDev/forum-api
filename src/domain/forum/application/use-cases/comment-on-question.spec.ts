import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository"
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { MakeQuestion } from "@/test/factories/make-question"

let questionCommentsRepository: InMemoryQuestionCommentsRepository
let questionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe("Comment On Question Use Case", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(questionsRepository, questionCommentsRepository)
  })

  it("Should be able create a comment on question", async () => {
    const question = MakeQuestion()

    questionsRepository.create(question)

    await sut.execute({
      authorId: "author-01",
      questionId: question.id.toString(),
      content: "new question comment",
    })

    expect(questionCommentsRepository.questionsComments).toHaveLength(1)
    expect(questionCommentsRepository.questionsComments[0].content).toEqual("new question comment")
  })
})
