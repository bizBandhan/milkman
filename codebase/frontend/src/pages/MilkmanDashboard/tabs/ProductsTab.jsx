import React, { useState } from 'react';
import {
  Milk,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export function ProductsTab({ products, deliveries, onAddProduct, onEditProduct, onDeleteProduct }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mk-tab-content">
      {/* Top Toolbar */}
      <div className="mk-toolbar">
        <div className="mk-search-box">
          <Search size={18} color="var(--mk-text-subtle)" />
          <input
            type="text"
            placeholder="Search product variant (e.g. Cow Milk, Buffalo Milk)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mk-filter-group">
          <button className="mk-btn-primary" type="button" onClick={onAddProduct}>
            <Plus size={16} /> Add Product Variant
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem'
        }}
      >
        {filteredProducts.length === 0 ? (
          <div className="mk-empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="mk-empty-icon">
              <Milk size={28} />
            </div>
            <h4 style={{ margin: '0 0 0.4rem 0', color: 'var(--mk-text-main)' }}>No Product Variants Found</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              Click <strong>Add Product Variant</strong> to configure products like Cow Milk @ ₹ 65.00/L.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            // Calculate total allocated litres today across active route deliveries
            const allocatedQty = deliveries
              .filter((d) => d.milkType.toLowerCase().includes(product.name.toLowerCase()))
              .reduce((acc, curr) => acc + (curr.deliveredQty ?? curr.quantityLiters), 0);

            const remainingQty = Math.max(0, product.totalAvailability - allocatedQty);
            const utilizationPct = Math.min(100, Math.round((allocatedQty / (product.totalAvailability || 1)) * 100));

            return (
              <div
                key={product.id}
                style={{
                  backgroundColor: 'var(--mk-bg-surface)',
                  border: '1px solid var(--mk-border-color)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  boxShadow: 'var(--mk-card-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  {/* Top Product Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          backgroundColor: 'var(--mk-primary-light)',
                          color: 'var(--mk-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Milk size={22} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'var(--mk-text-heading)' }}>
                          {product.name}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: 'var(--mk-text-muted)' }}>
                          Unit: {product.unit}
                        </span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--mk-primary)' }}>
                        ₹{product.price.toFixed(2)}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--mk-text-subtle)' }}>per {product.unit}</span>
                    </div>
                  </div>

                  {/* Product Specification Badges */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      backgroundColor: 'var(--mk-bg-subtle-solid)',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div>
                      <div style={{ color: 'var(--mk-text-subtle)', fontSize: '0.72rem' }}>Step Size</div>
                      <strong style={{ color: 'var(--mk-text-main)' }}>{product.stepSize} {product.unit[0]}</strong>
                    </div>
                    <div>
                      <div style={{ color: 'var(--mk-text-subtle)', fontSize: '0.72rem' }}>Min Order</div>
                      <strong style={{ color: 'var(--mk-text-main)' }}>{product.minimumOrder} {product.unit[0]}</strong>
                    </div>
                    <div>
                      <div style={{ color: 'var(--mk-text-subtle)', fontSize: '0.72rem' }}>Daily Cap</div>
                      <strong style={{ color: 'var(--mk-accent-amber)' }}>{product.totalAvailability} {product.unit[0]}</strong>
                    </div>
                  </div>

                  {/* Stock Availability Progress */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                      <span style={{ color: 'var(--mk-text-muted)' }}>
                        Allocated Today: <strong>{allocatedQty}L</strong>
                      </span>
                      <span style={{ color: remainingQty > 0 ? 'var(--mk-primary)' : 'var(--mk-accent-rose)', fontWeight: '600' }}>
                        {remainingQty}L Available
                      </span>
                    </div>
                    <div className="mk-progress-bar" style={{ margin: 0 }}>
                      <div
                        className="mk-progress-fill"
                        style={{
                          width: `${utilizationPct}%`,
                          backgroundColor: utilizationPct > 90 ? 'var(--mk-accent-rose)' : 'var(--mk-primary)'
                        }}
                      />
                    </div>
                  </div>

                  {product.description && (
                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: 'var(--mk-text-muted)', fontStyle: 'italic' }}>
                      "{product.description}"
                    </p>
                  )}
                </div>

                {/* Bottom Card Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    borderTop: '1px solid var(--mk-border-color)',
                    paddingTop: '0.85rem'
                  }}
                >
                  <button
                    type="button"
                    className="mk-btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                    onClick={() => onEditProduct(product)}
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    type="button"
                    className="mk-btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: 'var(--mk-accent-rose)' }}
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
