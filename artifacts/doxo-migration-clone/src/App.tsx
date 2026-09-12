import { type FormEvent, type ReactNode, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  FileSearch,
  Landmark,
  LockKeyhole,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type ModalKind = 'login' | 'signup' | 'tour' | null;

const providers = [
  { name: 'Pacific Gas & Electric', type: 'Utilities' },
  { name: 'Verizon Wireless', type: 'Mobile' },
  { name: 'State Farm Insurance', type: 'Insurance' },
  { name: 'Comcast Xfinity', type: 'Internet' },
];

const features = [
  { title: 'Unified Bill Pay Calendar', text: 'See every bill, due date, and payment in one clear view.', icon: CalendarDays },
  { title: 'Private Pay Wallet', text: 'A secure place to organize the accounts you use to pay.', icon: WalletCards },
  { title: 'Real-Time Bank Balance', text: 'Know what is available before you schedule your next payment.', icon: Landmark },
  { title: '$1M Identity Theft Protection', text: 'Extra reassurance is included with doxoPLUS membership.', icon: ShieldCheck },
  { title: 'Credit Score Protection', text: 'Stay informed about changes that can affect your financial health.', icon: Sparkles },
  { title: 'Overdraft Fee Protection', text: 'Helpful safeguards for the moments that matter most.', icon: Zap },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Logo() {
  return (
    <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); scrollToSection('top'); }} data-testid="link-brand">
      <span className="brand-mark" aria-hidden="true">×</span>
      <span>doxo</span>
    </a>
  );
}

