import CustomLink from '../Header/Link';

const MAILTO_EMAIL = 'info@zotgoe.be';
const MAILTO_SUBJECT = 'photos.by.brent - Contact';
const MAILTO_LINE_BREAK = '%0D%0A';
const MAILTO_BODY = `Hi Brent,${MAILTO_LINE_BREAK}${MAILTO_LINE_BREAK}I saw some photos you took on your website and I have a question:`;

const MAILTO_URL = `mailto:${MAILTO_EMAIL}?subject=${MAILTO_SUBJECT}&body=${MAILTO_BODY}`;

export default function ContactLink() {
  return <CustomLink path={MAILTO_URL}>Get in touch</CustomLink>;
}
