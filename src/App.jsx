import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FormEditor from './components/FormEditor';
import WallOfLove from './components/WallOfLove';
import Toast from './components/Toast';
import EmbedModal from './components/EmbedModal';
import NewTestimonialModal from './components/NewTestimonialModal';
import PublicFormModal from './components/PublicFormModal';
import { initialTestimonials, initialFormConfig } from './data/initialData';
import { RotateCcw } from 'lucide-react';

export default function App() {
  // Navigation active tab: 'dashboard' | 'editor' | 'widget'
  const [activeTab, setActiveTab] = useState('dashboard');

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

  // Toggle approval status (pending <-> approved)
  const handleToggleStatus = (id) => {
    setTestimonials((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'approved' ? 'pending' : 'approved';
          showToast({
            message: nextStatus === 'approved' 
              ? `Depoimento de "${t.name}" aprovado e publicado no Wall of Love!` 
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
      message: `${pendingCount} depoimento(s) pendente(s) aprovado(s) com sucesso!`,
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

  // Counts
  const pendingCount = testimonials.filter((t) => t.status === 'pending').length;
  const totalCount = testimonials.length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
        totalCount={totalCount}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onOpenPublicLink={() => setIsPublicModalOpen(true)}
        onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

        {activeTab === 'widget' && (
          <WallOfLove
            testimonials={testimonials}
            formConfig={formConfig}
            onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
            onSwitchToDashboard={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* App Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-orange-600 flex items-center justify-center text-white text-[10px] font-bold">
              K
            </div>
            <span className="font-bold text-slate-700">KudosDeck</span>
            <span>— Micro-SaaS para Gestão de Prova Social</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors"
              title="Restaurar dados de demonstração originais"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Demonstração</span>
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400">Paleta Laranja & Slate</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlay Components */}
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

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