function Header({ onModal, onMenu }: { onModal: (kind: ModalKind) => void; onMenu: () => void }) {
  const [open, setOpen] = useState(false);
  const navigate = (id: string) => { setOpen(false); scrollToSection(id); };
  return (
    <header className="topbar">
      <div className="max-wrap topbar-inner">
        <Logo />
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary navigation">
          <a href="#features" onClick={(event) => { event.preventDefault(); navigate('features'); }} data-testid="link-personal">Personal</a>
          <a href="#find-biller" onClick={(event) => { event.preventDefault(); navigate('find-biller'); }} data-testid="link-find-biller">Find a Biller</a>
          <a href="#stories" onClick={(event) => { event.preventDefault(); navigate('stories'); }} data-testid="link-insights">Insights</a>
          <a href="#protection" onClick={(event) => { event.preventDefault(); navigate('protection'); }} data-testid="link-about">About</a>
          <a href="#footer" onClick={(event) => { event.preventDefault(); navigate('footer'); }} data-testid="link-support">Support</a>
          <a href="#for-billers" onClick={(event) => { event.preventDefault(); navigate('for-billers'); }} data-testid="link-for-billers">For Billers</a>
        </nav>
        <div className="nav-actions">
          <button className="button button-ghost" onClick={() => onModal('login')} data-testid="button-log-in">Log in</button>
          <button className="button button-primary" onClick={() => onModal('signup')} data-testid="button-sign-up">Sign up</button>
          <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function PhoneProduct({ onTour }: { onTour: () => void }) {
  const bills = [['P', 'Puget Sound Energy', 'Mar 17'], ['W', 'Wells Fargo · Auto Loan', 'Mar 28'], ['A', 'Amazon Store Card', 'Mar 30'], ['X', 'Xfinity', 'Apr 10']];
  return (
    <div className="hero-visual" aria-label="Preview of the doxo bill management app">
      <div className="orb" />
      <div className="phone">
        <div className="phone-screen">
          <div className="phone-head"><span className="phone-logo">× doxo</span><span>•••　⌕　●</span></div>
          <div className="phone-balance"><small>Available to pay</small><strong>$1,248.40</strong><span className="balance-pill">On track this month</span></div>
          {bills.map(([letter, name, date]) => (
            <div className="bill-row" key={name}>
              <span className="bill-icon">{letter}</span><span className="bill-name">{name}</span><span className="bill-date">{date}</span>
            </div>
          ))}
          <div className="phone-nav"><span>▦<br />Bills</span><span>◈<br />Wallet</span><span>◉<br />Credit</span><span>⌁<br />Insights</span></div>
        </div>
      </div>
      <button className="play-tour" onClick={onTour} aria-label="Play doxoBILLS tour" data-testid="button-play-tour"><Play size={24} fill="currentColor" /></button>
      <div className="tour-label"><Play size={14} fill="currentColor" /> Tour doxoBILLS</div>
    </div>
  );
}

function Hero({ onModal }: { onModal: (kind: ModalKind) => void }) {
  return (
    <section className="hero" id="top">
      <div className="max-wrap hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker">A calmer way to pay</div>
          <h1 className="display">All-in-One Bill Pay with doxoBILLS</h1>
          <p>Pay and manage all your bills from any device with doxo, plus FREE payment delivery options.</p>
          <p className="hero-note">doxo helps over 10 million people break free from the burden of paying bills while protecting financial health and accomplishing financial goals.</p>
          <button className="button button-light" onClick={() => onModal('signup')} data-testid="button-manage-bills">Manage Your Bills <ArrowRight size={15} /></button>
        </div>
        <PhoneProduct onTour={() => onModal('tour')} />
      </div>
    </section>
  );
}

function PressBar() {
  return <section className="press" aria-label="As seen in"><div className="max-wrap press-inner"><span className="press-label">Trusted by people, noticed by</span><div className="press-logos" aria-label="Press logos"><span>bes</span><span>GeekWire</span><span>yahoo!finance</span><span>FORTUNE</span><span>NBC</span></div></div></section>;
}

function BillerSearch() {
  const [term, setTerm] = useState('');
  const filtered = useMemo(() => term.length < 2 ? [] : providers.filter((provider) => provider.name.toLowerCase().includes(term.toLowerCase())), [term]);
  return (
    <section className="search-band" id="find-biller">
      <div className="max-wrap search-layout">
        <div><div className="eyebrow">Find a biller</div><h2 className="display">Your bills, all in one place.</h2><p>Search more than 120,000 payable billers and connect the accounts you already use. No paper chase required.</p><button className="button button-primary" onClick={() => document.getElementById('biller-search')?.focus()} data-testid="button-search-billers">Search billers <Search size={15} /></button></div>
        <div className="search-box">
          <label htmlFor="biller-search" className="eyebrow">Search by biller name</label>
          <div className="search-input-wrap"><Search size={18} /><input id="biller-search" type="search" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Try “electric”, “internet”, or a name" data-testid="input-provider-search" /></div>
          <div className="provider-results" aria-live="polite">
            {filtered.map((provider) => <div className="provider-result" key={provider.name} data-testid={`result-provider-${provider.name.replaceAll(' ', '-').toLowerCase()}`}><span className="provider-dot">{provider.name[0]}</span><span><strong>{provider.name}</strong><br /><small>{provider.type} · Payable on doxo</small></span><ArrowRight size={15} style={{ marginLeft: 'auto' }} /></div>)}
            {term.length >= 2 && filtered.length === 0 && <div className="result-empty">No matching billers yet. Try a different name.</div>}
            {term.length < 2 && <div className="result-empty">Start typing to see payable billers.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return <section className="section" id="features"><div className="max-wrap"><div className="section-heading"><div className="eyebrow">One view. Less worry.</div><h2 className="display">The everyday details, handled.</h2><p>Build a simple rhythm around your bills. doxo keeps the information you need close and the noise out of the way.</p></div><div className="feature-grid">{features.map(({ title, text, icon: Icon }) => <article className="feature-card" key={title} data-testid={`card-feature-${title.replaceAll(' ', '-').toLowerCase()}`}><div className="feature-icon"><Icon size={20} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}

function WalletSection() {
  return <section className="section wallet-section" id="wallet"><div className="max-wrap wallet-grid"><div><div className="eyebrow">Built for real life</div><h2 className="display">A private pay wallet that works around you.</h2><p>Link the bank account you trust, keep your billers together, and choose free payment delivery when it is available. The result is a routine that feels more predictable.</p><ul className="wallet-points"><li><Check size={18} className="check" /> Free payments from linked bank accounts</li><li><Check size={18} className="check" /> Due date reminders that arrive on time</li><li><Check size={18} className="check" /> A free mobile app for wherever the day takes you</li></ul><button className="button button-light" onClick={() => scrollToSection('plans')} data-testid="button-see-membership">See membership options <ArrowRight size={15} /></button></div><div className="wallet-card" aria-label="Sample wallet balance"><div className="wallet-card-top"><span>PRIVATE PAY WALLET</span><LockKeyhole size={16} /></div><div className="wallet-card-balance">$2,486.72</div><div className="wallet-card-line"><span>Next bill · Verizon</span><strong>$86.20</strong></div><div className="mini-bar"><span /></div></div></div></section>;
}

function Protection() {
  const items = [{ title: '$1M Identity Theft Protection', text: 'Support and coverage designed to help protect the identity you work hard to build.', icon: ShieldCheck }, { title: 'Credit Score Protection', text: 'Get a clearer view of your credit and the changes that may matter to you.', icon: CreditCard }, { title: 'Overdraft Fee Protection', text: 'Helpful alerts can give you more room to make a considered payment decision.', icon: Landmark }];
  return <section className="section protection" id="protection"><div className="max-wrap protection-grid"><div className="protection-intro"><div className="eyebrow">More than bill pay</div><h2 className="display">A little more confidence, built in.</h2><p>doxoPLUS is $5.99/month and brings added protection to the financial moments that can feel complicated.</p></div><div className="shield-list">{items.map(({ title, text, icon: Icon }) => <div className="shield-row" key={title}><div className="shield-badge"><Icon size={20} /></div><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>;
}

function Plans({ onModal }: { onModal: (kind: ModalKind) => void }) {
  const [annual, setAnnual] = useState(false);
  return <section className="section plans" id="plans"><div className="max-wrap"><div className="plans-header"><div><div className="eyebrow">Choose your pace</div><h2 className="display">Start free. Add more when it helps.</h2></div><div className="billing-toggle" role="group" aria-label="Billing period"><button className={!annual ? 'active' : ''} onClick={() => setAnnual(false)} data-testid="button-monthly">Monthly</button><button className={annual ? 'active' : ''} onClick={() => setAnnual(true)} data-testid="button-annual">Annual</button></div></div><div className="plan-grid"><article className="plan-card"><h3>doxo Basic</h3><p>The essentials to gather your bills and keep due dates in sight.</p><div className="plan-price">$0 <small>/ forever</small></div><button className="button button-ghost" onClick={() => onModal('signup')} data-testid="button-start-basic">Get started <ArrowRight size={15} /></button><ul className="plan-features"><li><Check size={15} /> Pay bills from any device</li><li><Check size={15} /> Free due date reminders</li><li><Check size={15} /> Free mobile app</li></ul></article><article className="plan-card featured"><span className="plan-ribbon">Most protection</span><h3>doxoPLUS</h3><p>More reassurance for the bills and financial details you manage every month.</p><div className="plan-price">{annual ? '$59.90' : '$5.99'} <small>{annual ? '/ year' : '/ month'}</small></div><button className="button button-primary" onClick={() => onModal('signup')} data-testid="button-start-plus">Try doxoPLUS <ArrowRight size={15} /></button><ul className="plan-features"><li><Check size={15} /> Everything in doxo Basic</li><li><Check size={15} /> $1M identity theft protection</li><li><Check size={15} /> Credit score protection</li><li><Check size={15} /> Overdraft fee protection</li></ul></article></div></div></section>;
}

function Stories() {
  return <section className="section stories" id="stories"><div className="max-wrap"><div className="section-heading"><div className="eyebrow">People make it better</div><h2 className="display">A calmer bill day is worth sharing.</h2></div><div className="stories-grid"><article className="quote-card"><blockquote>“I no longer have to remember five different websites. I open doxo, see what is due, and move on with my day.”</blockquote><footer>— Marisol R., doxo customer since 2021</footer></article><article className="news-card"><div className="eyebrow">Latest from doxo</div><h3>Why a complete view of household bills changes the way we plan.</h3><p>Practical notes on due dates, payment routines, and protecting your financial health.</p><a className="news-link" href="#footer" onClick={(event) => { event.preventDefault(); scrollToSection('footer'); }} data-testid="link-latest-news">Read the latest news <ArrowRight size={14} /></a></article></div></div></section>;
}

function Modal({ kind, onClose }: { kind: ModalKind; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  if (!kind) return null;
  const isTour = kind === 'tour';
  const title = kind === 'login' ? 'Welcome back.' : kind === 'signup' ? 'Make bill day simpler.' : 'Take a quick tour.';
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className={`modal ${isTour ? 'tour-panel' : ''}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={onClose} aria-label="Close dialog" data-testid="button-close-modal"><X size={17} /></button><h2 id="modal-title">{title}</h2>{isTour ? <><p>See how doxo brings billers, due dates, and payment choices together in one uncluttered view.</p><div className="tour-art"><Smartphone size={46} strokeWidth={1.3} /></div><button className="button button-primary" onClick={onClose} data-testid="button-finish-tour">Got it <ArrowRight size={15} /></button></> : submitted ? <div className="success-note" role="status">You are on the list. We will take you to your bill dashboard next.</div> : <><p>{kind === 'login' ? 'Enter your details to continue managing your household bills.' : 'Create a free account and bring your bill routine into focus.'}</p><form onSubmit={submit}><label>Email address<input required type="email" placeholder="you@example.com" data-testid="input-modal-email" /></label><label>{kind === 'login' ? 'Password' : 'Create a password'}<input required type="password" minLength={6} placeholder="At least 6 characters" data-testid="input-modal-password" /></label><button className="button button-primary" type="submit" data-testid="button-modal-submit">{kind === 'login' ? 'Log in' : 'Create free account'} <ArrowRight size={15} /></button></form></>}</div></div>;
}

function Footer({ onModal }: { onModal: (kind: ModalKind) => void }) {
  return <footer className="footer" id="footer"><div className="max-wrap"><div className="footer-top"><div className="footer-brand"><Logo /><p>One calm place to find, organize, and pay the bills that run your household.</p></div><div className="footer-links"><div><h4>Explore</h4><a href="#features">Features</a><a href="#plans">doxoPLUS</a><a href="#stories">Insights</a></div><div><h4>Help</h4><a href="#find-biller">Find a biller</a><a href="#footer" onClick={() => onModal('login')}>Log in</a><a href="#footer" onClick={() => onModal('signup')}>Sign up</a></div><div id="for-billers"><h4>For billers</h4><a href="#for-billers">Partner with doxo</a><a href="#footer">Resources</a><a href="#footer">Support</a></div></div></div><div className="footer-bottom"><span>© 2025 doxo, Inc. All rights reserved.</span><span>Privacy · Terms · Accessibility</span></div></div></footer>;
}

function Home() {
  const [modal, setModal] = useState<ModalKind>(null);
  return <div className="doxo-shell"><Header onModal={setModal} onMenu={() => undefined} /><main><Hero onModal={setModal} /><PressBar /><BillerSearch /><Features /><WalletSection /><Protection /><Plans onModal={setModal} /><Stories /><section className="cta-strip"><div className="max-wrap cta-inner"><h2 className="display">Less bill juggling. More getting on with it.</h2><button className="button button-primary" onClick={() => setModal('signup')} data-testid="button-cta-signup">Manage Your Bills <ArrowRight size={15} /></button></div></section></main><Footer onModal={setModal} /><Modal kind={modal} onClose={() => setModal(null)} /></div>;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><RoutedErrorBoundary><Router /></RoutedErrorBoundary></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;