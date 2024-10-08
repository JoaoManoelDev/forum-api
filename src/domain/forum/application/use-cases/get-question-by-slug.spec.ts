import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Question } from "../../enterprise/entities/question"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { GetQuestionBySlug } from "./get-question-by-slug"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlug

describe("Get Question By Slug Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository)
  })

  it("Should be able a find by slug question", async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: "New Question",
      content: "New Question Content",
      slug: Slug.create("new-question-content"),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const questionBySlug = await sut.execute({ slug: "new-question-content" })

    expect(questionBySlug.question?.title).toEqual(newQuestion.title)
    expect(questionBySlug.question?.slug.value).toEqual(newQuestion.slug.value)
  })
})
