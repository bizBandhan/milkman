import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  MapPin,
  Milk,
  Edit,
  Trash2,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export function CustomerDirectoryTab({
  customers,
  onAddCustomer,
  onEditCustomer,
  onDeleteCustomer,
  onOpenWhatsApp,
  onRecordPayment
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [routeFilter, setRouteFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const routes = Array.from(new Set(customers.map((c) => c.route)));

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRoute = routeFilter === 'All' || c.route === routeFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesRoute && matchesStatus;
  });

  return (
    <div className="mk-tab-content">
      {/* Search & Actions Bar */}
      <div className="mk-toolbar">
        <div className="mk-search-box">
          <Search size={18} color="var(--mk-text-subtle)" />
          <input
            type="text"
            placeholder="Search by customer name, phone number, address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mk-filter-group">
          <select
            className="mk-select-input"
            value={routeFilter}
            onChange={(e) => setRouteFilter(e.target.value)}
          >
            <option value="All">All Routes</option>
            {routes.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            className="mk-select-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="active">Active Subscriptions</option>
            <option value="paused">Paused / Vacation</option>
          </select>

          <button className="mk-btn-primary" type="button" onClick={onAddCustomer}>
            <Plus size={16} /> Add Household
          </button>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="mk-table-container">
        <table className="mk-table">
          <thead>
            <tr>
              <th>Household & Contact</th>
              <th>Route / Address</th>
              <th>Milk Subscribed</th>
              <th>Rate / L</th>
              <th>Monthly Dues</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem' }}>
                  <Users size={28} color="var(--mk-text-subtle)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ margin: 0, color: 'var(--mk-text-muted)' }}>No households found matching filters.</p>
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--mk-text-main)' }}>{c.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--mk-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Phone size={12} /> {c.phone}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{c.route}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--mk-text-muted)' }}>{c.address}</div>
                  </td>
                  <td>
                    <span className="mk-quota-tag" style={{ marginTop: 0 }}>
                      <Milk size={13} color="var(--mk-primary)" />
                      {c.quantityLiters}L ({c.milkType})
                    </span>
                  </td>
                  <td>₹{c.pricePerLiter} / L</td>
                  <td>
                    <span
                      style={{
                        fontWeight: '700',
                        color: c.balance > 0 ? 'var(--mk-accent-rose)' : 'var(--mk-primary)'
                      }}
                    >
                      ₹{c.balance || 0}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`mk-badge-status ${c.status === 'active' ? 'online' : 'offline'}`}
                    >
                      {c.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="mk-btn-secondary"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
                        onClick={() => onRecordPayment(c)}
                        title="Record Payment"
                      >
                        Log Pay
                      </button>
                      <button
                        type="button"
                        className="mk-action-btn whatsapp"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
                        onClick={() => onOpenWhatsApp(c)}
                        title="WhatsApp Bill"
                      >
                        <MessageCircle size={14} />
                      </button>
                      <button
                        type="button"
                        className="mk-btn-secondary"
                        style={{ padding: '0.35rem 0.5rem' }}
                        onClick={() => onEditCustomer(c)}
                        title="Edit Customer"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        type="button"
                        className="mk-btn-secondary"
                        style={{ padding: '0.35rem 0.5rem', color: 'var(--mk-accent-rose)' }}
                        onClick={() => onDeleteCustomer(c.id)}
                        title="Delete Customer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
