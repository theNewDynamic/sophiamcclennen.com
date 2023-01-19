import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { markdownSchema } from "sanity-plugin-markdown";
import {deskStructureEditors} from './deskStructure'

export default defineConfig([
  {
    name: 'default',
    title: 'Sophia McLennen',
    basePath: '/production',
    projectId: 'ykx7ynrn',
    dataset: 'production',
    plugins: [deskTool({
      structure: deskStructureEditors,
    }),  markdownSchema()],
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
    plugins: [deskTool({
      structure: deskStructureEditors,
    }),  markdownSchema(),visionTool()],

    schema: {
      types: schemaTypes,
    },
  },


])
