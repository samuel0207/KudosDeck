import React, { useState } from 'react';
import { X, HeartHandshake, Star, Send, CheckCircle, RefreshCw, Copy, Check } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

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
      avatar: avatar.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ea580c&color=fff`,
      content: content.trim(),
      rating,
      status: "pending", // enters as pending
      createdAt: new Date().toISOString(),
      verified: true,
      featured: false,
    });

    triggerConfetti();
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
    const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kudosdeck.app';
    navigator.clipboard.writeText(`${originUrl}/#collect/${formConfig.publicSlug}`);
    setCopied(true);
    onShowToast({ message: "URL pública copiada!", type: "success" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-[#f8fafc] rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200/90 relative animate-in zoom-in-95 my-auto max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Top Browser Bar */}
        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-slate-300 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">
              Visão do Cliente: https://kudosdeck.app/c/{formConfig.publicSlug}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyUrl}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copiado' : 'Copiar URL'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-10 overflow-y-auto">
          {submitted ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                Obrigado pelo seu feedback!
              </h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                {formConfig.thankYouMessage}
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-orange-50 text-orange-700 font-semibold text-xs rounded-xl hover:bg-orange-100 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Enviar outro depoimento
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl transition-all"
                >
                  Voltar ao Painel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md max-w-lg mx-auto">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-orange-600/25">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  {formConfig.brandName}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-['Plus_Jakarta_Sans']">
                  {formConfig.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {formConfig.subtitle}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating */}
                {formConfig.requireRating && (
                  <div className="flex flex-col items-center pb-2">
                    <span className="text-xs font-bold text-slate-600 mb-1">Como você nos avalia?</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              (hoverRating || rating) >= s
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200 fill-slate-100'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nome Completo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Roberto Silva"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                {/* Role and Company */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Cargo / Função
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ex: Gerente de TI"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Tech Corp"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Foto URL */}
                {formConfig.allowAvatarUpload && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      URL da sua Foto de Perfil (Opcional)
                    </label>
                    <input
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-mono"
                    />
                  </div>
                )}

                {/* Depoimento */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Seu Depoimento <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Conte como foi sua experiência..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{formConfig.buttonText}</span>
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
