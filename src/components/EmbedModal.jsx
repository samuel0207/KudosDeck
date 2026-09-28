import React, { useState } from 'react';
import { X, Code2, Copy, Check } from 'lucide-react';

export default function EmbedModal({ isOpen, onClose, formConfig, onShowToast }) {
  const [activeType, setActiveType] = useState('iframe'); // 'iframe' | 'script' | 'react'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kudosdeck.app';

  const snippets = {
    iframe: `<iframe 
  src="${originUrl}/embed/${formConfig.publicSlug}" 
  width="100%" 
  height="700px" 
  frameborder="0" 
  scrolling="no"
  style="border-radius: 16px; border: 1px solid #e2e8f0;">
</iframe>`,
    script: `<!-- KudosDeck Wall of Love Widget -->
<div id="kudosdeck-wall" data-slug="${formConfig.publicSlug}" data-theme="light"></div>
<script async src="https://cdn.kudosdeck.app/v1/widget.js"></script>`,
    react: `import { KudosWall } from '@kudosdeck/react';

export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <KudosWall 
        slug="${formConfig.publicSlug}" 
        columns={3} 
        theme="light" 
      />
    </section>
  );
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeType]);
    setCopied(true);
    onShowToast({ message: "Código copiado para a área de transferência!", type: "success" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200/90 relative animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg font-['Plus_Jakarta_Sans']">
                Código de Incorporação (Embed)
              </h3>
              <p className="text-xs text-slate-500">
                Cole em qualquer site: WordPress, Webflow, Shopify, Framer ou HTML
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

        {/* Format Selector */}
        <div className="flex items-center gap-2 mt-5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveType('iframe')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeType === 'iframe' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            iFrame Universal
          </button>
          <button
            onClick={() => setActiveType('script')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeType === 'script' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Script HTML
          </button>
          <button
            onClick={() => setActiveType('react')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeType === 'react' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            React / Next.js
          </button>
        </div>

        {/* Code Box */}
        <div className="mt-4 relative">
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed max-h-48">
            <pre>{snippets[activeType]}</pre>
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800">Como funciona?</p>
          <p>
            O widget carrega instantaneamente os depoimentos aprovados em tempo real. Qualquer alteração que você fizer no KudosDeck é refletida automaticamente no seu site sem necessidade de republicação!
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
