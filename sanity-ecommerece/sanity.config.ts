import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'sanity ecommerece',

  projectId: 'bqq65ey9',
  dataset: 'production2',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
