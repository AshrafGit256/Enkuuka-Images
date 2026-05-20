import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/react';
import { C, FONT } from '../theme';
import { Pill, Stars } from '../components/Shared';
import { HOTELS } from '../data';

type Hotel = typeof HOTELS[0];

const Hotels: React.FC = () => {
  const [step, setStep]       = useState('list');
  const [chosen, setChosen]   = useState<Hotel | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [nights, setNights]   = useState(2);
  const [guests, setGuests]   = useState(1);
  const [booked, setBooked]   = useState(false);

  const hotelRef = `HTL-${Math.floor(Math.random() * 900000 + 100000)}`;

  const doBook = () => { setBooked(true); };

  if (booked && chosen) return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start">
            <button onClick={() => { setBooked(false); setStep('list'); setChosen(null); }} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 18, marginLeft: 8 }}>‹</button>
          </IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>Reservation Confirmed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': C.bg }}>
        <div style={{ padding: '20px 18px', textAlign: 'center' }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: '32px 22px' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: `${C.greenLt}18`, border: `2px solid ${C.greenLt}`, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🏨</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 900, color: C.text, fontFamily: FONT }}>Room Reserved!</h2>
            <p style={{ margin: '0 0 20px', fontSize: 13, color: C.textSub, fontFamily: FONT }}>Confirmation details sent via SMS.</p>
            <div style={{ background: C.bg, border: `2px dashed ${C.primary}`, borderRadius: 14, padding: '14px 18px', marginBottom: 18 }}>
              <p style={{ margin: '0 0 3px', fontSize: 10, color: C.textDim, letterSpacing: 2, fontFamily: FONT }}>BOOKING REFERENCE</p>
              <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, fontWeight: 800, color: C.primary }}>{hotelRef}</p>
            </div>
            {[
              { k: 'Hotel',   v: chosen.name },
              { k: 'Guests',  v: guests },
              { k: 'Nights',  v: nights },
              { k: 'Total',   v: `UGX ${(chosen.ppn * nights).toLocaleString()}` },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>
                <span style={{ fontSize: 13, color: C.textSub, fontFamily: FONT }}>{r.k}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: FONT }}>{r.v}</span>
              </div>
            ))}
            <button onClick={() => { setBooked(false); setStep('list'); setChosen(null); }} style={{ marginTop: 20, width: '100%', background: C.primary, color: '#fff', border: 'none', borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>Done</button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );

  if (step === 'guestInfo' && chosen) return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start">
            <button onClick={() => setStep('detail')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 18, marginLeft: 8 }}>‹</button>
          </IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>Confirm Booking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': C.bg }}>
        <div style={{ padding: 18 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
            <p style={{ margin: '0 0 10px', fontWeight: 800, fontSize: 14, color: C.text, fontFamily: FONT }}>Booking Summary</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.textSub, fontFamily: FONT }}>Hotel</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: FONT }}>{chosen.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.textSub, fontFamily: FONT }}>Check-in</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: FONT }}>{checkIn || 'Not set'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.textSub, fontFamily: FONT }}>Nights</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: FONT }}>{nights}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.textSub, fontFamily: FONT }}>Guests</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: FONT }}>{guests}</span>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: FONT }}>Total</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: C.primary, fontFamily: 'monospace' }}>UGX {(chosen.ppn * nights).toLocaleString()}</span>
            </div>
          </div>
          <button onClick={doBook} style={{ width: '100%', background: C.primary, color: '#fff', border: 'none', borderRadius: 14, padding: 16, fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: FONT, boxShadow: `0 4px 20px ${C.primary}44` }}>Confirm Reservation</button>
        </div>
      </IonContent>
    </IonPage>
  );

  if (step === 'detail' && chosen) return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start">
            <button onClick={() => setStep('list')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 18, marginLeft: 8 }}>‹</button>
          </IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>{chosen.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': C.bg }}>
        <div style={{ padding: 18 }}>
          {/* Hotel hero */}
          <div style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLt})`, borderRadius: 20, padding: '24px 20px', marginBottom: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>{chosen.emoji}</div>
            <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: FONT }}>{chosen.name}</h2>
            <p style={{ margin: '0 0 8px', fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: FONT }}>📍 {chosen.area}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Pill color={C.accentLt} bg="rgba(212,172,13,0.2)">{chosen.tag}</Pill>
              <div style={{ display: 'flex', alignItems: 'center' }}><Stars n={chosen.stars} sz={14} /></div>
            </div>
          </div>

          {/* Price */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: 11, color: C.textDim, fontFamily: FONT }}>PRICE PER NIGHT</p>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: C.primary, fontFamily: 'monospace' }}>UGX {chosen.ppn.toLocaleString()}</p>
            </div>
            <Pill color={C.primary}>{chosen.tag}</Pill>
          </div>

          {/* Amenities */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 12 }}>
            <p style={{ margin: '0 0 10px', fontWeight: 800, fontSize: 14, color: C.text, fontFamily: FONT }}>Amenities</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['WiFi', 'Breakfast', 'Pool', 'Gym', 'Parking', 'Room Service', 'AC', 'Bar'].map(a => (
                <span key={a} style={{ background: `${C.primary}10`, border: `1px solid ${C.border}`, borderRadius: 20, padding: '5px 12px', fontSize: 12, color: C.text, fontFamily: FONT }}>✓ {a}</span>
              ))}
            </div>
          </div>

          {/* Stay details */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
            <p style={{ margin: '0 0 12px', fontWeight: 800, fontSize: 14, color: C.text, fontFamily: FONT }}>Stay Details</p>
            <div style={{ marginBottom: 14 }}>
              <p style={{ margin: '0 0 6px', fontSize: 12, color: C.textSub, fontFamily: FONT }}>Check-in Date</p>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', fontSize: 14, color: C.text, width: '100%', fontFamily: FONT, outline: 'none' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <p style={{ margin: '0 0 6px', fontSize: 12, color: C.textSub, fontFamily: FONT }}>Guests</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <button onClick={() => guests > 1 && setGuests(v => v - 1)} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 18, cursor: 'pointer', fontFamily: FONT }}>−</button>
                <span style={{ fontSize: 18, fontWeight: 700, color: C.text, fontFamily: FONT }}>{guests}</span>
                <button onClick={() => setGuests(v => v + 1)} style={{ width: 36, height: 36, borderRadius: '50%', background: C.primary, border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', fontFamily: FONT }}>+</button>
              </div>
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 12, color: C.textSub, fontFamily: FONT }}>Nights</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <button onClick={() => nights > 1 && setNights(n => n - 1)} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.border}`, background: C.bg, color: C.text, fontSize: 18, cursor: 'pointer', fontFamily: FONT }}>−</button>
              <span style={{ fontSize: 18, fontWeight: 700, color: C.text, fontFamily: FONT }}>{nights}</span>
              <button onClick={() => setNights(n => n + 1)} style={{ width: 36, height: 36, borderRadius: '50%', background: C.primary, border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', fontFamily: FONT }}>+</button>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text, fontFamily: FONT }}>Total</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: C.primary, fontFamily: 'monospace' }}>UGX {(chosen.ppn * nights).toLocaleString()}</span>
            </div>
          </div>

          <button onClick={() => setStep('guestInfo')} style={{ width: '100%', background: C.primary, color: '#fff', border: 'none', borderRadius: 14, padding: 16, fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: FONT, boxShadow: `0 4px 20px ${C.primary}44` }}>Reserve Now →</button>
        </div>
        <div style={{ height: 24 }} />
      </IonContent>
    </IonPage>
  );

  // Hotel list
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" style={{ '--color': '#fff' }} /></IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>Book a Hotel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': C.bg }}>
        <div style={{ background: C.primary, padding: '0 18px 18px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 22 }}>📍</span>
            <div>
              <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 13, color: '#fff', fontFamily: FONT }}>Festival Accommodation</p>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: FONT }}>Kampala & surrounding areas</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 18px' }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, color: C.textSub, letterSpacing: 2, textTransform: 'uppercase', fontFamily: FONT, fontWeight: 700 }}>Available Hotels</p>
          {HOTELS.map((h, i) => (
            <button key={i} onClick={() => { setChosen(h); setStep('detail'); }} style={{
              display: 'flex', alignItems: 'center', gap: 14, width: '100%',
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 16, padding: 15, marginBottom: 10, cursor: 'pointer', textAlign: 'left', fontFamily: FONT,
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${C.primary}12`, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{h.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: C.text }}>{h.name}</p>
                  <Pill color={C.primary}>{h.tag}</Pill>
                </div>
                <p style={{ margin: '0 0 5px', fontSize: 12, color: C.textSub }}>📍 {h.area}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stars n={h.stars} sz={11} />
                  <span style={{ fontWeight: 800, color: C.primary, fontSize: 13, fontFamily: 'monospace' }}>
                    {(h.ppn / 1000).toFixed(0)}k<span style={{ color: C.textDim, fontSize: 10, fontWeight: 400 }}>/night</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </IonContent>
    </IonPage>
  );
};

export default Hotels;
