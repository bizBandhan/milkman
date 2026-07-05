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

export default function AuthModal({
    adminPhoneNumber,
    authCode,
    authStep,
    onClose,
    onContinueToWhatsApp,
    onSimulateLogin,
    onRegistrationChange,
    onRegistrationSubmit,
    organizationLabel,
    pendingPhoneNumber,
    registration,
}) {
    return (
        <div className="auth-overlay" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <div className="auth-modal">
                <button className="auth-close" type="button" onClick={ onClose } aria-label="Close authentication">
                    <X size={ 18 } />
                </button>

                { authStep === 'code' ? (
                    <>
                        <p className="eyebrow">Step 1</p>
                        <h2 id="auth-title">Send your login key on WhatsApp.</h2>
                        <p className="auth-text">
                            Copy the key below or use the continue button. It opens WhatsApp with the key prefilled for
                            the admin number.
                        </p>

                        <div className="auth-code-card">
                            <div>
                                <p className="auth-label">Your login key</p>
                                <strong>{ authCode }</strong>
                            </div>
                            <div>
                                <p className="auth-label">Admin WhatsApp</p>
                                <span>{ adminPhoneNumber }</span>
                            </div>
                        </div>

                        <div className="auth-actions">
                            <a
                                className="button button-primary"
                                href={ onContinueToWhatsApp }
                                rel="noreferrer"
                                target="_blank"
                            >
                                <MessageCircleMore size={ 18 } />
                                Continue on WhatsApp
                            </a>
                            <button className="button button-secondary" type="button" onClick={ onSimulateLogin }>
                                <KeyRound size={ 18 } />
                                Simulate connector callback
                            </button>
                        </div>

                        <div className="auth-note">
                            <p className="auth-label">Frontend preview note</p>
                            <p>
                                The second button dispatches `login-successful` on `document`. If this browser already has
                                a saved auth profile, you will be taken to `/dashboard`; otherwise the registration form
                                opens.
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="eyebrow">Step 2</p>
                        <h2 id="auth-title">Complete your registration.</h2>
                        <p className="auth-text">
                            The phone number below came from the simulated WhatsApp auth event. This field stays locked.
                        </p>

                        <form className="registration-form" onSubmit={ onRegistrationSubmit }>
                            <label>
                                <span>Name</span>
                                <input name="name" onChange={ onRegistrationChange } required value={ registration.name } />
                            </label>

                            <label>
                                <span>Verified contact number</span>
                                <input name="phoneNumber" readOnly value={ pendingPhoneNumber } />
                            </label>

                            <label>
                                <span>Gender</span>
                                <select name="gender" onChange={ onRegistrationChange } required value={ registration.gender }>
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </label>

                            <label>
                                <span>Email</span>
                                <input name="email" onChange={ onRegistrationChange } type="email" value={ registration.email } />
                            </label>

                            <label className="full-span">
                                <span>Address</span>
                                <textarea name="address" onChange={ onRegistrationChange } required rows="3" value={ registration.address } />
                            </label>

                            <label>
                                <span>Landmark</span>
                                <input name="landmark" onChange={ onRegistrationChange } value={ registration.landmark } />
                            </label>

                            <label>
                                <span>Referral code</span>
                                <input name="referralCode" onChange={ onRegistrationChange } value={ registration.referralCode } />
                            </label>

                            <label>
                                <span>Role</span>
                                <select name="role" onChange={ onRegistrationChange } required value={ registration.role }>
                                    <option value="milkman">Milk vendor</option>
                                    <option value="customer">Customer</option>
                                </select>
                            </label>

                            <label>
                                <span>{ organizationLabel }</span>
                                <input
                                    name="organizationName"
                                    onChange={ onRegistrationChange }
                                    required
                                    value={ registration.organizationName }
                                />
                            </label>

                            <div className="auth-actions full-span">
                                <button className="button button-primary" type="submit">
                                    <UserRound size={ 18 } />
                                    Complete registration
                                </button>
                            </div>
                        </form>
                    </>
                ) }
            </div>
        </div>
    )
}
