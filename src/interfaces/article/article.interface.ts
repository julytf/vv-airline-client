export interface IArticle {
  _id?: string
  title: string
  summary?: string
  coverImage?: string
  content: string
  isFeatured?: boolean
}

export default IArticle
