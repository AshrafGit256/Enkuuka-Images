import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/react';
import { C, FONT } from '../theme';
import { Pill, Popup } from '../components/Shared';
import { TICKET_TIERS } from '../data';

type Tier = typeof TICKET_TIERS[0];

const COLOR_MAP: Record<string, string> = {
  primaryLt: C.primaryLt, primary: C.primary, green: C.green, accent: C.accent,
};

const Tickets: React.FC = () => {
  const [step, setStep]             = useState('list');
  const [chosen, setChosen]         = useState<Tier | null>(null);
  const [qty, setQty]               = useState(1);
  const [payMethod, setPayMethod]   = useState('momo');
  const [phone, setPhone]           = useState('');
  const [processing, setProcessing] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const ref = useRef(`ENK-${Math.floor(Math.random() * 900000 + 100000)}`);

  const pay = () => {
    if (!phone.trim()) { alert('Please enter your mobile money number.'); return; }
    setConfirmPopup(true);
  };
  const doConfirm = () => {
    setConfirmPopup(false); setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep('success'); }, 2000);
  };

  const reset = () => { setStep('list'); setChosen(null); setQty(1); setPhone(''); };

  // Success screen
  if (step === 'success' && chosen) return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start">
            <button onClick={reset} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 18, marginLeft: 8 }}>‹</button>
          </IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>Booking Confirmed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': C.bg }}>
        <div style={{ padding: '20px 18px', textAlign: 'center' }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: '32px 22px' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: `${C.greenLt}18`, border: `2px solid ${C.greenLt}`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🎉</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 900, color: C.text, fontFamily: FONT }}>Ticket Booked!</h2>
            <p style={{ margin: '0 0 20px', fontSize: 13, color: C.textSub, fontFamily: FONT }}>Confirmation sent to your number via SMS.</p>
            <div style={{ background: C.bg, border: `2px dashed ${C.primary}`, borderRadius: 14, padding: '14px 18px', marginBottom: 18 }}>
              <p style={{ margin: '0 0 3px', fontSize: 10, color: C.textDim, letterSpacing: 2, fontFamily: FONT }}>BOOKING REFERENCE</p>
              <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, fontWeight: 800, color: C.primary }}>{ref.current}</p>
            </div>
            {[
              { k: 'Ticket',   v: chosen.name },
              { k: 'Qty',      v: qty },
              { k: 'Total',    v: `UGX ${(chosen.price * qty).toLocaleString()}` },
              { k: 'Festival', v: 'Enkuuka Yomwaka 2025' },
              { k: 'Date',     v: 'Aug 1–3, 2025' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? `1px solid ${C.border}` : 'none' }}>
                <span style={{ fontSize: 13, color: C.textSub, fontFamily: FONT }}>{r.k}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: FONT }}>{r.v}</span>
              </div>
            ))}
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <button onClick={reset} style={{ flex: 1, background: C.bg, color: C.primary, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>Buy Another</button>
              <button onClick={() => alert('Download feature coming soon!')} style={{ flex: 1, background: C.primary, color: '#fff', border: 'none', borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>Download</button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );

  // Payment screen
  if (step === 'payment' && chosen) return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start">
            <button onClick={() => setStep('detail')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 18, marginLeft: 8 }}>‹</button>
          </IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>Payment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': C.bg }}>
        <div style={{ padding: 18 }}>
          <div style={{ background: C.primary, borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
            <p style={{ margin: '0 0 3px', fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: 1, fontFamily: FONT }}>ORDER SUMMARY</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '4px 0 2px', fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: FONT }}>{chosen.icon} {chosen.name} ×{qty}</p>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: FONT }}>{chosen.sub}</p>
              </div>
              <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 18, fontWeight: 800, color: C.accentLt }}>UGX {(chosen.price * qty).toLocaleString()}</p>
            </div>
          </div>

          <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 800, color: C.text, fontFamily: FONT }}>Payment Method</p>
          {[
            { id: 'momo',   label: 'Mobile Money (MTN MoMo)', icon: '📱' },
            { id: 'airtel', label: 'Airtel Money',             icon: '💳' },
            { id: 'card',   label: 'Visa / Mastercard',        icon: '🏦' },
          ].map(m => (
            <button key={m.id} onClick={() => setPayMethod(m.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              background: C.card, border: `2px solid ${payMethod === m.id ? C.primary : C.border}`,
              borderRadius: 12, padding: '13px 16px', marginBottom: 8, cursor: 'pointer', fontFamily: FONT,
            }}>
              <span style={{ fontSize: 22 }}>{m.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: C.text, textAlign: 'left' }}>{m.label}</span>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                border: `2px solid ${payMethod === m.id ? C.primary : C.border}`,
                background: payMethod === m.id ? C.primary : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff',
              }}>{payMethod === m.id ? '✓' : ''}</div>
            </button>
          ))}

          <p style={{ margin: '14px 0 8px', fontSize: 13, fontWeight: 800, color: C.text, fontFamily: FONT }}>
            {payMethod === 'card' ? 'Card Number' : 'Mobile Number'}
          </p>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 16 }}>{payMethod === 'card' ? '💳' : '🇺🇬'}</span>
            {payMethod !== 'card' && <span style={{ fontSize: 14, color: C.textSub, fontFamily: FONT }}>+256</span>}
            <input value={phone} onChange={e => setPhone(e.target.value)}
              placeholder={payMethod === 'card' ? 'XXXX XXXX XXXX XXXX' : '7XX XXX XXX'} type="tel"
              style={{ border: 'none', background: 'none', flex: 1, color: C.text, fontSize: 14, outline: 'none', fontFamily: FONT }} />
          </div>

          <button onClick={pay} style={{
            width: '100%', background: C.primary, color: '#fff', border: 'none', borderRadius: 14, padding: 16,
            fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: FONT, boxShadow: `0 4px 20px ${C.primary}44`,
          }}>Pay UGX {(chosen.price * qty).toLocaleString()}</button>
        </div>

        <Popup open={confirmPopup} onClose={() => setConfirmPopup(false)} title="Confirm Payment">
          <div style={{ padding: '12px 20px 0' }}>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: C.textSub, fontFamily: FONT }}>
              You are about to pay <strong style={{ color: C.text }}>UGX {(chosen.price * qty).toLocaleString()}</strong> via {payMethod === 'momo' ? 'MTN MoMo' : payMethod === 'airtel' ? 'Airtel Money' : 'Card'}.
            </p>
            <div style={{ display: 'flex', gap: 10, paddingBottom: 8 }}>
              <button onClick={() => setConfirmPopup(false)} style={{ flex: 1, background: C.bg, color: C.textSub, border: `1px solid ${C.border}`, borderRadius: 12, padding: 13, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>Cancel</button>
              <button onClick={doConfirm} style={{ flex: 1, background: C.primary, color: '#fff', border: 'none', borderRadius: 12, padding: 13, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT, opacity: processing ? 0.7 : 1 }}>{processing ? 'Processing…' : 'Confirm & Pay'}</button>
            </div>
          </div>
        </Popup>
      </IonContent>
    </IonPage>
  );

  // Detail screen
  if (step === 'detail' && chosen) return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start">
            <button onClick={() => setStep('list')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 18, marginLeft: 8 }}>‹</button>
          </IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>Ticket Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': C.bg }}>
        <div style={{ padding: 18 }}>
          <div style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLt} 100%)`, borderRadius: 20, padding: '24px 20px', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 11, color: 'rgba(255,255,255,0.55)', letterSpacing: 1, fontFamily: FONT }}>ENKUUKA YOMWAKA 2025</p>
                <h2 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 900, color: '#fff', fontFamily: FONT }}>{chosen.icon} {chosen.name}</h2>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: FONT }}>{chosen.sub}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0 0 2px', fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: FONT }}>UGX</p>
                <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: C.accentLt, fontFamily: 'monospace' }}>{chosen.price.toLocaleString()}</p>
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px dashed rgba(255,255,255,0.2)', display: 'flex', gap: 16 }}>
              <div><p style={{ margin: '0 0 2px', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: FONT }}>DATE</p><p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: FONT }}>Aug 1–3, 2025</p></div>
              <div><p style={{ margin: '0 0 2px', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: FONT }}>VENUE</p><p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: FONT }}>Lubiri Palace</p></div>
            </div>
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 12 }}>
            <p style={{ margin: '0 0 12px', fontWeight: 800, fontSize: 14, color: C.text, fontFamily: FONT }}>What's Included</p>
            {chosen.perks.map((p, j) => (
              <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${C.greenLt}18`, border: `1px solid ${C.greenLt}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: C.greenLt, flexShrink: 0 }}>✓</div>
                <span style={{ fontSize: 13, color: C.textSub, fontFamily: FONT }}>{p}</span>
              </div>
            ))}
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
            <p style={{ margin: '0 0 12px', fontWeight: 800, fontSize: 14, color: C.text, fontFamily: FONT }}>Quantity</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
              <button onClick={() => qty > 1 && setQty(v => v - 1)} style={{ width: 42, height: 42, borderRadius: '50%', border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 20, cursor: 'pointer', fontFamily: FONT }}>−</button>
              <span style={{ fontSize: 28, fontWeight: 800, color: C.text, minWidth: 40, textAlign: 'center', fontFamily: FONT }}>{qty}</span>
              <button onClick={() => setQty(v => v + 1)} style={{ width: 42, height: 42, borderRadius: '50%', background: C.primary, border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', fontFamily: FONT }}>+</button>
            </div>
            <div style={{ marginTop: 14, borderTop: `1px solid ${C.border}`, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: FONT }}>Total</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: C.primary, fontFamily: 'monospace' }}>UGX {(chosen.price * qty).toLocaleString()}</span>
            </div>
          </div>

          <button onClick={() => setStep('payment')} style={{ width: '100%', background: C.primary, color: '#fff', border: 'none', borderRadius: 14, padding: 16, fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: FONT, boxShadow: `0 4px 20px ${C.primary}44` }}>Proceed to Payment →</button>
        </div>
      </IonContent>
    </IonPage>
  );

  // Ticket list
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" style={{ '--color': '#fff' }} /></IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>Event Tickets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': C.bg }}>
        <div style={{ background: C.primary, padding: '0 18px 18px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ fontSize: 32 }}>🎟️</span>
            <div>
              <p style={{ margin: '0 0 2px', fontWeight: 800, fontSize: 15, color: '#fff', fontFamily: FONT }}>Enkuuka Yomwaka 2025</p>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: FONT }}>Aug 1–3 · Lubiri Palace, Mengo</p>
            </div>
          </div>
        </div>

        <div style={{ padding: 18 }}>
          <p style={{ margin: '0 0 14px', fontSize: 11, color: C.textSub, letterSpacing: 2, textTransform: 'uppercase', fontFamily: FONT, fontWeight: 700 }}>Choose Your Ticket</p>
          {TICKET_TIERS.map((t, i) => (
            <div key={i} style={{ background: C.card, border: `2px solid ${t.popular ? C.primary : C.border}`, borderRadius: 18, padding: 18, marginBottom: 12, position: 'relative' }}>
              {t.popular && <div style={{ position: 'absolute', top: -11, left: 16 }}><Pill color={C.accent} bg={`${C.accent}18`}>⭐ Most Popular</Pill></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, marginTop: t.popular ? 6 : 0 }}>
                <div>
                  <p style={{ margin: '0 0 3px', fontWeight: 800, fontSize: 16, color: C.text, fontFamily: FONT }}>{t.icon} {t.name}</p>
                  <p style={{ margin: 0, fontSize: 12, color: C.textSub, fontFamily: FONT }}>{t.sub}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 1px', fontSize: 10, color: C.textDim, fontFamily: FONT }}>UGX</p>
                  <p style={{ margin: 0, fontSize: 19, fontWeight: 900, color: COLOR_MAP[t.colorKey] || C.primary, fontFamily: 'monospace' }}>{t.price.toLocaleString()}</p>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                {t.perks.map((p, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                    <span style={{ color: C.greenLt, fontSize: 12 }}>✓</span>
                    <span style={{ fontSize: 12, color: C.textSub, fontFamily: FONT }}>{p}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setChosen(t); setQty(1); setStep('detail'); }} style={{
                width: '100%', background: t.popular ? C.primary : 'transparent',
                color: t.popular ? '#fff' : C.primary, border: `1.5px solid ${t.popular ? C.primary : C.primaryLt}`,
                borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT,
              }}>{t.popular ? 'Book Now →' : 'Select'}</button>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </IonContent>
    </IonPage>
  );
};

export default Tickets;
