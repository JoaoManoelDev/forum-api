import { InMemoryQuestionsComments } from "@/test/repositories/in-memory-questions-comments-repository"
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { MakeQuestion } from "@/test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"


let questionsCommentsRepository: InMemoryQuestionsComments
let questionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe("Comment On Question Use Case", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    questionsCommentsRepository = new InMemoryQuestionsComments()
    sut = new CommentOnQuestionUseCase(questionsRepository, questionsCommentsRepository)
  })

  it("Should be able create a comment on question", async () => {
    const question = MakeQuestion()

    questionsRepository.create(question)

    await sut.execute({
      authorId: "author-01",
      questionId: question.id.toString(),
      content: "new comment question",
    })

    expect(questionsCommentsRepository.questionsComments).toHaveLength(1)
    expect(questionsCommentsRepository.questionsComments[0].content).toEqual("new comment question")
  })
})
