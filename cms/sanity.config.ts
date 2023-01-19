import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { markdownSchema } from "sanity-plugin-markdown";
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemas'
import { deskStructureEditors } from './deskStructure'


const base = {
  title: 'Sophia McLennen',
  projectId: 'ykx7ynrn',
  plugins: [deskTool({
    structure: deskStructureEditors,
  }),  markdownSchema(), media()],
  schema: {
    types: schemaTypes,
  },
}

export default defineConfig([
  {
    ...base,
    name: 'default',
    basePath: '/production',
    dataset: 'production',
  },
  {
    ...base,
    name: 'staging',
    basePath: '/staging',
    projectId: 'ykx7ynrn',
    dataset: 'production',    
    plugins: [
      ...base.plugins,
      visionTool()
    ]
  },
])
