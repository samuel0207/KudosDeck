import React, { useState } from 'react';
import { X, Plus, Star, CheckCircle } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function NewTestimonialModal({ isOpen, onClose, onAdd, onShowToast }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [avatar, setAvatar] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState('approved'); // default approved when manual

  if (!isOpen) return null;

  const presets = [
    { label: "Homem 1", url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" },
    { label: "Mulher 1", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" },
    { label: "Homem 2", url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" },
    { label: "Mulher 2", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      onShowToast({ message: "Preencha pelo menos Nome e Depoimento!", type: "error" });
      return;
    }

    onAdd({
      name: name.trim(),
      role: role.trim() || "Cliente",
      company: company.trim() || "",
      avatar: avatar.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff`,
      content: content.trim(),
      rating,
      status,
      createdAt: new Date().toISOString(),
      verified: true,
      featured: false,
    });

    if (status === 'approved') {
      triggerConfetti();
    }

    onShowToast({ 
      message: `Depoimento adicionado com status "${status === 'approved' ? 'Aprovado' : 'Pendente'}"!`, 
      type: "success" 
    });
    
    // Reset fields
    setName('');
    setRole('');
    setCompany('');
    setAvatar('');
    setContent('');
    setRating(5);
    setStatus('approved');
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200/90 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg font-['Plus_Jakarta_Sans']">
                Adicionar Depoimento Manualmente
              </h3>
              <p className="text-xs text-slate-500">
                Cadastre um feedback recebido via e-mail, WhatsApp ou reunião
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          
          {/* Star Rating */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/70">
            <span className="text-xs font-bold text-slate-700 uppercase">Avaliação</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setRating(s)}
                  className="p-0.5 hover:scale-110 transition-transform"
                >
                  <Star className={`w-5 h-5 ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nome do Cliente <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Fernanda Lima"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Cargo e Empresa */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Cargo
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ex: Diretora de TI"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Empresa
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Veloce Corp"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Foto URL */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Foto URL (Opcional)
              </label>
              <span className="text-[10px] text-slate-400">Sugestões rápidas abaixo</span>
            </div>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
            />
            <div className="flex items-center gap-2 mt-2">
              {presets.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setAvatar(p.url)}
                  className="w-6 h-6 rounded-full overflow-hidden border border-slate-300 hover:ring-2 hover:ring-indigo-500"
                  title={p.label}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Depoimento */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Depoimento <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva as palavras do cliente..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none leading-relaxed"
            />
          </div>

          {/* Status Inicial */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Status Inicial
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('approved')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  status === 'approved' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20' 
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Aprovado Direto</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus('pending')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  status === 'pending' 
                    ? 'bg-amber-50 text-amber-800 border-amber-300 ring-2 ring-amber-500/20' 
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <span>Pendente</span>
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all"
            >
              Salvar Depoimento
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
