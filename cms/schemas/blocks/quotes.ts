import {defineField} from 'sanity'
import url from '../fields/url'
export default defineField({
  name: "blocks/quotes",
  type: "object",
  title: "Quotes",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "quotes",
      type: "array",
      of: [
        {
          type: "markdown",
        }
      ]
    }
  ],
  preview: {
    select: {
      quotes: 'quotes'
    },
    prepare({ quotes }) {
      const subtitle = quotes?.length ? `${quotes.length} quotes` : 'No quotes yet'
      return {
        title: 'Quotes',
        subtitle
      }
    }
  }
})