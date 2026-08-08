import React from 'react';
import { X, Sun, Moon, Laptop, Settings, ShieldCheck, Database, Phone, Check } from 'lucide-react';

export function SettingsModal({ isOpen, onClose, theme, setTheme, onSyncData }) {
  if (!isOpen) return null;

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
                backgroundColor: 'var(--mk-primary-light)',
                color: 'var(--mk-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Settings size={20} />
            </div>
            <h3>Dashboard Settings</h3>
          </div>
          <button className="mk-close-btn" type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Color Scheme / Theme Selector Section */}
        <div className="mk-form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--mk-text-heading)', marginBottom: '0.5rem' }}>
            Color Theme & Appearance
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0.65rem'
            }}
          >
            <button
              type="button"
              className={`mk-btn-secondary ${theme === 'system' ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.85rem 0.5rem',
                borderRadius: '12px',
                borderColor: theme === 'system' ? 'var(--mk-primary)' : 'var(--mk-border-color)',
                backgroundColor: theme === 'system' ? 'var(--mk-primary-light)' : 'var(--mk-bg-subtle-solid)',
                color: theme === 'system' ? 'var(--mk-primary)' : 'var(--mk-text-main)'
              }}
              onClick={() => setTheme('system')}
            >
              <Laptop size={22} />
              <span style={{ fontSize: '0.82rem', fontWeight: '600' }}>Auto (System)</span>
            </button>

            <button
              type="button"
              className={`mk-btn-secondary ${theme === 'light' ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.85rem 0.5rem',
                borderRadius: '12px',
                borderColor: theme === 'light' ? 'var(--mk-primary)' : 'var(--mk-border-color)',
                backgroundColor: theme === 'light' ? 'var(--mk-primary-light)' : 'var(--mk-bg-subtle-solid)',
                color: theme === 'light' ? 'var(--mk-primary)' : 'var(--mk-text-main)'
              }}
              onClick={() => setTheme('light')}
            >
              <Sun size={22} />
              <span style={{ fontSize: '0.82rem', fontWeight: '600' }}>Light Mode</span>
            </button>

            <button
              type="button"
              className={`mk-btn-secondary ${theme === 'dark' ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.85rem 0.5rem',
                borderRadius: '12px',
                borderColor: theme === 'dark' ? 'var(--mk-primary)' : 'var(--mk-border-color)',
                backgroundColor: theme === 'dark' ? 'var(--mk-primary-light)' : 'var(--mk-bg-subtle-solid)',
                color: theme === 'dark' ? 'var(--mk-primary)' : 'var(--mk-text-main)'
              }}
              onClick={() => setTheme('dark')}
            >
              <Moon size={22} />
              <span style={{ fontSize: '0.82rem', fontWeight: '600' }}>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* WhatsApp & Vendor Business Info */}
        <div className="mk-form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--mk-text-heading)', marginBottom: '0.5rem' }}>
            Business WhatsApp Gateway
          </label>
          <div
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              backgroundColor: 'var(--mk-bg-subtle-solid)',
              border: '1px solid var(--mk-border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>BizBandhan WhatsApp API</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--mk-text-muted)' }}>+91 93111 50364 (Active)</div>
            </div>
            <span className="mk-badge-status online">Connected</span>
          </div>
        </div>

        {/* Local Storage & Cache */}
        <div className="mk-form-group">
          <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--mk-text-heading)', marginBottom: '0.5rem' }}>
            Offline Data & Storage Sync
          </label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="mk-btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={onSyncData}
            >
              <Database size={16} /> Force Sync Queue
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button className="mk-btn-primary" type="button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
