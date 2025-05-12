// src/sanity/schemaTypes/index.ts
import { defineType, defineField } from 'sanity'

export const schema = {
  types: [
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
         defineField({
      name: 'startYear',
      title: 'Timeline Start Year',
      type: 'number',
      description: 'The first year of your timeline',
      initialValue: 1700,
    }),
    defineField({
      name: 'endYear',
      title: 'Timeline End Year',
      type: 'number',
      description: 'The last year of your timeline',
      initialValue: 1877,
    }),
      ],
    }),

    defineType({
      name: 'timelineGroup',
      title: 'Timeline Group',
      type: 'document',
      fields: [
        defineField({
          name: 'label',
          title: 'Group Label',
          type: 'string',
        }),
        defineField({
          name: 'id',
          title: 'Group ID',
          type: 'number',
        }),
         defineField({
          name: 'icon',
          title: 'Icon',
          type: 'string',
          options: {
            list: [
              { title: 'Flag',value: 'FaFlag'},
              { title: 'Gavel',value: 'FaGavel'},
              { title: 'Warning',value: 'FaExclamationCircle'},
            ]
          }
        }),
      ],
    }),

     defineType({
      name: 'timelineItem',
      title: 'Timeline Item',
      type: 'document',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'The title of the timeline item.',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'A brief description of the timeline item.',
        }),
        defineField({
          name: 'startYear',
          title: 'Start Year',
          type: 'number',
          description: 'The year the event starts.',
        }),
        defineField({
          name: 'endYear',
          title: 'End Year',
          type: 'number',
          description: 'The year the event ends.',
        }),
        defineField({
          name: 'group',
          title: 'Group',
          type: 'reference',
          to: [{ type: 'timelineGroup' }],
          description: 'The group this timeline item belongs to.',
        }),
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true, // Enables image cropping in the Sanity Studio
          },
          description: 'An optional image for the timeline item.',
        }),
        defineField({
          name: 'file',
          title: 'File',
          type: 'file',
          description: 'An optional file (e.g., PDF) for the timeline item.',
        }),
      ],
      

    }),
  ],
}
