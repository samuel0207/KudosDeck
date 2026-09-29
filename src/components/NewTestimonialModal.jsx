import React, { useState } from 'react';
import { X, Plus, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

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
    { label: "Avatar 1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
    { label: "Avatar 2", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    { label: "Avatar 3", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
    { label: "Avatar 4", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" }
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
      avatar: avatar.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fde047&color=18181b`,
      content: content.trim(),
      rating,
      status,
      createdAt: new Date().toISOString(),
      verified: true,
      featured: false,
    });

    if (status === 'approved') {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#f43f5e']
      });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#faf6ed] rounded-3xl max-w-lg w-full p-6 shadow-[8px_8px_0px_#18181b] border-[2.5px] border-[#18181b] relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#fef08a] border-[1.5px] border-[#18181b] flex items-center justify-center text-[#18181b] shadow-[1px_1px_0px_#18181b]">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-[#18181b] text-lg font-retro">
                Cadastrar Depoimento
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                Feedback recebido via e-mail, WhatsApp ou reunião
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border-[1.5px] border-[#18181b] bg-white flex items-center justify-center text-[#18181b] hover:bg-stone-100 shadow-[1.5px_1.5px_0px_#18181b] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs font-bold text-stone-800">
          
          {/* Star Rating */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <span className="uppercase text-[11px] tracking-wider">Avaliação</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setRating(s)}
                  className="p-0.5 hover:scale-110 transition-transform"
                >
                  <Star className={`w-5 h-5 ${s <= rating ? 'text-amber-500 fill-amber-400 stroke-[#18181b]' : 'text-stone-200'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="block uppercase text-[11px] tracking-wider mb-1.5">
              Nome do Cliente <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Amanda Silveira"
              className="w-full px-3.5 py-2 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none"
            />
          </div>

          {/* Cargo e Empresa */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase text-[11px] tracking-wider mb-1.5">
                Cargo
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ex: Tech Lead"
                className="w-full px-3.5 py-2 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none"
              />
            </div>
            <div>
              <label className="block uppercase text-[11px] tracking-wider mb-1.5">
                Empresa
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Vellum Corp"
                className="w-full px-3.5 py-2 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none"
              />
            </div>
          </div>

          {/* Foto Avatar Preset */}
          <div>
            <label className="block uppercase text-[11px] tracking-wider mb-1.5">
              URL da Foto ou Preset Rápido
            </label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://exemplo.com/foto.jpg"
              className="w-full px-3.5 py-2 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none mb-2"
            />
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-stone-500 font-semibold">Presets:</span>
              {presets.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setAvatar(p.url)}
                  className={`w-7 h-7 rounded-full border border-[#18181b] overflow-hidden hover:scale-105 transition-transform ${avatar === p.url ? 'ring-2 ring-amber-500' : ''}`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Depoimento Content */}
          <div>
            <label className="block uppercase text-[11px] tracking-wider mb-1.5">
              Depoimento do Cliente <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="O produto superou todas as expectativas da nossa equipe..."
              className="w-full px-3.5 py-2 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none"
            />
          </div>

          {/* Status Inicial */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <div>
              <span className="block text-xs font-bold text-[#18181b]">Publicar Imediatamente no Wall?</span>
              <span className="text-[10px] text-stone-500 font-medium">Se desligado, entrará como Pendente no Dashboard</span>
            </div>
            <button
              type="button"
              onClick={() => setStatus(status === 'approved' ? 'pending' : 'approved')}
              className={`px-3 py-1 rounded-full text-xs font-bold border border-[#18181b] shadow-[1px_1px_0px_#18181b] transition-all ${
                status === 'approved' ? 'bg-[#a7f3d0] text-[#065f46]' : 'bg-[#fef08a] text-[#854d0e]'
              }`}
            >
              {status === 'approved' ? 'Aprovado' : 'Pendente'}
            </button>
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-[#18181b] rounded-full border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b] hover:bg-stone-50 font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#fde047] hover:bg-[#facc15] text-[#18181b] rounded-full border-[2px] border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] font-black active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              Salvar Depoimento
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
