import news from './news'
import post from './post'
import book from './book'
import page from './page'
import review from './review'
import slug from './fields/slug'
import siteSettings from './siteSettings'
import blockContent from './blockContent'

export const schemaTypes = [
  page,
  news,
  post,
  book,
  review,
  siteSettings,
  //Fields
  slug,
  blockContent
]