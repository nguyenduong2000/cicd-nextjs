'use client';

import { useEffect, useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import TinaContent from '@/components/ui/TinaContent/TinaContent';
import { getContentBlogByName } from '@/components/ui/TinaContent/utils';

const VisualPreview = ({ params }: any) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const dataFetch = await getContentBlogByName(params.path);
      setData(dataFetch);
    };
    getData();
  }, []);

  const tinaLiveData = useTina({
    data: data?.data,
    variables: data?.variables,
    query: data?.query
  });

  return (
    <TinaContent
      title={tinaLiveData?.data?.blog.title}
      body={tinaLiveData?.data?.blog.body}
    />
  );
};

export default VisualPreview;
