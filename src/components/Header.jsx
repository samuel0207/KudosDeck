import React from 'react';
import { 
  HeartHandshake, 
  LayoutDashboard, 
  FileEdit, 
  Sparkles, 
  Share2, 
  Plus, 
  Code
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  pendingCount, 
  onOpenNewModal,
  onOpenPublicLink,
  onOpenEmbedModal
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 ring-2 ring-orange-500/20">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                  Kudos<span className="text-orange-600">Deck</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/60">
                  Micro-SaaS
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Gestão Inteligente de Prova Social & Mural de Amor
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/70">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
              {pendingCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-amber-500 text-white rounded-full leading-none animate-pulse">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'editor'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>Editor de Formulário</span>
            </button>

            <button
              onClick={() => setActiveTab('widget')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'widget'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Widget Preview</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 uppercase">
                Wall of Love
              </span>
            </button>
          </nav>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenPublicLink}
              title="Visualizar link público que o cliente acessa para enviar depoimento"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 rounded-lg shadow-sm transition-all"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
              <span className="hidden sm:inline">Link Público</span>
            </button>

            <button
              onClick={onOpenEmbedModal}
              title="Obter código de incorporação (embed) para sites e Landing Pages"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 rounded-lg shadow-sm transition-all"
            >
              <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
              <span className="hidden sm:inline">Incorporar</span>
            </button>

            <button
              onClick={onOpenNewModal}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 active:scale-95 rounded-lg shadow-sm shadow-orange-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Depoimento</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex items-center justify-between pb-3 pt-1 border-t border-slate-100 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center justify-center gap-1.5 flex-1 py-2 px-2 text-xs font-semibold rounded-lg ${
              activeTab === 'dashboard'
                ? 'bg-orange-50 text-orange-700'
                : 'text-slate-600'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold bg-amber-500 text-white rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center justify-center gap-1.5 flex-1 py-2 px-2 text-xs font-semibold rounded-lg ${
              activeTab === 'editor'
                ? 'bg-orange-50 text-orange-700'
                : 'text-slate-600'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Formulário</span>
          </button>

          <button
            onClick={() => setActiveTab('widget')}
            className={`flex items-center justify-center gap-1.5 flex-1 py-2 px-2 text-xs font-semibold rounded-lg ${
              activeTab === 'widget'
                ? 'bg-orange-50 text-orange-700'
                : 'text-slate-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Wall of Love</span>
          </button>
        </div>
      </div>
    </header>
  );
}
