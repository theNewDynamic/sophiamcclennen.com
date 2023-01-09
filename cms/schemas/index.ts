import news from './news'
import book from './book'
import review from './review'
import slug from './fields/slug'
import siteSettings from './siteSettings'
import blockContent from './blockContent'

export const schemaTypes = [
  news,
  book,
  review,
  siteSettings,
  //Fields
  slug,
  blockContent
]