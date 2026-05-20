import React, { useState } from 'react';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle,
} from '@ionic/react';
import { C, FONT } from '../theme';
import { Pill, Popup } from '../components/Shared';
import { FESTIVAL_PROGRAMME } from '../data';

const NOTIFS = [
  { icon: '🎟️', title: 'Ticket sale ends soon', sub: 'Buy your Enkuuka 2025 tickets before Aug 1', time: '2h ago' },
  { icon: '📻', title: 'CBS Live on air',        sub: 'Tune in to Emmanduso on 89.2 FM',           time: '4h ago' },
  { icon: '👑', title: "Kabaka's message",        sub: 'Annual address to all clans broadcast live', time: '1d ago' },
];

interface Props { go: (tab: string) => void; }

const Home: React.FC<Props> = ({ go }) => {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary }}>
          {/* Custom header content rendered below in the content area */}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': C.bg }}>
        {/* Hero header */}
        <div style={{ background: C.primary, padding: '0 18px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, marginBottom: 14 }}>
            <div>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, fontFamily: FONT }}>WELCOME TO</p>
              <p style={{ margin: '3px 0 0', fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: FONT, letterSpacing: -0.3 }}>
                Enkuuka <span style={{ color: C.accentLt, fontStyle: 'italic' }}>y'Omwaka</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setNotifOpen(true)} style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 18,
              }}>🔔</button>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: C.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, color: C.primary, fontFamily: FONT,
              }}>A</div>
            </div>
          </div>

          {/* Festival hero card */}
          <div style={{
            background: 'rgba(255,255,255,0.1)', borderRadius: '16px 16px 0 0',
            border: '1px solid rgba(255,255,255,0.15)', padding: '18px 18px 22px',
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
              <Pill color={C.accentLt}>🗓️ Aug 1–3, 2025</Pill>
              <Pill color="#fff" bg="rgba(255,255,255,0.15)">📍 Lubiri Palace · Mengo</Pill>
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 900, color: '#fff', fontFamily: FONT, lineHeight: 1.2 }}>
              Buganda's Biggest Cultural Festival
            </h2>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              {[{ label: 'Countdown', val: '47 Days' }, { label: 'Edition', val: '2025' }].map((x, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 14px', flex: 1, textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: FONT }}>{x.label}</p>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: i === 0 ? C.accentLt : '#fff', fontFamily: FONT }}>{x.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ background: C.surface, margin: '0 0 12px', padding: '20px 18px', borderRadius: '0 0 16px 16px', borderBottom: `1px solid ${C.border}` }}>
          <p style={{ margin: '0 0 14px', fontSize: 11, color: C.textSub, letterSpacing: 2, textTransform: 'uppercase', fontFamily: FONT, fontWeight: 700 }}>Quick Access</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { id: 'radio',   emoji: '📻', label: 'Listen Live',  sub: 'CBS 89.2 · 88.8 FM', color: C.primary  },
              { id: 'clans',   emoji: '🛡️', label: '52 Clans',     sub: 'Know your Ekika',    color: '#7D3C98'  },
              { id: 'tickets', emoji: '🎟️', label: 'Buy Ticket',   sub: 'Enkuuka 2025',       color: C.green    },
              { id: 'hotels',  emoji: '🏨', label: 'Book Hotel',   sub: 'Accommodation',      color: '#1A7F64'  },
            ].map(c => (
              <button key={c.id} onClick={() => go(c.id)} style={{
                background: C.card, border: `2px solid ${C.border}`,
                borderRadius: 14, padding: '16px 14px', textAlign: 'left',
                cursor: 'pointer', position: 'relative', overflow: 'hidden', fontFamily: FONT,
                width: '100%',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${c.color}15`, border: `1px solid ${c.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, marginBottom: 10,
                }}>{c.emoji}</div>
                <p style={{ margin: '0 0 2px', fontWeight: 800, fontSize: 13, color: C.text }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: 11, color: C.textSub }}>{c.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Programme */}
        <div style={{ padding: '0 18px' }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, color: C.textSub, letterSpacing: 2, textTransform: 'uppercase', fontFamily: FONT, fontWeight: 700 }}>Festival Programme</p>
          {FESTIVAL_PROGRAMME.map((d, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: '14px 16px', marginBottom: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Pill color={C.primary}>{d.day}</Pill>
                <span style={{ fontSize: 12, color: C.textSub, fontFamily: FONT }}>{d.date}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 8px' }}>
                {d.events.map((ev, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: j === 0 ? C.accent : C.border, marginTop: 5, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: j === 0 ? C.text : C.textSub, fontFamily: FONT }}>{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />

        {/* Notifications popup */}
        <Popup open={notifOpen} onClose={() => setNotifOpen(false)} title="Notifications">
          <div style={{ padding: '8px 20px 4px' }}>
            {NOTIFS.map((n, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, padding: '12px 0',
                borderBottom: i < NOTIFS.length - 1 ? `1px solid ${C.border}` : 'none',
              }}>
                <div style={{ fontSize: 22, flexShrink: 0 }}>{n.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 13, color: C.text, fontFamily: FONT }}>{n.title}</p>
                  <p style={{ margin: '0 0 2px', fontSize: 12, color: C.textSub, fontFamily: FONT }}>{n.sub}</p>
                  <span style={{ fontSize: 10, color: C.textDim, fontFamily: FONT }}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Popup>
      </IonContent>
    </IonPage>
  );
};

export default Home;
