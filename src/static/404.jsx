import React from 'react';
import { PageTopBanner } from '../components/PageTopBanner';
import PageMeta from '../components/common/PageMeta';
const NotFound = () => {
  return (
    <div>
      <PageMeta page={"notFound"} />
      <PageTopBanner section="404 - Page Not Found" />
    </div>
  );
};

export default NotFound;
