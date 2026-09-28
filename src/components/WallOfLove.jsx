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
  const [theme, setTheme] = useState('light'); // 'light' | 'dark' | 'glass'
  const [columns, setColumns] = useState(3); // 2 | 3 | 4
  const [showStars, setShowStars] = useState(true);
  const [showVerified, setShowVerified] = useState(true);
  const [showDate, setShowDate] = useState(true);

  // Filter only approved testimonials for the Wall of Love!
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
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Widget Toolbar / Settings Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        
        {/* Title & Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
                Mural de Amor (Wall of Love)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                {approvedTestimonials.length} Aprovados
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Pré-visualização do widget responsivo com Masonry Grid pronto para seu site.
            </p>
          </div>
        </div>

        {/* Customization Options Bar */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          
          {/* Theme Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70 text-xs font-semibold">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                theme === 'light' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Claro</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                theme === 'dark' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Escuro</span>
            </button>
            <button
              onClick={() => setTheme('glass')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                theme === 'glass' 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Indigo Glow</span>
            </button>
          </div>

          {/* Columns Selector */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70 text-xs font-semibold">
            <button
              onClick={() => setColumns(2)}
              className={`p-1.5 rounded-lg transition-all ${columns === 2 ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'}`}
              title="2 Colunas"
            >
              <Columns2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(3)}
              className={`p-1.5 rounded-lg transition-all ${columns === 3 ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'}`}
              title="3 Colunas"
            >
              <Columns3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(4)}
              className={`p-1.5 rounded-lg transition-all ${columns === 4 ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'}`}
              title="4 Colunas"
            >
              <Columns4 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Toggles */}
          <button
            onClick={() => setShowStars(!showStars)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
              showStars 
                ? 'bg-amber-50 text-amber-800 border-amber-200' 
                : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}
          >
            ★ Estrelas
          </button>

          <button
            onClick={() => setShowVerified(!showVerified)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
              showVerified 
                ? 'bg-indigo-50 text-indigo-800 border-indigo-200' 
                : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}
          >
            ✓ Verificados
          </button>

          <button
            onClick={() => setShowDate(!showDate)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
              showDate 
                ? 'bg-slate-100 text-slate-800 border-slate-300' 
                : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}
          >
            📅 Datas
          </button>

          {/* Get Embed Code CTA */}
          <button
            onClick={onOpenEmbedModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs shadow-indigo-600/30 transition-all ml-auto xl:ml-0"
          >
            <Code className="w-4 h-4" />
            <span>Incorporar no Site</span>
          </button>

        </div>
      </div>

      {/* Widget Container Viewport */}
      <div className={`rounded-3xl p-6 sm:p-10 transition-colors duration-300 border ${
        theme === 'light' 
          ? 'bg-white border-slate-200/90 shadow-sm' 
          : theme === 'dark' 
            ? 'bg-[#0f172a] border-slate-800 text-slate-100 shadow-2xl' 
            : 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-indigo-900/40 text-slate-100 shadow-2xl'
      }`}>

        {/* Mural Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
            <span>Depoimentos & Amor de Clientes</span>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            Amado por centenas de equipes inovadoras
          </h3>
          <p className={`text-xs sm:text-sm mt-2 ${
            theme === 'light' ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Veja como a {formConfig.brandName} está acelerando resultados para negócios de todos os portes.
          </p>
        </div>

        {/* Empty State when no approved testimonials */}
        {approvedTestimonials.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border max-w-md mx-auto my-6 ${
            theme === 'light' 
              ? 'bg-slate-50 border-slate-200' 
              : 'bg-slate-850/50 border-slate-800'
          }`}>
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="font-bold text-base">Nenhum depoimento aprovado ainda</h4>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Apenas os depoimentos marcados com status "Aprovado" são exibidos neste mural de prova social.
            </p>
            <button
              onClick={onSwitchToDashboard}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              Ir ao Dashboard para Aprovar
            </button>
          </div>
        ) : (
          /* Responsive Masonry Grid */
          <div className={`columns-1 ${getColumnsClass()} gap-6 space-y-6`}>
            {approvedTestimonials.map((item) => (
              <div
                key={item.id}
                className={`break-inside-avoid rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 relative group ${
                  theme === 'light'
                    ? 'bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-indigo-200 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5'
                    : theme === 'dark'
                      ? 'bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 shadow-md'
                      : 'bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 hover:border-indigo-400/40 shadow-xl'
                }`}
              >
                {/* Decorative Quotation Mark */}
                <div className={`absolute top-4 right-5 text-4xl font-serif font-black select-none pointer-events-none opacity-20 ${
                  theme === 'light' ? 'text-indigo-400' : 'text-indigo-300'
                }`}>
                  “
                </div>

                {/* Stars Rating */}
                {showStars && (
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (item.rating || 5)
                            ? 'text-amber-400 fill-amber-400'
                            : theme === 'light' ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Content Quote */}
                <blockquote className={`text-sm leading-relaxed mb-5 ${
                  theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  "{item.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/40">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=4f46e5&color=fff`}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20 shrink-0"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=4f46e5&color=fff`;
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold text-sm leading-tight ${
                          theme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}>
                          {item.name}
                        </span>
                        {showVerified && item.verified && (
                          <ShieldCheck 
                            className="w-3.5 h-3.5 text-indigo-500 shrink-0" 
                            title="Depoimento Verificado" 
                          />
                        )}
                      </div>
                      <p className={`text-xs ${
                        theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {item.role} {item.company ? `• ${item.company}` : ''}
                      </p>
                    </div>
                  </div>

                  {showDate && (
                    <span className={`text-[10px] hidden sm:block ${
                      theme === 'light' ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {formatDate(item.createdAt)}
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Footer Powered By Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Wall of Love gerado por KudosDeck</span>
          </div>
        </div>

      </div>

    </div>
  );
}
