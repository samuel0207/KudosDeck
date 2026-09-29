import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Code, 
  Sun, 
  Moon, 
  Columns3, 
  Columns2,
  Columns4,
  MessageSquare
} from 'lucide-react';

export default function WallOfLove({ 
  testimonials, 
  formConfig, 
  onOpenEmbedModal,
  onSwitchToDashboard 
}) {
  // Widget customization settings
  const [theme, setTheme] = useState('light'); // 'light' | 'dark' | 'retro'
  const [columns, setColumns] = useState(3); // 2 | 3 | 4
  const [showStars, setShowStars] = useState(true);
  const [showVerified, setShowVerified] = useState(true);
  const [showDate, setShowDate] = useState(true);

  // Filter only approved testimonials for the Wall of Love
  const approvedTestimonials = testimonials.filter(t => t.status === 'approved');

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getColumnsClass = () => {
    if (columns === 2) return 'sm:columns-2';
    if (columns === 4) return 'sm:columns-2 md:columns-3 lg:columns-4';
    return 'sm:columns-2 lg:columns-3'; // default 3
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Widget Retro Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        
        {/* Title & Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fef08a] border-[1.5px] border-[#18181b] flex items-center justify-center text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b] shrink-0">
            <Heart className="w-5 h-5 fill-[#f43f5e] text-[#18181b]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-[#18181b] tracking-tight font-retro">
                Mural de Amor (Wall of Love)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#a7f3d0] text-[#065f46] border border-[#18181b] shadow-[1px_1px_0px_#18181b]">
                {approvedTestimonials.length} Aprovados
              </span>
            </div>
            <p className="text-xs text-stone-600 font-medium">
              Widget responsivo com Masonry Grid pronto para incorporar em qualquer landing page.
            </p>
          </div>
        </div>

        {/* Customization Options Bar */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
          
          {/* Theme Switcher */}
          <div className="flex items-center bg-[#faf6ed] p-1 rounded-full border-[1.5px] border-[#18181b] text-xs font-bold shadow-[1px_1px_0px_#18181b]">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                theme === 'light' 
                  ? 'bg-white text-[#18181b] border border-[#18181b] shadow-[1px_1px_0px_#18181b]' 
                  : 'text-stone-600 hover:text-[#18181b]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
              <span>Claro</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                theme === 'dark' 
                  ? 'bg-[#18181b] text-white border border-[#18181b]' 
                  : 'text-stone-600 hover:text-[#18181b]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />
              <span>Escuro</span>
            </button>
            <button
              onClick={() => setTheme('retro')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                theme === 'retro' 
                  ? 'bg-[#fde047] text-[#18181b] border border-[#18181b] shadow-[1px_1px_0px_#18181b]' 
                  : 'text-stone-600 hover:text-[#18181b]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#18181b]" />
              <span>Retro</span>
            </button>
          </div>

          {/* Columns Selector */}
          <div className="hidden sm:flex items-center bg-[#faf6ed] p-1 rounded-full border-[1.5px] border-[#18181b] text-xs font-bold shadow-[1px_1px_0px_#18181b]">
            <button
              onClick={() => setColumns(2)}
              className={`p-1.5 rounded-full transition-all ${columns === 2 ? 'bg-white text-[#18181b] border border-[#18181b]' : 'text-stone-500'}`}
              title="2 Colunas"
            >
              <Columns2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(3)}
              className={`p-1.5 rounded-full transition-all ${columns === 3 ? 'bg-white text-[#18181b] border border-[#18181b]' : 'text-stone-500'}`}
              title="3 Colunas"
            >
              <Columns3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(4)}
              className={`p-1.5 rounded-full transition-all ${columns === 4 ? 'bg-white text-[#18181b] border border-[#18181b]' : 'text-stone-500'}`}
              title="4 Colunas"
            >
              <Columns4 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Toggles */}
          <button
            onClick={() => setShowStars(!showStars)}
            className={`px-3 py-1 text-xs font-bold rounded-full border-[1.5px] border-[#18181b] transition-all shadow-[1.5px_1.5px_0px_#18181b] ${
              showStars 
                ? 'bg-[#fef08a] text-[#18181b]' 
                : 'bg-white text-stone-400'
            }`}
          >
            ★ Estrelas
          </button>

          <button
            onClick={() => setShowVerified(!showVerified)}
            className={`px-3 py-1 text-xs font-bold rounded-full border-[1.5px] border-[#18181b] transition-all shadow-[1.5px_1.5px_0px_#18181b] ${
              showVerified 
                ? 'bg-[#bae6fd] text-[#18181b]' 
                : 'bg-white text-stone-400'
            }`}
          >
            ✓ Verificados
          </button>

          <button
            onClick={() => setShowDate(!showDate)}
            className={`px-3 py-1 text-xs font-bold rounded-full border-[1.5px] border-[#18181b] transition-all shadow-[1.5px_1.5px_0px_#18181b] ${
              showDate 
                ? 'bg-[#fbcfe8] text-[#18181b]' 
                : 'bg-white text-stone-400'
            }`}
          >
            📅 Datas
          </button>

          {/* Get Embed Code CTA */}
          <button
            onClick={onOpenEmbedModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#18181b] rounded-full text-xs font-bold border-[2px] border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all ml-auto xl:ml-0"
          >
            <Code className="w-4 h-4 stroke-[2.5]" />
            <span>Incorporar Widget</span>
          </button>

        </div>
      </div>

      {/* Widget Container Viewport */}
      <div className={`rounded-[32px] p-6 sm:p-10 transition-colors duration-200 border-[2.5px] border-[#18181b] shadow-[4px_4px_0px_#18181b] ${
        theme === 'light' 
          ? 'bg-[#faf6ed]' 
          : theme === 'dark' 
            ? 'bg-[#18181b] text-stone-100' 
            : 'bg-[#fef9c3] text-[#18181b]'
      }`}>

        {/* Mural Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide mb-3 bg-[#fef08a] text-[#18181b] border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <Heart className="w-3.5 h-3.5 fill-[#f43f5e] text-[#18181b]" />
            <span>Depoimentos & Prova Social de Clientes</span>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-black font-retro tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#18181b]'
          }`}>
            Amado por equipes criativas e inovadoras
          </h3>
          <p className={`text-xs sm:text-sm font-medium mt-2 ${
            theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
          }`}>
            Veja como a marca <span className="font-bold">{formConfig.brandName}</span> está acelerando resultados para negócios de todos os portes.
          </p>
        </div>

        {/* Empty State when no approved testimonials */}
        {approvedTestimonials.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] max-w-md mx-auto my-6 ${
            theme === 'dark' ? 'bg-stone-900 text-stone-200' : 'bg-white'
          }`}>
            <MessageSquare className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h4 className="font-bold font-retro text-base text-[#18181b]">Nenhum depoimento aprovado ainda</h4>
            <p className="text-xs text-stone-600 mt-1 mb-5">
              Apenas os depoimentos marcados com status "Aprovado" são exibidos no Mural de Amor.
            </p>
            <button
              onClick={onSwitchToDashboard}
              className="px-5 py-2 bg-[#fde047] text-[#18181b] text-xs font-bold rounded-full border-[1.5px] border-[#18181b] shadow-[2px_2px_0px_#18181b] hover:bg-[#facc15] transition-all"
            >
              Ir ao Dashboard para Aprovar
            </button>
          </div>
        ) : (
          /* Responsive Masonry Grid of Retro Cards */
          <div className={`columns-1 ${getColumnsClass()} gap-6 space-y-6`}>
            {approvedTestimonials.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid rounded-2xl p-5 border-[1.5px] border-[#18181b] bg-white text-[#18181b] shadow-[3px_3px_0px_#18181b] hover:-translate-y-1 transition-all relative group"
              >
                {/* Decorative Quotation Mark in retro Fraunces serif */}
                <div className="absolute top-2 right-4 text-4xl font-retro font-black select-none pointer-events-none text-stone-200 group-hover:text-amber-300 transition-colors">
                  “
                </div>

                {/* Top Badge: Featured / Verified */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#18181b] bg-[#fbcfe8] text-[#831843]">
                    Featured
                  </span>
                  {showVerified && item.verified && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#18181b] bg-[#a7f3d0] text-[#065f46] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#065f46]" />
                      <span>Verificado</span>
                    </span>
                  )}
                </div>

                {/* Stars Rating */}
                {showStars && (
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (item.rating || 5)
                            ? 'text-amber-500 fill-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Content Quote */}
                <blockquote className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed mb-4">
                  "{item.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=fde047&color=18181b`}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover border-[1.5px] border-[#18181b] shadow-[1px_1px_0px_#18181b] shrink-0"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=fde047&color=18181b`;
                      }}
                    />
                    <div>
                      <h5 className="font-bold font-retro text-xs leading-tight text-[#18181b]">
                        {item.name}
                      </h5>
                      <p className="text-[11px] text-stone-500 font-medium">
                        {item.role} {item.company ? `• ${item.company}` : ''}
                      </p>
                    </div>
                  </div>

                  {showDate && (
                    <span className="text-[10px] text-stone-500 font-semibold hidden sm:block">
                      {formatDate(item.createdAt)}
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Footer Powered By Badge */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#18181b] border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Wall of Love • KudosDeck Pro</span>
          </div>
        </div>

      </div>

    </div>
  );
}
