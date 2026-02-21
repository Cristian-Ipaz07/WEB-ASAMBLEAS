import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, UserPlus, 
  CheckCircle2, Printer, Trash2, TrendingUp, Settings,
  ClipboardCheck, Camera, Zap, Droplets, Shield,
  BookOpen, Scale, Eye, Activity, Wrench, Calendar, Layout, ListChecks,
  AlertCircle, ChevronRight, Info, ShieldAlert, HeartPulse, Building2,
  Search, DollarSign, PieChart, Landmark, Gavel, 
  ArrowUpRight, Percent, Wallet, HardHat, Cog, Plus, UserCheck, Leaf
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL FIGUERES II ---
const COLORS = {
  verdeInstitucional: '#4E8A2F',
  verdeClaro: '#7FB069',
  verdeSuave: '#A8CFA0',
  blancoProfesional: '#F4F6F4',
  grisOscuro: '#2F2F2F',
  acento: '#4E8A2F'
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#4E8A2F]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#4E8A2F] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#4E8A2F] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[11px] text-[#2F2F2F] font-black uppercase tracking-[0.2em]">
          {agendaIndices.length > 1 
            ? `Puntos ${agendaIndices.map(i => i + 1).join(' y ')} del Orden del día`
            : `Punto ${agendaIndices[0] + 1} del Orden del día`}
        </p>
      </div>
    </div>
    <button 
      onClick={() => toggleAgendaItem(agendaIndices)}
      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all border-2 shadow-md ${
        agendaIndices.every(idx => agendaStatus[idx])
        ? 'bg-[#7FB069] border-[#7FB069] text-white' 
        : 'bg-white border-[#4E8A2F]/20 text-[#4E8A2F] hover:bg-[#4E8A2F] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#4E8A2F] ring-4 ring-[#4E8A2F]/10' : 'border-[#4E8A2F]/5'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#2F2F2F] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#4E8A2F]' : 'bg-[#7FB069]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#4E8A2F]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#4E8A2F] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#4E8A2F]/10 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#4E8A2F] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#4E8A2F] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#F4F6F4] text-[#2F2F2F] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#4E8A2F]/5 uppercase font-bold text-[#2F2F2F]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#4E8A2F]/5 transition-colors">
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-8 py-4">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- DATA ---

const ORDEN_DIA = [
  "Registro y verificación del quórum",
  "Lectura y aprobación del orden del día",
  "Elección de dignatarios de la Asamblea (presidente, secretario, comisión verificadora del texto del acta de la presente reunión).",
  "Lectura del concepto de la comisión verificadora del acta de la asamblea del año 2025",
  "Presentación informe de administración",
  "Dictamen e informe de Revisoría Fiscal",
  "Presentación y aprobación de Estados Financieros a diciembre 31 de 2025 y ejecución presupuestal año 2025",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos para el año 2026 - Definición de cuotas de administración.",
  "Nombramiento del consejo de administración y comité de convivencia período 2026-2027",
  "Elección Revisor Fiscal período 2026-2027",
  "Proposiciones y asuntos varios."
];

const COEFICIENTES_DATA = [
  { id: 1, unidad: '201', propietario: 'PABLO BENITEZ', coeficiente: 5.643 },
  { id: 2, unidad: '202', propietario: 'ALBA LOPEZ', coeficiente: 5.817 },
  { id: 3, unidad: '301', propietario: 'SANDRA MORENO', coeficiente: 5.454 },
  { id: 4, unidad: '302', propietario: 'SAMUEL FAJARDO', coeficiente: 6.363 },
  { id: 5, unidad: '401', propietario: 'ROSARIO PORTILLA', coeficiente: 5.447 },
  { id: 6, unidad: '402', propietario: 'LILIANA RIASCOS', coeficiente: 5.875 },
  { id: 7, unidad: '501', propietario: 'JOHANA SANTACRUZ', coeficiente: 5.447 },
  { id: 8, unidad: '502', propietario: 'DIEGO FERNANDO MAYA', coeficiente: 5.870 },
  { id: 9, unidad: '601', propietario: 'DAIRA BENITEZ', coeficiente: 5.499 },
  { id: 10, unidad: '602', propietario: 'DORIS BENITEZ', coeficiente: 5.927 },
  { id: 11, unidad: '701', propietario: 'ROBERT CILIMA', coeficiente: 2.934 },
  { id: 12, unidad: '702', propietario: 'MILENA RUIZ', coeficiente: 5.063 },
  { id: 13, unidad: '801', propietario: 'NATALY LOPEZ', coeficiente: 5.438 },
  { id: 14, unidad: '901', propietario: 'HECTOR FABIO ROSERO', coeficiente: 6.847 },
  { id: 15, unidad: '10-01', propietario: 'GERMAN PEREZ', coeficiente: 7.337 },
  { id: 16, unidad: '11-01', propietario: 'WILLIAM CALVACHI', coeficiente: 6.872 },
  { id: 17, unidad: '12-01', propietario: 'PATRICIA MARTINEZ', coeficiente: 6.883 },
  { id: 18, unidad: 'LOCAL', propietario: 'MAGALY BENAVIDES', coeficiente: 0.900 },
  { id: 19, unidad: 'BODEGAS', propietario: 'CONSTRUCTORA SU PORTAL SAS', coeficiente: 0.384 }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Persistencia segura de estados
  const [asistencia, setAsistencia] = useState(() => {
    try {
      const saved = localStorage.getItem('asistencia_figueres_2026');
      return saved ? JSON.parse(saved) : COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    } catch (e) {
      return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    }
  });
  
  const [agendaStatus, setAgendaStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('agenda_figueres_2026');
      return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
    } catch (e) {
      return new Array(ORDEN_DIA.length).fill(false);
    }
  });

  const [dignatarios, setDignatarios] = useState(() => {
    try {
      const saved = localStorage.getItem('dignatarios_figueres_2026');
      return saved ? JSON.parse(saved) : { presidente: '', secretario: '', comision: '' };
    } catch (e) {
      return { presidente: '', secretario: '', comision: '' };
    }
  });

  const [proposiciones, setProposiciones] = useState(() => {
    try {
      const saved = localStorage.getItem('proposiciones_figueres_2026');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [actaAnterior, setActaAnterior] = useState({ aprobada: false, observaciones: '' });
  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });
  const [postuladosConsejo, setPostuladosConsejo] = useState([]);
  const [postuladosConvivencia, setPostuladosConvivencia] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('asistencia_figueres_2026', JSON.stringify(asistencia));
      localStorage.setItem('agenda_figueres_2026', JSON.stringify(agendaStatus));
      localStorage.setItem('dignatarios_figueres_2026', JSON.stringify(dignatarios));
      localStorage.setItem('proposiciones_figueres_2026', JSON.stringify(proposiciones));
    } catch (e) {}
  }, [asistencia, agendaStatus, dignatarios, proposiciones]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(3));
  }, [asistencia]);

  const progress = useMemo(() => (agendaStatus.filter(i => i).length / ORDEN_DIA.length) * 100, [agendaStatus]);

  const filteredAsistencia = useMemo(() => {
    return asistencia.filter(a => 
      a.unidad.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.propietario.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [asistencia, searchTerm]);

  const toggleAsistencia = (id) => {
    setAsistencia(prev => prev.map(a => a.id === id ? { ...a, presente: !a.presente } : a));
  };

  const toggleAgendaItem = (indices) => {
    setAgendaStatus(prev => {
      const nuevo = [...prev];
      const anyUnfinished = indices.some(idx => !nuevo[idx]);
      indices.forEach(idx => { nuevo[idx] = anyUnfinished; });
      return nuevo;
    });
  };

  const addProposicion = () => {
    if (tempProp.proponente && tempProp.texto) {
      setProposiciones([...proposiciones, { ...tempProp, id: Date.now() }]);
      setTempProp({ proponente: '', texto: '' });
    }
  };

  const deleteProposicion = (id) => {
    setProposiciones(proposiciones.filter(p => p.id !== id));
  };

  const togglePostulacion = (nombre, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    } else {
      setPostuladosConvivencia(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex min-h-screen bg-[#F4F6F4] font-sans text-[#2F2F2F] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#4E8A2F] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#4E8A2F] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-[#7FB069] flex items-center justify-center rounded-[28px] shadow-lg">
                <Building2 className="text-white" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none uppercase mb-2">
            FIGUERES <span className="text-[#A8CFA0]">II</span>
          </h1>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Propiedad Horizontal</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: ListChecks },
            { id: 'dignatarios', label: '3-4. Dignatarios', icon: UserPlus },
            { id: 'gestion', label: '5. Informe Gestión', icon: TrendingUp },
            { id: 'financiero', label: '6-7. Financiero', icon: BarChart3 },
            { id: 'presupuesto', label: '8. Presupuesto', icon: PieChart },
            { id: 'elecciones', label: '9-10. Elecciones', icon: Gavel },
            { id: 'proposiciones', label: '11. Proposiciones', icon: MessageSquare },
            { id: 'final', label: 'Finalizar Acta', icon: Printer },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest ${
                activeSection === item.id 
                ? 'bg-[#7FB069] text-white shadow-xl translate-x-2' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-white/5 text-[10px] font-black text-center opacity-40 uppercase tracking-[0.3em]">
            Pasto, Nariño <br/> Vigencia 2026
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#F4F6F4]">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#4E8A2F]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest">Quórum Actual</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#4E8A2F]' : 'text-[#2F2F2F]'}`}>
                  {totalQuorum.toFixed(3)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#4E8A2F] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-12 border-[#4E8A2F]/10">
              <span className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest">Progreso de Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#4E8A2F]/5 shadow-inner">
                    <div className="h-full bg-[#7FB069] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#7FB069]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
               <p className="text-[14px] font-black text-[#2F2F2F] uppercase tracking-tight">E.M. FIGUERES II</p>
               <p className="text-[11px] text-[#4E8A2F] font-black uppercase tracking-widest">Ana Lucia Yepez | Admin.</p>
            </div>
            <div className="h-14 w-14 bg-[#4E8A2F] rounded-2xl flex items-center justify-center text-white shadow-xl">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#4E8A2F] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#7FB069]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#7FB069] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Sesión Ordinaria</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">FIGUERES <span className="text-[#A8CFA0] italic">II</span></h1>
                     <div className="w-32 h-2 bg-[#7FB069] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">Asamblea General de Copropietarios<br/>Gestión 2025 - Proyección 2026</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
                  <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#7FB069]/10 blur-[120px] rounded-full"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest leading-none">NIT: 901.374.299-8</p>
                       <p className="text-lg font-black text-[#2F2F2F]">Carrera 38 No 19-25, B/ Palermo</p>
                    </div>
                  </Card>
                  <Card title="Convocatoria">
                    <div className="space-y-3 pt-2 text-[#2F2F2F]">
                       <p className="text-lg font-black">21 de Febrero 2026</p>
                       <p className="text-[11px] font-black text-[#4E8A2F] opacity-80 uppercase">Hora: 3:00 P.M.</p>
                    </div>
                  </Card>
                  <Card className="bg-[#4E8A2F] text-white border-none flex flex-col items-center justify-center shadow-2xl">
                    <p className="text-6xl font-black text-white mb-2 leading-none tracking-tighter">{asistencia.length}</p>
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 leading-none">Unidades / Coeficientes</p>
                  </Card>
               </div>
            </div>
          )}

          {/* SECCIÓN 1: QUORUM */}
          {activeSection === 'quorum' && (
            <div className="space-y-10 animate-in slide-in-from-right-10">
              <SectionHeader title="1. Registro y Quórum" icon={Users} agendaIndices={[0]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="flex justify-between items-end mb-4 print:hidden">
                <div className="text-left">
                  <h3 className="text-[#4E8A2F] font-black text-lg uppercase tracking-tighter">Listado de Unidades</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Haga clic en el switch para registrar asistencia</p>
                </div>

                <button 
                  onClick={() => {
                    const todosPresentes = asistencia.every(a => a.presente);
                    setAsistencia(prev => prev.map(a => ({ ...a, presente: !todosPresentes })));
                  }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md hover:scale-105 active:scale-95 border-b-4 ${
                    asistencia.every(a => a.presente)
                    ? 'bg-slate-100 text-[#4E8A2F] border-slate-200' 
                    : 'bg-[#4E8A2F] text-white border-black/20'
                  }`}
                >
                  {asistencia.every(a => a.presente) ? (
                    <> <Trash2 size={16} /> Quitar Todo </>
                  ) : (
                    <> <UserCheck size={16} /> Marcar Todos </>
                  )}
                </button>
              </div>

              <div className="space-y-8 print:hidden">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="relative group w-full max-w-2xl">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#4E8A2F] group-focus-within:text-[#4E8A2F] transition-colors" size={24} />
                    <input 
                      type="text" 
                      placeholder="BUSCAR UNIDAD O PROPIETARIO..." 
                      className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-slate-200 focus:border-[#4E8A2F] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-[32px] shadow-sm border border-slate-100">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-[#2F2F2F] uppercase tracking-widest">PRESENTES</p>
                        <p className="text-3xl font-black text-[#4E8A2F]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                    </div>
                    <Users className="text-[#4E8A2F]" size={40} />
                  </div>
                </div>

                <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F4F6F4] text-[#2F2F2F] font-black uppercase tracking-widest text-[11px] border-b-2 border-slate-100">
                      <tr>
                        <th className="px-12 py-8">UNIDAD</th>
                        <th className="px-12 py-8">PROPIETARIO</th>
                        <th className="px-12 py-8 text-center">COEF (%)</th>
                        <th className="px-12 py-8 text-center">ASISTENCIA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 uppercase">
                      {filteredAsistencia.map((item) => (
                        <tr key={item.id} className={`${item.presente ? 'bg-[#4E8A2F]/5' : ''} hover:bg-slate-50 transition-colors`}>
                          <td className="px-12 py-8 font-black text-[#4E8A2F] text-xl">{item.unidad}</td>
                          <td className="px-12 py-8 font-black text-[#2F2F2F] text-sm tracking-tight">{item.propietario}</td>
                          <td className="px-12 py-8 font-black text-[#2F2F2F] text-center text-xl">{item.coeficiente.toFixed(3)}%</td>
                          <td className="px-12 py-8 text-center">
                            <button 
                              onClick={() => toggleAsistencia(item.id)} 
                              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                                item.presente ? 'bg-[#4E8A2F]' : 'bg-slate-200'
                              }`}
                            >
                              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                item.presente ? 'translate-x-9' : 'translate-x-1'
                              }`} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: ORDEN DEL DÍA */}
          {activeSection === 'orden' && (
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="2. Orden del Día" icon={ListChecks} agendaIndices={[1]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card highlight title="Puntos del Orden del Día Oficial">
                <div className="space-y-4 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#4E8A2F] bg-[#4E8A2F]/5' : 'border-[#4E8A2F]/10 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#7FB069] text-white' : 'bg-[#4E8A2F] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#4E8A2F]' : 'text-[#2F2F2F]'}`}>
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* SECCIÓN 3-4: DIGNATARIOS */}
          {activeSection === 'dignatarios' && (
            <div className="space-y-10 animate-in zoom-in-95">
               <SectionHeader title="3-4. Dignatarios y Acta" icon={UserPlus} agendaIndices={[2, 3]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 uppercase">
                  <div className="md:col-span-2 space-y-10">
                    <Card title="Elección de Mesa Directiva" icon={ShieldCheck} highlight>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest block">Presidente de Asamblea</label>
                             <input type="text" className="w-full p-6 bg-slate-50 border-2 border-[#4E8A2F]/10 rounded-2xl font-black uppercase text-xs focus:border-[#4E8A2F] outline-none shadow-inner" placeholder="NOMBRE COMPLETO..." value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} />
                          </div>
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest block">Secretario(a)</label>
                             <input type="text" className="w-full p-6 bg-slate-50 border-2 border-[#4E8A2F]/10 rounded-2xl font-black uppercase text-xs focus:border-[#4E8A2F] outline-none shadow-inner" placeholder="NOMBRE COMPLETO..." value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} />
                          </div>
                       </div>
                    </Card>
                    <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                       <div className="space-y-4 pt-4">
                          <label className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest block">Miembros Comisión 2026</label>
                          <textarea className="w-full p-6 bg-slate-50 border-2 border-[#4E8A2F]/10 rounded-2xl font-black uppercase text-[11px] h-40 focus:border-[#4E8A2F] outline-none leading-loose shadow-inner" placeholder="INGRESE NOMBRES DE LOS DESIGNADOS..." value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}></textarea>
                       </div>
                    </Card>
                  </div>
                  <div className="bg-[#4E8A2F] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#7FB069]">
                     <Gavel className="text-white mb-10 mx-auto" size={56} />
                     <h4 className="font-black text-2xl mb-6 uppercase tracking-tighter">Normativa</h4>
                     <p className="text-[11px] font-black text-white/60 leading-loose uppercase tracking-[0.2em]">
                        La asamblea sesiona bajo la Ley 675 de 2001. Las decisiones tomadas obligan a ausentes y disidentes si se cumple el quórum de ley.
                     </p>
                  </div>
               </div>
            </div>
          )}

          {/* SECCIÓN 5: INFORME GESTIÓN (REPLICA TOTAL DEL WORD) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="5. Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndices={[4]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              {/* GESTIÓN ADMINISTRATIVA Y OPERATIVA */}
              <Card title="1. Gestión Administrativa y Operativa" icon={Building2} highlight>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-3xl border-l-8 border-[#4E8A2F]">
                      <p className="text-sm font-black text-[#4E8A2F] mb-2">Instalación del Consejo</p>
                      <p className="text-[11px] font-bold text-[#2F2F2F]">Consejo instalado el 22 de abril, Sra. Amanda Cualtan como Presidenta. Reuniones bimensuales.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border-l-8 border-[#4E8A2F]">
                      <p className="text-sm font-black text-[#4E8A2F] mb-2">Entorno y Jardín</p>
                      <p className="text-[11px] font-bold text-[#2F2F2F]">Plan de renovación (diseño, iluminación, piedras decorativas). Gestión con arrendatario local.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border-l-8 border-[#4E8A2F]">
                      <p className="text-sm font-black text-[#4E8A2F] mb-2">Dotación y Mantenimiento</p>
                      <ul className="text-[11px] font-bold list-disc pl-4 space-y-1">
                        <li>Mesa recepción: $202.000 (financiado venta vidrio).</li>
                        <li>Gabinete salón comunal: $500.000.</li>
                        <li>Pulsador inalámbrico sótano: $135.000.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-3xl border-l-8 border-[#7FB069]">
                      <p className="text-sm font-black text-[#7FB069] mb-2">Seguridad y Emergencias</p>
                      <p className="text-[11px] font-bold text-[#2F2F2F]">Evaluación incremento cámaras. Cotización camilla y botiquín obligatorio. Capacitación primeros auxilios.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border-l-8 border-[#7FB069]">
                      <p className="text-sm font-black text-[#7FB069] mb-2">Talento Humano</p>
                      <p className="text-[11px] font-bold text-[#2F2F2F]">Reconocimiento operaria de aseo. Gestión de reemplazo temporal por incapacidad médica.</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* GESTIÓN FINANCIERA Y CARTERA */}
              <Card title="2. Gestión Financiera y Cartera" icon={BarChart3}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border-2 border-slate-50 rounded-2xl">
                       <Percent className="text-[#4E8A2F] shrink-0" />
                       <p className="text-[11px] font-bold text-slate-700">Apertura cuenta ahorros para fondo imprevistos y CDT vigente (Intereses acumulados a oct: $1.253.083).</p>
                    </div>
                    <div className="flex items-start gap-4 p-4 border-2 border-slate-50 rounded-2xl">
                       <Wallet className="text-[#4E8A2F] shrink-0" />
                       <p className="text-[11px] font-bold text-slate-700">Caja menor de $200.000 administrada por el Consejo para gastos básicos.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border-2 border-slate-50 rounded-2xl">
                       <ShieldAlert className="text-[#4E8A2F] shrink-0" />
                       <p className="text-[11px] font-bold text-slate-700">Cobro prejurídico y jurídico efectivo. Reducción cartera morosa (Apto 301).</p>
                    </div>
                    <div className="flex items-start gap-4 p-4 border-2 border-slate-50 rounded-2xl">
                       <Scale className="text-[#4E8A2F] shrink-0" />
                       <p className="text-[11px] font-bold text-slate-700">Asunción pago predial bodegas (1, 3, 4, 8, 9, 10) para proceso de pertenencia.</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* TABLAS COMPLETAS DEL INFORME */}
              <div className="space-y-12">
                <ManagementTable 
                  title="RELACIÓN DE GASTOS MENSUALES FIJOS (OPERATIVOS)"
                  headers={["PROVEEDOR", "CONCEPTO", "DETALLE"]}
                  data={[
                    {p: "CEDENAR SA ESP", c: "Energía Eléctrica", d: "Pago mensual luz zonas comunes."},
                    {p: "EMPOPASTO SA ESP", c: "Acueducto", d: "Pago mensual agua y alcantarillado."},
                    {p: "EMAS SA ESP", c: "Servicio Aseo", d: "Pago mensual recolección residuos."},
                    {p: "QUALIS SOLUCIONES", c: "Personal Aseo", d: "Servicio operaria limpieza (contrato fijo)."},
                    {p: "EUROLIFT SAS", c: "Mantenimiento Ascensor", d: "Servicio preventivo mensual."},
                    {p: "TALAMO LTDA", c: "Seguridad y Monitoreo", d: "Servicio mensual monitoreo alarmas."},
                    {p: "COLOMBIA TELECOM", c: "Internet/Telefonía", d: "Conectividad administración y citofonía."},
                    {p: "ANA LUCIA YEPEZ C.", c: "Honorarios Admin", d: "Pago mensual gestión administrativa."},
                    {p: "LUZ JANETH LOPEZ", c: "Honorarios Contabilidad", d: "Pago mensual servicios contables."},
                    {p: "MIGUEL ANGEL ACOSTA", c: "Honorarios Revisoría", d: "Pago mensual auditoría fiscal."},
                    {p: "SEGUROS DEL ESTADO", c: "Póliza Zonas Comunes", d: "Prima anual financiada."},
                    {p: "DIAN / MUNICIPIO", c: "Impuestos", d: "Retenciones fuente e Industria y Comercio."}
                  ]}
                  icon={Activity}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <ManagementTable 
                    title="INFRAESTRUCTURA Y MEJORAS"
                    headers={["PROVEEDOR", "OBRA", "DETALLE"]}
                    data={[
                      {p: "CASTEIR MORENO", o: "Mantenimiento Cubierta", d: "Reparación techos y materiales."},
                      {p: "JHON FRANCO CUATIN", o: "Hidráulico", d: "Lavado tanques y equipos presión."},
                      {p: "JOSE FRANCISCO JOJOA", o: "Iluminación LED", d: "Instalación lámparas parqueadero/pisos."},
                      {p: "LUIS HUMBERTO BARRERA", o: "Suministros Eléctricos", d: "Compra paneles LED."},
                      {p: "ANA LUCÍA YÉPEZ (C.M.)", o: "Jardín", d: "Arreglo jardinera (Caja Menor)."}
                    ]}
                    icon={Wrench}
                  />
                  <ManagementTable 
                    title="SEGURIDAD Y EQUIPOS TÉCNICOS"
                    headers={["PROVEEDOR", "CONCEPTO", "DETALLE"]}
                    data={[
                      {p: "TALAMO LTDA", c: "Actualización DVR", d: "Suministro disco duro 2TB."},
                      {p: "CUMMINS DE LOS ANDES", c: "Planta Eléctrica", d: "Mantenimiento preventivo cuatrimestral."},
                      {p: "HERNANDO TOBAR - EDN", c: "Red Contra Incendio", d: "Recarga 14 extintores ABC."},
                      {p: "OSCAR MALES", c: "Acceso Sótano", d: "Pulsador inalámbrico."}
                    ]}
                    icon={ShieldCheck}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <ManagementTable 
                    title="SUMINISTROS Y BIENESTAR"
                    headers={["PROVEEDOR", "CONCEPTO", "DETALLE"]}
                    data={[
                      {p: "ADRIANA BARRERA", c: "Insumos Aseo", d: "Productos de limpieza."},
                      {p: "YASMIN CUALTAN", c: "Carpintería/Eventos", d: "Mueble salón y evento navideño."},
                      {p: "ALBA LUCY LOPEZ", c: "Jardinería", d: "Compra plantas y tierra."},
                      {p: "PAOLA ALEJANDRA CORAL", c: "Control Plagas", d: "Fumigación y roedores."},
                      {p: "ANA LUCÍA YÉPEZ", c: "Bienestar", d: "Bono fin de año personal."}
                    ]}
                    icon={HeartPulse}
                  />
                  <ManagementTable 
                    title="LEGALES Y ADMINISTRATIVOS"
                    headers={["PROVEEDOR", "CONCEPTO", "DETALLE"]}
                    data={[
                      {p: "ALCALDÍA DE PASTO", c: "Prediales", d: "Pago prediales bodegas 3,4,8,9,10."},
                      {p: "STEFANIA MUÑOZ", c: "Cartera", d: "Honorarios recuperación morosos."},
                      {p: "COMERCIALIZADORA HH", c: "Papelería", d: "Separadores archivo."},
                      {p: "ANA LUCIA YEPEZ C.", c: "Insumos Operativos", d: "Gasolina planta y papelería."}
                    ]}
                    icon={Scale}
                  />
                </div>
              </div>

              {/* PÓLIZAS */}
              <div className="space-y-12">
                <div className="bg-[#4E8A2F] p-12 rounded-[50px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
                  <div className="z-10 text-center md:text-left">
                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Seguros y Amparos</h3>
                    <p className="text-white/80 font-bold text-sm uppercase tracking-[0.2em]">Pólizas Vigentes: Mayo 2025 - Mayo 2026 (Seguros del Estado)</p>
                  </div>
                  <ShieldCheck size={80} className="text-white opacity-20 absolute right-12" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2">
                    <Card title="Póliza Bienes Comunes" icon={ShieldCheck} badge="Vigente">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-[#4E8A2F]/10">
                          <p className="text-[11px] font-black text-[#2F2F2F] uppercase mb-1">V. Asegurado Total</p>
                          <p className="text-base font-black text-[#4E8A2F]">$6.645.200.000</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl border-2 border-[#4E8A2F]/10">
                          <p className="text-[11px] font-black text-[#2F2F2F] uppercase mb-1">Prima Total</p>
                          <p className="text-base font-black text-[#2F2F2F]">$5.428.795</p>
                        </div>
                      </div>
                      <div className="overflow-x-auto rounded-[32px] border-4 border-slate-50">
                        <table className="w-full text-left uppercase">
                          <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
                            <tr><td className="px-6 py-4 text-[12px]">Edificio (Áreas Comunes)</td><td className="px-6 py-4 font-black text-[#4E8A2F]">$5.735.000.000</td></tr>
                            <tr><td className="px-6 py-4 text-[12px]">RC Extracontractual</td><td className="px-6 py-4 font-black text-[#4E8A2F]">$300.000.000</td></tr>
                            <tr><td className="px-6 py-4 text-[12px]">Maquinaria y Equipo</td><td className="px-6 py-4 font-black text-[#4E8A2F]">$257.000.000</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                  <Card title="Póliza D&O" icon={Scale} highlight>
                      <div className="space-y-6">
                        <p className="text-[11px] text-[#4E8A2F] font-black uppercase tracking-[0.3em]">Directores y Administradores</p>
                        <p className="text-4xl font-black text-[#2F2F2F] leading-none">$100.000.000</p>
                        <p className="text-[11px] text-slate-500 font-bold leading-relaxed border-l-4 border-[#4E8A2F] pl-4">Protección patrimonial ante errores u omisiones en el ejercicio de funciones.</p>
                        <div className="pt-4 border-t-2 border-slate-100">
                          <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Costo Anual:</span>
                          <span className="text-2xl font-black text-[#4E8A2F]">$166.600</span>
                        </div>
                      </div>
                  </Card>
                </div>
              </div>

              {/* RECOMENDACIONES 2026 */}
              <div className="space-y-8">
                <SectionHeader title="Recomendaciones & Pendientes 2026" icon={Settings} agendaIndices={[4]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="p-8 bg-white border-4 border-[#4E8A2F]/10 rounded-[40px] shadow-lg">
                      <div className="h-14 w-14 bg-[#4E8A2F] rounded-2xl flex items-center justify-center text-white mb-6"><Wrench size={28}/></div>
                      <h4 className="text-[13px] font-black mb-3 uppercase tracking-widest text-[#4E8A2F]">ESTRUCTURAL</h4>
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">Priorizar rubro para impermeabilización general del edificio, planificando el ajuste de cuota para evitar impacto abrupto.</p>
                   </div>
                   <div className="p-8 bg-white border-4 border-[#4E8A2F]/10 rounded-[40px] shadow-lg">
                      <div className="h-14 w-14 bg-[#4E8A2F] rounded-2xl flex items-center justify-center text-white mb-6"><Scale size={28}/></div>
                      <h4 className="text-[13px] font-black mb-3 uppercase tracking-widest text-[#4E8A2F]">REGLAMENTO RPH</h4>
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">Revisión de zonas comunes de uso privado (terrazas/patios) para aclarar responsabilidades de mantenimiento ordinario.</p>
                   </div>
                   <div className="p-8 bg-white border-4 border-[#4E8A2F]/10 rounded-[40px] shadow-lg">
                      <div className="h-14 w-14 bg-[#4E8A2F] rounded-2xl flex items-center justify-center text-white mb-6"><Activity size={28}/></div>
                      <h4 className="text-[13px] font-black mb-3 uppercase tracking-widest text-[#4E8A2F]">CARTERA</h4>
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase">Formalizar acuerdos con morosos históricos y exigir Paz y Salvo antes de autorizar cualquier trasteo.</p>
                   </div>
                </div>
              </div>
            </div>
          )}
          
          {/* SECCIÓN 6-7: FINANCIERO */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="6-7. Informe Financiero 2025" icon={BarChart3} agendaIndices={[5, 6]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="max-w-5xl mx-auto uppercase">
                <div className="bg-white rounded-[60px] p-16 shadow-2xl border-4 border-[#4E8A2F]/10 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5"><BarChart3 size={200} className="text-[#4E8A2F]" /></div>
                  <div className="p-8 bg-[#4E8A2F]/5 rounded-[40px] mb-10 border-2 border-[#4E8A2F]/10">
                    <TrendingUp size={80} className="text-[#4E8A2F]" />
                  </div>
                  <h3 className="text-4xl font-black text-[#4E8A2F] mb-6 tracking-tighter">ESTADOS FINANCIEROS & REVISORÍA</h3>
                  <div className="w-24 h-2 bg-[#7FB069] mb-10 rounded-full"></div>
                  <div className="space-y-4">
                    <p className="text-[14px] font-black text-[#2F2F2F] tracking-[0.4em]">Presentación oficial:</p>
                    <p className="text-3xl font-black text-[#2F2F2F] tracking-tight">LUZ JANETH LÓPEZ VELA - CONTADORA</p>
                    <p className="text-3xl font-black text-[#4E8A2F] tracking-tight">MIGUEL ÁNGEL ACOSTA - REVISOR FISCAL</p>
                  </div>
                  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                    <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                      <p className="text-[10px] font-black text-[#4E8A2F] tracking-[0.2em] mb-2">Periodo</p>
                      <p className="text-xl font-black text-slate-700">ENE - DIC 2025</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                      <p className="text-[10px] font-black text-[#4E8A2F] tracking-[0.2em] mb-2">Dictamen</p>
                      <p className="text-xl font-black text-slate-700">BAJO NIIF</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 8: PRESUPUESTO */}
          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-10">
              <SectionHeader title="8. Proyecto Presupuesto 2026" icon={PieChart} agendaIndices={[7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="max-w-5xl mx-auto uppercase">
                <div className="bg-[#4E8A2F] rounded-[60px] p-16 shadow-2xl border-b-[20px] border-black/10 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 p-12 opacity-10"><Wallet size={250} className="text-white" /></div>
                  <div className="p-8 bg-white/10 rounded-[40px] mb-10 border-2 border-white/20 backdrop-blur-md">
                    <Landmark size={80} className="text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">PROYECCIÓN PRESUPUESTAL 2026</h3>
                  <div className="w-24 h-2 bg-[#7FB069] mb-10 rounded-full"></div>
                  <div className="space-y-4">
                    <p className="text-[14px] font-black text-white/60 tracking-[0.4em]">Propuesta de Cuotas:</p>
                    <p className="text-lg font-black text-white tracking-widest max-w-xl">DEFINICIÓN DE CUOTAS DE ADMINISTRACIÓN PARA EL MANTENIMIENTO INTEGRAL DE ZONAS COMUNES.</p>
                  </div>
                  <div className="mt-16 bg-white/5 border-2 border-white/10 backdrop-blur-sm px-12 py-8 rounded-[40px]">
                    <p className="text-[12px] font-black text-white uppercase leading-relaxed">
                       PROYECTO SUJETO A VOTACIÓN POR LA ASAMBLEA GENERAL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 9-10: ELECCIONES */}
          {activeSection === 'elecciones' && (
            <div className="space-y-12 animate-in zoom-in-95 uppercase">
              <SectionHeader title="9-10. Elecciones Órganos Control" icon={Gavel} agendaIndices={[8, 9]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card title="Consejo y Convivencia" icon={Users} highlight>
                  <div className="space-y-8 pt-2">
                    <div className="flex flex-wrap gap-3 min-h-[60px] p-6 bg-slate-50 rounded-[32px] border-2 border-[#4E8A2F]/10 shadow-inner">
                      {postuladosConsejo.length === 0 && (
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">No hay candidatos seleccionados aún</p>
                      )}
                      {postuladosConsejo.map(p => (
                        <span key={p} className="bg-[#4E8A2F] text-white px-5 py-2.5 rounded-2xl text-[10px] font-black flex items-center gap-3 border-b-4 border-black/20">
                          {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={14} /></button>
                        </span>
                      ))}
                    </div>
                    <div className="max-h-80 overflow-y-auto border-2 border-[#4E8A2F]/10 rounded-[32px] divide-y divide-slate-100 text-[10px] font-bold bg-white">
                      {asistencia.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                          <span className="text-slate-700 font-black">{r.unidad} - {r.propietario}</span>
                          <button onClick={() => togglePostulacion(r.propietario, 'consejo')} className={`px-5 py-2.5 rounded-xl transition-all ${postuladosConsejo.includes(r.propietario) ? 'bg-[#7FB069] text-white' : 'bg-slate-100 text-slate-400'}`}>POSTULAR</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <div className="bg-[#4E8A2F] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[16px] border-[#7FB069]">
                    <ShieldCheck size={72} className="text-white mb-10 mx-auto" />
                    <h4 className="font-black text-2xl mb-4 uppercase tracking-tighter">Punto 10: Revisoría</h4>
                    <p className="text-[11px] font-black text-white/60 leading-loose uppercase mb-8">Presentación y elección del Revisor Fiscal para el período 2026-2027.</p>
                    <div className="p-8 bg-white/10 rounded-3xl border-2 border-white/20 uppercase">
                       <p className="text-[11px] font-black mb-2 text-[#7FB069]">Actual Revisor:</p>
                       <p className="text-xl font-black">MIGUEL ÁNGEL ACOSTA</p>
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 11: PROPOSICIONES */}
          {activeSection === 'proposiciones' && (
            <div className="space-y-10 animate-in slide-in-from-right-10 uppercase">
              <SectionHeader title="11. Proposiciones y Varios" icon={MessageSquare} agendaIndices={[10]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card title="Nueva Proposición" highlight>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  <div className="md:col-span-1 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase">PROPIETARIO/APTO</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#4E8A2F]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#4E8A2F]" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} placeholder="EJ: 201" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase">PROPOSICIÓN</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#4E8A2F]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#4E8A2F]" value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})} placeholder="DESCRIPCIÓN DE LA SOLICITUD..." />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addProposicion} className="w-full bg-[#4E8A2F] text-white py-4 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-3 uppercase"><Plus size={18} /> AGREGAR</button>
                  </div>
                </div>
              </Card>
              <div className="space-y-6">
                {proposiciones.map((prop) => (
                    <div key={prop.id} className="bg-white p-8 rounded-[32px] border-2 border-[#4E8A2F]/5 shadow-lg flex justify-between items-center group">
                       <div className="flex items-start gap-6">
                          <div className="h-14 w-14 bg-[#4E8A2F] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shrink-0 group-hover:bg-[#7FB069] transition-colors">{prop.proponente.substring(0,3)}</div>
                          <div>
                             <p className="text-[10px] font-black text-[#4E8A2F] mb-1">PROPOSICIÓN DE: {prop.proponente}</p>
                             <p className="text-sm font-black text-[#2F2F2F] leading-relaxed uppercase">{prop.texto}</p>
                          </div>
                       </div>
                       <button onClick={() => deleteProposicion(prop.id)} className="bg-red-50 text-red-500 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20} /></button>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN FINAL */}
          {activeSection === 'final' && (
            <div className="space-y-16 animate-in zoom-in-95 text-center uppercase">
              <div className="flex justify-between items-center print:hidden bg-[#4E8A2F] p-10 rounded-[40px] shadow-2xl">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">CIERRE DE ASAMBLEA 2026</h2>
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL FIRMADA POR LOS DIGNATARIOS</p>
                </div>
                <button onClick={handlePrint} className="bg-white text-[#4E8A2F] px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl hover:scale-110 transition-all text-xs tracking-[0.2em]">
                  <Printer size={24} /> IMPRIMIR ACTA FINAL
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#4E8A2F] print:shadow-none print:border-none print:p-0 bg-white">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#4E8A2F] pb-10">
                  <h1 className="text-4xl font-black mb-4 uppercase">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                  <p className="text-xl font-black text-[#4E8A2F] uppercase">EDIFICIO FIGUERES II - NIT 901374299-8</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-slate-50 rounded-[56px] border-2 border-[#4E8A2F]/10 flex flex-col items-center">
                    <p className="text-[11px] font-black text-[#2F2F2F] mb-10 tracking-[0.3em]">Quórum de Cierre</p>
                    <p className="text-7xl font-black text-[#4E8A2F] leading-none">{totalQuorum.toFixed(3)}%</p>
                  </div>
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#2F2F2F] tracking-[0.3em] uppercase leading-none mb-12">Mesa Directiva Electa</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-4 border-[#4E8A2F]/10 pb-4">
                          <p className="text-[9px] text-[#4E8A2F] mb-2 font-black">PRESIDENTE DE ASAMBLEA:</p>
                          <p className="text-lg text-[#2F2F2F]">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-4 border-[#4E8A2F]/10 pb-4">
                          <p className="text-[9px] text-[#4E8A2F] mb-2 font-black">SECRETARIO(A) DE ASAMBLEA:</p>
                          <p className="text-lg text-[#2F2F2F]">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>
                  <div className="p-12 bg-[#4E8A2F] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#7FB069]">
                    <ShieldCheck size={72} className="text-white mb-10 opacity-50" />
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] opacity-60">Sesión Finalizada</p>
                    <p className="text-xl font-black mt-4">PASTO, FEBRERO 2026</p>
                  </div>
                </div>
                <div className="hidden print:grid grid-cols-2 gap-64 mt-64 mb-32">
                  <div className="border-t-4 border-[#2F2F2F] pt-8 text-center uppercase">
                    <p className="text-[11px] font-black leading-loose">PRESIDENTE ELECTO</p>
                  </div>
                  <div className="border-t-4 border-[#2F2F2F] pt-8 text-center uppercase">
                    <p className="text-[11px] font-black leading-loose">SECRETARIO ELECTO</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; background-color: #F4F6F4; }

        @media print {
          @page { margin: 1.5cm; size: auto; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          .Card { break-inside: avoid !important; border: 1px solid #000 !important; border-radius: 10px !important; box-shadow: none !important; }
          table { border-collapse: collapse !important; width: 100% !important; border: 1px solid #000 !important; font-size: 9pt !important; }
          th { background: #4E8A2F !important; color: white !important; -webkit-print-color-adjust: exact; padding: 8px !important; border: 1px solid #000 !important; }
          td { border: 1px solid #000 !important; padding: 8px !important; }
        }
      `}} />
    </div> 
  );
}