'use client';

import React, { useState, useMemo } from 'react';
import SearchBar from '@/components/dictionary/SearchBar';
import ProductCard from '@/components/dictionary/ProductCard';
import ProductDetail from '@/components/dictionary/ProductDetail';
import SuggestProduct from '@/components/dictionary/SuggestProduct';
import categoriesConfig from '@/data/categories.json';

// Static imports for product lists
import productsGlobal from '@/data/products-global.json';
import productsIndia from '@/data/products-india.json';

export default function DictionaryPage() {
  const [activeRegion, setActiveRegion] = useState('global'); // 'global' | 'india'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

  // Combine categories
  const categories = categoriesConfig.productCategories;

  // Filter products based on selected tab, search, and category
  const filteredProducts = useMemo(() => {
    const rawList = activeRegion === 'global' ? productsGlobal : productsIndia;
    return rawList.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        activeCategory === 'all' ||
        (product.category && product.category.toLowerCase() === activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [activeRegion, searchQuery, activeCategory]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleRegionChange = (region) => {
    setActiveRegion(region);
    setSelectedProduct(null); // Clear selected product when switching tabs
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in" style={{ width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-bold)', letterSpacing: '-0.02em' }}>
            Product Dictionary 📚
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Deep-dives into the growth models and PM lessons of top products globally and in India.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsSuggestModalOpen(true)}>
          ➕ Request Product
        </button>
      </div>

      <hr className="divider" style={{ marginBlock: '0' }} />

      {/* Main Layout Split Pane */}
      <div className="split-pane">
        
        {/* Left Side: Search, Filters, Product Grid list */}
        <div className="split-pane-left flex flex-col gap-4">
          
          {/* Search Input */}
          <SearchBar 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder={`Search ${activeRegion === 'global' ? 'Global' : 'Indian'} products...`}
          />

          {/* Region Tabs (Global vs India) */}
          <div className="tabs">
            <button 
              className={`tab ${activeRegion === 'global' ? 'active' : ''}`}
              onClick={() => handleRegionChange('global')}
            >
              🌍 Global Top 100
            </button>
            <button 
              className={`tab ${activeRegion === 'india' ? 'active' : ''}`}
              onClick={() => handleRegionChange('india')}
            >
              🇮🇳 India Top 100
            </button>
          </div>

          {/* Horizontal Category Scroll Pills */}
          <div className="filter-pills" style={{ paddingBlock: 'var(--space-1)' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Cards List Grid */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--space-3)',
            overflowY: 'auto',
            maxHeight: '55vh',
            paddingRight: 'var(--space-2)'
          }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductSelect(product)}
                />
              ))
            ) : (
              <div className="empty-state">
                <span className="icon">🔍</span>
                <h3>No products found</h3>
                <p>We couldn&apos;t find any products matching your filters.</p>
                <button className="btn btn-secondary btn-sm" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="split-pane-right">
          {/* Desktop Detail View */}
          <div className="desktop-only" style={{ height: '100%' }}>
            {selectedProduct ? (
              <ProductDetail product={selectedProduct} />
            ) : (
              <div className="card flex flex-col items-center justify-center text-center" style={{ height: '380px', borderStyle: 'dashed' }}>
                <span style={{ fontSize: '3rem', opacity: 0.2, marginBottom: 'var(--space-3)' }}>📚</span>
                <h3 style={{ color: 'var(--text-secondary)' }}>Select a product to inspect</h3>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', maxWidth: '280px', marginTop: 'var(--space-2)' }}>
                  Click on any product card from the list to reveal its core problem, features, growth metrics, and PM takeaways.
                </p>
              </div>
            )}
          </div>

          {/* Mobile Full-Screen Overlay Detail View */}
          <div className="mobile-only">
            {selectedProduct && (
              <div style={{
                position: 'fixed',
                inset: 0,
                background: 'var(--bg-primary)',
                zIndex: 100,
                padding: 'var(--space-4)',
                overflowY: 'auto',
              }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 'var(--space-4)' }}>
                  <button className="btn btn-secondary btn-sm" onClick={handleCloseDetail}>
                    ← Back to List
                  </button>
                </div>
                <ProductDetail product={selectedProduct} />
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Suggest Product Modal */}
      <SuggestProduct 
        isOpen={isSuggestModalOpen} 
        onClose={() => setIsSuggestModalOpen(false)} 
      />

    </div>
  );
}
