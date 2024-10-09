import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question"
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug"

export const MakeQuestion = (override: Partial<QuestionProps> = {}) => {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: "New Question",
    content: "New Question Content",
    slug: Slug.create("new-question-content"),
    ...override
  })

  return question
}