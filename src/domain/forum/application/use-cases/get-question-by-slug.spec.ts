import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository"
import { MakeQuestion } from "@/test/factories/make-question"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug"
import { Slug } from "../../enterprise/entities/value-objects/slug"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe("Get Question By Slug Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it("Should be able a find by slug question", async () => {
    const newQuestion = MakeQuestion({
      slug: Slug.create('new-question-content')
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const questionBySlug = await sut.execute({ slug: "new-question-content" })

    expect(questionBySlug.question?.title).toEqual(newQuestion.title)
    expect(questionBySlug.question?.slug.value).toEqual(newQuestion.slug.value)
  })
})
