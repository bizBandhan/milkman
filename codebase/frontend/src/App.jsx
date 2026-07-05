import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  CalendarRange,
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  KeyRound,
  LogOut,
  MessageCircleMore,
  Milk,
  NotebookTabs,
  Plus,
  ShieldCheck,
  Smartphone,
  Users,
  UserRound,
  WifiOff,
  X,
} from 'lucide-react'
import { usePravah, usePravahListener, usePravahState } from "pravah-sdk"
import './App.css'
import { Navbar, AuthModal } from "./components"
import { api } from './utils'
const AUTH_PROFILE_KEY = 'milkman-auth-profile'
const AUTH_TOKEN_KEY = 'milkman-auth-token'
const ADMIN_WHATSAPP_NUMBER = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER || '919311150364'

const dashboardHighlights = [
  { label: 'Connected channel', value: 'WhatsApp key verification' },
  { label: 'Session status', value: 'Frontend preview mode' },
  { label: 'Current surface', value: 'Delivery workflow' },
]

const featureCards = [
  {
    icon: Smartphone,
    title: 'Single-hand delivery flow',
    description:
      'A fast swipe-sheet for milkmen to mark deliveries on the route without slowing down at each home.',
  },
  {
    icon: WifiOff,
    title: 'Offline first by design',
    description:
      'Queue delivery updates locally and sync later, so poor connectivity does not break the morning run.',
  },
  {
    icon: CalendarRange,
    title: 'Shared family calendar',
    description:
      'Households can view upcoming deliveries, pause dates, and leave clear instructions without back-and-forth calls.',
  },
  {
    icon: CreditCard,
    title: 'Simple payment records',
    description:
      'Track manual and UPI collections with lightweight statements that reduce ledger disputes.',
  },
]

const journey = [
  'Milkman creates a client and starts a recurring order.',
  'A daily worker prepares draft delivery logs before the morning route.',
  'Deliveries are marked quickly on the phone, even when the signal drops.',
  'Families see the calendar, payment status, and pause controls in one place.',
]

const trustPoints = [
  { label: 'Built for', value: 'India-first milk routes' },
  { label: 'Core model', value: 'B2B2C micro-SaaS' },
  { label: 'Primary ops', value: 'Daily subscriptions and logs' },
  { label: 'Reliability goal', value: '99.5% ledger consistency' },
]

function generateAuthCode() {
  return Array.from({ length: 8 }, () => Math.random().toString(36).slice(2, 3).toUpperCase()).join('')
}

