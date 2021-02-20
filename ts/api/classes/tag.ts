export default class Tag {
  id: number | string // number!
  booru: string
  name: string
  count: number | string //number !

  constructor(params: Tag) {
    this.id = params.id
    this.booru = params.booru
    this.name = params.name
    this.count = params.count
  }

}
