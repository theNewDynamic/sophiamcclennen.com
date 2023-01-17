import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Reviews',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // hidden: true,
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'related_book',
      title: 'Related Book',
      type: 'reference',
      to: [
        {type: 'book'},
      ]
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
    },
    {
      name: 'attribution',
      title: 'Attribution',
      type: 'markdown',
    },
    {
      name: 'short_quote',
      title: 'Short Quote',
      type: 'markdown',
    },
  ],

  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'image',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
