import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Milk, DollarSign, Clock } from 'lucide-react';
import { useForm } from "react-hook-form";
import Input
  from './Input';
export function AddCustomerModal({ isOpen = true, onClose, onSave, initialData, products = [], onSubmit }) {
  const [product, setProduct] = React.useState({});
  const form = useForm({
    defaultValues: initialData
  });

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="mk-modal-header">
          <h3>{initialData ? 'Edit Customer Details' : 'Add New Customer'}</h3>
          <button className="mk-close-btn" type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>


        <form onSubmit={
          form.handleSubmit(onSubmit)
        }>
          <strong>Contact person:</strong>
          <div className="mk-frm-row">
            <Input
              label="Customer Name *"
              name="name"
              form={form}
              type="text"
            />
            <Input
              label="Whatsapp Number *"
              name="phone"
              form={form}
              type="text"
            />
            {/* add phone number validation with international code */}
          </div>
          <div className="mk-frm-row">
            <Input
              label="Delivery Address *"
              name="address"
              form={form}
              type="text"
            />
          </div>
          {/* future scope: add pincode -> Postoffice, District, State, Country [connect with postal data] */}
          <strong>Subscription Details</strong>
          <div className="mk-frm-row">
            <Input
              label="Product *"
              name="product"
              type="select"
              options={[{ name: "--Please-Select--", _id: "" }, ...products].map(p => ({
                label: p.name,
                value: p._id
              }))}
              form={form}
              onChange={
                e => {
                  let product = products.find(p => p._id === e.target.value)
                  setProduct(product)
                  // form.setValue("quantity",product.minimumOrder);
                  form.setValue("unitPrice", product.price);
                }
              }
            />
            {
              ("unit" in product)
              && <Input
                label={`Quantity (in ${product.unit})*`}
                name="quantity"
                form={form}
                type="number"
                step={product.stepSize}
                min={product.minimumOrder}
                max={product.totalAvailability}
              />
            }
            {
              ("price" in product)
              && <Input
                label={`Unit Price (in ₹ per ${product.unit}) *`}
                name="unitPrice"
                form={form}
                type="number"
                step="0.01"
              />
            }
            <Input
              label="Delivery Shift *"
              name="shift"
              type="select"
              options={[
                { label: "--Please-Select-", value: "" },
                { label: "Morning", value: "morning" },
                { label: "Evening", value: "evening" },
                { label: "Both", value: "both" }
              ]}
              form={form}
            />
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