function createDemoAccessToken() {
  return `mkm_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

function buildWhatsAppUrl(phoneNumber, authCode) {
  const message = `Milkman login key: ${authCode}`
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}

function readStoredProfile() {
  try {
    const value = window.localStorage.getItem(AUTH_PROFILE_KEY)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

function createRegistrationState(phoneNumber = '') {
  return {
    name: '',
    phoneNumber,
    gender: '',
    email: '',
    address: '',
    landmark: '',
    referralCode: '',
    role: 'milkman',
    organizationName: '',
  }
}

const INITIAL_DELIVERIES = [
  { id: 'del-1', familyName: 'Tiwari ji, D Block', amountLitres: 3 },
  { id: 'del-2', familyName: 'Sharma Family, A Lane', amountLitres: 2.5 },
  { id: 'del-3', familyName: 'Gupta House, Corner Flat', amountLitres: 1.5 },
  { id: 'del-4', familyName: 'Verma Villa, Temple Road', amountLitres: 4 },
  { id: 'del-5', familyName: 'Khan Family, Green Park', amountLitres: 2 },
]

const CUSTOMER_HISTORY = {
  'Tiwari ji, D Block': {
    familyName: 'Tiwari ji, D Block',
    lastUpdate: 'Marked delivered today at 07:18 AM. Tap support later if the quantity needs correction.',
    lastPayment: { amount: 1850, date: '2026-06-15' },
    months: {
      '2026-06': [
        { date: '2026-06-02', quantity: 3, status: 'Delivered' },
        { date: '2026-06-04', quantity: 3, status: 'Delivered' },
        { date: '2026-06-08', quantity: 3, status: 'Delivered' },
        { date: '2026-06-11', quantity: 3, status: 'Pending' },
        { date: '2026-06-14', quantity: 3, status: 'Delivered' },
        { date: '2026-06-18', quantity: 3, status: 'Cancelled' },
      ],
      '2026-05': [
        { date: '2026-05-03', quantity: 3, status: 'Delivered' },
        { date: '2026-05-07', quantity: 3, status: 'Delivered' },
        { date: '2026-05-12', quantity: 3, status: 'Delivered' },
      ],
    },
  },
  'Sharma Family, A Lane': {
    familyName: 'Sharma Family, A Lane',
    lastUpdate: 'Leave request is active for one delivery slot this week.',
    lastPayment: { amount: 1240, date: '2026-06-09' },
    months: {
      '2026-06': [
        { date: '2026-06-01', quantity: 2.5, status: 'Delivered' },
        { date: '2026-06-05', quantity: 2.5, status: 'Delivered' },
        { date: '2026-06-09', quantity: 2.5, status: 'Pending' },
        { date: '2026-06-12', quantity: 2.5, status: 'Cancelled' },
      ],
    },
  },
  'Gupta House, Corner Flat': {
    familyName: 'Gupta House, Corner Flat',
    lastUpdate: 'Customer requested evening confirmation for the next delivery.',
    lastPayment: { amount: 920, date: '2026-06-13' },
    months: {
      '2026-06': [
        { date: '2026-06-02', quantity: 1.5, status: 'Delivered' },
        { date: '2026-06-06', quantity: 1.5, status: 'Delivered' },
        { date: '2026-06-10', quantity: 1.5, status: 'Pending' },
      ],
    },
  },
  'Verma Villa, Temple Road': {
    familyName: 'Verma Villa, Temple Road',
    lastUpdate: 'Customer added one extra litre on the previous delivery.',
    lastPayment: { amount: 2440, date: '2026-06-16' },
    months: {
      '2026-06': [
        { date: '2026-06-01', quantity: 4, status: 'Delivered' },
        { date: '2026-06-07', quantity: 4.5, status: 'Delivered' },
        { date: '2026-06-13', quantity: 4, status: 'Pending' },
      ],
    },
  },
  'Khan Family, Green Park': {
    familyName: 'Khan Family, Green Park',
    lastUpdate: 'No recent exception. Account is moving normally.',
    lastPayment: { amount: 1080, date: '2026-06-11' },
    months: {
      '2026-06': [
        { date: '2026-06-03', quantity: 2, status: 'Delivered' },
        { date: '2026-06-08', quantity: 2, status: 'Delivered' },
        { date: '2026-06-14', quantity: 2, status: 'Pending' },
      ],
    },
  },
}

function formatLitres(value) {
  return `${Number(value).toFixed(value % 1 === 0 ? 0 : 1)} Litre`
}

function formatDashboardDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function getDateKey(date) {
  return date.toISOString().slice(0, 10)
}

function getMonthKey(date) {
  return date.toISOString().slice(0, 7)
}

function formatMonthLabel(date) {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function estimateAmountFromLitres(litres) {
  return litres * 70
}

function buildMonthCalendar(date, deliveries) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const deliveryMap = new Map(deliveries.map((item) => [item.date, item]))
  const cells = []

  for (let index = 0; index < firstDay.getDay(); index += 1) {
    cells.push({ id: `empty-start-${index}`, isEmpty: true })
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), day)
    const dateKey = getDateKey(currentDate)
    cells.push({
      id: dateKey,
      day,
      delivery: deliveryMap.get(dateKey) || null,
      isToday: dateKey === getDateKey(new Date()),
    })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ id: `empty-end-${cells.length}`, isEmpty: true })
  }

  return cells
}

function createDeliveryState() {
  return {
    pending: INITIAL_DELIVERIES,
    completed: [],
    lastAction: null,
  }
}

function Dashboard({ profile, accessToken, onLogout, onGoHome }) {
  const entityLabel = profile.role === 'milkman' ? 'Dairy name' : 'Family name'
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [deliveryStateByDate, setDeliveryStateByDate] = useState(() => ({
    [getDateKey(new Date())]: createDeliveryState(),
  }))
  const [extraTarget, setExtraTarget] = useState(null)
  const [extraAmount, setExtraAmount] = useState(0.5)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedCustomerMonth, setSelectedCustomerMonth] = useState(() => new Date())

  const dateKey = getDateKey(selectedDate)
  const deliveryState = deliveryStateByDate[dateKey] || createDeliveryState()

  function updateCurrentDateState(updater) {
    setDeliveryStateByDate((current) => {
      const base = current[dateKey] || createDeliveryState()
      return {
        ...current,
        [dateKey]: updater(base),
      }
    })
  }

  function markDelivery(item, status, extraLitres = 0) {
    updateCurrentDateState((current) => {
      const pending = current.pending.filter((entry) => entry.id !== item.id)
      const completedEntry = {
        ...item,
        status,
        extraLitres,
        deliveredAt: new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      return {
        pending,
        completed: [...current.completed, completedEntry],
        lastAction: completedEntry,
      }
    })
  }

  function openExtraModal(item) {
    setExtraTarget(item)
    setExtraAmount(0.5)
  }

  function confirmExtraMilk() {
    if (!extraTarget) return
    markDelivery(extraTarget, 'Extra milk', extraAmount)
    setExtraTarget(null)
    setExtraAmount(0.5)
  }

  function shiftDate(days) {
    setSelectedDate((current) => {
      const next = new Date(current)
      next.setDate(next.getDate() + days)
      return next
    })
  }

  function openCustomerView(familyName) {
    const customer = CUSTOMER_HISTORY[familyName]
    if (!customer) return
    setSelectedCustomer(customer)
    setSelectedCustomerMonth(new Date(`${Object.keys(customer.months)[0]}-01T00:00:00`))
  }

  function shiftCustomerMonth(monthDelta) {
    setSelectedCustomerMonth((current) => {
      const next = new Date(current)
      next.setMonth(next.getMonth() + monthDelta)
      return next
    })
  }

  const selectedCustomerMonthKey = getMonthKey(selectedCustomerMonth)
  const selectedCustomerDeliveries = selectedCustomer?.months[selectedCustomerMonthKey] || []
  const deliveredTotal = selectedCustomerDeliveries
    .filter((item) => item.status === 'Delivered')
    .reduce((sum, item) => sum + item.quantity, 0)
  const pendingPayment = selectedCustomerDeliveries
    .filter((item) => item.status !== 'Cancelled')
    .reduce((sum, item) => sum + estimateAmountFromLitres(item.quantity), 0)
  const calendarCells = buildMonthCalendar(selectedCustomerMonth, selectedCustomerDeliveries)
  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="dashboard-shell">
      <header className="dashboard-topbar">
        <button className="dashboard-icon-button" type="button" onClick={ onGoHome } aria-label="Back to landing">
          <ArrowLeft size={ 18 } />
        </button>

        <div className="brand dashboard-brand">
          <div className="brand-mark">
            <Milk size={ 20 } strokeWidth={ 2.2 } />
          </div>
          <div>
            <p className="eyebrow">BizBandhan</p>
            <p className="brand-name">Milkman Dashboard</p>
          </div>
        </div>

        <button className="dashboard-icon-button" type="button" onClick={ onLogout } aria-label="Logout">
          <LogOut size={ 18 } />
        </button>
      </header>

      { !selectedCustomer ? (
        <section className="dashboard-date-strip" aria-label="Selected delivery date">
          <button className="date-button desktop-date-nav" type="button" onClick={ () => shiftDate(-1) }>
            <ArrowLeft size={ 18 } />
          </button>
          <div className="dashboard-date-center">
            <p className="eyebrow">Delivery date</p>
            <h3>{ formatDashboardDate(selectedDate) }</h3>
          </div>
          <button className="date-button desktop-date-nav" type="button" onClick={ () => shiftDate(1) }>
            <ArrowRight size={ 18 } />
          </button>
        </section>
      ) : null }

      <main className="dashboard-main">
        { selectedCustomer ? (
          <section className="dashboard-card customer-detail-view">
            <div className="customer-detail-head">
              <div>
                <p className="eyebrow">Customer view</p>
                <h2>{ selectedCustomer.familyName }</h2>
              </div>
              <button className="button button-secondary customer-back-button" type="button" onClick={ () => setSelectedCustomer(null) }>
                <ArrowLeft size={ 18 } />
                Back to deliveries
              </button>
            </div>

            <div className="dashboard-date-strip customer-month-strip">
              <button className="date-button" type="button" onClick={ () => shiftCustomerMonth(-1) }>
                <ArrowLeft size={ 18 } />
              </button>
              <div className="dashboard-date-center">
                <p className="eyebrow">Selected month</p>
                <h3>{ formatMonthLabel(selectedCustomerMonth) }</h3>
              </div>
              <button className="date-button" type="button" onClick={ () => shiftCustomerMonth(1) }>
                <ArrowRight size={ 18 } />
              </button>
            </div>

            <div className="customer-summary-grid">
              <article className="dashboard-card summary-card">
                <p className="eyebrow">Delivered quantity</p>
                <h3>{ formatLitres(deliveredTotal) }</h3>
              </article>
              <article className="dashboard-card summary-card">
                <p className="eyebrow">Pending payment</p>
                <h3>{ formatCurrency(pendingPayment) }</h3>
              </article>
              <article className="dashboard-card summary-card">
                <p className="eyebrow">Last payment</p>
                <h3>{ formatCurrency(selectedCustomer.lastPayment.amount) }</h3>
                <p>{ selectedCustomer.lastPayment.date }</p>
              </article>
            </div>

            <div className="last-action-buffer customer-buffer">
              <p className="eyebrow">Last updated information</p>
              <div className="last-action-content">
                <div>
                  <strong>Most recent note</strong>
                  <p>{ selectedCustomer.lastUpdate }</p>
                </div>
                <NotebookTabs size={ 18 } />
              </div>
            </div>

            <div className="customer-calendar">
              <div className="customer-calendar-head">
                { weekdayLabels.map((label) => (
                  <span key={ label }>{ label }</span>
                )) }
              </div>

              <div className="customer-calendar-grid">
                { calendarCells.map((cell) =>
                  cell.isEmpty ? (
                    <div className="calendar-cell calendar-cell-empty" key={ cell.id } />
                  ) : (
                    <article
                      className={ `calendar-cell ${cell.delivery ? 'calendar-cell-active' : ''} ${cell.isToday ? 'calendar-cell-today' : ''
                        }` }
                      key={ cell.id }
                    >
                      <div className="calendar-cell-top">
                        <strong>{ cell.day }</strong>
                        { cell.delivery ? (
                          <span className={ `history-status status-${cell.delivery.status.toLowerCase()}` }>
                            { cell.delivery.status }
                          </span>
                        ) : null }
                      </div>

                      { cell.delivery ? (
                        <div className="calendar-cell-body">
                          <p>{ formatLitres(cell.delivery.quantity) }</p>
                          <small>{ cell.delivery.date }</small>
                        </div>
                      ) : (
                        <div className="calendar-cell-body calendar-cell-body-empty">
                          <p>No delivery</p>
                        </div>
                      ) }
                    </article>
                  ),
                ) }
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="dashboard-hero">
              <div>
                <p className="hero-kicker">Delivery view</p>
                <h1>Morning run for { profile.name }.</h1>
                <p className="hero-text">
                  Start with the active queue, mark delivery outcomes fast, and keep the latest action visible
                  before it settles into today&apos;s completed list.
                </p>
              </div>
              <div className="dashboard-chip">
                <BadgeCheck size={ 18 } />
                <span>{ profile.role === 'milkman' ? 'Milk vendor account' : 'Customer account' }</span>
              </div>
            </section>

            <section className="dashboard-card delivery-board">
              { deliveryState.lastAction ? (
                <div className="last-action-buffer">
                  <p className="eyebrow">Latest update</p>
                  <div className="last-action-content">
                    <div>
                      <strong>{ deliveryState.lastAction.familyName }</strong>
                      <p>
                        { deliveryState.lastAction.status }
                        { deliveryState.lastAction.extraLitres
                          ? ` · ${formatLitres(deliveryState.lastAction.extraLitres)} extra`
                          : '' }
                      </p>
                    </div>
                    <span>{ deliveryState.lastAction.deliveredAt }</span>
                  </div>
                </div>
              ) : null }

              <div className="delivery-columns">
                <div className="delivery-column">
                  <div className="column-head">
                    <div>
                      <p className="eyebrow">Pending customers</p>
                      <h4>{ deliveryState.pending.length } stops left</h4>
                    </div>
                  </div>

                  <div className="delivery-list">
                    { deliveryState.pending.map((item) => (
                      <article className="delivery-item" key={ item.id }>
                        <div className="delivery-main">
                          <button className="action-button action-view inline-view-button" type="button" onClick={ () => openCustomerView(item.familyName) }>
                            <Eye size={ 16 } />
                          </button>
                          <div>
                            <strong>{ item.familyName }</strong>
                            <p>{ formatLitres(item.amountLitres) }</p>
                          </div>
                        </div>
                        <div className="delivery-actions">
                          <button
                            className="action-button action-delivered"
                            type="button"
                            onClick={ () => markDelivery(item, 'Delivered') }
                          >
                            Delivered
                          </button>
                          <button
                            className="action-button action-absent"
                            type="button"
                            onClick={ () => markDelivery(item, 'Absent') }
                          >
                            Absent
                          </button>
                          <button
                            className="action-button action-extra"
                            type="button"
                            onClick={ () => openExtraModal(item) }
                          >
                            <Plus size={ 16 } />
                            Extra
                          </button>
                        </div>
                      </article>
                    )) }

                    { deliveryState.pending.length === 0 ? (
                      <div className="empty-delivery-state">
                        <p>All pending customers are marked for this date.</p>
                      </div>
                    ) : null }
                  </div>
                </div>

                <div className="delivery-column delivery-history">
                  <div className="column-head">
                    <div>
                      <p className="eyebrow">Completed today</p>
                      <h4>{ deliveryState.completed.length } records</h4>
                    </div>
                  </div>

                  <div className="delivery-history-list">
                    { deliveryState.completed.map((item) => (
                      <article className="history-item" key={ `${item.id}-${item.deliveredAt}` }>
                        <div>
                          <div className="history-name-row">
                            <button className="action-button action-view compact-view-button" type="button" onClick={ () => openCustomerView(item.familyName) }>
                              <Eye size={ 16 } />
                            </button>
                            <div>
                              <strong>{ item.familyName }</strong>
                              <p>
                                { item.status }
                                { item.extraLitres ? ` · ${formatLitres(item.extraLitres)} extra` : '' }
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="history-side">
                          <span>{ item.deliveredAt }</span>
                        </div>
                      </article>
                    )) }

                    { deliveryState.completed.length === 0 ? (
                      <div className="empty-delivery-state">
                        <p>Completed records for the date will accumulate here.</p>
                      </div>
                    ) : null }
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-grid">
              <article className="dashboard-card">
                <p className="eyebrow">Verified identity</p>
                <h3>Profile snapshot</h3>
                <dl className="profile-grid">
                  <div>
                    <dt>Phone</dt>
                    <dd>{ profile.phoneNumber }</dd>
                  </div>
                  <div>
                    <dt>Gender</dt>
                    <dd>{ profile.gender || 'Not specified' }</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>{ profile.email || 'Not provided' }</dd>
                  </div>
                  <div>
                    <dt>{ entityLabel }</dt>
                    <dd>{ profile.organizationName || 'Pending' }</dd>
                  </div>
                </dl>
              </article>

              <article className="dashboard-card">
                <p className="eyebrow">Session token</p>
                <h3>Access granted</h3>
                <p className="token-preview">{ accessToken }</p>
              </article>
            </section>

            <section className="trust-strip dashboard-trust" aria-label="Dashboard summary">
              { dashboardHighlights.map((item) => (
                <article key={ item.label }>
                  <p>{ item.label }</p>
                  <strong>{ item.value }</strong>
                </article>
              )) }
            </section>
          </>
        ) }
      </main>

      { extraTarget ? (
        <div className="auth-overlay" role="dialog" aria-modal="true" aria-labelledby="extra-title">
          <div className="auth-modal extra-modal">
            <button
              className="auth-close"
              type="button"
              onClick={ () => setExtraTarget(null) }
              aria-label="Close extra milk popup"
            >
              <X size={ 18 } />
            </button>

            <p className="eyebrow">Extra milk</p>
            <h2 id="extra-title">Add extra quantity for { extraTarget.familyName }.</h2>
            <p className="auth-text">
              Base subscription is { formatLitres(extraTarget.amountLitres) }. Choose the additional amount
              in `0.5 litre` steps.
            </p>

            <div className="extra-stepper">
              <button
                className="date-button"
                type="button"
                onClick={ () => setExtraAmount((current) => Math.max(0.5, current - 0.5)) }
              >
                <ArrowLeft size={ 18 } />
              </button>
              <div className="extra-amount-display">{ formatLitres(extraAmount) }</div>
              <button
                className="date-button"
                type="button"
                onClick={ () => setExtraAmount((current) => current + 0.5) }
              >
                <ArrowRight size={ 18 } />
              </button>
            </div>

            <div className="auth-actions">
              <button className="button button-primary" type="button" onClick={ confirmExtraMilk }>
                Save extra milk
              </button>
              <button className="button button-secondary" type="button" onClick={ () => setExtraTarget(null) }>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null }
    </div>
  )
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authStep, setAuthStep] = useState('code')
  const [authCode, setAuthCode] = useState(() => generateAuthCode())
  const [accessToken, setAccessToken] = useState(() => window.localStorage.getItem(AUTH_TOKEN_KEY) || '')
  const [profile, setProfile] = useState(() => readStoredProfile())
  const [pendingAuth, setPendingAuth] = useState(null)
  const [registration, setRegistration] = useState(() =>
    createRegistrationState(readStoredProfile()?.phoneNumber || ''),
  )
  const isAuthenticated = Boolean(accessToken && profile)
  const organizationLabel = registration.role === 'milkman' ? 'Dairy name' : 'Family name'

  const pravah = usePravah({
    streams: ["bizbandhan-milkman"]
  })
  const connection = usePravahState(pravah, "connected");
  const login = usePravahState(pravah, `login-${connection?.pravahId}`);
  console.log(login)
  function navigateTo(pathname) {
    window.history.pushState({}, '', pathname)
    setCurrentPath(pathname)
  }

  function openAuthModal() {
    setAuthCode(generateAuthCode())
    setPendingAuth(null)
    setRegistration(createRegistrationState(profile?.phoneNumber || ''))
    setAuthStep('code')
    setIsAuthOpen(true)
  }

  function closeAuthModal() {
    setIsAuthOpen(false)
    setPendingAuth(null)
    setAuthStep('code')
  }

  function completeLogin(nextToken, nextProfile) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, nextToken)
    window.localStorage.setItem(AUTH_PROFILE_KEY, JSON.stringify(nextProfile))
    setAccessToken(nextToken)
    setProfile(nextProfile)
    setIsAuthOpen(false)
    setPendingAuth(null)
    navigateTo('/dashboard')
  }

  function handleLogout() {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
    window.localStorage.removeItem(AUTH_PROFILE_KEY)
    setAccessToken('')
    setProfile(null)
    setRegistration(createRegistrationState())
    navigateTo('/')
  }

  function handleSimulatedLoginEvent() {
    document.dispatchEvent(
      new CustomEvent('login-successful', {
        detail: {
          accessToken: createDemoAccessToken(),
          phoneNumber: profile?.phoneNumber || '+91 98765 43210',
        },
      }),
    )
  }

  function handleRegistrationChange(event) {
    const { name, value } = event.target
    setRegistration((current) => ({
      ...current,
      [name]: value,
      ...(name === 'role' ? { organizationName: '' } : null),
    }))
  }

  function handleRegistrationSubmit(event) {
    event.preventDefault()

    const finalizedProfile = {
      ...registration,
      roleLabel: registration.role === 'milkman' ? 'Milk vendor' : 'Customer',
    }

    completeLogin(pendingAuth?.accessToken || createDemoAccessToken(), finalizedProfile)
  }

  useEffect(() => {
    function syncRoute() {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  useEffect(() => {
    function handleLoginSuccessful(event) {
      const detail = event.detail || {}
      const nextToken = detail.accessToken || createDemoAccessToken()
      const verifiedPhone =
        detail.phoneNumber || detail.phone || detail.contactNumber || '+91 98765 43210'
      const storedProfile = readStoredProfile()

      setPendingAuth({ accessToken: nextToken, phoneNumber: verifiedPhone })

      if (storedProfile) {
        completeLogin(nextToken, storedProfile)
        return
      }

      setRegistration(createRegistrationState(verifiedPhone))
      setAuthStep('register')
      setIsAuthOpen(true)
    }

    document.addEventListener('login-successful', handleLoginSuccessful)
    return () => document.removeEventListener('login-successful', handleLoginSuccessful)
  }, [])

  if (currentPath === '/dashboard') {
    if (!isAuthenticated) {
      return (
        <div className="dashboard-shell">
          <main className="dashboard-main dashboard-empty">
            <section className="dashboard-card auth-guard">
              <p className="eyebrow">Authentication required</p>
              <h2>Open the WhatsApp sign-in flow to continue.</h2>
              <p>
                The dashboard route only unlocks after the `login-successful` event provides an access
                token and the browser has a stored registration profile.
              </p>
              <button className="button button-primary" type="button" onClick={ openAuthModal }>
                Get started
                <ArrowRight size={ 18 } />
              </button>
            </section>

            { isAuthOpen ? (
              <AuthModal
                adminPhoneNumber={ ADMIN_WHATSAPP_NUMBER }
                authCode={ authCode }
                authStep={ authStep }
                onClose={ closeAuthModal }
                onContinueToWhatsApp={ buildWhatsAppUrl(ADMIN_WHATSAPP_NUMBER, authCode) }
                onSimulateLogin={ handleSimulatedLoginEvent }
                onRegistrationChange={ handleRegistrationChange }
                onRegistrationSubmit={ handleRegistrationSubmit }
                organizationLabel={ organizationLabel }
                pendingPhoneNumber={ pendingAuth?.phoneNumber || registration.phoneNumber }
                registration={ registration }
              />
            ) : null }
          </main>
        </div>
      )
    }

    return (
      <Dashboard
        accessToken={ accessToken }
        onGoHome={ () => navigateTo('/') }
        onLogout={ handleLogout }
        profile={ profile }
      />
    )
  }

  return (
    <div className="page-shell">
      <Navbar isAuthenticated={ isAuthenticated } onOpenModal={ openAuthModal } />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="hero-kicker">Digitize local milk delivery without adding operational drag.</p>
            <h1>Run the route, the ledger, and the household calendar from one system.</h1>
            <p className="hero-text">
              Milkman helps local dairy vendors manage recurring deliveries, daily logs, payment records,
              and family-facing controls with an offline-capable workflow built for high-frequency mornings.
            </p>

            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={ openAuthModal }>
                Get started
                <ArrowRight size={ 18 } />
              </button>
              <a className="button button-secondary" href={ buildWhatsAppUrl(ADMIN_WHATSAPP_NUMBER, authCode) } target="_blank" rel="noreferrer">
                Start with a pilot
                <ArrowRight size={ 18 } />
              </a>
              <a className="button button-secondary" href="#features">
                Explore the product
              </a>
            </div>

            <ul className="hero-notes" aria-label="Product highlights">
              <li>
                <CheckCircle2 size={ 16 } />
                WhatsApp and OTP-led onboarding
              </li>
              <li>
                <CheckCircle2 size={ 16 } />
                Offline delivery marking with sync recovery
              </li>
              <li>
                <CheckCircle2 size={ 16 } />
                Household pause and leave controls
              </li>
            </ul>
          </div>

          <div className="hero-panel" aria-label="Product summary">
            <div className="panel-card route-card">
              <div className="card-head">
                <span>Morning route</span>
                <span>04:00 prep</span>
              </div>
              <div className="route-list">
                <article>
                  <div>
                    <strong>Sharma Family</strong>
                    <p>2L cow milk · recurring</p>
                  </div>
                  <span className="status done">Delivered</span>
                </article>
                <article>
                  <div>
                    <strong>Gupta House</strong>
                    <p>1L buffalo milk · leave note</p>
                  </div>
                  <span className="status hold">Paused</span>
                </article>
                <article>
                  <div>
                    <strong>Mehra Apartments</strong>
                    <p>3 packs curd · cash due</p>
                  </div>
                  <span className="status live">In route</span>
                </article>
              </div>
            </div>

            <div className="panel-grid">
              <div className="panel-card mini-stat">
                <Clock3 size={ 18 } />
                <div>
                  <strong>Fast morning ops</strong>
                  <p>Bulk delivery actions for dense neighborhood routes.</p>
                </div>
              </div>

              <div className="panel-card mini-stat">
                <ShieldCheck size={ 18 } />
                <div>
                  <strong>Transparent records</strong>
                  <p>Shared visibility for the vendor and the household.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Business summary">
          { trustPoints.map((point) => (
            <article key={ point.label }>
              <p>{ point.label }</p>
              <strong>{ point.value }</strong>
            </article>
          )) }
        </section>

        <section className="feature-section" id="features">
          <div className="section-heading">
            <p className="eyebrow">Core capabilities</p>
            <h2>Designed around the real friction points of daily milk delivery.</h2>
          </div>

          <div className="feature-grid">
            { featureCards.map((feature) => {
              const Icon = feature.icon
              return (
                <article className="feature-card" key={ feature.title }>
                  <div className="feature-icon">
                    <Icon size={ 20 } />
                  </div>
                  <h3>{ feature.title }</h3>
                  <p>{ feature.description }</p>
                </article>
              )
            }) }
          </div>
        </section>

        <section className="workflow-section" id="workflow">
          <div className="section-heading">
            <p className="eyebrow">Daily workflow</p>
            <h2>A system that fits the vendor’s route instead of fighting it.</h2>
          </div>

          <div className="workflow-layout">
            <div className="workflow-list">
              { journey.map((step, index) => (
                <article key={ step }>
                  <span>{ String(index + 1).padStart(2, '0') }</span>
                  <p>{ step }</p>
                </article>
              )) }
            </div>

            <div className="workflow-panel">
              <div className="workflow-badge">
                <Users size={ 18 } />
                <span>Milkman + Household</span>
              </div>
              <h3>One product, two synchronized surfaces.</h3>
              <p>
                Vendors need speed and operational control. Families need clarity and self-service. The
                product works only if both sides see the same delivery reality.
              </p>
            </div>
          </div>
        </section>

        <section className="audience-section" id="audience">
          <article className="audience-card">
            <p className="eyebrow">For milk vendors</p>
            <h3>Replace fragmented diaries, chats, and memory-based delivery tracking.</h3>
            <p>
              Manage clients, subscriptions, daily routes, and collection records without switching between
              paper notes and messaging threads.
            </p>
          </article>

          <article className="audience-card accent-card">
            <p className="eyebrow">For households</p>
            <h3>Give families a clear calendar instead of repeated calls and confusion.</h3>
            <p>
              View deliveries, pause dates, and payment history in a shared interface built for family-level
              visibility.
            </p>
          </article>
        </section>

        <section className="cta-section" id="cta">
          <div>
            <p className="eyebrow">WhatsApp-first access</p>
            <h2>Share the login key on WhatsApp, then let the connector unlock the session.</h2>
          </div>
          <button className="button button-primary" type="button" onClick={ openAuthModal }>
            Start auth flow
            <ArrowRight size={ 18 } />
          </button>
        </section>
      </main>

      { isAuthOpen ? (
        <AuthModal
          adminPhoneNumber={ ADMIN_WHATSAPP_NUMBER }
          authCode={ connection?.pravahId }
          authStep={ authStep }
          onClose={ closeAuthModal }
          onContinueToWhatsApp={ buildWhatsAppUrl(ADMIN_WHATSAPP_NUMBER, connection?.pravahId) }
          onSimulateLogin={ handleSimulatedLoginEvent }
          onRegistrationChange={ handleRegistrationChange }
          onRegistrationSubmit={ handleRegistrationSubmit }
          organizationLabel={ organizationLabel }
          pendingPhoneNumber={ pendingAuth?.phoneNumber || registration.phoneNumber }
          registration={ registration }
        />
      ) : null }
    </div>
  )
}

export default App
