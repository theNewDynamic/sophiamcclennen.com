import { defineType } from 'sanity'

export default defineType({
  name: 'tnd-slug',
  title: 'Slug',
  type: 'slug',
  description: "A slug is mandatory as it will help generate a URL for the entry. You can use the 'Generate' button to create a slug form the Title.",
  options: {
    source: 'title',
    maxLength: 96,
  },
  validation: Rule => Rule.required()
})