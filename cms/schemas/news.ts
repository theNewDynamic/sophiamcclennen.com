import {defineField, defineType} from 'sanity'
import SlugField from "./fields/slug"

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    SlugField,
    {
      name: 'publication',
      title: 'Publication',
      type: 'string',
    },
    
    {
      name: 'link_to_original',
      title: 'Link To Original',
      type: 'url',
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
      description: "click the column icon on the right to see rendered text.",
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
      let {date} = selection
      //date = new Date(date).toLocaleDateString('en-US')
      return {...selection, subtitle: date && `on ${date}`}
    },
  },
})
