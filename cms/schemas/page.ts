import {defineField, defineType} from 'sanity'
import SlugField from "./fields/slug"
import image from './fields/image'

export default defineType({
  name: 'page',
  title: 'Other Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    SlugField,
    image,
    {
      name: 'side_blocks',
      title: "Sidebar",
      type: "array",
      of: [
        {type: 'blocks/quotes'}
      ]
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
    },
  },
})
