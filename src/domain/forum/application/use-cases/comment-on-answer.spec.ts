import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository"
import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { InMemoryAnswersCommentsRepository } from "@/test/repositories/in-memory-answers-comments-repository"
import { MakeAnswer } from "@/test/factories/make-answer"

let answersRepository: InMemoryAnswersRepository
let answersCommentsRepository: InMemoryAnswersCommentsRepository
let sut: CommentOnAnswerUseCase

describe("Comment On Answer Use Case", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository(),
    answersCommentsRepository = new InMemoryAnswersCommentsRepository(),
    sut = new CommentOnAnswerUseCase(answersRepository, answersCommentsRepository)
  })

  it("Should be able create a comment on answer", async () => {
    const answer = MakeAnswer()

    answersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: "author-01",
      content: "new answer comment"
    })

    expect(answersCommentsRepository.answersComments).toHaveLength(1)
    expect(answersCommentsRepository.answersComments[0].content).toEqual("new answer comment")
  })
})