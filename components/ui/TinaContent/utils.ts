import client from '@/tina/__generated__/client';
import {
  BlogConnectionQueryVariables,
  QuestionConnectionQueryVariables
} from '@/tina/__generated__/types';

const mapBodyChildToTextContent = (post: any, bodyName: string = 'body') => {
  if (post.node[bodyName].children.length) {
    const listPTag = post.node[bodyName].children.filter(
      (item: any) => item.type === 'p'
    );
    const listText: any[] = [];
    listPTag.forEach((item: any) => {
      if (item.children.length) {
        const listTextToPush = item.children.filter(
          (children: any) => children.type === 'text'
        );
        listText.push(...listTextToPush);
      }
    });
    return listText;
  }
};

export const getContentBlogByName = async (path: string) => {
  const variables = { relativePath: `${path}.md` };
  try {
    return await client.queries.blog(variables);
  } catch {
    // swallow errors related to document creation
  }
};

export const getListBlogByFilter = async (
  variables?: BlogConnectionQueryVariables
) => {
  const blogCollections = await client.queries.blogConnection(variables);
  return blogCollections.data.blogConnection.edges.map((blog) => ({
    title: blog.node.title,
    id: blog.node._sys.filename,
    body: mapBodyChildToTextContent(blog),
    thumbnail: blog.node.thumbnail
  }));
};

export const getContentQuestionByName = async (path: string) => {
  const variables = { relativePath: `${path}.md` };
  try {
    return await client.queries.question(variables);
  } catch {
    // swallow errors related to document creation
  }
};

export const getListQuestionByFilter = async (
  variables?: QuestionConnectionQueryVariables
) => {
  const questionCollections = await client.queries.questionConnection(
    variables
  );
  return questionCollections.data.questionConnection.edges.map((question) => ({
    question: question.node.question,
    id: question.node._sys.filename,
    answer: mapBodyChildToTextContent(question, 'answer')
  }));
};
