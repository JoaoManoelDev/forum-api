import { InMemoryQuestionsCommentsRepository } from "@/test/repositories/in-memory-questions-comments-repository"
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { MakeQuestion } from "@/test/factories/make-question"

let questionsCommentsRepository: InMemoryQuestionsCommentsRepository
let questionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe("Comment On Question Use Case", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    questionsCommentsRepository = new InMemoryQuestionsCommentsRepository()
    sut = new CommentOnQuestionUseCase(questionsRepository, questionsCommentsRepository)
  })

  it("Should be able create a comment on question", async () => {
    const question = MakeQuestion()

    questionsRepository.create(question)

    await sut.execute({
      authorId: "author-01",
      questionId: question.id.toString(),
      content: "new question comment",
    })

    expect(questionsCommentsRepository.questionsComments).toHaveLength(1)
    expect(questionsCommentsRepository.questionsComments[0].content).toEqual("new question comment")
  })
})
