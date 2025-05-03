// studio/schemas/schema.js
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes  from 'all:part:@sanity/base/schema-type'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    {
      name: 'siteSettings',
      title: 'Site Settings',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Site Title',
          type: 'string'
        }
      ]
    }
    // …any other types you’ll add later
  ])
})
