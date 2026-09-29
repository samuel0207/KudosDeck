import React, { useState } from 'react';
import { X, Code2, Copy, Check } from 'lucide-react';

export default function EmbedModal({ isOpen, onClose, formConfig, onShowToast }) {
  const [activeType, setActiveType] = useState('iframe'); // 'iframe' | 'script' | 'react'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5174';

  const snippets = {
    iframe: `<iframe 
  src="${originUrl}/embed/${formConfig.publicSlug}" 
  width="100%" 
  height="700px" 
  frameborder="0" 
  scrolling="no"
  style="border-radius: 24px; border: 2.5px solid #18181b; box-shadow: 4px 4px 0px #18181b;">
</iframe>`,
    script: `<!-- KudosDeck Retro Wall of Love Widget -->
<div id="kudosdeck-wall" data-slug="${formConfig.publicSlug}" data-theme="retro"></div>
<script async src="https://cdn.kudosdeck.app/v1/widget.js"></script>`,
    react: `import { KudosWall } from '@kudosdeck/react';

export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <KudosWall 
        slug="${formConfig.publicSlug}" 
        columns={3} 
        theme="retro" 
      />
    </section>
  );
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeType]);
    setCopied(true);
    onShowToast({ message: "Código copiado com sucesso!", type: "success" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#faf6ed] rounded-3xl max-w-xl w-full p-6 shadow-[8px_8px_0px_#18181b] border-[2.5px] border-[#18181b] relative animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-[#fef08a] border-[1.5px] border-[#18181b] text-[#18181b] shadow-[1px_1px_0px_#18181b]">
              <Code2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-[#18181b] text-lg font-retro">
                Código de Incorporação (Embed)
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                Adicione o Wall of Love ao seu site, landing page ou loja.
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

        {/* Snippet Format Selector */}
        <div className="flex items-center gap-2 my-4">
          <button
            onClick={() => setActiveType('iframe')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-[1.5px] border-[#18181b] transition-all shadow-[1.5px_1.5px_0px_#18181b] ${
              activeType === 'iframe'
                ? 'bg-[#fef08a] translate-y-0.5 shadow-none'
                : 'bg-white hover:-translate-y-0.5'
            }`}
          >
            iFrame Universal
          </button>
          <button
            onClick={() => setActiveType('script')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-[1.5px] border-[#18181b] transition-all shadow-[1.5px_1.5px_0px_#18181b] ${
              activeType === 'script'
                ? 'bg-[#bae6fd] translate-y-0.5 shadow-none'
                : 'bg-white hover:-translate-y-0.5'
            }`}
          >
            Script HTML
          </button>
          <button
            onClick={() => setActiveType('react')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-[1.5px] border-[#18181b] transition-all shadow-[1.5px_1.5px_0px_#18181b] ${
              activeType === 'react'
                ? 'bg-[#a7f3d0] translate-y-0.5 shadow-none'
                : 'bg-white hover:-translate-y-0.5'
            }`}
          >
            Componente React
          </button>
        </div>

        {/* Code Box */}
        <div className="relative rounded-2xl bg-white border-[2px] border-[#18181b] p-4 font-mono text-xs text-stone-800 shadow-[3px_3px_0px_#18181b] overflow-x-auto">
          <pre>{snippets[activeType]}</pre>
        </div>

        {/* Copy Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fde047] hover:bg-[#facc15] text-[#18181b] font-bold text-xs rounded-full border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            {copied ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
            <span>{copied ? 'Código Copiado!' : 'Copiar Snippet'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
