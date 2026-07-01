import { notFound } from 'next/navigation';
import Link from 'next/link';
import globalProducts from '@/data/products-global.json';
import indiaProducts from '@/data/products-india.json';
import ProductDetail from '@/components/dictionary/ProductDetail';

const allProducts = [...globalProducts, ...indiaProducts];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.id === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — Product Buzz`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.id === slug);

  if (!product) notFound();

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-6)' }}>
      <Link
        href="/dictionary"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-sm)',
          textDecoration: 'none',
          marginBottom: 'var(--space-6)',
        }}
      >
        ← Back to Dictionary
      </Link>

      <ProductDetail product={product} isPage={true} />
    </div>
  );
}
