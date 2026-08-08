import React from 'react';
import { Milk, Truck, PackageCheck, AlertCircle, ShoppingBag, Layers } from 'lucide-react';

export function MilkStockTab({ deliveries, customers }) {
  // Aggregate stock requirement stats
  let totalCowLitres = 0;
  let totalBuffaloLitres = 0;
  let totalOtherLitres = 0;

  deliveries.forEach((d) => {
    const qty = d.deliveredQty ?? d.quantityLiters;
    if (d.milkType.toLowerCase().includes('cow')) {
      totalCowLitres += qty;
    } else if (d.milkType.toLowerCase().includes('buffalo')) {
      totalBuffaloLitres += qty;
    } else {
      totalOtherLitres += qty;
    }
  });

  const grandTotalLitres = totalCowLitres + totalBuffaloLitres + totalOtherLitres;
  const totalCrates12L = Math.ceil(grandTotalLitres / 12);
  const totalPouches = Math.ceil(grandTotalLitres * 2); // 500ml pouches estimate

  const morningLitres = deliveries
    .filter((d) => d.shift === 'Morning' || !d.shift)
    .reduce((acc, curr) => acc + (curr.deliveredQty ?? curr.quantityLiters), 0);

  const eveningLitres = deliveries
    .filter((d) => d.shift === 'Evening')
    .reduce((acc, curr) => acc + (curr.deliveredQty ?? curr.quantityLiters), 0);

  return (
    <div className="mk-tab-content">
      {/* Stock Cards Overview */}
      <div className="mk-kpi-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Total Milk Needed Today</span>
            <div className="mk-kpi-icon-box green">
              <Milk size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">{grandTotalLitres.toFixed(1)} Litres</div>
          <div className="mk-kpi-footer">
            <span>Morning: {morningLitres}L | Evening: {eveningLitres}L</span>
          </div>
        </div>

        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Cow Milk Stock</span>
            <div className="mk-kpi-icon-box blue">
              <Milk size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">{totalCowLitres.toFixed(1)} Litres</div>
          <div className="mk-kpi-footer">
            <span>{Math.round((totalCowLitres / (grandTotalLitres || 1)) * 100)}% of route total</span>
          </div>
        </div>

        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Buffalo Milk Stock</span>
            <div className="mk-kpi-icon-box amber">
              <Milk size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">{totalBuffaloLitres.toFixed(1)} Litres</div>
          <div className="mk-kpi-footer">
            <span>{Math.round((totalBuffaloLitres / (grandTotalLitres || 1)) * 100)}% of route total</span>
          </div>
        </div>

        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Crate Packing Count</span>
            <div className="mk-kpi-icon-box rose">
              <Layers size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">{totalCrates12L} Crates</div>
          <div className="mk-kpi-footer">
            <span>~{totalPouches} pouches (500ml size)</span>
          </div>
        </div>
      </div>

      {/* Route-wise Milk Procurement Breakdown */}
      <div
        style={{
          backgroundColor: 'var(--mk-bg-surface)',
          border: '1px solid var(--mk-border-color)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: 'var(--mk-card-shadow)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <Truck size={20} color="var(--mk-primary)" />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>Route Crate Loading Checklist</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {Array.from(new Set(deliveries.map((d) => d.route))).map((route) => {
            const routeDeliveries = deliveries.filter((d) => d.route === route);
            const routeCow = routeDeliveries
              .filter((d) => d.milkType.toLowerCase().includes('cow'))
              .reduce((a, b) => a + (b.deliveredQty ?? b.quantityLiters), 0);
            const routeBuffalo = routeDeliveries
              .filter((d) => d.milkType.toLowerCase().includes('buffalo'))
              .reduce((a, b) => a + (b.deliveredQty ?? b.quantityLiters), 0);
            const routeTotal = routeCow + routeBuffalo;

            return (
              <div
                key={route}
                style={{
                  backgroundColor: 'var(--mk-bg-subtle)',
                  border: '1px solid var(--mk-border-color)',
                  borderRadius: '14px',
                  padding: '1.1rem'
                }}
              >
                <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.4rem' }}>{route}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--mk-text-muted)', marginBottom: '0.75rem' }}>
                  {routeDeliveries.length} Households
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>🐄 Cow Milk:</span>
                    <strong>{routeCow} Litres</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>🐃 Buffalo Milk:</span>
                    <strong>{routeBuffalo} Litres</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justify: 'space-between',
                      borderTop: '1px solid var(--mk-border-color)',
                      paddingTop: '0.4rem',
                      fontWeight: '700',
                      color: 'var(--mk-primary)'
                    }}
                  >
                    <span>Total Loading:</span>
                    <span>{routeTotal} L ({Math.ceil(routeTotal / 12)} Crates)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
