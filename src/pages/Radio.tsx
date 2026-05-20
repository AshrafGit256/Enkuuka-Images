import React, { useState, useRef, useCallback, useEffect } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/react';
import { C, FONT } from '../theme';
import { Pill, Popup } from '../components/Shared';
import { STATIONS, SCHEDULE } from '../data';

const Radio: React.FC = () => {
  const [stIdx, setStIdx]     = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [vol, setVol]         = useState(80);
  const [bars]                = useState(() => Array.from({ length: 24 }, () => Math.random()));
  const [showSchedule, setShowSchedule] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const doPlay = useCallback((idx: number) => {
    setError(null); setLoading(true);
    if (!audioRef.current) audioRef.current = new Audio();
    const a = audioRef.current;
    a.pause(); a.src = STATIONS[idx].url; a.volume = vol / 100;
    a.play()
      .then(() => { setPlaying(true); setLoading(false); })
      .catch(() => { setError('Could not connect to stream. Check your internet.'); setLoading(false); setPlaying(false); });
  }, [vol]);

  const doPause = useCallback(() => { audioRef.current?.pause(); setPlaying(false); }, []);
  const toggle  = () => playing ? doPause() : doPlay(stIdx);
  const switchTo = (i: number) => {
    setStIdx(i); setError(null);
    if (playing || loading) { setPlaying(false); setLoading(false); audioRef.current?.pause(); setTimeout(() => doPlay(i), 80); }
  };

  useEffect(() => { if (audioRef.current) audioRef.current.volume = vol / 100; }, [vol]);
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    const onErr  = () => { setError('Stream error. Please try again.'); setPlaying(false); setLoading(false); };
    const onPlay = () => setLoading(false);
    a.addEventListener('error', onErr); a.addEventListener('playing', onPlay);
    return () => { a.removeEventListener('error', onErr); a.removeEventListener('playing', onPlay); };
  }, []);
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': C.primary, '--color': '#fff' }}>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" style={{ '--color': '#fff' }} /></IonButtons>
          <IonTitle style={{ color: '#fff', fontFamily: FONT, fontWeight: 800 }}>Enkuuka Radio</IonTitle>
          <IonButtons slot="end">
            <button onClick={() => setShowSchedule(true)} style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10,
              width: 36, height: 36, cursor: 'pointer', color: '#fff', fontSize: 18, marginRight: 8,
            }}>📅</button>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': C.bg }}>
        {/* Player card */}
        <div style={{ background: C.primary, padding: '0 18px 20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: '24px 20px', textAlign: 'center' }}>
            {/* CBS Logo */}
            <div style={{
              width: 90, height: 90, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', margin: '0 auto 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.15)',
              boxShadow: playing ? `0 0 0 12px ${C.accent}18,0 0 0 24px ${C.accent}0A` : 'none',
              transition: 'box-shadow 0.5s',
            }}>
              <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
                <text x="100" y="70" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="bold" fontSize="54" fill="white">CBS</text>
                <rect x="26" y="86" width="148" height="68" rx="6" fill={C.accent} opacity="0.95" />
                {Array.from({ length: 19 }).map((_, i) => (
                  <line key={i} x1={34 + i * 7.8} y1="94" x2={34 + i * 7.8} y2="147" stroke={C.primary} strokeWidth="2.5" opacity="0.9" />
                ))}
              </svg>
            </div>

            {/* Waveform */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 2.5, height: 28, marginBottom: 18 }}>
              {bars.map((h, i) => (
                <div key={i} style={{
                  width: 3, borderRadius: 2,
                  background: playing ? C.accent : 'rgba(255,255,255,0.2)',
                  height: playing ? `${h * 70 + 12}%` : '14%',
                  animation: playing ? `wave ${0.5 + h * 0.6}s ${i * 0.04}s ease-in-out infinite alternate` : 'none',
                  transition: 'background 0.3s,height 0.4s',
                }} />
              ))}
            </div>

            <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 800, color: '#fff', fontFamily: FONT }}>{STATIONS[stIdx].label}</p>
            <p style={{ margin: '0 0 12px', fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: FONT }}>{STATIONS[stIdx].sub}</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              {loading
                ? <Pill color={C.accentLt} bg="rgba(212,172,13,0.2)">● CONNECTING…</Pill>
                : playing
                  ? <Pill color="#22c55e" bg="rgba(34,197,94,0.2)">● LIVE</Pill>
                  : <Pill color="rgba(255,255,255,0.4)" bg="rgba(255,255,255,0.08)">PAUSED</Pill>}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 18 }}>
              <button onClick={() => switchTo((stIdx + 1) % 2)} style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 12, width: 44, height: 44, color: 'rgba(255,255,255,0.7)', fontSize: 17, cursor: 'pointer',
              }}>⇄</button>
              <button onClick={toggle} style={{
                width: 68, height: 68, borderRadius: '50%',
                background: loading ? 'rgba(255,255,255,0.15)' : C.accent,
                border: loading ? '1px solid rgba(255,255,255,0.2)' : 'none',
                color: loading ? '#fff' : C.primary, fontSize: 26, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: playing ? `0 6px 24px ${C.accent}66` : 'none',
                transition: 'all 0.25s',
                animation: loading ? 'spin 1s linear infinite' : 'none',
              }}>{loading ? '↻' : playing ? '⏸' : '▶'}</button>
              <button onClick={() => switchTo((stIdx + 1) % 2)} style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 12, width: 44, height: 44, color: 'rgba(255,255,255,0.7)', fontSize: 17, cursor: 'pointer',
              }}>↻</button>
            </div>

            {/* Volume */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>🔈</span>
              <input type="range" min="0" max="100" value={vol} onChange={e => setVol(+e.target.value)}
                style={{ flex: 1, accentColor: C.accent, height: 4 } as any} />
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>🔊</span>
            </div>

            {error && (
              <div style={{ marginTop: 14, background: 'rgba(192,57,43,0.2)', border: '1px solid rgba(231,76,60,0.4)', borderRadius: 10, padding: '10px 14px' }}>
                <p style={{ margin: 0, fontSize: 12, color: '#ff8a80', fontFamily: FONT }}>⚠ {error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Station list */}
        <div style={{ padding: '16px 18px' }}>
          <p style={{ margin: '0 0 12px', fontSize: 11, color: C.textSub, letterSpacing: 2, textTransform: 'uppercase', fontFamily: FONT, fontWeight: 700 }}>Stations</p>
          {STATIONS.map((s, i) => (
            <button key={i} onClick={() => switchTo(i)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', background: C.card,
              border: `2px solid ${stIdx === i ? C.primary : C.border}`,
              borderRadius: 14, padding: '14px 16px', marginBottom: 10, cursor: 'pointer', fontFamily: FONT,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: stIdx === i ? C.primary : `${C.primary}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>📻</div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 14, color: C.text }}>{s.label}</p>
                  <p style={{ margin: 0, fontSize: 11, color: C.textSub }}>{s.sub}</p>
                </div>
              </div>
              <Pill color={C.greenLt} bg={`${C.greenLt}15`}>● LIVE</Pill>
            </button>
          ))}
        </div>

        {/* Schedule popup */}
        <Popup open={showSchedule} onClose={() => setShowSchedule(false)} title="Today's Schedule">
          <div style={{ padding: '8px 20px 4px' }}>
            {SCHEDULE.map((s, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, padding: '10px 0',
                borderBottom: i < SCHEDULE.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center',
              }}>
                <div style={{ width: 50, textAlign: 'center' }}>
                  <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: C.primary }}>{s.time}</p>
                </div>
                <div style={{ width: 1, height: 36, background: C.border, flexShrink: 0 }} />
                <p style={{ margin: 0, flex: 1, fontSize: 13, color: C.text, fontFamily: FONT }}>{s.prog}</p>
              </div>
            ))}
          </div>
        </Popup>
      </IonContent>
    </IonPage>
  );
};

export default Radio;
