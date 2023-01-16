import {defineField, defineType} from 'sanity'
// schemas/siteSettings.js
const socials = () => {
  return ['Twitter', 'Instagram'].map(social => ({
    title: social,
    name: social.toLowerCase(),
    type: 'url',
    group: 'socials'
  }))
}
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [{
    name: 'socials',
    title: 'Socials'
  }],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',   
      hidden: true,   
    },
    {
      name: 'site_title',
      title: 'Site Title',
      type: 'string',      
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'address',
      title: 'Site Address',
      type: 'array',
      of: [{type: 'block'}],
    },
    defineField({
      name: 'image',
      title: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    ...socials()
  ]
})