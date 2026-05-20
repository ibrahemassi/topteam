export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'smallDescription',
      title: 'Small Description (Teaser)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'description',
      title: 'Main Description (Intro)',
      type: 'text',
      rows: 5,
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'width',
              type: 'string',
              title: 'Width',
              options: {
                list: [
                  { title: 'Full', value: 'full' },
                  { title: 'Wide', value: 'wide' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Narrow', value: 'narrow' },
                ],
              },
              initialValue: 'full',
            },
          ],
        },
        {
          name: 'imagePair',
          type: 'object',
          title: 'Image Pair',
          fields: [
            {
              name: 'left',
              type: 'image',
              title: 'Left Image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Alt' }],
            },
            {
              name: 'right',
              type: 'image',
              title: 'Right Image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Alt' }],
            },
          ],
        },
      ],
    },
  ],
}
