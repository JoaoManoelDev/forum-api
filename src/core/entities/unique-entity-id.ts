import { randomUUID } from "node:crypto"

export class UniqueEntityID {
  public value: string

  toValue() {
    return this.value
  }

  toString() {
    return String(this.value)
  }

  constructor(id?: string) {
    this.value = id ?? randomUUID()
  }
}
