import React, { useState } from 'react';
import { X, Send, MessageCircle, Copy, Check } from 'lucide-react';

export function WhatsAppReminderModal({ isOpen, onClose, customer }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !customer) return null;

  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const defaultMessage = `Namaste ${customer.name} ji 🙏\n\nYour milk delivery statement for ${currentMonth} is ready.\n\n🥛 Subscribed Milk: ${customer.quantityLiters}L (${customer.milkType})\n💰 Total Dues: ₹${customer.balance || 0}\n\nPlease pay using UPI or Cash at your convenience.\nThank you! — BizBandhan Milk Services`;

  const [messageText, setMessageText] = useState(defaultMessage);

  const cleanPhone = customer.phone.replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="mk-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#25D366',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MessageCircle size={20} />
            </div>
            <h3>Send WhatsApp Statement</h3>
          </div>
          <button className="mk-close-btn" type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="mk-form-group">
          <label>Customer Details</label>
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              backgroundColor: 'var(--mk-bg-subtle)',
              border: '1px solid var(--mk-border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontWeight: '600' }}>{customer.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--mk-text-muted)' }}>+{formattedPhone}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--mk-text-muted)' }}>Pending Amount</div>
              <div style={{ fontWeight: '700', color: 'var(--mk-accent-rose)', fontSize: '1.1rem' }}>
                ₹{customer.balance || 0}
              </div>
            </div>
          </div>
        </div>

        <div className="mk-form-group">
          <label>Message Preview / Edit</label>
          <textarea
            className="mk-form-textarea"
            rows={7}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
          <button className="mk-btn-secondary" type="button" onClick={handleCopy}>
            {copied ? <Check size={16} color="var(--mk-primary)" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mk-btn-primary"
            style={{ backgroundColor: '#25D366', textDecoration: 'none' }}
          >
            <Send size={16} /> Open in WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
