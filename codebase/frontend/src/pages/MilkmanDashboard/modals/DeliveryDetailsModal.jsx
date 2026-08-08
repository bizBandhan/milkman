import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Milk, Clock, FileText } from 'lucide-react';

export function DeliveryDetailsModal({ isOpen, onClose, delivery, onUpdateDelivery }) {
  if (!isOpen || !delivery) return null;

  const [status, setStatus] = useState(delivery.status || 'delivered');
  const [deliveredQty, setDeliveredQty] = useState(delivery.deliveredQty ?? delivery.quantityLiters);
  const [notes, setNotes] = useState(delivery.notes || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateDelivery({
      ...delivery,
      status,
      deliveredQty: parseFloat(deliveredQty),
      notes,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    onClose();
  };

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="mk-modal-header">
          <div>
            <h3>Delivery Details & Log</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--mk-text-muted)' }}>
              {delivery.customerName} — {delivery.address}
            </span>
          </div>
          <button className="mk-close-btn" type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="mk-form-group">
              <label>Delivery Status</label>
              <select className="mk-form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="delivered">✅ Delivered</option>
                <option value="pending">⏳ Pending Delivery</option>
                <option value="skipped">⚠️ Skipped / Door Locked</option>
                <option value="paused">⏸️ Household On Leave</option>
              </select>
            </div>

            <div className="mk-form-group">
              <label>Delivered Liters</label>
              <input
                type="number"
                step="0.25"
                min="0"
                className="mk-form-input"
                value={deliveredQty}
                onChange={(e) => setDeliveredQty(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mk-form-group">
            <label>Delivery Notes / Special Instructions</label>
            <textarea
              className="mk-form-textarea"
              rows={3}
              placeholder="e.g. Left milk bag in door handle hooks as instructed."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button className="mk-btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="mk-btn-primary" type="submit">
              Save Log Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
