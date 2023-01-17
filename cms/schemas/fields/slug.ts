import { defineType } from 'sanity'

export default defineType({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  description: "Slug creates a URL for the entry. Use the 'Generate' button to create a slug from the Title.",
  options: {
    source: 'title',
    maxLength: 96,
  },
  validation: Rule => Rule.required()
})