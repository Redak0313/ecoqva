'use client';
import CookieConsent from 'react-cookie-consent';

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      buttonText="Aceptar todo"
      declineButtonText="Rechazar"
      enableDeclineButton
      cookieName="cookie_consent"
      style={{
        position: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translateY(-8%)',
        left: '10px',
        background: '#fff',
        color: '#171717',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        maxWidth: '350px'
      }}
      buttonStyle={{
        backgroundColor: '#2563eb',
        color: '#FFF',
        fontSize: '14px',
        borderRadius: '16px'
      }}
      declineButtonStyle={{
        backgroundColor: '#f44336',
        color: '#FFF',
        fontSize: '14px',
        borderRadius: '16px'
      }}
      expires={365} // Number of days before the cookie expires
      onAccept={() => {
        // Add functionality when user accepts cookies
        console.log('Cookies accepted');
      }}
      onDecline={() => {
        // Add functionality when user declines cookies
        console.log('Cookies declined');
      }}
    >
      Este website utiliza las cookies para mejorar la experiencia de navegación. Al utilizar este
      sitio, aceptas el uso de cookies.
      <a
        title="política de privacidad"
        rel="noreferrer noopener"
        target="_blank"
        href="/privacy-policy"
      >
        <p className="underline">Puedes leer nuestra política de privacidad.</p>
      </a>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
