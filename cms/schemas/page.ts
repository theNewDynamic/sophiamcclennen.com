import {defineField, defineType} from 'sanity'
import SlugField from "./fields/slug"

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    SlugField,
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
