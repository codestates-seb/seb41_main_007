import { FC, useEffect } from 'react';

interface Props {
  author?: string;
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}
const defaultImage =
  'https://sebmain007.s3.ap-northeast-1.amazonaws.com/1675317821157_FarmPiImage.png';
const defaultDescription = '팜피 세상에 모든 농기구가 있는곳!';

const CustomTitle: FC<Props> = ({
  author,
  title,
  description,
  image,
  noIndex,
}) => {
  let mountTitle = title;

  const updateTitle = () => {
    const htmlTitle: any = document.querySelector('title');
    htmlTitle.innerText = title;
  };

  useEffect(updateTitle, [mountTitle, title]);

  return (
    <header>
      <meta name="description" content={description || defaultDescription} />
      {author && <meta name="author" content={author} />}
      <meta itemProp="name" content={title} />
      <meta
        itemProp="description"
        content={description || defaultDescription}
      />
      <meta itemProp="image" content={image || defaultImage} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image || defaultImage} />
      {noIndex && <meta name="robots" content="noindex" />}
    </header>
  );
};

export default CustomTitle;
