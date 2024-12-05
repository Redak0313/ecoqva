import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description: 'Tienda en línea EcoQva. Productos de energía renovable y más para tu hogar.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
