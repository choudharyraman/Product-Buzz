import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import TopBar from '@/components/layout/TopBar';
import AgentFAB from '@/components/agent/AgentFAB';

export const metadata = {
  title: {
    default: 'Dashboard | Product Buzz',
    template: '%s | Product Buzz',
  },
};

export default function DashboardLayout({ children }) {
  return (
    <div className="app-layout">
      {/* Desktop / tablet sidebar */}
      <Sidebar streak={7} />

      {/* Main content area */}
      <main className="app-main">
        {/* Sticky top bar — shown on tablet + mobile via CSS */}
        <TopBar title="Product Buzz" streak={7} />

        {/* Page content */}
        <div className="page-content">
          {children}
        </div>

        {/* Floating AI Agent FAB */}
        <AgentFAB />

        {/* Bottom nav — shown on mobile via CSS */}
        <MobileNav />
      </main>
    </div>
  );
}

