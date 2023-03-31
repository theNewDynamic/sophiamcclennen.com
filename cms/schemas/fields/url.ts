import { defineField } from "sanity";

export default defineField({
  name: "url",
  title: "URL",
  type: "url",
  validation: Rule => Rule.uri({
    scheme: ['http', 'https', 'mailto', 'tel'],
    allowRelative: true,
  })
})