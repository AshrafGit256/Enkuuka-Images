import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/react';
import { C, FONT } from '../theme';
import { Pill } from '../components/Shared';
import { CLANS } from '../data';

type Clan = typeof CLANS[0];

const ClanDetail: React.FC<{ detail: Clan; onBack: () => void }> = ({ detail, onBack }) => (
  <IonPage>
    <IonHeader className="ion-no-border">
      <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
        <IonButtons slot="start">
          <button onClick={onBack} style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10,
            width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 18, marginLeft: 8,
          }}>‹</button>
        </IonButtons>
        <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>Ekika {detail.n}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen style={{ '--background': C.bg }}>
      <div style={{ padding: 18 }}>
        <div style={{
          background: `linear-gradient(145deg, ${C.primary} 0%, ${C.primaryMd} 100%)`,
          borderRadius: 20, padding: '28px 24px', textAlign: 'center', marginBottom: 14,
        }}>
          <div style={{
            width: 74, height: 74, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
            margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
          }}>{(detail as any).royal ? '👑' : (detail as any).orig ? '⭐' : '🛡️'}</div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
            <Pill color={C.accentLt} bg="rgba(212,172,13,0.2)">#{detail.no}</Pill>
            {(detail as any).royal && <Pill color={C.accentLt} bg="rgba(212,172,13,0.2)">👑 Royal Clan</Pill>}
            {(detail as any).orig  && <Pill color="rgba(255,255,255,0.9)" bg="rgba(255,255,255,0.15)">⭐ Banansangwa</Pill>}
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 900, color: '#fff', fontFamily: FONT }}>Ekika {detail.n}</h2>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: FONT }}>
            Omuziro · <strong style={{ color: C.accentLt }}>{detail.t}</strong>
          </p>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 10 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 800, fontSize: 14, color: C.text, fontFamily: FONT }}>About this Clan</p>
          <p style={{ margin: 0, fontSize: 13, color: C.textSub, lineHeight: 1.75, fontFamily: FONT }}>
            The <strong style={{ color: C.text }}>{detail.n}</strong> clan is one of Buganda's 52 recognized clans (<em>Ebika</em>). Their totem, the{' '}
            <strong style={{ color: C.primary }}>{detail.t}</strong>, is sacred and must never be harmed or consumed by clan members. Membership is patrilineal — passed down from father to child across generations.
          </p>
        </div>

        {[
          { k: 'Omuziro (Totem)', v: detail.t, icon: '🌿' },
          { k: 'Clan Number',    v: `#${detail.no} of 52`, icon: '🔢' },
          { k: 'Classification', v: (detail as any).royal ? 'Royal Clan' : (detail as any).orig ? 'Banansangwa (Original)' : 'Standard Clan', icon: '📋' },
          { k: 'Inheritance',    v: 'Patrilineal', icon: '👨‍👦' },
          { k: 'Language',       v: 'Luganda', icon: '🗣️' },
        ].map((r, i) => (
          <div key={i} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: '12px 16px', marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>{r.icon}</span>
            <span style={{ flex: 1, fontSize: 13, color: C.textSub, fontFamily: FONT }}>{r.k}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: FONT }}>{r.v}</span>
          </div>
        ))}
      </div>
    </IonContent>
  </IonPage>
);

const Clans: React.FC = () => {
  const [q, setQ]             = useState('');
  const [detail, setDetail]   = useState<Clan | null>(null);
  const [filterType, setFilterType] = useState('all');

  const filtered = CLANS.filter(c => {
    const matchQ = c.n.toLowerCase().includes(q.toLowerCase()) || c.t.toLowerCase().includes(q.toLowerCase());
    const matchF = filterType === 'all' || (filterType === 'royal' && (c as any).royal) || (filterType === 'orig' && (c as any).orig);
    return matchQ && matchF;
  });

  if (detail) return <ClanDetail detail={detail} onBack={() => setDetail(null)} />;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" style={{ '--color': '#fff' }} /></IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>52 Clans of Buganda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': C.bg }}>
        <div style={{ padding: '14px 18px' }}>
          {/* Search */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: '10px 14px',
            display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12,
          }}>
            <span style={{ color: C.textDim, fontSize: 16 }}>🔍</span>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search clan name or totem…"
              style={{ border: 'none', background: 'none', flex: 1, color: C.text, fontSize: 14, outline: 'none', fontFamily: FONT }} />
          </div>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
            {([['all', 'All Clans'], ['royal', '👑 Royal'], ['orig', '⭐ Original']] as const).map(([v, l]) => (
              <button key={v} onClick={() => setFilterType(v)} style={{
                border: `1px solid ${filterType === v ? C.primary : C.border}`,
                background: filterType === v ? C.primary : C.card,
                color: filterType === v ? '#fff' : C.textSub,
                borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: FONT, whiteSpace: 'nowrap', flexShrink: 0,
              }}>{l}</button>
            ))}
          </div>

          <p style={{ margin: '0 0 12px', fontSize: 11, color: C.textSub, fontFamily: FONT, fontWeight: 700 }}>{filtered.length} of 52 clans</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {filtered.map((c, i) => (
              <button key={i} onClick={() => setDetail(c)} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: '14px 12px', textAlign: 'left', cursor: 'pointer', fontFamily: FONT, width: '100%',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: (c as any).royal ? `${C.royal}15` : (c as any).orig ? `${C.primary}12` : `${C.textDim}18`,
                    border: `1px solid ${(c as any).royal ? C.royal : (c as any).orig ? C.primary : C.border}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>{(c as any).royal ? '👑' : (c as any).orig ? '⭐' : '🛡️'}</div>
                  <span style={{ fontSize: 10, color: C.textDim, fontFamily: 'monospace', fontWeight: 700 }}>#{c.no}</span>
                </div>
                <p style={{ margin: '0 0 3px', fontWeight: 700, fontSize: 13, color: C.text }}>{c.n}</p>
                <p style={{ margin: 0, fontSize: 11, color: C.textSub }}>{c.t}</p>
              </button>
            ))}
          </div>
          {!filtered.length && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontSize: 32 }}>🔍</p>
              <p style={{ fontSize: 14, color: C.textSub, fontFamily: FONT }}>No results for "{q}"</p>
            </div>
          )}
        </div>
        <div style={{ height: 24 }} />
      </IonContent>
    </IonPage>
  );
};

export default Clans;
