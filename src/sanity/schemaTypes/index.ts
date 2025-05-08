// src/sanity/schemaTypes/index.ts
import { defineType, defineField } from 'sanity'

// Export an object matching defineConfig’s `schema` option
export const schema = {
  types: [
    // 1. Your Site Settings doc
    defineType({
      name: 'siteSettings',
      title: 'Site Settings',
      type: 'document',
      fields: [
        defineField({
          name: 'title',
          title: 'Site Title',
          type: 'string',
          description: 'This shows up in the <h1> of your Next.js home page',
        }),
      ],
    }),

    // 2. (later) other document or object types you want to add
    
  ],
}
