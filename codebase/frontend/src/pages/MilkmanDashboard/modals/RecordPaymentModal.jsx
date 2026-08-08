import React, { useState } from 'react';
import { X, CreditCard, DollarSign, Calendar, CheckCircle2, QrCode } from 'lucide-react';

export function RecordPaymentModal({ isOpen, onClose, customers, onSavePayment, selectedCustomer }) {
  const [customerId, setCustomerId] = useState(selectedCustomer?.id || (customers[0]?.id || ''));
  const [amount, setAmount] = useState(selectedCustomer?.balance > 0 ? selectedCustomer.balance : 500);
  const [method, setMethod] = useState('UPI');
  const [txnRef, setTxnRef] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const currentCust = customers.find((c) => c.id === customerId) || selectedCustomer;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId || !amount) return;

    onSavePayment({
      id: `pay_${Date.now()}`,
      customerId,
      customerName: currentCust?.name || 'Customer',
      amount: parseFloat(amount),
      method,
      txnRef: txnRef || `UPI-${Math.floor(100000 + Math.random() * 900000)}`,
      date,
      note
    });

    onClose();
  };

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="mk-modal-header">
          <h3>Record Payment Collection</h3>
          <button className="mk-close-btn" type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mk-form-group">
            <label>Select Household / Customer *</label>
            <select
              className="mk-form-select"
              value={customerId}
              onChange={(e) => {
                setCustomerId(e.target.value);
                const found = customers.find((c) => c.id === e.target.value);
                if (found && found.balance > 0) {
                  setAmount(found.balance);
                }
              }}
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — ({c.route}) [Dues: ₹{c.balance || 0}]
                </option>
              ))}
            </select>
          </div>

          {currentCust && (
            <div
              style={{
                backgroundColor: 'var(--mk-bg-subtle)',
                border: '1px solid var(--mk-border-color)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--mk-text-muted)' }}>Current Unpaid Dues</span>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: currentCust.balance > 0 ? 'var(--mk-accent-rose)' : 'var(--mk-primary)' }}>
                  ₹{currentCust.balance || 0}
                </div>
              </div>
              <button
                type="button"
                className="mk-btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                onClick={() => setAmount(currentCust.balance || 0)}
              >
                Clear Full Balance
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="mk-form-group">
              <label>Amount Collected (₹) *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  min="1"
                  className="mk-form-input"
                  style={{ width: '100%', paddingLeft: '2.4rem' }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <DollarSign size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--mk-text-subtle)' }} />
              </div>
            </div>

            <div className="mk-form-group">
              <label>Payment Method</label>
              <select className="mk-form-select" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="UPI">GooglePay / PhonePe / Paytm (UPI)</option>
                <option value="Cash">Cash Handed</option>
                <option value="Bank Transfer">Bank Transfer / NEFT</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="mk-form-group">
              <label>Payment Date</label>
              <input type="date" className="mk-form-input" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="mk-form-group">
              <label>UPI / Receipt Ref No.</label>
              <input
                type="text"
                className="mk-form-input"
                placeholder="e.g. 408512398"
                value={txnRef}
                onChange={(e) => setTxnRef(e.target.value)}
              />
            </div>
          </div>

          <div className="mk-form-group">
            <label>Notes / Remarks</label>
            <input
              type="text"
              className="mk-form-input"
              placeholder="e.g. Paid via QR scan at front porch"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button className="mk-btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="mk-btn-primary" type="submit">
              <CheckCircle2 size={16} /> Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
