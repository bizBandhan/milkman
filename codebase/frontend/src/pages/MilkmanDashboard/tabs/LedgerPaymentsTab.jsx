import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  MessageCircle,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Download,
  Receipt
} from 'lucide-react';

export function LedgerPaymentsTab({ payments, customers, onRecordPayment, onOpenWhatsApp }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');

  const totalCollected = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const totalDues = customers.reduce((acc, c) => acc + (c.balance || 0), 0);
  const upiCount = payments.filter((p) => p.method === 'UPI').length;
  const cashCount = payments.filter((p) => p.method === 'Cash').length;

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.txnRef && p.txnRef.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMethod = methodFilter === 'All' || p.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  return (
    <div className="mk-tab-content">
      {/* Ledger Stats Summary */}
      <div className="mk-kpi-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Total Collected This Month</span>
            <div className="mk-kpi-icon-box green">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">₹{totalCollected.toLocaleString()}</div>
          <div className="mk-kpi-footer">
            <span>UPI: {upiCount} txns | Cash: {cashCount} txns</span>
          </div>
        </div>

        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">Total Outstanding Dues</span>
            <div className="mk-kpi-icon-box rose">
              <CreditCard size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">₹{totalDues.toLocaleString()}</div>
          <div className="mk-kpi-footer">
            <span>Across {customers.filter((c) => c.balance > 0).length} Households</span>
          </div>
        </div>

        <div className="mk-kpi-card">
          <div className="mk-kpi-top">
            <span className="mk-kpi-label">UPI Online Share</span>
            <div className="mk-kpi-icon-box blue">
              <Receipt size={20} />
            </div>
          </div>
          <div className="mk-kpi-value">
            {payments.length > 0 ? Math.round((upiCount / payments.length) * 100) : 0}%
          </div>
          <div className="mk-kpi-footer">
            <span>Direct QR Code payments</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mk-toolbar">
        <div className="mk-search-box">
          <Search size={18} color="var(--mk-text-subtle)" />
          <input
            type="text"
            placeholder="Search by customer name or UPI Txn Ref ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mk-filter-group">
          <select
            className="mk-select-input"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
          >
            <option value="All">All Payment Modes</option>
            <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
            <option value="Cash">Cash Collections</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          <button className="mk-btn-primary" type="button" onClick={() => onRecordPayment()}>
            <Plus size={16} /> Record Payment
          </button>
        </div>
      </div>

      {/* Payment Receipts History Table */}
      <div className="mk-table-container">
        <table className="mk-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Customer Household</th>
              <th>Amount Paid</th>
              <th>Payment Mode</th>
              <th>Txn Reference ID</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem' }}>
                  <Receipt size={28} color="var(--mk-text-subtle)" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ margin: 0, color: 'var(--mk-text-muted)' }}>No payment records found.</p>
                </td>
              </tr>
            ) : (
              filteredPayments.map((p) => {
                const cust = customers.find((c) => c.id === p.customerId);
                return (
                  <tr key={p.id}>
                    <td>{p.date}</td>
                    <td>
                      <div style={{ fontWeight: '600' }}>{p.customerName}</div>
                      {cust && <div style={{ fontSize: '0.78rem', color: 'var(--mk-text-muted)' }}>{cust.route}</div>}
                    </td>
                    <td>
                      <strong style={{ color: 'var(--mk-primary)', fontSize: '1rem' }}>₹{p.amount}</strong>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: '600',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          backgroundColor: p.method === 'UPI' ? 'var(--mk-accent-blue-light)' : 'var(--mk-bg-subtle)',
                          color: p.method === 'UPI' ? 'var(--mk-accent-blue)' : 'var(--mk-text-main)'
                        }}
                      >
                        {p.method}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', fontFamily: 'monospace' }}>{p.txnRef || 'N/A'}</td>
                    <td>
                      <span className="mk-badge-status online">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {cust && (
                        <button
                          type="button"
                          className="mk-action-btn whatsapp"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                          onClick={() => onOpenWhatsApp(cust)}
                        >
                          <MessageCircle size={14} /> Send Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
