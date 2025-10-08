import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Footer } from "./Components/Shared/Footer";
import { getCalApi } from "@calcom/embed-react";
import { Calendar, Mail, ExternalLink, Linkedin, Github, Rocket } from "lucide-react";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  // Initialize Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#10b981" }, // emerald-500
        },
      });
    })();
  }, []);

  const handleBookingClick = () => {
    setIsOpen(false);
  };

  const links = [
    { label: "Home", to: "/" },
    { label: "Resume", to: "/resume" },
    { label: "Projects", to: "/projects" },
  ];

  const externalLinks = [
    { label: "OneDeal", icon: Rocket, url: "https://onedealapp.com" },
    { label: "Trade Intel", icon: Rocket, url: "https://app.evanjacobson.io" },
  ];

  const socialLinks = [
    { label: "Book a Call", icon: Calendar, onClick: handleBookingClick, isBooking: true },
    { label: "Email", icon: Mail, url: "mailto:contact@evanjacobson.io" },
    { label: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/evanjacobson3/" },
    { label: "GitHub", icon: Github, url: "https://github.com/evanjacobson" },
  ];


  const isActive = (to) => {
    return location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
  };

  const renderSocialLink = (item) => {
    const baseClasses = "flex w-full items-center px-4 py-2.5 text-sm rounded-xl transition-all text-slate-300 hover:text-white hover:bg-slate-700/40";
    const IconComponent = item.icon;
    
    if (item.isBooking) {
      return (
        <button
          key={item.label}
          data-cal-link="evanjacobson"
          data-cal-config='{"theme":"dark"}'
          className={baseClasses}
          onClick={item.onClick}
        >
          <IconComponent className="w-4 h-4 mr-3 text-slate-400" />
          <span className="font-medium">{item.label}</span>
        </button>
      );
    }

    return (
      <a
        key={item.label}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} justify-between`}
        onClick={handleLinkClick}
      >
        <div className="flex items-center">
          <IconComponent className="w-4 h-4 mr-3 text-slate-400" />
          <span className="font-medium">{item.label}</span>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-500" />
      </a>
    );
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/95 backdrop-blur-xl border-r border-slate-700 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-0
      `}>
        {/* Brand */}
        <div className="border-b border-slate-700 px-5 py-4">
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg tracking-tight text-slate-200">Evan Jacobson</h2>
            <p className="text-slate-400">
              Software Engineer & Creator
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-3 overflow-y-auto h-screen custom-scrollbar">
          {/* Main Navigation */}
          <div className="mb-6">
            <div className="px-2 py-1.5 text-[11px] uppercase tracking-wider text-slate-400 mb-2">
              Navigation
            </div>
            <div className="space-y-1.5">
              {links.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all
                    ${isActive(item.to)
                      ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/40"}
                  `}
                  onClick={handleLinkClick}
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="mb-6">
            <div className="px-2 py-1.5 text-[11px] uppercase tracking-wider text-slate-400 mb-2">
              Launched
            </div>
            <div className="space-y-1.5">
              {externalLinks.map((item) => renderSocialLink(item))}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="mb-6">
            <div className="px-2 py-1.5 text-[11px] uppercase tracking-wider text-slate-400 mb-2">
              Connect
            </div>
            <div className="space-y-1.5">
              {socialLinks.map((item) => renderSocialLink(item))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top:-90, left: 0 });;
  }, [location.pathname]);

  // Define footer content based on route
  const getFooterProps = () => {
    switch (location.pathname) {
      case '/resume':
        return {
          title: "Ready to Work Together?",
          text: "Interested in my experience and skills? Let's discuss how I can contribute to your team and projects."
        };
      default:
        return {}; // Use default values
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <style>{`
        :root {
          --primary: 14 165 233;
          --primary-foreground: 255 255 255;
          --secondary: 30 41 59;
          --secondary-foreground: 226 232 240;
          --muted: 15 23 42;
          --muted-foreground: 148 163 184;
          --accent: 34 197 94;
          --destructive: 239 68 68;
          --border: 51 65 85;
          --background: 2 6 23;
          --foreground: 248 250 252;
        }

        .dark {
          --border: 51 65 85;
        }

        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          color: #f8fafc;
        }

        .glass {
          background: rgba(30,41,59,.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(51,65,85,.35);
        }

        /* Custom scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.6);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.8);
        }
      `}</style>

      <div className="flex w-full">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="flex-1 flex flex-col md:ml-0">
          <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-800/30 backdrop-blur-xl px-6 py-4 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="hover:bg-slate-700 p-2 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-base font-semibold">Evan Jacobson</h1>
              </div>

              <div className="flex items-center gap-4">
                 <button
                   onClick={() => {
                     const footer = document.getElementById('footer');
                     if (footer) {
                       footer.scrollIntoView({ behavior: 'smooth' });
                     }
                     setSidebarOpen(false);
                   }}
                   className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300"
                 >
                   <Calendar className="w-4 h-4" />
                   {/*Book Call*/}
                 </button>
              </div>
              

              
            </div>
          </header>
          <div className="flex-1 overflow-auto">
            {children}
            <Footer {...getFooterProps()} />
          </div>
        </main>
      </div>
    </div>
  );
}