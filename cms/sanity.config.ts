import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { markdownSchema } from "sanity-plugin-markdown";


export default defineConfig([
  {
    name: 'default',
    title: 'Sophia McLennen',
    basePath: '/production',
    projectId: 'ykx7ynrn',
    dataset: 'production',
    plugins: [deskTool(),  markdownSchema()],
    schema: {
      types: schemaTypes,
    },
  },


  {
    name: 'staging',
    title: 'Sophia McLennen',
    basePath: '/staging',
    projectId: 'ykx7ynrn',
    dataset: 'production',

    plugins: [deskTool(), visionTool(), markdownSchema()],

    schema: {
      types: schemaTypes,
    },
  },


])
