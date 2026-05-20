import React from 'react';
import { C, FONT } from '../theme';

/* ── Pill badge ── */
export function Pill({ children, color = C.primary, bg }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <span style={{
      background: bg || `${color}1A`, color,
      fontSize: 10, fontWeight: 800, letterSpacing: 1,
      padding: '3px 9px', borderRadius: 20,
      fontFamily: FONT, textTransform: 'uppercase', whiteSpace: 'nowrap',
      display: 'inline-block',
    }}>{children}</span>
  );
}

/* ── Star rating ── */
export function Stars({ n, sz = 13 }: { n: number; sz?: number }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < n ? C.accent : C.border, fontSize: sz }}>★</span>
      ))}
    </span>
  );
}

/* ── Bottom-sheet modal ── */
export function Popup({ open, onClose, children, title }: {
  open: boolean; onClose: () => void; children: React.ReactNode; title?: string;
}) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.55)',
      display: 'flex', alignItems: 'flex-end', zIndex: 100,
      backdropFilter: 'blur(3px)',
    }} onClick={onClose}>
      <div style={{
        width: '100%', background: C.surface,
        borderRadius: '22px 22px 0 0', padding: '0 0 24px',
        maxHeight: '85%', overflowY: 'auto',
        animation: 'slideUp 0.28s cubic-bezier(0.32,0.72,0,1)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: C.border }} />
        </div>
        {title && (
          <div style={{ padding: '14px 20px 0', borderBottom: `1px solid ${C.border}`, marginBottom: 4 }}>
            <p style={{ margin: '0 0 12px', fontSize: 17, fontWeight: 800, color: C.text, fontFamily: FONT }}>{title}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/* ── Success popup ── */
export function SuccessPopup({ open, onClose, title, sub, refCode, rows }: {
  open: boolean; onClose: () => void; title: string; sub: string;
  refCode?: string; rows?: { k: string; v: any }[];
}) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px',
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: C.surface, borderRadius: 22, padding: '32px 24px',
        width: '100%', textAlign: 'center',
        animation: 'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <div style={{
          width: 70, height: 70, borderRadius: '50%',
          background: `${C.greenLt}18`, border: `2px solid ${C.greenLt}`,
          margin: '0 auto 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
        }}>✓</div>
        <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, color: C.text, fontFamily: FONT }}>{title}</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: C.textSub, fontFamily: FONT }}>{sub}</p>
        {refCode && (
          <div style={{
            background: C.bg, border: `2px dashed ${C.primaryLt}`,
            borderRadius: 14, padding: '14px 18px', marginBottom: 18,
          }}>
            <p style={{ margin: '0 0 3px', fontSize: 10, color: C.textDim, letterSpacing: 2, fontFamily: FONT }}>REFERENCE NUMBER</p>
            <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 20, fontWeight: 800, color: C.primary }}>{refCode}</p>
          </div>
        )}
        {rows && rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '8px 0', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none',
          }}>
            <span style={{ fontSize: 13, color: C.textSub, fontFamily: FONT }}>{r.k}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: FONT }}>{r.v}</span>
          </div>
        ))}
        <button onClick={onClose} style={{
          marginTop: 20, width: '100%', background: C.primary, color: '#fff',
          border: 'none', borderRadius: 12, padding: '14px', fontSize: 15,
          fontWeight: 700, cursor: 'pointer', fontFamily: FONT,
        }}>Done</button>
      </div>
    </div>
  );
}
