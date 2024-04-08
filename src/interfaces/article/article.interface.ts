export interface IArticle {
  _id?: string
  title: string
  summary?: string
  coverImage?: string
  content: string
  isFeatured?: boolean
  createdAt?: Date
}

export default IArticle
