import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Search, 
  Star, 
  Check, 
  X, 
  MessageSquare, 
  ShieldCheck, 
  Calendar
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

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
      triggerConfetti();
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
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* SaaS Metric Cards Header */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Metric */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total de Provas
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
              {stats.total}
            </span>
            <span className="text-xs font-medium text-slate-500">depoimentos</span>
          </div>
        </div>

        {/* Approved Metric */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Aprovados no Mural
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
              {stats.approved}
            </span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}% ativos
            </span>
          </div>
        </div>

        {/* Pending Metric */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
              Pendentes de Análise
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
              {stats.pending}
            </span>
            {stats.pending > 0 && (
              <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                aguardando
              </span>
            )}
          </div>
        </div>

        {/* Rating Metric */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Média de Avaliação
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Plus_Jakarta_Sans']">
              {stats.avgRating}
            </span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Control Bar: Filters, Search, Batch Actions */}
      <section className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl self-start md:self-auto overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                statusFilter === 'approved'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Aprovados ({stats.approved})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                statusFilter === 'pending'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Pendentes ({stats.pending})
            </button>
          </div>

          {/* Search Input & Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por cliente, empresa ou texto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {stats.pending > 0 && (
              <button
                onClick={() => {
                  onApproveAll();
                  triggerConfetti();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                Aprovar Todos ({stats.pending})
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Testimonials List Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans'] flex items-center gap-2">
            Depoimentos Recebidos
            <span className="text-xs font-medium text-slate-500 px-2 py-0.5 rounded-full bg-slate-200/70">
              {filteredTestimonials.length} exibidos
            </span>
          </h2>
          <span className="text-xs text-slate-400">
            Dica: Alterne o switch para exibir no Wall of Love
          </span>
        </div>

        {filteredTestimonials.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Nenhum depoimento encontrado
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              {searchQuery 
                ? `Nenhum resultado corresponde à busca "${searchQuery}". Tente limpar o filtro de busca.`
                : 'Não há depoimentos nesta categoria no momento. Que tal cadastrar um novo para testar?'}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl"
                >
                  Limpar Busca
                </button>
              )}
              <button
                onClick={onOpenNewModal}
                className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl shadow-xs"
              >
                + Adicionar Depoimento
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredTestimonials.map((item) => {
              const isApproved = item.status === 'approved';

              return (
                <div 
                  key={item.id}
                  className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 relative group flex flex-col justify-between ${
                    isApproved 
                      ? 'border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.09)]' 
                      : 'border-amber-200/70 bg-amber-50/20 shadow-xs'
                  }`}
                >
                  {/* Card Header: Author info & Badges */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      
                      {/* Avatar & Details */}
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=4f46e5&color=fff`} 
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shadow-xs shrink-0"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=4f46e5&color=fff`;
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                              {item.name}
                            </h4>
                            {item.verified && (
                              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" title="Cliente Verificado" />
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            {item.role} {item.company ? `• ${item.company}` : ''}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {isApproved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            Aprovado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/70">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            Pendente
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < (item.rating || 5) 
                              ? 'text-amber-400 fill-amber-400' 
                              : 'text-slate-200 fill-slate-100'
                          }`} 
                        />
                      ))}
                      <span className="text-xs font-semibold text-slate-600 ml-1.5">
                        {item.rating || 5}.0
                      </span>
                    </div>

                    {/* Testimonial Quote Text */}
                    <blockquote className="text-sm text-slate-700 leading-relaxed italic relative pl-3 border-l-2 border-indigo-200 my-3">
                      "{item.content}"
                    </blockquote>
                  </div>

                  {/* Card Footer: Metadata & Control Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>

                    {/* Action Controls: Approval Toggle & Delete */}
                    <div className="flex items-center gap-3">
                      
                      {/* Approval Toggle Switch */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                          {isApproved ? 'Publicado' : 'Aprovar'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggle(item.id, item.status)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                            isApproved ? 'bg-indigo-600' : 'bg-slate-200'
                          }`}
                          role="switch"
                          aria-checked={isApproved}
                          title={isApproved ? "Clique para reverter para Pendente" : "Clique para Aprovar e exibir no Mural"}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              isApproved ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Delete Button with Confirmation State */}
                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-lg border border-rose-200 animate-in fade-in">
                          <span className="text-[11px] font-semibold text-rose-700">Deletar?</span>
                          <button
                            onClick={() => {
                              onDelete(item.id);
                              setDeleteConfirmId(null);
                            }}
                            className="p-1 text-rose-600 hover:text-rose-800"
                            title="Confirmar exclusão"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="p-1 text-slate-400 hover:text-slate-600"
                            title="Cancelar"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Excluir depoimento"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}
