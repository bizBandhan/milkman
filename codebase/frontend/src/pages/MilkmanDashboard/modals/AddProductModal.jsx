import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { X, Milk, DollarSign, Layers, Hash, CheckCircle2 } from 'lucide-react';
import Input from './Input';
export function AddProductModal(
  {
    onClose,
    initialData,
    onSubmit = (d, e) => {
      e.preventDefault();
      console.log(d);
    }
  }
) {
  const form = useForm({
    defaultValues: initialData
  });
  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="mk-modal-header">
          <h3>{initialData ? 'Edit Product Item' : 'Add New Product Item'}</h3>
          <button className="mk-close-btn" type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={
          form.handleSubmit(onSubmit)
        }>
          <div className="mk-frm-row">
            <Input
              label="Product *"
              name="name"
              form={form}
              type="text"
            />

            <Input
              label="Unit Price (₹) *"
              name="price"
              form={form}
              type="number"
              min="1"
              step="0.01"
            />
          </div>
          <div className="mk-frm-row">
            <Input
              label="Unit *"
              name="unit"
              type="select"
              options={[
                { label: "Litre", value: "litre" },
                { label: "Kg", value: "kg" },
                { label: "Packet", value: "pkt" }
              ]}
              form={form}
            />
            <Input
              label="Quantity Increment *"
              name="stepSize"
              type="select"
              options={[
                { label: "0.25", value: "0.25" },
                { label: "0.5", value: "0.5" },
                { label: "1", value: "1" }
              ]}
              form={form}
            />
            <Input
              label="Minimum Order Size *"
              name="minimumOrder"
              type="number"
              step="0.01"
              min="0.01"
              form={form}
            />
          </div>

          <Input
            label="Total Capacity *"
            name="totalAvailability"
            type="number"
            step="0.01"
            min="0.01"
            form={form}
          />

          <div className='flex-apart'>
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
