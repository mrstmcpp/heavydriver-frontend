import { Helmet } from "react-helmet-async";
import { seoConfigPassenger } from "../../utils/seoConfig";

const PageMeta = ({ page }) => {
  const meta = seoConfigPassenger[page] || seoConfigPassenger.homepage;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default PageMeta;
