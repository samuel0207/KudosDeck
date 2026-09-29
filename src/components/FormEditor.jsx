import { 
  Send, 
  Star, 
  CheckCircle, 
  Copy, 
  Sliders, 
  Check, 
  Globe,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FormEditor({ 
  formConfig, 
  setFormConfig, 
  onSubmitTestimonial,
  onShowToast,
  onOpenPublicLink
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
      avatar: previewAvatar.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(previewName)}&background=fde047&color=18181b`,
      content: previewContent.trim(),
      rating: previewRating,
      status: "pending", // enters as pending for approval
      createdAt: new Date().toISOString(),
      verified: true,
    });

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#3b82f6', '#ec4899', '#10b981']
    });

    setSubmittedSuccess(true);
    onShowToast({ 
      message: "Depoimento enviado no teste! Ele já aparece como 'Pendente' no Dashboard.", 
      type: "success" 
    });
  };

  const handleResetPreview = () => {
    setPreviewName('');
    setPreviewRole('');
    setPreviewCompany('');
    setPreviewAvatar('');
    setPreviewContent('');
    setPreviewRating(5);
    setSubmittedSuccess(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Prominent Share Link Banner */}
      <div className="bg-[#fef08a] rounded-2xl p-4 sm:p-5 border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#18181b] bg-white text-[#18181b] shadow-[1px_1px_0px_#18181b]">
              🔗 Link Oficial de Coleta
            </span>
            <span className="text-xs font-bold text-amber-950">Envie aos clientes para receber avaliações</span>
          </div>
          <h2 className="text-base sm:text-lg font-black font-retro text-[#18181b]">
            Link Público para Compartilhar
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-stone-800 font-mono bg-white px-3 py-1.5 rounded-xl border border-[#18181b] shadow-[1px_1px_0px_#18181b] w-full max-w-xl truncate">
            <Globe className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-semibold select-all truncate">
              {typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5174'}/#collect/{formConfig.publicSlug}
            </span>
          </div>
        </div>

        {/* Buttons: Copiar Link & Abrir Formulário */}
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-stone-50 text-[#18181b] rounded-full text-xs font-bold border-[1.5px] border-[#18181b] shadow-[2px_2px_0px_#18181b] transition-all active:translate-y-0.5"
          >
            {copiedLink ? <Check className="w-4 h-4 stroke-[2.5] text-emerald-600" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
            <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link'}</span>
          </button>

          <button
            onClick={() => {
              if (onOpenPublicLink) {
                onOpenPublicLink();
              } else {
                window.location.hash = `#collect/${formConfig.publicSlug}`;
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#18181b] hover:bg-stone-800 text-white rounded-full text-xs font-bold border-[1.5px] border-[#18181b] shadow-[2px_2px_0px_#18181b] transition-all active:translate-y-0.5"
          >
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
            <span>Abrir Formulário</span>
          </button>
        </div>
      </div>

      {/* 2-Column Split: Settings on Left, Interactive Live Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form Configuration Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-[#18181b] text-sm font-retro flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-600 stroke-[2.5]" />
                <span>Textos & Customização</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#18181b] bg-[#a7f3d0] text-[#065f46]">
                Tempo real
              </span>
            </div>

            {/* Brand / Product Name */}
            <div>
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Nome da Marca / Empresa
              </label>
              <input
                type="text"
                value={formConfig.brandName || ''}
                onChange={(e) => setFormConfig({ ...formConfig, brandName: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none"
                placeholder="Ex: Minha Empresa"
              />
            </div>

            {/* Form Title */}
            <div>
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Título Principal do Formulário
              </label>
              <input
                type="text"
                value={formConfig.title || ''}
                onChange={(e) => setFormConfig({ ...formConfig, title: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none"
                placeholder="Ex: Deixe seu depoimento"
              />
            </div>

            {/* Form Subtitle */}
            <div>
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Subtítulo / Instruções
              </label>
              <textarea
                rows={2}
                value={formConfig.subtitle || ''}
                onChange={(e) => setFormConfig({ ...formConfig, subtitle: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none"
                placeholder="Conte para nós como o produto ajudou você..."
              />
            </div>

            {/* Button Text */}
            <div>
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Texto do Botão de Envio
              </label>
              <input
                type="text"
                value={formConfig.buttonText || ''}
                onChange={(e) => setFormConfig({ ...formConfig, buttonText: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none"
                placeholder="Ex: Enviar meu Depoimento"
              />
            </div>

            {/* Thank You Message */}
            <div className="pt-2 border-t border-stone-200">
              <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Mensagem de Agradecimento
              </label>
              <input
                type="text"
                value={formConfig.thankYouTitle || ''}
                onChange={(e) => setFormConfig({ ...formConfig, thankYouTitle: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none mb-2"
                placeholder="Título: Muito Obrigado!"
              />
              <textarea
                rows={2}
                value={formConfig.thankYouMessage || ''}
                onChange={(e) => setFormConfig({ ...formConfig, thankYouMessage: e.target.value })}
                className="w-full px-3 py-1.5 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none"
                placeholder="Mensagem pós-envio..."
              />
            </div>

            {/* Field Toggles */}
            <div className="pt-2 border-t border-stone-200 space-y-2">
              <span className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider">
                Campos Habilitados
              </span>
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#faf6ed] border border-[#18181b]">
                <span className="text-xs font-bold text-[#18181b]">Avaliação com Estrelas (1-5)</span>
                <input
                  type="checkbox"
                  checked={!!formConfig.enableRating}
                  onChange={(e) => setFormConfig({ ...formConfig, enableRating: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#faf6ed] border border-[#18181b]">
                <span className="text-xs font-bold text-[#18181b]">Upload de Foto de Perfil</span>
                <input
                  type="checkbox"
                  checked={!!formConfig.enableAvatar}
                  onChange={(e) => setFormConfig({ ...formConfig, enableAvatar: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Live Interactive Form Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-[#faf6ed] rounded-3xl p-6 border-[2.5px] border-[#18181b] shadow-[4px_4px_0px_#18181b] relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 border border-[#18181b]" />
                <span className="w-3 h-3 rounded-full bg-amber-400 border border-[#18181b]" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 border border-[#18181b]" />
                <span className="text-xs font-bold text-stone-600 font-retro ml-2">Preview Interativo do Cliente</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#18181b] bg-[#fbcfe8] text-[#831843]">
                Teste ao Vivo
              </span>
            </div>

            {/* Simulated Live Form Experience */}
            <div className="bg-white rounded-2xl p-6 border-[1.5px] border-[#18181b] shadow-[3px_3px_0px_#18181b] max-w-md mx-auto">
              {submittedSuccess ? (
                /* Success Screen in Preview */
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#a7f3d0] border-[2px] border-[#18181b] flex items-center justify-center text-[#065f46] mx-auto shadow-[2px_2px_0px_#18181b]">
                    <CheckCircle className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <h4 className="font-retro font-black text-xl text-[#18181b]">
                    {formConfig.thankYouTitle}
                  </h4>
                  <p className="text-xs text-stone-600 font-medium">
                    {formConfig.thankYouMessage}
                  </p>
                  <button
                    onClick={handleResetPreview}
                    className="mt-4 px-4 py-1.5 bg-[#fde047] text-[#18181b] text-xs font-bold rounded-full border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b] hover:bg-[#facc15]"
                  >
                    Testar Novamente
                  </button>
                </div>
              ) : (
                /* Form Fields in Preview */
                <form onSubmit={handleTestSubmit} className="space-y-3.5 text-xs font-bold text-stone-800">
                  <div className="text-center space-y-1 pb-2">
                    <h3 className="font-retro font-black text-lg text-[#18181b]">
                      {formConfig.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {formConfig.subtitle}
                    </p>
                  </div>

                  {/* Stars Rating */}
                  {formConfig.enableRating && (
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#faf6ed] border border-[#18181b]">
                      <span className="text-[9px] uppercase text-stone-500 mb-1 tracking-wider">
                        Sua Avaliação
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onMouseEnter={() => setHoverRating(s)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setPreviewRating(s)}
                            className="p-0.5 hover:scale-115 transition-transform"
                          >
                            <Star 
                              className={`w-5 h-5 ${
                                s <= (hoverRating || previewRating) 
                                  ? 'text-amber-500 fill-amber-400 stroke-[#18181b]' 
                                  : 'text-stone-200'
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
                      Depoimento <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={previewContent}
                      onChange={(e) => setPreviewContent(e.target.value)}
                      placeholder="Conte sua experiência..."
                      className="w-full px-3 py-2 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none"
                    />
                  </div>

                  {/* Nome */}
                  <div>
                    <label className="block uppercase text-[10px] tracking-wider mb-1">
                      Seu Nome <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={previewName}
                      onChange={(e) => setPreviewName(e.target.value)}
                      placeholder="Ex: Beatriz Rocha"
                      className="w-full px-3 py-1.5 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none"
                    />
                  </div>

                  {/* Cargo & Empresa */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block uppercase text-[9px] tracking-wider mb-0.5">Cargo</label>
                      <input
                        type="text"
                        value={previewRole}
                        onChange={(e) => setPreviewRole(e.target.value)}
                        placeholder="Ex: Designer"
                        className="w-full px-2.5 py-1.5 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block uppercase text-[9px] tracking-wider mb-0.5">Empresa</label>
                      <input
                        type="text"
                        value={previewCompany}
                        onChange={(e) => setPreviewCompany(e.target.value)}
                        placeholder="Ex: Estudio Beta"
                        className="w-full px-2.5 py-1.5 text-xs font-medium bg-[#faf6ed] border-[1.5px] border-[#18181b] rounded-xl shadow-[1px_1px_0px_#18181b] outline-none"
                      />
                    </div>
                  </div>

                  {/* Foto Presets */}
                  {formConfig.enableAvatar && (
                    <div>
                      <label className="block uppercase text-[9px] tracking-wider mb-1">Foto de Perfil</label>
                      <div className="flex items-center gap-1.5">
                        {sampleAvatars.map((a, i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setPreviewAvatar(a.url)}
                            className={`w-7 h-7 rounded-full border border-[#18181b] overflow-hidden hover:scale-105 transition-transform ${previewAvatar === a.url ? 'ring-2 ring-amber-500' : ''}`}
                          >
                            <img src={a.url} alt={a.label} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit Test Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#fde047] hover:bg-[#facc15] text-[#18181b] font-black text-xs rounded-full border-[2px] border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] flex items-center justify-center gap-2 active:translate-y-0.5 transition-all mt-3"
                  >
                    <Send size={13} className="stroke-[2.5]" />
                    <span>{formConfig.buttonText}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
