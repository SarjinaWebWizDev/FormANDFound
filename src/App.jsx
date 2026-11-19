import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Collections, { CollectionPage } from './pages/Collections';
import DesignYourSpace from './pages/DesignYourSpace';
import RoomGuide from './pages/RoomGuide';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import Checkout, { OrderConfirmation } from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import { Journal, JournalArticle, About, Contact, Faqs, Policy, NotFound } from './pages/Info';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:slug" element={<CollectionPage />} />
        <Route path="design-your-space" element={<DesignYourSpace />} />
        <Route path="room/:id" element={<RoomGuide />} />
        <Route path="offers" element={<Offers />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="compare" element={<Compare />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order/:id" element={<OrderConfirmation />} />
        <Route path="track-order" element={<TrackOrder />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:slug" element={<JournalArticle />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path=":policy" element={<Policy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
