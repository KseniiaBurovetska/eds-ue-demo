import { fetchPlaceholders } from '../../scripts/aem.js';


export default async function decorate(block) {
  const locale = window.location.pathname.split('/')[1]
  const placeholders = await fetchPlaceholders(`/${locale}`);
  const { key1 } = placeholders;

  const [quotation, attribution] = [...block.children].map((c) => c.firstElementChild);
  const blockquote = document.createElement('blockquote');
  // decorate quotation
  quotation.className = 'quote-quotation';
  blockquote.append(quotation);
  // decoration attribution
  if (attribution) {
    attribution.className = 'quote-attribution';
    blockquote.append(attribution);
    const ems = attribution.querySelectorAll('em');
    ems.forEach((em) => {
      const cite = document.createElement('cite');
      cite.innerHTML = em.innerHTML;
      em.replaceWith(cite);
    });
  }
  const placeholderElement = document.createElement('div');
  placeholderElement.innerText = key1
  blockquote.append(placeholderElement)

  block.innerHTML = '';
  block.append(blockquote);
}
