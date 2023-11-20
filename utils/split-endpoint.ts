/**
 * remove the part after the {name} extension
 * @param url
 * @param name
 * @returns url splited
 */
export const splitEndpoint = (url: string, name: string = 'id') => {
  let parts = url.split('/');

  const idIndex = parts.indexOf(name);

  if (idIndex !== -1 && idIndex < parts.length - 1) {
    parts = parts.slice(0, idIndex + 1);
    return parts.join('/');
  } else {
    return url;
  }
};

export const convertUrlToUrlId = (url: string) => {
  let parts = url.split('/').filter((item) => !!item);
  if (parts.length === 3) {
    parts[2] = 'id';
    return '/' + parts.join('/');
  }
  if (parts.length === 4) {
    parts[3] = 'id';
    return '/' + parts.join('/');
  }
  return url;
};
