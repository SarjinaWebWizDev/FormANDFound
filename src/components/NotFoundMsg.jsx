import { Link } from 'react-router-dom';
export default function NotFoundMsg({ text = 'We could not find that page.' }) {
  return <div className="container-x py-32 text-center"><h1 className="text-6xl">Not found</h1><p className="mt-4 text-espresso/70">{text}</p><Link to="/shop" className="btn-dark mt-8">Continue shopping</Link></div>;
}
