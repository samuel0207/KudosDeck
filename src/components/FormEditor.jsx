import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Star, 
  User, 
  Briefcase, 
  Image as ImageIcon, 
  CheckCircle, 
  Copy, 
  Settings2, 
  Eye, 
  RefreshCw,
  Sliders,
  Check,
  Globe
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function FormEditor({ 
  formConfig, 
  setFormConfig, 
  onSubmitTestimonial,
  onShowToast 
}) {
  // Local state for the interactive preview test submission
  const [previewName, setPreviewName] = useState('');
  const [previewRole, setPreviewRole] = useState('');
  const [previewCompany, setPreviewCompany] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [previewRating, setPreviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Preset avatars for quick testing
  const sampleAvatars = [
    { label: "Avatar 1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
    { label: "Avatar 2", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    { label: "Avatar 3", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
    { label: "Avatar 4", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
  ];

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#collect/${formConfig.publicSlug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    onShowToast({ message: "Link público copiado com sucesso!", type: "success" });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTestSubmit = (e) => {
    e.preventDefault();
    if (!previewName.trim() || !previewContent.trim()) {
      onShowToast({ message: "Por favor, preencha pelo menos Nome e Depoimento.", type: "error" });
      return;
    }

    // Submit new testimonial to parent state!
    onSubmitTestimonial({
      name: previewName.trim(),
      role: previewRole.trim() || "Cliente",
      company: previewCompany.trim() || formConfig.brandName,
      avatar: previewAvatar.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(previewName)}&background=4f46e5&color=fff`,
      content: previewContent.trim(),
      rating: previewRating,
      status: "pending", // enters as pending for approval
      createdAt: new Date().toISOString(),
      verified: true,
      featured: false,
    });

    triggerConfetti();
    setSubmittedSuccess(true);
    onShowToast({ message: "Depoimento de teste enviado! Ele já aparece como 'Pendente' no seu Dashboard.", type: "success" });
  };

  const handleResetTestForm = () => {
    setPreviewName('');
    setPreviewRole('');
    setPreviewCompany('');
    setPreviewAvatar('');
    setPreviewContent('');
    setPreviewRating(5);
    setSubmittedSuccess(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Settings2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
              Editor do Formulário de Coleta
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Personalize a experiência de coleta de depoimentos. Teste o formulário diretamente no painel interativo à direita antes de compartilhar com seus clientes.
          </p>
        </div>

        {/* Share Link Pill */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 font-mono flex-1 md:flex-initial truncate">
            <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">kudosdeck.app/c/{formConfig.publicSlug}</span>
          </div>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all shrink-0"
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </div>
      </div>

      {/* 2-Column Split: Settings on Left, Interactive Live Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Configuration Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                Textos & Personalização
              </h3>
              <span className="text-xs text-slate-400">Tempo real</span>
            </div>

            {/* Brand / Product Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nome da Marca / Produto
              </label>
              <input
                type="text"
                value={formConfig.brandName}
                onChange={(e) => setFormConfig({ ...formConfig, brandName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                placeholder="Ex: Minha Startup"
              />
            </div>

            {/* Form Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título Principal
              </label>
              <input
                type="text"
                value={formConfig.title}
                onChange={(e) => setFormConfig({ ...formConfig, title: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="Ex: Como foi sua experiência?"
              />
            </div>

            {/* Subtitle / Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subtítulo / Instrução
              </label>
              <textarea
                rows={2}
                value={formConfig.subtitle}
                onChange={(e) => setFormConfig({ ...formConfig, subtitle: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                placeholder="Descreva brevemente como a avaliação ajuda sua equipe..."
              />
            </div>

            {/* Button CTA text */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Texto do Botão de Ação
              </label>
              <input
                type="text"
                value={formConfig.buttonText}
                onChange={(e) => setFormConfig({ ...formConfig, buttonText: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="Ex: Enviar meu depoimento"
              />
            </div>

            {/* Thank you message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mensagem de Agradecimento (Sucesso)
              </label>
              <input
                type="text"
                value={formConfig.thankYouMessage}
                onChange={(e) => setFormConfig({ ...formConfig, thankYouMessage: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="Ex: Muito obrigado pela mensagem! 🎉"
              />
            </div>

            {/* Feature Toggles */}
            <div className="pt-2 space-y-3">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Configuração dos Campos
              </span>
              
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 cursor-pointer transition-colors">
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span className="text-xs font-semibold text-slate-700">Coletar Avaliação de Estrelas (1-5)</span>
                </div>
                <input
                  type="checkbox"
                  checked={formConfig.requireRating}
                  onChange={(e) => setFormConfig({ ...formConfig, requireRating: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 cursor-pointer transition-colors">
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-semibold text-slate-700">Permitir Foto de Perfil URL</span>
                </div>
                <input
                  type="checkbox"
                  checked={formConfig.allowAvatarUpload}
                  onChange={(e) => setFormConfig({ ...formConfig, allowAvatarUpload: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
              </label>
            </div>
          </div>

          {/* Quick Tip Box */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 text-indigo-900 text-xs leading-relaxed flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Dica Pro de Conversão:</span> Todos os novos depoimentos enviados através deste formulário entram automaticamente no seu Dashboard como <strong className="text-amber-800">Pendentes</strong>. Você pode revisá-los antes de exibi-los no seu Wall of Love!
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Form Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            
            {/* Window bar mockup */}
            <div className="bg-slate-900 rounded-t-2xl px-4 py-3 flex items-center justify-between text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-2 font-mono text-[11px] text-slate-300">
                  kudosdeck.app/c/{formConfig.publicSlug}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span>Preview Interativo</span>
              </div>
            </div>

            {/* Container */}
            <div className="bg-slate-100/70 p-4 sm:p-8 rounded-b-2xl border-x border-b border-slate-200 shadow-xl">
              
              {submittedSuccess ? (
                /* Success Screen */
                <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-lg border border-slate-200/90 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
                    Depoimento Enviado!
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
                    {formConfig.thankYouMessage}
                  </p>
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 max-w-sm mx-auto">
                    Status: <strong>Pendente de Moderação</strong> no seu Dashboard.
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={handleResetTestForm}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Enviar Outro Depoimento
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Preview */
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200/80">
                  
                  {/* Form Header */}
                  <div className="text-center max-w-lg mx-auto mb-8">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
                      {formConfig.brandName}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans'] tracking-tight">
                      {formConfig.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                      {formConfig.subtitle}
                    </p>
                  </div>

                  {/* Form Inputs (Fields: Nome, Foto URL, Cargo e Depoimento) */}
                  <form onSubmit={handleTestSubmit} className="space-y-5">
                    
                    {/* Star Rating Selector (if enabled) */}
                    {formConfig.requireRating && (
                      <div className="text-center pb-2">
                        <label className="block text-xs font-bold text-slate-600 mb-2">
                          Sua Avaliação
                        </label>
                        <div className="flex items-center justify-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setPreviewRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 hover:scale-110 transition-transform focus:outline-none"
                            >
                              <Star 
                                className={`w-7 h-7 ${
                                  (hoverRating || previewRating) >= star 
                                    ? 'text-amber-400 fill-amber-400' 
                                    : 'text-slate-200 fill-slate-100'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
                          {previewRating === 5 ? 'Excelente! ⭐⭐⭐⭐⭐' : `${previewRating} estrelas`}
                        </span>
                      </div>
                    )}

                    {/* Field 1: Nome (Name) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Seu Nome Completo <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={previewName}
                          onChange={(e) => setPreviewName(e.target.value)}
                          placeholder="Ex: Carlos Eduardo"
                          className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                        />
                      </div>
                    </div>

                    {/* Field 2 & 3: Cargo e Empresa (Role and Company) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Cargo / Função
                        </label>
                        <div className="relative">
                          <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={previewRole}
                            onChange={(e) => setPreviewRole(e.target.value)}
                            placeholder="Ex: Tech Lead"
                            className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Empresa
                        </label>
                        <input
                          type="text"
                          value={previewCompany}
                          onChange={(e) => setPreviewCompany(e.target.value)}
                          placeholder="Ex: Inova Soluções"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800"
                        />
                      </div>
                    </div>

                    {/* Field 4: Foto URL (Avatar URL) with Quick Selector & Thumbnail */}
                    {formConfig.allowAvatarUpload && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                            URL da sua Foto de Perfil
                          </label>
                          <span className="text-[11px] text-slate-400">Opcional</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative flex-1">
                            <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="url"
                              value={previewAvatar}
                              onChange={(e) => setPreviewAvatar(e.target.value)}
                              placeholder="https://exemplo.com/minha-foto.jpg"
                              className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono text-slate-800"
                            />
                          </div>
                          
                          {/* Live Avatar Preview badge */}
                          <div className="w-10 h-10 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                            {previewAvatar ? (
                              <img 
                                src={previewAvatar} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(previewName || 'User')}&background=4f46e5&color=fff`;
                                }} 
                              />
                            ) : (
                              <User className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </div>

                        {/* Quick avatar choices for testing */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Testar com foto:</span>
                          {sampleAvatars.map((av, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setPreviewAvatar(av.url)}
                              className="w-6 h-6 rounded-full overflow-hidden border border-slate-300 hover:ring-2 hover:ring-indigo-500 transition-all shrink-0"
                              title={`Usar ${av.label}`}
                            >
                              <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Field 5: Depoimento (Testimonial Text) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Seu Depoimento <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {previewContent.length}/500
                        </span>
                      </div>
                      <div className="relative">
                        <textarea
                          required
                          rows={4}
                          maxLength={500}
                          value={previewContent}
                          onChange={(e) => setPreviewContent(e.target.value)}
                          placeholder="Conte em poucas palavras como este produto te ajudou, quais resultados alcançou ou o que mais gostou..."
                          className="w-full px-3.5 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none leading-relaxed text-slate-800"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>{formConfig.buttonText}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Ao enviar, você autoriza a exibição pública do seu depoimento no nosso mural.
                    </p>
                  </form>

                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
