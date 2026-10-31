import { useState } from 'react';
export default function SafeImage({ src, alt = '', className = '', fit = 'cover', ...rest }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div role="img" aria-label={alt} className={`bg-beige ${className}`} />;
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`${className} ${fit === 'contain' ? 'object-contain' : 'object-cover'}`} {...rest} />;
}
