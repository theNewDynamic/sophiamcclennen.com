import news from './news'
import post from './post'
import book from './book'
import page from './page'
import review from './review'
import BockQuotes from './blocks/quotes'
import siteSettings from './siteSettings'
import blockContent from './blockContent'

export const schemaTypes = [
  page,
  news,
  post,
  book,
  review,
  siteSettings,
  
  //Blocks
  BockQuotes,

  //Fields
  
  blockContent,
  
]