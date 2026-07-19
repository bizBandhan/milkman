import {
    MessageCircleMore,
    X,
} from 'lucide-react'

export default function AuthModal({
    whatsappNumber,
    onClose,
    pravahState,
}) {

    return (
        <div className="auth-overlay" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <div className="auth-modal">
                <button className="auth-close" type="button" onClick={ onClose } aria-label="Close authentication">
                    <X size={ 18 } />
                </button>
                <p className="eyebrow">Step 1</p>
                <h2 id="auth-title">Send your login key on WhatsApp.</h2>
                <p className="auth-text">
                    Copy the key below or use the continue button. It opens WhatsApp with the key prefilled for
                    the admin number.
                </p>

                <div className="auth-code-card">
                    <div>
                        <p className="auth-label">Your login key</p>
                        <strong>{ pravahState?.pravahId }</strong>
                    </div>
                    <div>
                        <p className="auth-label">Admin WhatsApp</p>
                        <span>{ whatsappNumber }</span>
                    </div>
                </div>

                <div className="auth-actions">
                    <a
                        className="button button-primary"
                        href={ `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pravahState?.pravahId)}` }
                        rel="noreferrer"
                        target="_blank"
                    >
                        <MessageCircleMore size={ 18 } />
                        Continue on WhatsApp
                    </a>
                </div>

            </div>
        </div>
    )
}
