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
          name: 'binding',
          title: 'Binding',
          type: 'string',
          options: {
            list: [
              { title: "Hardcover", value: "hardcover" },
              { title: "Paperback", value: "paperback" },
              { title: "Audio", value: "audio" },
              { title: "EBook", value: "ebook" },
            ]
          }
        },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'date', title: 'Date', type: 'datetime'},
        { type: "string", name: "publisher" },
        { type: "string", name: "isbn"},
        { type: "image", name: "cover_image"},
      ]
    }
  ],
  // Still is not working but leaving it here until resolved...
  options: {
    preview: {
      select: {
        title: 'binding',
        image: 'image.asset'
      }
    }
  }

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
