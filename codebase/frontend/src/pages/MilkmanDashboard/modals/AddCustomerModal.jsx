import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Milk, DollarSign, Clock } from 'lucide-react';

export function AddCustomerModal({ isOpen, onClose, onSave, initialData, products = [] }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      phone: '',
      address: '',
      route: 'North Sector A',
      milkType: 'Cow Milk',
      quantityLiters: 1.5,
      pricePerLiter: 65,
      shift: 'Morning',
      status: 'active',
      balance: 0
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleProductSelect = (selectedVariant) => {
    const matched = products.find((p) => p.name.toLowerCase() === selectedVariant.toLowerCase());
    setFormData((prev) => ({
      ...prev,
      milkType: selectedVariant,
      pricePerLiter: matched ? matched.price : prev.pricePerLiter,
      quantityLiters: matched ? Math.max(matched.minimumOrder, prev.quantityLiters) : prev.quantityLiters
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onSave({
      ...formData,
      id: initialData?.id || `cust_${Date.now()}`,
      quantityLiters: parseFloat(formData.quantityLiters) || 1,
      pricePerLiter: parseFloat(formData.pricePerLiter) || 65,
      balance: parseFloat(formData.balance) || 0
    });
    onClose();
  };

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="mk-modal-header">
          <h3>{initialData ? 'Edit Customer Details' : 'Add New Customer'}</h3>
          <button className="mk-close-btn" type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mk-form-group">
            <label>Customer Full Name *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="mk-form-input"
                style={{ width: '100%', paddingLeft: '2.4rem' }}
                placeholder="e.g. Ramesh Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <User size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--mk-text-subtle)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="mk-form-group">
              <label>Phone / WhatsApp *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  className="mk-form-input"
                  style={{ width: '100%', paddingLeft: '2.4rem' }}
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Phone size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--mk-text-subtle)' }} />
              </div>
            </div>

            <div className="mk-form-group">
              <label>Route / Area</label>
              <select
                className="mk-form-select"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
              >
                <option value="North Sector A">North Sector A</option>
                <option value="South Colony">South Colony</option>
                <option value="Green Park Route">Green Park Route</option>
                <option value="Central Apartments">Central Apartments</option>
              </select>
            </div>
          </div>

          <div className="mk-form-group">
            <label>Delivery Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="mk-form-input"
                style={{ width: '100%', paddingLeft: '2.4rem' }}
                placeholder="House / Flat No., Street, Landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <MapPin size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--mk-text-subtle)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="mk-form-group">
              <label>Milk Variant</label>
              <select
                className="mk-form-select"
                value={formData.milkType}
                onChange={(e) => handleProductSelect(e.target.value)}
              >
                {products.length > 0 ? (
                  products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} (₹{p.price}/L)
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Cow Milk">Cow Milk (₹65/L)</option>
                    <option value="Buffalo Milk">Buffalo Milk (₹72/L)</option>
                    <option value="Full Cream Milk">Full Cream Milk (₹68/L)</option>
                    <option value="Toned Milk">Toned Milk (₹54/L)</option>
                  </>
                )}
              </select>
            </div>

            <div className="mk-form-group">
              <label>Daily Qty (Liters)</label>
              <input
                type="number"
                step="0.25"
                min="0.25"
                className="mk-form-input"
                value={formData.quantityLiters}
                onChange={(e) => setFormData({ ...formData, quantityLiters: e.target.value })}
                required
              />
            </div>

            <div className="mk-form-group">
              <label>Rate / Litre (₹)</label>
              <input
                type="number"
                min="10"
                className="mk-form-input"
                value={formData.pricePerLiter}
                onChange={(e) => setFormData({ ...formData, pricePerLiter: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="mk-form-group">
              <label>Delivery Shift</label>
              <select
                className="mk-form-select"
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
              >
                <option value="Morning">Morning (5:30 AM - 8:00 AM)</option>
                <option value="Evening">Evening (5:00 PM - 7:30 PM)</option>
                <option value="Both">Both Shifts</option>
              </select>
            </div>

            <div className="mk-form-group">
              <label>Opening Balance (₹)</label>
              <input
                type="number"
                className="mk-form-input"
                placeholder="0"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button className="mk-btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="mk-btn-primary" type="submit">
              {initialData ? 'Update Customer' : 'Save Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
