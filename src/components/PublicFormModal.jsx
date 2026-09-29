import React, { useState } from 'react';
import { X, Heart, Star, Send, CheckCircle, RefreshCw, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PublicFormModal({ isOpen, onClose, formConfig, onSubmitTestimonial, onShowToast }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [avatar, setAvatar] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      onShowToast({ message: "Preencha Nome e Depoimento!", type: "error" });
      return;
    }

    onSubmitTestimonial({
      name: name.trim(),
      role: role.trim() || "Cliente",
      company: company.trim() || formConfig.brandName,
      avatar: avatar.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fde047&color=18181b`,
      content: content.trim(),
      rating,
      status: "pending", // enters as pending
      createdAt: new Date().toISOString(),
      verified: true,
      featured: false,
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#3b82f6', '#ec4899', '#10b981']
    });

    setSubmitted(true);
    onShowToast({ message: "Depoimento enviado com sucesso!", type: "success" });
  };

  const handleReset = () => {
    setName('');
    setRole('');
    setCompany('');
    setAvatar('');
    setContent('');
    setRating(5);
    setSubmitted(false);
  };

  const copyUrl = () => {
    const originUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5174';
    navigator.clipboard.writeText(`${originUrl}/#collect/${formConfig.publicSlug}`);
    setCopied(true);
    onShowToast({ message: "URL pública copiada!", type: "success" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#faf6ed] rounded-3xl max-w-lg w-full p-6 shadow-[8px_8px_0px_#18181b] border-[2.5px] border-[#18181b] relative animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#18181b] bg-[#fef08a] text-[#18181b]">
              Link Público
            </span>
            <span className="text-xs text-stone-500 font-medium">
              /{formConfig.publicSlug}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white border-[1.5px] border-[#18181b] shadow-[1px_1px_0px_#18181b] hover:bg-stone-50 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Link'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border-[1.5px] border-[#18181b] bg-white flex items-center justify-center text-[#18181b] hover:bg-stone-100 shadow-[1px_1px_0px_#18181b] transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {submitted ? (
          /* Success Screen */
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#a7f3d0] border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] flex items-center justify-center text-[#065f46] mx-auto">
              <CheckCircle className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-retro font-black text-2xl text-[#18181b]">
              {formConfig.thankYouTitle}
            </h3>
            <p className="text-xs text-stone-600 font-medium max-w-sm mx-auto leading-relaxed">
              {formConfig.thankYouMessage}
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#18181b] rounded-full border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b] text-xs font-bold hover:bg-stone-50"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Enviar Outro</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#fde047] text-[#18181b] rounded-full border-[2px] border-[#18181b] shadow-[2px_2px_0px_#18181b] text-xs font-black hover:bg-[#facc15]"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          /* Public Form Experience */
          <div className="mt-5 space-y-5">
            {/* Brand Title Banner */}
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#fef08a] border-[1.5px] border-[#18181b] flex items-center justify-center text-[#18181b] mx-auto shadow-[1.5px_1.5px_0px_#18181b]">
                <Heart className="w-5 h-5 fill-[#f43f5e] text-[#18181b]" />
              </div>
              <h2 className="font-retro font-black text-xl text-[#18181b] pt-1">
                {formConfig.title}
              </h2>
              <p className="text-xs text-stone-600 font-medium max-w-md mx-auto">
                {formConfig.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-stone-800">
              {/* Star Rating */}
              {formConfig.enableRating && (
                <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
                  <span className="text-[10px] uppercase text-stone-500 mb-1.5 tracking-wider">
                    Sua Avaliação
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(s)}
                        className="p-1 hover:scale-115 transition-transform"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            s <= (hoverRating || rating) 
                              ? 'text-amber-500 fill-amber-400 stroke-[#18181b]' 
                              : 'text-stone-200 stroke-stone-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Depoimento */}
              <div>
                <label className="block uppercase text-[10px] tracking-wider mb-1">
                  Seu Depoimento <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Compartilhe como sua experiência foi transformadora..."
                  className="w-full px-3.5 py-2.5 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none"
                />
              </div>

              {/* Nome */}
              <div>
                <label className="block uppercase text-[10px] tracking-wider mb-1">
                  Seu Nome Completo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo"
                  className="w-full px-3.5 py-2 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none"
                />
              </div>

              {/* Cargo e Empresa */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-[10px] tracking-wider mb-1">
                    Cargo / Função
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Fundador"
                    className="w-full px-3.5 py-2 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase text-[10px] tracking-wider mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ex: Acme Studio"
                    className="w-full px-3.5 py-2 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none"
                  />
                </div>
              </div>

              {/* URL Avatar (se habilitado) */}
              {formConfig.enableAvatar && (
                <div>
                  <label className="block uppercase text-[10px] tracking-wider mb-1">
                    URL da Foto de Perfil (Opcional)
                  </label>
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://exemplo.com/sua-foto.jpg"
                    className="w-full px-3.5 py-2 text-xs font-medium bg-white border-[1.5px] border-[#18181b] rounded-xl shadow-[1.5px_1.5px_0px_#18181b] outline-none"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#fde047] hover:bg-[#facc15] text-[#18181b] font-black text-xs sm:text-sm rounded-full border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all mt-4"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
                <span>{formConfig.buttonText}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
