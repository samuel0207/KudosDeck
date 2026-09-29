import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Search, 
  Star, 
  MessageSquare, 
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Dashboard({ 
  testimonials, 
  onToggleStatus, 
  onDelete, 
  onApproveAll,
  onOpenNewModal 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'approved' | 'pending'
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Statistics
  const stats = useMemo(() => {
    const total = testimonials.length;
    const approved = testimonials.filter(t => t.status === 'approved').length;
    const pending = testimonials.filter(t => t.status === 'pending').length;
    const avgRating = total > 0 
      ? (testimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / total).toFixed(1)
      : '5.0';
    return { total, approved, pending, avgRating };
  }, [testimonials]);

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter(item => {
      const matchesStatus = 
        statusFilter === 'all' 
          ? true 
          : statusFilter === 'approved' 
            ? item.status === 'approved' 
            : item.status === 'pending';

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [testimonials, statusFilter, searchQuery]);

  const handleToggle = (id, currentStatus) => {
    if (currentStatus === 'pending') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#fbbf24', '#f43f5e']
      });
    }
    onToggleStatus(id);
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recentemente';
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Neo-brutalist SaaS Metric Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Total Metric (Pastel Yellow) */}
        <div className="bg-[#fef08a] rounded-2xl p-4 border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#18181b] uppercase tracking-wider">
              Total Depoimentos
            </span>
            <div className="w-7 h-7 rounded-full bg-white border border-[#18181b] flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-[#18181b]" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#18181b] font-retro">
              {stats.total}
            </span>
            <span className="text-xs font-semibold text-stone-700">coletados</span>
          </div>
        </div>

        {/* Approved Metric (Pastel Mint) */}
        <div className="bg-[#a7f3d0] rounded-2xl p-4 border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#065f46] uppercase tracking-wider">
              Aprovados no Mural
            </span>
            <div className="w-7 h-7 rounded-full bg-white border border-[#18181b] flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#065f46]" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#18181b] font-retro">
              {stats.approved}
            </span>
            <span className="text-[11px] font-bold text-[#065f46] bg-white/70 px-2 py-0.5 rounded-full border border-[#18181b]">
              {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}% ativos
            </span>
          </div>
        </div>

        {/* Pending Metric (Pastel Pink) */}
        <div className="bg-[#fbcfe8] rounded-2xl p-4 border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#831843] uppercase tracking-wider">
              Pendentes Moderação
            </span>
            <div className="w-7 h-7 rounded-full bg-white border border-[#18181b] flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-[#831843]" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#18181b] font-retro">
              {stats.pending}
            </span>
            {stats.pending > 0 ? (
              <span className="text-[11px] font-bold text-[#831843] bg-white/80 px-2 py-0.5 rounded-full border border-[#18181b] animate-pulse">
                aguardando
              </span>
            ) : (
              <span className="text-[11px] font-medium text-stone-600">em dia</span>
            )}
          </div>
        </div>

        {/* Rating Metric (Pastel Blue) */}
        <div className="bg-[#bae6fd] rounded-2xl p-4 border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#075985] uppercase tracking-wider">
              Média de Avaliação
            </span>
            <div className="w-7 h-7 rounded-full bg-white border border-[#18181b] flex items-center justify-center">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#18181b] font-retro">
              {stats.avgRating}
            </span>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 stroke-[#18181b]" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Control Bar: Filters, Search, Batch Actions */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] flex flex-col gap-3.5">
        {/* Top Row: Search Input & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input in Retro Pill */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por cliente, empresa ou cargo..."
              className="w-full border-[1.5px] border-[#18181b] bg-[#faf6ed] rounded-full pl-4 pr-9 py-2 text-xs font-medium text-[#18181b] shadow-[1.5px_1.5px_0px_#18181b] outline-none placeholder:text-stone-400 focus:bg-white transition-colors"
            />
            <Search
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            {stats.pending > 0 && (
              <button
                onClick={onApproveAll}
                className="px-3.5 py-1.5 bg-[#a7f3d0] hover:bg-[#6ee7b7] text-[#065f46] rounded-full text-xs font-bold border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b] whitespace-nowrap active:translate-y-0.5 transition-all"
              >
                Aprovar Todos ({stats.pending})
              </button>
            )}

            <button
              onClick={onOpenNewModal}
              className="px-4 py-1.5 bg-[#fde047] hover:bg-[#facc15] text-[#18181b] rounded-full text-xs font-bold border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b] flex items-center gap-1.5 whitespace-nowrap active:translate-y-0.5 transition-all"
            >
              <Plus size={14} className="stroke-[2.5]" />
              <span>Coletar</span>
            </button>
          </div>
        </div>

        {/* Bottom Row: Status Filter Chips with No Overflow Scrollbar */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-stone-200 flex-wrap text-xs">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mr-1">
            Status:
          </span>

          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-full font-bold border-[1.5px] border-[#18181b] transition-all shadow-[1.5px_1.5px_0px_#18181b] ${
              statusFilter === 'all'
                ? 'bg-[#fef08a] translate-y-0.5 shadow-none'
                : 'bg-[#faf6ed] hover:-translate-y-0.5 text-stone-700'
            }`}
          >
            Todos ({stats.total})
          </button>

          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-3.5 py-1.5 rounded-full font-bold border-[1.5px] border-[#18181b] transition-all shadow-[1.5px_1.5px_0px_#18181b] flex items-center gap-1.5 ${
              statusFilter === 'approved'
                ? 'bg-[#a7f3d0] translate-y-0.5 shadow-none text-[#065f46]'
                : 'bg-[#faf6ed] hover:-translate-y-0.5 text-stone-700'
            }`}
          >
            <CheckCircle2 size={13} />
            <span>Aprovados ({stats.approved})</span>
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3.5 py-1.5 rounded-full font-bold border-[1.5px] border-[#18181b] transition-all shadow-[1.5px_1.5px_0px_#18181b] flex items-center gap-1.5 ${
              statusFilter === 'pending'
                ? 'bg-[#fbcfe8] translate-y-0.5 shadow-none text-[#831843]'
                : 'bg-[#faf6ed] hover:-translate-y-0.5 text-stone-700'
            }`}
          >
            <Clock size={13} />
            <span>Pendentes ({stats.pending})</span>
          </button>

          {/* Quick Clear Search if filled */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="ml-auto text-[11px] font-bold text-stone-500 underline hover:text-[#18181b]"
            >
              Limpar busca
            </button>
          )}
        </div>
      </section>

      {/* Testimonials List */}
      <section className="space-y-3">
        {filteredTestimonials.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border-[2px] border-[#18181b] shadow-[3px_3px_0px_#18181b] text-center max-w-md mx-auto">
            <MessageSquare size={36} className="mx-auto text-stone-400 mb-2" />
            <h4 className="font-retro font-bold text-base text-[#18181b]">Nenhum depoimento encontrado</h4>
            <p className="text-xs text-stone-600 mt-1">
              Tente mudar os filtros de busca ou adicione um novo depoimento.
            </p>
          </div>
        ) : (
          filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border-[1.5px] border-[#18181b] shadow-[2.5px_2.5px_0px_#18181b] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:-translate-y-0.5 transition-transform"
            >
              {/* Left Client Info */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <img
                  src={item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=fde047&color=18181b`}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border-[1.5px] border-[#18181b] shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-retro font-bold text-sm text-[#18181b]">
                      {item.name}
                    </h5>
                    {item.verified && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-[#18181b] bg-[#a7f3d0] text-[#065f46]">
                        ✓ Verificado
                      </span>
                    )}
                    <span className="text-[10px] text-stone-500 font-semibold ml-auto md:ml-0">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 font-medium">
                    {item.role} {item.company ? `• ${item.company}` : ''}
                  </p>

                  <div className="flex items-center gap-1 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < (item.rating || 5)
                            ? 'text-amber-500 fill-amber-400'
                            : 'text-stone-200'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-stone-700 font-medium leading-relaxed line-clamp-2">
                    "{item.content}"
                  </p>
                </div>
              </div>

              {/* Right Controls: Status Toggle & Delete */}
              <div className="flex items-center gap-3 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100 w-full md:w-auto justify-between md:justify-end">
                {/* Status Toggle Button */}
                <button
                  onClick={() => handleToggle(item.id, item.status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border-[1.5px] border-[#18181b] shadow-[1.5px_1.5px_0px_#18181b] flex items-center gap-1.5 transition-all ${
                    item.status === 'approved'
                      ? 'bg-[#a7f3d0] text-[#065f46] hover:bg-emerald-200'
                      : 'bg-[#fef08a] text-[#854d0e] hover:bg-amber-200'
                  }`}
                >
                  {item.status === 'approved' ? (
                    <>
                      <CheckCircle2 size={13} />
                      <span>Aprovado</span>
                    </>
                  ) : (
                    <>
                      <Clock size={13} />
                      <span>Aprovar</span>
                    </>
                  )}
                </button>

                {/* Delete button with confirmation */}
                {deleteConfirmId === item.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        onDelete(item.id);
                        setDeleteConfirmId(null);
                      }}
                      className="px-2.5 py-1 bg-red-600 text-white rounded-full text-[11px] font-bold border border-[#18181b]"
                    >
                      Excluir?
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-1 bg-stone-200 text-[#18181b] rounded-full text-[11px] font-bold border border-[#18181b]"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="w-8 h-8 rounded-full border border-[#18181b] bg-white flex items-center justify-center text-stone-500 hover:text-red-600 hover:border-red-600 transition-colors shadow-[1px_1px_0px_#18181b]"
                    title="Excluir depoimento"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </section>

    </div>
  );
}
