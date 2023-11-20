export const menu = [
  {
    name: 'What',
    path: '/public/home/#how',
    side: 'left'
  },
  {
    name: 'Who',
    path: '/public/home/#who',
    side: 'left'
  },
  {
    name: 'Why',
    path: '/public/why',
    side: 'left'
  },
  {
    name: 'home',
    path: '/public/home',
    side: 'home'
  },
  {
    name: 'Join',
    path: '/public/join',
    side: 'right'
  },
  {
    name: 'Question',
    path: '/public/question',
    side: 'right'
  },
  {
    name: 'Blog',
    path: '/public/blog',
    side: 'right'
  }
];

export interface IMenu {
  name: string;
  path: string;
}
