import React from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Milk,
  CheckCircle2,
  Users,
  Award,
  Calendar
} from 'lucide-react';

export function AnalyticsTab({ deliveries, customers, payments }) {
  const totalDelivered = deliveries.filter((d) => d.status === 'delivered').length;
  const fulfillmentRate = deliveries.length > 0 ? Math.round((totalDelivered / deliveries.length) * 100) : 0;
  const totalLitres = deliveries.reduce((acc, curr) => acc + (curr.deliveredQty ?? curr.quantityLiters), 0);
  const totalCollected = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const totalOutstanding = customers.reduce((acc, c) => acc + (c.balance || 0), 0);

  // Group by route
  const routesStats = Array.from(new Set(deliveries.map((d) => d.route))).map((route) => {
    const routeItems = deliveries.filter((d) => d.route === route);
    const deliveredCount = routeItems.filter((d) => d.status === 'delivered').length;
    const litres = routeItems.reduce((acc, curr) => acc + (curr.deliveredQty ?? curr.quantityLiters), 0);
    return {
      route,
      totalCount: routeItems.length,
      deliveredCount,
      rate: Math.round((deliveredCount / routeItems.length) * 100),
      litres
    };
  });

  return (
    <div className="mk-tab-content">
      {/* Top Analytics Cards */}
      <div className="mk-kpi-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Route Fulfillment Rate</span>
            <div className="mk-kpi-icon-box green">
              <Award size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">{fulfillmentRate}%</div>
          <div className="mk-progress-bar">
            <div className="mk-progress-fill" style={{ width: `${fulfillmentRate}%` }} />
          </div>
        </div>

        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Daily Milk Volume</span>
            <div className="mk-kpi-icon-box blue">
              <Milk size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">{totalLitres.toFixed(1)} L</div>
          <div className="mk-kpi-footer">
            <span>Avg ~{(totalLitres / (customers.length || 1)).toFixed(2)}L per household</span>
          </div>
        </div>

        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Ledger Collection Efficiency</span>
            <div className="mk-kpi-icon-box amber">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">
            {totalCollected + totalOutstanding > 0
              ? Math.round((totalCollected / (totalCollected + totalOutstanding)) * 100)
              : 100}
            %
          </div>
          <div className="mk-kpi-footer">
            <span>Collected vs Outstanding Dues</span>
          </div>
        </div>

        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Active Retention Rate</span>
            <div className="mk-kpi-icon-box rose">
              <Users size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">
            {customers.length > 0
              ? Math.round((customers.filter((c) => c.status === 'active').length / customers.length) * 100)
              : 0}
            %
          </div>
          <div className="mk-kpi-footer">
            <span>{customers.filter((c) => c.status === 'active').length} of {customers.length} households active</span>
          </div>
        </div>
      </div>

      {/* Route Performance Comparison Table */}
      <div
        style={{
          backgroundColor: 'var(--mk-bg-surface)',
          border: '1px solid var(--mk-border-color)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: 'var(--mk-card-shadow)',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <BarChart3 size={20} color="var(--mk-primary)" />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>Route Delivery & Volume Performance</h3>
        </div>

        <div className="mk-table-container">
          <table className="mk-table">
            <thead>
              <tr>
                <th>Route Section</th>
                <th>Total Households</th>
                <th>Delivered Count</th>
                <th>Volume (Litres)</th>
                <th>Completion Status</th>
              </tr>
            </thead>
            <tbody>
              {routesStats.map((r) => (
                <tr key={r.route}>
                  <td style={{ fontWeight: '600' }}>{r.route}</td>
                  <td>{r.totalCount} Households</td>
                  <td>
                    {r.deliveredCount} / {r.totalCount}
                  </td>
                  <td>
                    <strong>{r.litres} Litres</strong>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="mk-progress-bar" style={{ width: '120px', margin: 0 }}>
                        <div className="mk-progress-fill" style={{ width: `${r.rate}%` }} />
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: '700' }}>{r.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
