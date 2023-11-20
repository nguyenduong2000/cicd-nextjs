export interface IMenu {
  isAuthenticated: boolean;
  name: string;
  path: string;
}

export const menu: IMenu[] = [
  // {
  //   isAuthenticated: true,
  //   name: 'Account',
  //   path: '/views/pages/account'
  // },
  {
    isAuthenticated: true,
    name: 'Scoreboard',
    path: '/views/pages/scoreboard'
  },
  {
    isAuthenticated: true,
    name: 'Setup',
    path: '/views/pages/setup'
  }

  // {
  //   isAuthenticated: true,
  //   name: 'Setup',
  //   path: '/views/pages/setup-qc'
  // }
];

export const appConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL_V1,
  accessTokenName: 'tr_accessToken',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
};
