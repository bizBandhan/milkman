import React, { useState, useEffect } from 'react';
import {
  Milk,
  Truck,
  Users,
  CreditCard,
  BarChart3,
  Sun,
  Moon,
  Laptop,
  Plus,
  RefreshCw,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  DollarSign,
  TrendingUp,
  Layers,
  Package,
  Settings
} from 'lucide-react';
import './MilkmanDashboard.css';
import { useApiState } from "react-api-state";
import { DeliveryRouteTab } from './tabs/DeliveryRouteTab';
import { CustomerDirectoryTab } from './tabs/CustomerDirectoryTab';
import { ProductsTab } from './tabs/ProductsTab';
import { MilkStockTab } from './tabs/MilkStockTab';
import { LedgerPaymentsTab } from './tabs/LedgerPaymentsTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { SettingsTab } from './tabs/SettingsTab';

import { AddCustomerModal } from './modals/AddCustomerModal';
import { AddProductModal } from './modals/AddProductModal';
import { RecordPaymentModal } from './modals/RecordPaymentModal';
import { DeliveryDetailsModal } from './modals/DeliveryDetailsModal';
import { WhatsAppReminderModal } from './modals/WhatsAppReminderModal';

import { api, loadData } from '../../utils';
const navMenu = [
  {
    label: "Deliveries",
    tab: "route",
    icon: <Truck size={17} />
  },
  {
    label: "Products",
    tab: "products",
    icon: <Package size={17} />
  },
  {
    label: "Customers",
    tab: "customers",
    icon: <Users size={17} />
  },
  {
    label: "Transactions",
    tab: "ledger",
    icon: <CreditCard size={17} />
  },
  {
    label: "Settings",
    tab: "settings",
    icon: <Settings size={17} />
  }
];
export function MilkmanDashboard({ user, pravah, business }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('mk-theme') || 'system');

  // Active Tab: 'route' | 'products' | 'customers' | 'stock' | 'ledger' | 'analytics' | 'settings'
  const [activeTab, setActiveTab] = useState('products');

  const [openModal, setOpenModal] = React.useState(null)
  const [modalData, setModalData] = React.useState({});

  // Data State Initialized Empty, populated via api.get and loadData from public/data/
  const product = useApiState("/api/v1/product")

  const [customers, setCustomers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [payments, setPayments] = useState([]);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('All');
  const [selectedShift, setSelectedShift] = useState('All');

  // Modals Control
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [selectedPaymentCust, setSelectedPaymentCust] = useState(null);

  const [selectedDeliveryItem, setSelectedDeliveryItem] = useState(null);
  const [whatsAppCustomer, setWhatsAppCustomer] = useState(null);

  // Sync state
  const [showInfo, setShowInfo] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    localStorage.setItem('mk-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch initial data from public/data/*.json using utils/api & loadData
  useEffect(() => {
    product.refresh();
    // 2. Fetch Customers
    const savedCustomers = localStorage.getItem('mk_customers_data');
    if (savedCustomers) {
      try {
        setCustomers(JSON.parse(savedCustomers));
      } catch (e) {
        console.error(e);
      }
    } else {
      loadData(
        api.get('/data/customers.json'),
        (res) => {
          if (Array.isArray(res)) setCustomers(res);
        },
        () => { }
      );
    }

    // 3. Fetch Deliveries
    const savedDeliveries = localStorage.getItem('mk_deliveries_data');
    if (savedDeliveries) {
      try {
        setDeliveries(JSON.parse(savedDeliveries));
      } catch (e) {
        console.error(e);
      }
    } else {
      loadData(
        api.get('/data/deliveries.json'),
        (res) => {
          if (Array.isArray(res)) setDeliveries(res);
        },
        () => { }
      );
    }

    // 4. Fetch Payments
    const savedPayments = localStorage.getItem('mk_payments_data');
    if (savedPayments) {
      try {
        setPayments(JSON.parse(savedPayments));
      } catch (e) {
        console.error(e);
      }
    } else {
      loadData(
        api.get('/data/payments.json'),
        (res) => {
          if (Array.isArray(res)) setPayments(res);
        },
        () => { }
      );
    }
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem('mk_customers_data', JSON.stringify(customers));
    }
  }, [customers]);

  useEffect(() => {
    if (deliveries.length > 0) {
      localStorage.setItem('mk_deliveries_data', JSON.stringify(deliveries));
    }
  }, [deliveries]);

  useEffect(() => {
    if (payments.length > 0) {
      localStorage.setItem('mk_payments_data', JSON.stringify(payments));
    }
  }, [payments]);


  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product variant?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Handlers for Delivery Status
  const handleToggleStatus = (id, newStatus) => {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...d,
            status: newStatus,
            updatedAt: newStatus === 'delivered' ? nowTime : d.updatedAt
          };
        }
        return d;
      })
    );
  };

  const handleAdjustQty = (id, delta) => {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const current = d.deliveredQty ?? d.quantityLiters;
          const updated = Math.max(0, Math.round((current + delta) * 100) / 100);
          return { ...d, deliveredQty: updated };
        }
        return d;
      })
    );
  };

  // Handlers for Customer Management
  const handleSaveCustomer = (custData) => {
    if (editingCustomer) {
      setCustomers((prev) => prev.map((c) => (c.id === custData.id ? custData : c)));
      setEditingCustomer(null);
    } else {
      setCustomers((prev) => [custData, ...prev]);

      const newDelivery = {
        id: `del_${Date.now()}`,
        customerId: custData.id,
        customerName: custData.name,
        address: custData.address,
        route: custData.route,
        milkType: custData.milkType,
        quantityLiters: custData.quantityLiters,
        deliveredQty: custData.quantityLiters,
        shift: custData.shift,
        status: custData.status === 'active' ? 'pending' : 'paused',
        updatedAt: '',
        notes: ''
      };
      setDeliveries((prev) => [newDelivery, ...prev]);
    }
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to remove this household from your route?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      setDeliveries((prev) => prev.filter((d) => d.customerId !== id));
    }
  };

  const handleSavePayment = (paymentData) => {
    setPayments((prev) => [paymentData, ...prev]);
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === paymentData.customerId) {
          const newBal = Math.max(0, (c.balance || 0) - paymentData.amount);
          return { ...c, balance: newBal };
        }
        return c;
      })
    );
  };

  const handleManualSync = () => {
    product.sync();
    setIsSyncing(true);
    // Reload seed data via API
    loadData(
      Promise.all([

        api.get('/data/customers.json'),
        api.get('/data/deliveries.json'),
        api.get('/data/payments.json')
      ]),
      ([custRes, delRes, payRes]) => {
        if (Array.isArray(prodRes)) setProducts(prodRes);
        if (Array.isArray(custRes)) setCustomers(custRes);
        if (Array.isArray(delRes)) setDeliveries(delRes);
        if (Array.isArray(payRes)) setPayments(payRes);
      },
      () => {
        setIsSyncing(false);
      }
    );
  };

  const routesList = Array.from(new Set(deliveries.map((d) => d.route)));

  return (
    <div className="mk-dashboard-container" data-dashboard-theme={theme}>
      <div className="mk-dashboard-wrapper">
        {/* Top Header Bar with Top Right Aligned Sync Button */}
        <header className="mk-header">
          <div className="mk-header-title-group">
            <div>
              <h1 className="mk-header-title capitalize">{business?.name ?? ""}</h1>
              <p className="mk-header-subtitle">
                <span className={`mk-badge-status ${isOnline ? 'online' : 'offline'}`}>
                  <span className="mk-pulse-dot" />
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </p>
            </div>
          </div>
          <div className="mk-header-controls">
            <button
              onClick={e => { setShowInfo(!showInfo) }}
              className={`mk-btn-${showInfo ? "primary" : "secondary"}`}
              title="Show info"
            >
              <i className="fa-solid fa-info" />
            </button>
            <button
              className="mk-btn-secondary"
              type="button"
              onClick={handleManualSync}
              disabled={isSyncing}
              title="Syncronize"
            >
              <RefreshCw size={15} className={isSyncing ? 'spin-icon' : ''} />
              {/* {isSyncing ? 'Syncing...' : 'Sync'} */}
            </button>
          </div>
        </header>

        <nav className="mk-tabs-nav desktop-only">
          {
            navMenu.map(
              menuItem => <button
                key={menuItem.tab}
                type="button"
                className={`mk-tab-item ${activeTab === menuItem.tab ? 'active' : ''}`}
                onClick={() => setActiveTab(menuItem.tab)}
              >
                {menuItem.icon} {menuItem.label}
              </button>
            )
          }
        </nav>

        <main>
          {activeTab === 'route' && (
            <DeliveryRouteTab
              {...{ showInfo, deliveries }}
              onToggleStatus={handleToggleStatus}
              onAdjustQty={handleAdjustQty}
              onOpenDetails={(item) => setSelectedDeliveryItem(item)}
              onOpenWhatsApp={(item) => {
                const cust = customers.find((c) => c.id === item.customerId) || {
                  name: item.customerName,
                  phone: '9810012345',
                  quantityLiters: item.quantityLiters,
                  milkType: item.milkType,
                  balance: 840
                };
                setWhatsAppCustomer(cust);
              }}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
              routesList={routesList}
              selectedShift={selectedShift}
              setSelectedShift={setSelectedShift}
            />
          )}

          {activeTab === 'products' && (
            <ProductsTab
              products={product.data}
              deliveries={deliveries}
              onAddProduct={() => {
                setOpenModal("product-form");
                setModalData(null);
              }}
              onEditProduct={(prod) => {
                setModalData(prod);
                setOpenModal("product-form");
              }}
              onDeleteProduct={async id => {
                await product.delete(id)
              }}
            />
          )}

          {activeTab === 'customers' && (
            <CustomerDirectoryTab
              customers={customers}
              onAddCustomer={() => {
                setEditingCustomer(null);
                setIsAddCustomerOpen(true);
              }}
              onEditCustomer={(cust) => {
                setEditingCustomer(cust);
                setIsAddCustomerOpen(true);
              }}
              onDeleteCustomer={handleDeleteCustomer}
              onOpenWhatsApp={(cust) => setWhatsAppCustomer(cust)}
              onRecordPayment={(cust) => {
                setSelectedPaymentCust(cust);
                setIsRecordPaymentOpen(true);
              }}
            />
          )}

          {activeTab === 'stock' && <MilkStockTab deliveries={deliveries} customers={customers} />}

          {activeTab === 'ledger' && (
            <LedgerPaymentsTab
              payments={payments}
              customers={customers}
              onRecordPayment={(cust) => {
                setSelectedPaymentCust(cust || null);
                setIsRecordPaymentOpen(true);
              }}
              onOpenWhatsApp={(cust) => setWhatsAppCustomer(cust)}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab deliveries={deliveries} customers={customers} payments={payments} />
          )}

          {activeTab === 'settings' && (
            <SettingsTab theme={theme} setTheme={setTheme} onSyncData={handleManualSync} />
          )}
        </main>
      </div>

      <nav className="mk-bottom-nav-mobile">
        {
          navMenu.map(
            menuItem =>
              <button
                key={menuItem.tab}
                type="button"
                className={`mk-bottom-nav-item ${activeTab === menuItem.tab ? 'active' : ''}`}
                onClick={() => setActiveTab(menuItem.tab)}
              >
                <div className="mk-bottom-icon-box">
                  {menuItem.icon}
                </div>
                <span>{menuItem.label}</span>
              </button>
          )}
      </nav>

      {/* Modals & Slide-Overs */}
      {
        openModal === "product-form"
        && <AddProductModal
          onClose={() => {
            setOpenModal(null);
            setModalData({});
          }}
          onSubmit={async (d, e) => {
            await product.add({
              name: d.name,
              price: Number(d.price),
              stepSize: Number(d.stepSize),
              minimumOrder: Number(d.minimumOrder),
              totalAvailablity: Number(d.totalAvailablity),
              unit: d.unit
            })
            setOpenModal(null);
            setModalData({});
          }}
          initialData={modalData}
        />
      }

      <AddCustomerModal
        isOpen={isAddCustomerOpen}
        onClose={() => {
          setIsAddCustomerOpen(false);
          setEditingCustomer(null);
        }}
        onSave={handleSaveCustomer}
        initialData={editingCustomer}
        products={product.data}
      />

      <RecordPaymentModal
        isOpen={isRecordPaymentOpen}
        onClose={() => {
          setIsRecordPaymentOpen(false);
          setSelectedPaymentCust(null);
        }}
        customers={customers}
        selectedCustomer={selectedPaymentCust}
        onSavePayment={handleSavePayment}
      />

      <DeliveryDetailsModal
        isOpen={Boolean(selectedDeliveryItem)}
        onClose={() => setSelectedDeliveryItem(null)}
        delivery={selectedDeliveryItem}
        onUpdateDelivery={(updated) => {
          setDeliveries((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
        }}
      />

      <WhatsAppReminderModal
        isOpen={Boolean(whatsAppCustomer)}
        onClose={() => setWhatsAppCustomer(null)}
        customer={whatsAppCustomer}
      />
    </div>
  );
}
export default MilkmanDashboard;
