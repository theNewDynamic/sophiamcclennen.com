import {defineField, defineType} from 'sanity'
import SlugField from "./fields/slug"
import url from './fields/url'
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
      name: "cta",
      title: "CTA",
      type: "object",
      fields: [
        url,
        {
          type: "string",
          name: "copy"
        }
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
