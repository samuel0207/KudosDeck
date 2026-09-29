import React, { useState, useEffect } from 'react';
import { RetroRibbonDoodles } from './components/RetroIllustrations';
import Dashboard from './components/Dashboard';
import FormEditor from './components/FormEditor';
import WallOfLove from './components/WallOfLove';
import Toast from './components/Toast';
import EmbedModal from './components/EmbedModal';
import NewTestimonialModal from './components/NewTestimonialModal';
import PublicFormModal from './components/PublicFormModal';
import { initialTestimonials, initialFormConfig } from './data/initialData';
import { 
  Heart, 
  LayoutDashboard, 
  FileEdit, 
  PlusCircle, 
  Code2, 
  RotateCcw, 
  Star, 
  TrendingUp, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation active tab: 'widget' (Wall of Love default!) | 'dashboard' | 'editor'
  const [activeTab, setActiveTab] = useState('widget');

  // Testimonials state with LocalStorage persistence
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem('kudosdeck_testimonials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load testimonials from localStorage", e);
    }
    return initialTestimonials;
  });

  // Form configuration state with LocalStorage persistence
  const [formConfig, setFormConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('kudosdeck_form_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load form config from localStorage", e);
    }
    return initialFormConfig;
  });

  // Modals state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isPublicModalOpen, setIsPublicModalOpen] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  // Sync testimonials to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kudosdeck_testimonials', JSON.stringify(testimonials));
    } catch (e) {
      console.error("Failed to save testimonials", e);
    }
  }, [testimonials]);

  // Sync formConfig to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kudosdeck_form_config', JSON.stringify(formConfig));
    } catch (e) {
      console.error("Failed to save formConfig", e);
    }
  }, [formConfig]);

  // Helper for displaying toast notification
  const showToast = ({ message, type = 'info' }) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 3500);
  };

  // Toggle approval status
  const handleToggleStatus = (id) => {
    setTestimonials((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'approved' ? 'pending' : 'approved';
          showToast({
            message: nextStatus === 'approved' 
              ? `Depoimento de "${t.name}" aprovado no Wall of Love!` 
              : `Depoimento de "${t.name}" marcado como Pendente.`,
            type: nextStatus === 'approved' ? 'success' : 'info',
          });
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  // Delete testimonial
  const handleDelete = (id) => {
    const itemToDelete = testimonials.find((t) => t.id === id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast({
      message: `Depoimento de "${itemToDelete?.name || 'Cliente'}" excluído.`,
      type: 'info',
    });
  };

  // Approve all pending testimonials
  const handleApproveAll = () => {
    const pendingCount = testimonials.filter((t) => t.status === 'pending').length;
    if (pendingCount === 0) return;

    setTestimonials((prev) =>
      prev.map((t) => ({ ...t, status: 'approved' }))
    );
    showToast({
      message: `${pendingCount} depoimento(s) aprovado(s) com sucesso!`,
      type: 'success',
    });
  };

  // Add new testimonial
  const handleAddTestimonial = (newTestimonial) => {
    const item = {
      ...newTestimonial,
      id: `t-${Date.now()}`,
    };
    setTestimonials((prev) => [item, ...prev]);
  };

  // Reset to initial demo data
  const handleResetData = () => {
    if (window.confirm("Deseja restaurar os depoimentos padrão de demonstração?")) {
      setTestimonials(initialTestimonials);
      setFormConfig(initialFormConfig);
      localStorage.removeItem('kudosdeck_testimonials');
      localStorage.removeItem('kudosdeck_form_config');
      showToast({ message: "Dados restaurados para o padrão de demonstração!", type: "info" });
    }
  };

  // Calculations for right panel
  const totalCount = testimonials.length;
  const approvedCount = testimonials.filter((t) => t.status === 'approved').length;
  const pendingCount = testimonials.filter((t) => t.status === 'pending').length;
  const fiveStarsCount = testimonials.filter((t) => (t.rating || 5) === 5).length;
  const approvalRate = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 100;
  const fiveStarRate = totalCount > 0 ? Math.round((fiveStarsCount / totalCount) * 100) : 100;
  
  // Featured testimonial for the right sidebar
  const featuredTestimonial = testimonials.find((t) => t.status === 'approved') || testimonials[0];

  const handleProTrigger = () => {
    setIsEmbedModalOpen(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#3b82f6', '#ec4899', '#10b981'],
    });
  };

  return (
    <div className="min-h-screen bg-[#eee8dc] text-[#18181b] relative overflow-x-hidden flex flex-col justify-center items-center p-2 sm:p-5 lg:p-8 font-sans selection:bg-[#fbbf24] selection:text-black">
      {/* Decorative Hand-drawn Yellow Ribbons on Canvas */}
      <RetroRibbonDoodles />

      {/* Main Tablet Frame matching the Reference Design */}
      <div className="w-full max-w-[1400px] bg-[#faf6ed] rounded-[32px] sm:rounded-[36px] border-[2.5px] border-[#18181b] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] overflow-hidden relative z-10 flex flex-col lg:flex-row min-h-[880px]">
        
        {/* ========================================================= */}
        {/* 1. LEFT SIDEBAR: Logo, Navigation, PRO Plan Upgrade Box   */}
        {/* ========================================================= */}
        <aside className="w-full lg:w-[230px] shrink-0 bg-[#faf6ed] border-b lg:border-b-0 lg:border-r-[2.5px] border-[#18181b] p-5 flex flex-col justify-between select-none">
          <div>
            {/* Logo in Fraunces bold serif with period */}
            <div className="flex items-center justify-between mb-7">
              <h1 className="text-3xl font-black font-retro tracking-tight text-[#18181b]">
                Retro<span className="text-[#f59e0b]">.</span>
              </h1>
            </div>

            {/* Navigation Menu in Neo-Brutalist Pills */}
            <nav className="space-y-1.5 font-bold text-xs">
              {/* Wall of Love (Default Active View) */}
              <button
                onClick={() => setActiveTab('widget')}
                className={`w-full px-4 py-2.5 rounded-full flex items-center gap-3 transition-all ${
                  activeTab === 'widget'
                    ? 'border-[1.5px] border-[#18181b] bg-[#ded9ce] text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]'
                    : 'text-[#18181b] hover:bg-[#ece6db]'
                }`}
              >
                <Heart size={16} className="fill-[#f43f5e] text-[#18181b]" />
                <span>Wall of Love</span>
              </button>

              {/* Dashboard / Moderação */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full px-4 py-2.5 rounded-full flex items-center justify-between transition-all ${
                  activeTab === 'dashboard'
                    ? 'border-[1.5px] border-[#18181b] bg-[#ded9ce] text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]'
                    : 'text-[#18181b] hover:bg-[#ece6db]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={16} className="stroke-[2.2]" />
                  <span>Dashboard</span>
                </div>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#fbcfe8] text-[#831843] border border-[#18181b] rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>

              {/* Form Editor */}
              <button
                onClick={() => setActiveTab('editor')}
                className={`w-full px-4 py-2.5 rounded-full flex items-center gap-3 transition-all ${
                  activeTab === 'editor'
                    ? 'border-[1.5px] border-[#18181b] bg-[#ded9ce] text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]'
                    : 'text-[#18181b] hover:bg-[#ece6db]'
                }`}
              >
                <FileEdit size={16} className="stroke-[2.2]" />
                <span>Form Editor</span>
              </button>

              {/* Coletar Depoimento Action */}
              <button
                onClick={() => setIsNewModalOpen(true)}
                className="w-full px-4 py-2.5 text-[#18181b] hover:bg-[#ece6db] rounded-full flex items-center gap-3 transition-colors text-left"
              >
                <PlusCircle size={16} className="stroke-[2.2] text-[#f59e0b]" />
                <span>+ Coletar</span>
              </button>

              {/* Incorporar Widget Action */}
              <button
                onClick={() => setIsEmbedModalOpen(true)}
                className="w-full px-4 py-2.5 text-[#18181b] hover:bg-[#ece6db] rounded-full flex items-center gap-3 transition-colors text-left"
              >
                <Code2 size={16} className="stroke-[2.2]" />
                <span>Embed Code</span>
              </button>
            </nav>
          </div>

          {/* Bottom Area: Reset & PRO Upgrade Box */}
          <div className="mt-8 space-y-4">
            <button
              onClick={handleResetData}
              className="w-full px-4 py-1.5 text-xs font-bold text-stone-600 hover:text-[#18181b] flex items-center gap-2 transition-colors"
              title="Restaurar dados padrão de demonstração"
            >
              <RotateCcw size={14} className="stroke-[2.2]" />
              <span>Restaurar Demo</span>
            </button>

            {/* Upgrade to a PRO plan Card from Reference Image */}
            <div className="border-[2px] border-[#18181b] rounded-2xl bg-[#efebe1] p-3 text-center shadow-[3px_3px_0px_#18181b] relative overflow-hidden flex flex-col items-center">
              <div className="w-20 h-20 relative mb-1 flex items-center justify-center">
                <img
                  src="/assets/gift-box.jpg"
                  alt="Upgrade PRO Gift"
                  className="w-full h-full object-contain drop-shadow-sm rounded-xl transform hover:scale-105 transition-transform"
                />
              </div>

              <p className="font-retro font-bold text-sm text-[#18181b] leading-tight">
                Upgrade<br />to a PRO plan
              </p>

              <button
                onClick={handleProTrigger}
                className="mt-2.5 bg-white text-[#18181b] font-bold text-xs px-5 py-1.5 rounded-full border-[1.5px] border-[#18181b] shadow-[2px_2px_0px_#18181b] hover:bg-[#18181b] hover:text-white transition-all active:translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* 2. CENTER CONTENT: Wall of Love / Dashboard / Form Editor */}
        {/* ========================================================= */}
        <main className="flex-1 bg-[#faf6ed] p-5 lg:p-7 flex flex-col gap-6 overflow-y-auto min-w-0">
          {activeTab === 'widget' && (
            <WallOfLove
              testimonials={testimonials}
              formConfig={formConfig}
              onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
              onSwitchToDashboard={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              testimonials={testimonials}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
              onApproveAll={handleApproveAll}
              onOpenNewModal={() => setIsNewModalOpen(true)}
            />
          )}

          {activeTab === 'editor' && (
            <FormEditor
              formConfig={formConfig}
              setFormConfig={setFormConfig}
              onSubmitTestimonial={handleAddTestimonial}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* ========================================================= */}
        {/* 3. RIGHT SIDEBAR: Profile & Live Performance Metrics     */}
        {/* ========================================================= */}
        <aside className="w-full lg:w-[310px] shrink-0 bg-[#faf6ed] border-t lg:border-t-0 lg:border-l-[2.5px] border-[#18181b] p-5 flex flex-col gap-4 select-none">
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#fef08a] border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b] flex items-center justify-center overflow-hidden p-0.5">
              <img
                src="https://api.dicebear.com/7.x/bottts/svg?seed=BasithAli&backgroundColor=transparent"
                alt="Basith Ali"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-retro font-black text-sm text-[#18181b]">
                Basith Ali
              </h3>
              <p className="text-[11px] text-stone-600 font-medium leading-tight">
                Your doing great, keep collecting
              </p>
            </div>
          </div>

          {/* Section: Latest Feedback / Destaque da Semana */}
          <div>
            <h4 className="font-retro font-bold text-sm text-[#18181b] mb-3">
              Destaque do Mural
            </h4>

            {featuredTestimonial && (
              <div
                onClick={() => setIsEmbedModalOpen(true)}
                className="border-[1.5px] border-[#18181b] rounded-2xl bg-white p-3.5 shadow-[2.5px_2.5px_0px_#18181b] relative hover:-translate-y-1 transition-transform cursor-pointer group"
              >
                <span className="absolute top-4 left-4 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#18181b] bg-[#fbcfe8] text-[#831843]">
                  Featured
                </span>

                {/* 3D Camera / Masterclass Style Illustration */}
                <div className="w-full h-32 rounded-xl border-[1.5px] border-[#18181b] overflow-hidden mb-2.5 bg-[#fefce8]">
                  <img
                    src="/assets/camera-class.jpg"
                    alt="Featured Wall Proof"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-start justify-between">
                  <h5 className="font-bold text-xs text-[#18181b] leading-tight group-hover:text-amber-700">
                    "{featuredTestimonial.content.slice(0, 75)}..."
                  </h5>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={featuredTestimonial.avatar}
                      alt={featuredTestimonial.name}
                      className="w-4 h-4 rounded-full object-cover border border-[#18181b]"
                    />
                    <span className="text-stone-700 font-bold truncate max-w-[110px]">
                      {featuredTestimonial.name}
                    </span>
                  </div>
                  <span className="text-stone-500 font-semibold">
                    {featuredTestimonial.company || 'Cliente VIP'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 4 Performance Progress Bars matching the reference design */}
          <div className="space-y-2 mt-1">
            <h5 className="font-retro font-bold text-xs text-[#18181b]">
              Metas de Prova Social
            </h5>

            {/* 1. Depoimentos Aprovados */}
            <div className="border-[1.5px] border-[#18181b] rounded-xl bg-white p-2.5 shadow-[2px_2px_0px_#18181b] flex items-center gap-2.5">
              <div className="w-8 h-8 shrink-0 rounded-lg border border-[#18181b] bg-[#ede9fe] flex items-center justify-center font-bold text-[10px] text-[#18181b]">
                <Heart size={14} className="fill-[#8b5cf6] text-[#8b5cf6]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#18181b]">
                  <span className="truncate">Taxa de Aprovação</span>
                  <span className="text-[10px] text-stone-500 font-semibold">{approvalRate}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full border border-[#18181b] mt-1.5 overflow-hidden">
                  <div className="h-full bg-[#8b5cf6] rounded-full" style={{ width: `${approvalRate}%` }} />
                </div>
              </div>
            </div>

            {/* 2. Avaliações 5 Estrelas */}
            <div className="border-[1.5px] border-[#18181b] rounded-xl bg-white p-2.5 shadow-[2px_2px_0px_#18181b] flex items-center gap-2.5">
              <div className="w-8 h-8 shrink-0 rounded-lg border border-[#18181b] bg-[#fef3c7] flex items-center justify-center font-bold text-[10px] text-[#18181b]">
                <Star size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#18181b]">
                  <span className="truncate">Avaliações 5★</span>
                  <span className="text-[10px] text-stone-500 font-semibold">{fiveStarRate}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full border border-[#18181b] mt-1.5 overflow-hidden">
                  <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: `${fiveStarRate}%` }} />
                </div>
              </div>
            </div>

            {/* 3. Meta de 20 Reviews */}
            <div className="border-[1.5px] border-[#18181b] rounded-xl bg-white p-2.5 shadow-[2px_2px_0px_#18181b] flex items-center gap-2.5">
              <div className="w-8 h-8 shrink-0 rounded-lg border border-[#18181b] bg-[#cffafe] flex items-center justify-center font-bold text-[10px] text-[#18181b]">
                <TrendingUp size={14} className="text-[#06b6d4]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#18181b]">
                  <span className="truncate">Meta de Provas (20)</span>
                  <span className="text-[10px] text-stone-500 font-semibold">{Math.min(100, Math.round((totalCount / 20) * 100))}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full border border-[#18181b] mt-1.5 overflow-hidden">
                  <div className="h-full bg-[#06b6d4] rounded-full" style={{ width: `${Math.min(100, Math.round((totalCount / 20) * 100))}%` }} />
                </div>
              </div>
            </div>

            {/* 4. Widget Incorporado */}
            <div className="border-[1.5px] border-[#18181b] rounded-xl bg-white p-2.5 shadow-[2px_2px_0px_#18181b] flex items-center gap-2.5">
              <div className="w-8 h-8 shrink-0 rounded-lg border border-[#18181b] bg-[#ffe4e6] flex items-center justify-center font-bold text-[10px] text-[#18181b]">
                <Sparkles size={14} className="text-[#f43f5e]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#18181b]">
                  <span className="truncate">Status do Widget</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Ativo</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full border border-[#18181b] mt-1.5 overflow-hidden">
                  <div className="h-full bg-[#f43f5e] rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* Modals & Overlays */}
      <NewTestimonialModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAdd={handleAddTestimonial}
        onShowToast={showToast}
      />

      <PublicFormModal
        isOpen={isPublicModalOpen}
        onClose={() => setIsPublicModalOpen(false)}
        formConfig={formConfig}
        onSubmitTestimonial={handleAddTestimonial}
        onShowToast={showToast}
      />

      <EmbedModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
        formConfig={formConfig}
        onShowToast={showToast}
      />

      {/* Floating Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
