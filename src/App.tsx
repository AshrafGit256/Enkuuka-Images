import React, { useState, useEffect } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonPage,
  IonContent,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

/* Ionic core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './global.css';

import { C, FONT } from './theme';
import Home    from './pages/Home';
import Radio   from './pages/Radio';
import Clans   from './pages/Clans';
import Tickets from './pages/Tickets';
import Hotels  from './pages/Hotels';

setupIonicReact({ mode: 'md' });

/* ── Splash screen ── */
function Splash({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setP(1), 300);
    const t2 = setTimeout(() => setP(2), 900);
    const t3 = setTimeout(onDone, 2800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: C.primary,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        opacity: p >= 1 ? 1 : 0,
        transform: p >= 1 ? 'scale(1)' : 'scale(0.7)',
        transition: 'all 0.7s cubic-bezier(0.34,1.56,0.64,1)',
        marginBottom: 32,
      }}>
        <div style={{
          width: 110, height: 110, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 0 60px rgba(212,172,13,0.35)',
        }}>
          <svg width="64" height="64" viewBox="0 0 200 200" fill="none">
            <text x="100" y="72" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="bold" fontSize="56" fill="white">CBS</text>
            <rect x="22" y="88" width="156" height="68" rx="6" fill={C.accent} opacity="0.95" />
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={i} x1={32 + i * 8} y1="95" x2={32 + i * 8} y2="149" stroke={C.primary} strokeWidth="2.5" opacity="0.9" />
            ))}
          </svg>
        </div>
      </div>
      <div style={{
        opacity: p >= 2 ? 1 : 0,
        transform: p >= 2 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.55s ease 0.1s',
        textAlign: 'center',
      }}>
        <p style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 900, letterSpacing: 5, color: '#fff', fontFamily: FONT }}>ENKUUKA</p>
        <p style={{ margin: '0 0 24px', fontSize: 11, letterSpacing: 6, color: 'rgba(255,255,255,0.55)', fontFamily: FONT }}>YOMWAKA · CBS</p>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: '50%', background: C.accent,
              animation: `dot 1.2s ${i * 0.2}s ease-in-out infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Nav tab config ── */
const NAV = [
  { id: 'home',    icon: '🏠', label: 'Home'    },
  { id: 'radio',   icon: '📻', label: 'Radio'   },
  { id: 'clans',   icon: '🛡️', label: 'Clans'   },
  { id: 'tickets', icon: '🎟️', label: 'Tickets' },
  { id: 'hotels',  icon: '🏨', label: 'Hotels'  },
];

/* ── Home wrapper that passes go() ── */
function HomeWrapper() {
  // We use a local trick: navigate by pushing route
  const go = (tab: string) => {
    window.location.hash = `#/${tab}`;
  };
  return <Home go={go} />;
}

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <IonApp>
      {showSplash && <Splash onDone={() => setShowSplash(false)} />}

      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/home"    component={HomeWrapper} />
              <Route exact path="/radio"   component={Radio} />
              <Route exact path="/clans"   component={Clans} />
              <Route exact path="/tickets" component={Tickets} />
              <Route exact path="/hotels"  component={Hotels} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" style={{ '--background': '#ffffff', '--border': '1px solid #D6E4F0' }}>
            {NAV.map(n => (
              <IonTabButton key={n.id} tab={n.id} href={`/${n.id}`}
                style={{ '--color': C.textSub, '--color-selected': C.primary }}>
                <span style={{ fontSize: 20 }}>{n.icon}</span>
                <IonLabel style={{ fontSize: 10, fontFamily: FONT, fontWeight: 600, marginTop: 2 }}>{n.label}</IonLabel>
              </IonTabButton>
            ))}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
