import { defineType} from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  icon: BookIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'tnd-slug',
    },
    {
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'editions',
      title: 'Editions',
      type: 'array',
      of: [
        {
          type: "object",
          name: "inline",
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'datetime',
            },
            { type: "string", name: "publisher" },
            { type: "number", name: "isbn"},
            { type: "image", name: "cover_image"},
          ]
        }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
    },
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      image: 'editions.0.cover_image.asset'
    },
    prepare({ title, date, image }) {
      return {
        title,
        subtite: date,
        media: image
      }
    },
  },
})
