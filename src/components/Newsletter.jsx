import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { load, save } from '../utils/helpers';

export default function Newsletter() {
  const [email, setEmail] = useState(''); const [done, setDone] = useState(false); const { notify } = useStore();
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return notify('Please enter a valid email');
    save('ff.newsletter', 1, [...load('ff.newsletter', 1, []), email]); setDone(true);
  };
  return (
    <section className="bg-espresso py-20 text-ivory">
      <div className="container-x grid items-center gap-10 md:grid-cols-2">
        <div><p className="eyebrow !text-gold">The journal</p><h2 className="mt-3 text-4xl md:text-5xl">Notes on considered living.</h2><p className="mt-4 max-w-md text-ivory/70">New pieces and ideas, a few times a year. (Demo form — your email is saved in this browser only.)</p></div>
        {done ? <p className="text-xl">Thank you. You are on the list.</p> : (
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="nl">Email</label>
            <input id="nl" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full border border-ivory/30 bg-transparent px-4 py-3 outline-none placeholder:text-ivory/40 focus:border-gold" />
            <button className="btn-light">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
