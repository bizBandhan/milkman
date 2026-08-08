import React, { useState, useEffect } from 'react';
import { X, Milk, DollarSign, Layers, Hash, CheckCircle2 } from 'lucide-react';

export function AddProductModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: 'Cow Milk',
    price: 65.0,
    unit: 'Litre',
    stepSize: 0.25,
    minimumOrder: 0.5,
    totalAvailability: 20.0,
    description: 'Fresh farm A2 Cow Milk delivered daily'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: 'Cow Milk',
        price: 65.0,
        unit: 'Litre',
        stepSize: 0.25,
        minimumOrder: 0.5,
        totalAvailability: 20.0,
        description: 'Fresh farm A2 Cow Milk delivered daily'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    onSave({
      ...formData,
      id: initialData?.id || `prod_${Date.now()}`,
      price: parseFloat(formData.price) || 65.0,
      stepSize: parseFloat(formData.stepSize) || 0.25,
      minimumOrder: parseFloat(formData.minimumOrder) || 0.5,
      totalAvailability: parseFloat(formData.totalAvailability) || 20.0
    });

    onClose();
  };

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="mk-modal-header">
          <h3>{initialData ? 'Edit Product Item' : 'Add New Product Item'}</h3>
          <button className="mk-close-btn" type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="mk-form-group">
              <label>Product Variant Name *</label>
              <input
                type="text"
                className="mk-form-input"
                placeholder="e.g. Cow Milk"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="mk-form-group">
              <label>Price / Unit (₹) *</label>
              <input
                type="number"
                step="0.5"
                min="1"
                className="mk-form-input"
                placeholder="65.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="mk-form-group">
              <label>Unit of Measure</label>
              <select
                className="mk-form-select"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option value="Litre">Litre (L)</option>
                <option value="Kg">Kilogram (Kg)</option>
                <option value="Packet">Packet</option>
                <option value="Bottle">Bottle</option>
              </select>
            </div>

            <div className="mk-form-group">
              <label>Step Size</label>
              <select
                className="mk-form-select"
                value={formData.stepSize}
                onChange={(e) => setFormData({ ...formData, stepSize: parseFloat(e.target.value) })}
              >
                <option value={0.25}>0.25 L</option>
                <option value={0.5}>0.50 L</option>
                <option value={1.0}>1.00 L</option>
              </select>
            </div>

            <div className="mk-form-group">
              <label>Min Order Qty</label>
              <input
                type="number"
                step="0.25"
                min="0.1"
                className="mk-form-input"
                placeholder="0.5"
                value={formData.minimumOrder}
                onChange={(e) => setFormData({ ...formData, minimumOrder: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div className="mk-form-group">
              <label>Daily Total Availability Cap *</label>
              <input
                type="number"
                step="0.5"
                min="1"
                className="mk-form-input"
                placeholder="20.0"
                value={formData.totalAvailability}
                onChange={(e) => setFormData({ ...formData, totalAvailability: e.target.value })}
                required
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--mk-text-subtle)' }}>
                Max units/litres you can deliver per day
              </span>
            </div>

            <div className="mk-form-group">
              <label>Description / Notes</label>
              <input
                type="text"
                className="mk-form-input"
                placeholder="Pure farm fresh A2 milk"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button className="mk-btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="mk-btn-primary" type="submit">
              <CheckCircle2 size={16} />
              {initialData ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
