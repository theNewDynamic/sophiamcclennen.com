import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'What I am watching',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'link_to_original',
      title: 'Link To Original',
      type: 'url',
    },
    {
      name: 'publication',
      title: 'Publication',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: '',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      hidden: true,
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
    },
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishDateDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Published Date, Old',
      name: 'publishDateAsc',
      by: [
        {field: 'publishedAt', direction: 'asc'}
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'image',
    },
    prepare(selection) {
      const {date} = selection
      return {...selection, subtitle: date && `on ${date}`}
    },
  },
})
