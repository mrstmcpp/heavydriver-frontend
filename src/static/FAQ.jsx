import React from 'react';
import { PageTopBanner } from '../components/PageTopBanner';
import PageMeta from '../components/common/PageMeta';
const FAQ = () => {
  return (
    <div className="text-white">
      <PageMeta page={"faq"} />
      <PageTopBanner section="FAQ" />
    </div>
  );
};

export default FAQ;
