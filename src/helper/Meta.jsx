import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet
      onChangeClientState={() => {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', description || '');
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', keywords || '');
        }
      }}
    >
      <title>{title}</title>
    </Helmet>
  );
};

export default Meta;
