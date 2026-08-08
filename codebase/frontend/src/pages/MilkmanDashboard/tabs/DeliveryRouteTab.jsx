import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  Minus,
  Search,
  Filter,
  Check,
  RotateCcw,
  Smartphone,
  Sparkles,
  MessageCircle,
  MapPin,
  Milk,
  X
} from 'lucide-react';

export function DeliveryRouteTab({
  deliveries,
  onToggleStatus,
  onAdjustQty,
  onOpenDetails,
  onOpenWhatsApp,
  searchTerm,
  setSearchTerm,
  selectedRoute,
  setSelectedRoute,
  routesList,
  selectedShift,
  setSelectedShift
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(searchTerm));

  const filtered = deliveries.filter((item) => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoute = selectedRoute === 'All' || item.route === selectedRoute;
    const matchesShift = selectedShift === 'All' || item.shift === selectedShift;
    return matchesSearch && matchesRoute && matchesShift;
  });

  const totalDelivered = deliveries.filter((d) => d.status === 'delivered').length;
  const totalPending = deliveries.filter((d) => d.status === 'pending').length;
  const totalSkipped = deliveries.filter((d) => d.status === 'skipped' || d.status === 'paused').length;

  return (
    <div className="mk-tab-content">
      {/* <div className="mk-toolbar">
        <div className="mk-filter-group" style={{ width: '100%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={15} color="var(--mk-text-muted)" />
              <select
                className="mk-select-input"
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
              >
                <option value="All">All Routes ({deliveries.length})</option>
                {routesList.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <select
              className="mk-select-input"
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
            >
              <option value="All">All Shifts</option>
              <option value="Morning">Morning 🌅</option>
              <option value="Evening">Evening 🌆</option>
            </select>
          </div>
          <button
            type="button"
            className={`mk-btn-secondary ${isSearchOpen ? 'active' : ''}`}
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
            onClick={() => {
              if (isSearchOpen && searchTerm) {
                setSearchTerm('');
              }
              setIsSearchOpen(!isSearchOpen);
            }}
            title="Search Customer or House"
          >
            {isSearchOpen ? <X size={16} /> : <Search size={16} />}
            <span>{isSearchOpen ? 'Close' : 'Search'}</span>
          </button>
        </div>
        {isSearchOpen && (
          <div className="mk-search-box" style={{ width: '100%', maxWidth: '100%', marginTop: '0.5rem' }}>
            <Search size={18} color="var(--mk-text-subtle)" />
            <input
              type="text"
              placeholder="Search house no, customer name, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--mk-text-subtle)' }}
                onClick={() => setSearchTerm('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
      </div> */}

      {/* <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 0.85rem',
          borderRadius: '12px',
          backgroundColor: 'var(--mk-primary-light)',
          border: '1px solid var(--mk-primary-border)',
          marginBottom: '1rem',
          fontSize: '0.82rem',
          color: 'var(--mk-primary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '500' }}>
          <Sparkles size={15} />
          <span>
            <strong>Single-Hand Route Mode:</strong> Mark delivered or tap <strong>+ / -</strong> for extra milk.
          </span>
        </div>
        <span style={{ fontWeight: '700' }}>
          {totalDelivered}/{deliveries.length} Delivered
        </span>
      </div> */}

      {filtered.length === 0 ? (
        <div className="mk-empty-state">
          <div className="mk-empty-icon">
            <Milk size={24} />
          </div>
          <h4 style={{ margin: '0 0 0.4rem 0', color: 'var(--mk-text-main)' }}>No Delivery Items Match</h4>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            Try broadening your search term or selecting a different route/shift.
          </p>
        </div>
      ) : (
        <div className="mk-route-list">
          {filtered.map((item) => {
            const isDelivered = item.status === 'delivered';
            const isSkipped = item.status === 'skipped' || item.status === 'paused';

            return (
              <div
                key={item.id}
                className={`mk-route-card ${isDelivered ? 'delivered' : isSkipped ? 'skipped' : ''}`}
              >
                <div className="mk-customer-info">
                  <div className="mk-avatar">{item.customerName.charAt(0)}</div>
                  <div className="mk-customer-details">
                    <h4>{item.customerName}</h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={13} color="var(--mk-text-subtle)" />
                      {item.address} — <strong style={{ color: 'var(--mk-text-main)' }}>{item.route}</strong>
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="mk-quota-tag">
                        <Milk size={13} color="var(--mk-primary)" />
                        {item.milkType}: {item.quantityLiters}L
                      </span>

                      {item.shift && (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            backgroundColor: 'var(--mk-bg-subtle-solid)',
                            color: 'var(--mk-text-muted)'
                          }}
                        >
                          {item.shift}
                        </span>
                      )}

                      {item.notes && (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--mk-accent-amber)',
                            fontStyle: 'italic'
                          }}
                        >
                          "{item.notes}"
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Action Bar (Vertical on Mobile, Horizontal on Desktop) */}
                <div className="mk-delivery-actions">
                  {/* Quantity Adjustment Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--mk-bg-subtle-solid)',
                      border: '1px solid var(--mk-border-color)',
                      borderRadius: '8px',
                      padding: '2px'
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--mk-text-main)',
                        padding: '0.35rem 0.5rem',
                        cursor: 'pointer',
                        borderRadius: '6px'
                      }}
                      onClick={() => onAdjustQty(item.id, -0.5)}
                      title="Decrease 0.5L"
                    >
                      <Minus size={14} />
                    </button>
                    <span
                      style={{
                        padding: '0 0.4rem',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: 'var(--mk-text-main)'
                      }}
                    >
                      {item.deliveredQty ?? item.quantityLiters}L
                    </span>
                    <button
                      type="button"
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--mk-text-main)',
                        padding: '0.35rem 0.5rem',
                        cursor: 'pointer',
                        borderRadius: '6px'
                      }}
                      onClick={() => onAdjustQty(item.id, 0.5)}
                      title="Add 0.5L Extra"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {/* Primary Status Toggle Button */}
                    <button
                      type="button"
                      className={`mk-action-btn ${isDelivered ? 'delivered' : ''}`}
                      onClick={() => onToggleStatus(item.id, isDelivered ? 'pending' : 'delivered')}
                    >
                      {isDelivered ? (
                        <>
                          <Check size={15} /> {item.updatedAt || 'Done'}
                        </>
                      ) : (
                        <>Delivered</>
                      )}
                    </button>

                    {/* Skip / Paused Option */}
                    <button
                      type="button"
                      className={`mk-action-btn ${isSkipped ? 'skip' : ''}`}
                      onClick={() => onToggleStatus(item.id, isSkipped ? 'pending' : 'skipped')}
                      title="Mark Skipped or Door Locked"
                    >
                      {isSkipped ? 'Skipped' : 'Skip'}
                    </button>

                    {/* WhatsApp Quick Message */}
                    <button
                      type="button"
                      className="mk-action-btn whatsapp"
                      onClick={() => onOpenWhatsApp(item)}
                      title="Send WhatsApp confirmation"
                    >
                      <MessageCircle size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
