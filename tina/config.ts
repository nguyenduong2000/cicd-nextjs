import { defineConfig, Form, TinaCMS } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '', // Get this from tina.io
  token: process.env.NEXT_PUBLIC_TINA_TOKEN || '', // Get this from tina.io

  build: {
    outputFolder: 'admin',
    publicFolder: 'public'
  },
  media: {
    tina: {
      mediaRoot: 'tinacms',
      publicFolder: 'public'
    }
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blogs',
        path: 'content/blogs',
        fields: [
          {
            type: 'image',
            name: 'thumbnail',
            label: 'Thumbnail'
          },
          {
            type: 'datetime',
            name: 'createdAt',
            label: 'Create At',
            ui: {
              component: null
            }
          },
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true
          }
        ],
        ui: {
          router: ({ document }) =>
            `/public/blog/visual-preview/${document._sys.filename}`,
          beforeSubmit: async ({
            form,
            cms,
            values
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            if (form.crudType === 'create') {
              return {
                ...values,
                createdAt: new Date().toISOString()
              };
            }
          }
        }
      },
      {
        name: 'question',
        label: 'Questions',
        path: 'content/questions',
        fields: [
          {
            type: 'string',
            name: 'question',
            label: 'Question',
            isTitle: true,
            required: true
          },
          {
            type: 'rich-text',
            name: 'answer',
            label: 'Answer',
            isBody: true
          }
        ]
        // ui: {
        //   router: ({ document }) =>
        //     `/public/blog/visual-preview/${document._sys.filename}`
        // }
      }
    ]
  }
});
