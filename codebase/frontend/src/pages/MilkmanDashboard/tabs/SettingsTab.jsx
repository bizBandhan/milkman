import React from 'react';
import { Sun, Moon, Laptop, Settings, ShieldCheck, Database, Phone, Check, RefreshCw } from 'lucide-react';

export function SettingsTab({ theme, setTheme, onSyncData }) {
  return (
    <div className="mk-tab-content">
      <div
        style={{
          backgroundColor: 'var(--mk-bg-surface)',
          border: '1px solid var(--mk-border-color)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: 'var(--mk-card-shadow)',
          maxWidth: '700px',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--mk-border-color)' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--mk-primary-light)',
              color: 'var(--mk-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Settings size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: 'var(--mk-text-heading)' }}>
              Vendor App & Theme Settings
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--mk-text-muted)' }}>
              Configure visual appearance, Gateway API & offline queue options
            </span>
          </div>
        </div>

        {/* Color Scheme / Theme Selector Section */}
        <div className="mk-form-group" style={{ marginBottom: '1.75rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--mk-text-heading)', marginBottom: '0.65rem' }}>
            Color Theme & Appearance
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.75rem'
            }}
          >
            <button
              type="button"
              className={`mk-btn-secondary ${theme === 'system' ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 0.75rem',
                borderRadius: '14px',
                borderColor: theme === 'system' ? 'var(--mk-primary)' : 'var(--mk-border-color)',
                backgroundColor: theme === 'system' ? 'var(--mk-primary-light)' : 'var(--mk-bg-subtle-solid)',
                color: theme === 'system' ? 'var(--mk-primary)' : 'var(--mk-text-main)'
              }}
              onClick={() => setTheme('system')}
            >
              <Laptop size={24} />
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Auto (System)</span>
            </button>

            <button
              type="button"
              className={`mk-btn-secondary ${theme === 'light' ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 0.75rem',
                borderRadius: '14px',
                borderColor: theme === 'light' ? 'var(--mk-primary)' : 'var(--mk-border-color)',
                backgroundColor: theme === 'light' ? 'var(--mk-primary-light)' : 'var(--mk-bg-subtle-solid)',
                color: theme === 'light' ? 'var(--mk-primary)' : 'var(--mk-text-main)'
              }}
              onClick={() => setTheme('light')}
            >
              <Sun size={24} />
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Light Mode</span>
            </button>

            <button
              type="button"
              className={`mk-btn-secondary ${theme === 'dark' ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 0.75rem',
                borderRadius: '14px',
                borderColor: theme === 'dark' ? 'var(--mk-primary)' : 'var(--mk-border-color)',
                backgroundColor: theme === 'dark' ? 'var(--mk-primary-light)' : 'var(--mk-bg-subtle-solid)',
                color: theme === 'dark' ? 'var(--mk-primary)' : 'var(--mk-text-main)'
              }}
              onClick={() => setTheme('dark')}
            >
              <Moon size={24} />
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* WhatsApp & Vendor Business Info */}
        <div className="mk-form-group" style={{ marginBottom: '1.75rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--mk-text-heading)', marginBottom: '0.65rem' }}>
            Business WhatsApp Gateway API
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
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>BizBandhan Pravah Gateway</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--mk-text-muted)' }}>+91 93111 50364 (Active Route Channel)</div>
            </div>
            <span className="mk-badge-status online">Connected</span>
          </div>
        </div>

        {/* Local Storage & Sync Queue */}
        <div className="mk-form-group">
          <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--mk-text-heading)', marginBottom: '0.65rem' }}>
            Offline Delivery Queue & Sync
          </label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="mk-btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={onSyncData}
            >
              <RefreshCw size={16} /> Force Sync Queue Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
