import React from 'react';
import { PageTopBanner } from '../components/PageTopBanner';
import PageMeta from '../components/common/PageMeta';

const Engineering = () => {
  return (
    <div className="text-white">
      <PageMeta page={"engineering"} />
      <PageTopBanner section="Engineering" />
    </div>
  );
};

export default Engineering;
