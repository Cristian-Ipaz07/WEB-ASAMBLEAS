import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, MessageSquare, Home, 
  ShieldCheck, UserPlus, CheckCircle2, Printer, Trash2, 
  TrendingUp, ClipboardCheck, Camera, Activity, Wrench, 
  Calendar, ListChecks, AlertCircle, Building2, Search, 
  DollarSign, PieChart, Landmark, Gavel, Wallet, Cog, Plus, 
  UserCheck, Scale, Flame, ShieldAlert, HeartPulse
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL ÁREA 42 ---
const COLORS = {
  terracota: '#B85C38',
  naranjaAcento: '#E06A2C',
  negroModerno: '#1C1C1C',
  grisMedio: '#6A6A6A',
  grisClaro: '#EFEFEF',
  blanco: '#FFFFFF'
};

// --- DATOS EXTRAÍDOS DE DOCUMENTOS ---

const ORDEN_DIA = [
  "Registro de firmas y verificación del quórum.",
  "Lectura y aprobación del orden del día.",
  "Elección de dignatarios de la Asamblea (presidente y secretario).",
  "Elección del comité de verificación de la presente acta.",
  "Validación del Acta Anterior.",
  "Presentación y aprobación informe de Administración.",
  "Presentación y aprobación de Estados Financieros a diciembre 31 de 2025.",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos para el año 2026 – Definición de cuotas de sostenimiento.",
  "Elección del consejo de administración.",
  "Elección Comité de Convivencia.",
  "Proposiciones y varios."
];

const COEFICIENTES_DATA = [
  { id: 1, unidad: 'A.Estudio 01', propietario: 'DAVID PATIÑO', coeficiente: 2.97640 },
  { id: 2, unidad: 'A.Estudio 02', propietario: 'EDGAR IBARRA MORILLO', coeficiente: 3.11165 },
  { id: 3, unidad: 'A.Estudio 03', propietario: 'AURA ALVAREZ', coeficiente: 3.24173 },
  { id: 4, unidad: 'A.Estudio 04', propietario: 'JAIME ARTEAGA-ANDRES ARROYO', coeficiente: 4.17557 },
  { id: 5, unidad: 'A.Estudio 05', propietario: 'EDUAR YAIR GOMEZ', coeficiente: 5.09045 },
  { id: 6, unidad: 'APTO. 101', propietario: 'MARIA MERCEDES ROSERO', coeficiente: 7.50775 },
  { id: 7, unidad: 'APTO. 201', propietario: 'MARTHA KAISER', coeficiente: 9.67435 },
  { id: 8, unidad: 'A.Estudio 202', propietario: 'JHON TOVAR', coeficiente: 2.74724 },
  { id: 9, unidad: 'A.Estudio 203', propietario: 'MAURICIO ORDOÑEZ', coeficiente: 3.83873 },
  { id: 10, unidad: 'APTO. 301', propietario: 'GLORIA UNIGARRO', coeficiente: 9.64593 },
  { id: 11, unidad: 'APTO. 302', propietario: 'PAOLA DVRIES', coeficiente: 6.56788 },
  { id: 12, unidad: 'APTO. 401', propietario: 'PAOLA ESTRADA', coeficiente: 9.94486 },
  { id: 13, unidad: 'APTO. 402', propietario: 'JOSE VILLOTA', coeficiente: 6.24569 },
  { id: 14, unidad: 'APTO. 501', propietario: 'CRISTINA MONCAYO', coeficiente: 9.61751 },
  { id: 15, unidad: 'APTO. 502', propietario: 'NANCY MARQUEZ', coeficiente: 14.21606 },
  { id: 16, unidad: 'Deposito 1', propietario: 'EDUAR YAIR GOMEZ', coeficiente: 0.21278 },
  { id: 17, unidad: 'Deposito 2', propietario: 'EDUAR YAIR GOMEZ', coeficiente: 0.19814 },
  { id: 18, unidad: 'Deposito 3', propietario: 'ANA LUCIA TORRES DAZA', coeficiente: 0.20589 },
  { id: 19, unidad: 'Deposito 4', propietario: 'ANA LUCIA TORRES DAZA', coeficiente: 0.33253 },
  { id: 20, unidad: 'Deposito 5', propietario: 'ANA LUCIA TORRES DAZA', coeficiente: 0.24294 },
  { id: 21, unidad: 'Deposito 6', propietario: 'JHON TOVAR', coeficiente: 0.20589 }
];

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#B85C38]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#B85C38] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#1C1C1C] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[11px] text-[#6A6A6A] font-black uppercase tracking-[0.2em]">
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
        ? 'bg-[#E06A2C] border-[#E06A2C] text-white' 
        : 'bg-white border-[#B85C38]/20 text-[#B85C38] hover:bg-[#B85C38] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#B85C38] ring-4 ring-[#B85C38]/10' : 'border-[#6A6A6A]/10'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#1C1C1C] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#E06A2C]' : 'bg-[#6A6A6A]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#B85C38]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#E06A2C] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#6A6A6A]/10 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#B85C38] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#B85C38] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#EFEFEF] text-[#1C1C1C] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#6A6A6A]/10 uppercase font-bold text-[#1C1C1C]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#B85C38]/5 transition-colors">
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

const EvidenceCard = ({ title, content, icon: Icon, color = "#B85C38" }) => (
  <div className={`p-8 bg-white rounded-[32px] border-l-[12px] shadow-sm flex flex-col relative group transition-all hover:shadow-md mb-4`} style={{ borderColor: color }}>
    <div className="flex justify-between items-start mb-4">
      <p className="text-xs font-black uppercase tracking-widest" style={{ color: color }}>{title}</p>
      <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-[#B85C38] transition-colors">
        {Icon && <Icon size={20} />}
      </div>
    </div>
    <div className="text-base font-bold text-slate-700 leading-relaxed uppercase tracking-tight">
      {content}
    </div>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  // Persistencia de estados
  const [asistencia, setAsistencia] = useState(() => {
    try {
      const saved = localStorage.getItem('asistencia_area42_2026');
      return saved ? JSON.parse(saved) : COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    } catch (e) {
      return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    }
  });
  
  const [agendaStatus, setAgendaStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('agenda_area42_2026');
      return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
    } catch (e) {
      return new Array(ORDEN_DIA.length).fill(false);
    }
  });

  const [dignatarios, setDignatarios] = useState(() => {
    try {
      const saved = localStorage.getItem('dignatarios_area42_2026');
      return saved ? JSON.parse(saved) : { presidente: '', secretario: '', comision: '' };
    } catch (e) {
      return { presidente: '', secretario: '', comision: '' };
    }
  });

  const [proposiciones, setProposiciones] = useState(() => {
    try {
      const saved = localStorage.getItem('proposiciones_area42_2026');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });
  const [postuladosConsejo, setPostuladosConsejo] = useState([]);
  const [postuladosConvivencia, setPostuladosConvivencia] = useState([]);

  useEffect(() => {
    localStorage.setItem('asistencia_area42_2026', JSON.stringify(asistencia));
    localStorage.setItem('agenda_area42_2026', JSON.stringify(agendaStatus));
    localStorage.setItem('dignatarios_area42_2026', JSON.stringify(dignatarios));
    localStorage.setItem('proposiciones_area42_2026', JSON.stringify(proposiciones));
  }, [asistencia, agendaStatus, dignatarios, proposiciones]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(4));
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

  const togglePostulacion = (nombre, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    } else {
      setPostuladosConvivencia(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex min-h-screen bg-[#FFFFFF] font-sans text-[#1C1C1C] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#1C1C1C] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#B85C38] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-white/20 flex items-center justify-center rounded-[28px] shadow-lg">
                <Building2 className="text-white" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none uppercase mb-2">
            EDIFICIO <span className="text-white/60 block text-sm mt-1">ÁREA 42</span>
          </h1>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">NIT 900.799.185-8</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: ListChecks },
            { id: 'dignatarios', label: '3-4. Dignatarios/Comité', icon: UserPlus },
            { id: 'acta-anterior', label: '5. Acta Anterior', icon: FileText },
            { id: 'gestion', label: '6. Informe Gestión', icon: TrendingUp },
            { id: 'financiero', label: '7. Estados Financieros', icon: BarChart3 },
            { id: 'presupuesto', label: '8. Presupuesto', icon: PieChart },
            { id: 'elecciones', label: '9-10. Elecciones', icon: Users },
            { id: 'proposiciones', label: '11. Proposiciones', icon: MessageSquare },
            { id: 'final', label: 'Finalizar Acta', icon: Printer },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest ${
                activeSection === item.id 
                ? 'bg-[#E06A2C] text-white shadow-xl translate-x-2' 
                : 'text-white/40 hover:bg-white/5 hover:text-white'
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
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#FFFFFF]">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#B85C38]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#6A6A6A] uppercase tracking-widest">Quórum Registrado</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#E06A2C]' : 'text-[#1C1C1C]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#E06A2C] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-12 border-[#B85C38]/10">
              <span className="text-[11px] font-black text-[#6A6A6A] uppercase tracking-widest">Progreso Asamblea</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#B85C38]/5">
                    <div className="h-full bg-[#E06A2C] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#B85C38]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
               <p className="text-[14px] font-black text-[#1C1C1C] uppercase tracking-tight">EDIFICIO ÁREA 42 P.H.</p>
               <p className="text-[11px] text-[#B85C38] font-black uppercase tracking-widest">Ana Lucia Yepez | Admin.</p>
            </div>
            <div className="h-14 w-14 bg-[#B85C38] rounded-2xl flex items-center justify-center text-white shadow-xl">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#1C1C1C] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#B85C38]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#E06A2C] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Sesión Ordinaria de Copropietarios</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">ÁREA <span className="text-[#B85C38] italic block text-4xl mt-4">CUARENTA Y DOS</span></h1>
                     <div className="w-32 h-2 bg-[#B85C38] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">Asamblea General 2026<br/>Gestión 2025 - Vigencia 2026</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#1C1C1C] uppercase tracking-widest leading-none">NIT: 900.799.185-8</p>
                       <p className="text-lg font-black text-[#1C1C1C]">Carrera 42-A No. 17-114</p>
                       <p className="text-[10px] font-black text-[#B85C38]">San Juan de Pasto</p>
                    </div>
                  </Card>
                  <Card title="Convocatoria">
                    <div className="space-y-3 pt-2 text-[#1C1C1C]">
                       <p className="text-lg font-black">26 de Marzo 2026</p>
                       <p className="text-[11px] font-black text-[#E06A2C] opacity-80 uppercase">Hora: 7:00 P.M. - Gimnasio</p>
                    </div>
                  </Card>
                  <Card className="bg-[#B85C38] text-white border-none flex flex-col items-center justify-center shadow-2xl !bg-[#B85C38]">
                    <div className="text-center">
                      <p className="text-6xl font-black text-white mb-2 leading-none tracking-tighter">
                        {asistencia.length}
                      </p>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90 leading-none">
                        Unidades Inmobiliarias
                      </p>
                    </div>
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
                  <h3 className="text-[#B85C38] font-black text-lg uppercase tracking-tighter">Listado de Coeficientes</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Seleccione los presentes para el quórum legal</p>
                </div>

                <button 
                  onClick={() => {
                    const todosPresentes = asistencia.every(a => a.presente);
                    setAsistencia(prev => prev.map(a => ({ ...a, presente: !todosPresentes })));
                  }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md hover:scale-105 active:scale-95 border-b-4 ${
                    asistencia.every(a => a.presente)
                    ? 'bg-slate-100 text-[#B85C38] border-slate-200' 
                    : 'bg-[#E06A2C] text-white border-black/20'
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
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#B85C38]" size={24} />
                    <input 
                      type="text" 
                      placeholder="BUSCAR APARTAMENTO O PROPIETARIO..." 
                      className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-slate-200 focus:border-[#B85C38] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-[32px] shadow-sm border border-slate-100">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-widest">PRESENTES</p>
                        <p className="text-3xl font-black text-[#B85C38]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                    </div>
                    <Users className="text-[#B85C38]" size={40} />
                  </div>
                </div>

                <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#EFEFEF] text-[#1C1C1C] font-black uppercase tracking-widest text-[11px] border-b-2 border-slate-100">
                      <tr>
                        <th className="px-12 py-8">UNIDAD / DEPÓSITO</th>
                        <th className="px-12 py-8">COPROPIETARIO</th>
                        <th className="px-12 py-8 text-center">COEF (%)</th>
                        <th className="px-12 py-8 text-center">ESTADO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 uppercase">
                      {filteredAsistencia.map((item) => (
                        <tr key={item.id} className={`${item.presente ? 'bg-[#B85C38]/5' : ''} hover:bg-slate-50 transition-colors`}>
                          <td className="px-12 py-8 font-black text-[#B85C38] text-xl">{item.unidad}</td>
                          <td className="px-12 py-8 font-black text-[#1C1C1C] text-sm tracking-tight">{item.propietario}</td>
                          <td className="px-12 py-8 font-black text-[#1C1C1C] text-center text-xl">{item.coeficiente.toFixed(5)}%</td>
                          <td className="px-12 py-8 text-center">
                            <button 
                              onClick={() => toggleAsistencia(item.id)} 
                              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                                item.presente ? 'bg-[#E06A2C]' : 'bg-slate-200'
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
              <Card highlight title="Puntos de la Sesión">
                <div className="space-y-4 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#E06A2C] bg-[#B85C38]/5' : 'border-[#B85C38]/10 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#1C1C1C] text-white' : 'bg-[#B85C38] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#E06A2C]' : 'text-[#1C1C1C]'}`}>
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* SECCIÓN 3-4: DIGNATARIOS Y COMITÉ */}
          {activeSection === 'dignatarios' && (
            <div className="space-y-10 animate-in zoom-in-95 uppercase">
              <SectionHeader 
                title="3-4. Dignatarios y Comité Verificador" 
                icon={UserPlus} 
                agendaIndices={[2, 3]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
                  <Card title="3. Elección Mesa Directiva" icon={ShieldCheck} highlight>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#1C1C1C] uppercase tracking-widest block">
                          Presidente de Asamblea
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-6 bg-[#EFEFEF] border-2 border-[#B85C38]/10 rounded-2xl font-black uppercase text-xs focus:border-[#B85C38] outline-none shadow-inner" 
                          placeholder="NOMBRE COMPLETO..." 
                          value={dignatarios.presidente} 
                          onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#1C1C1C] uppercase tracking-widest block">
                          Secretario(a)
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-6 bg-[#EFEFEF] border-2 border-[#B85C38]/10 rounded-2xl font-black uppercase text-xs focus:border-[#B85C38] outline-none shadow-inner" 
                          placeholder="NOMBRE COMPLETO..." 
                          value={dignatarios.secretario} 
                          onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} 
                        />
                      </div>
                    </div>
                  </Card>
                  
                  <Card title="4. Comité de Verificación del Acta" icon={ClipboardCheck}>
                    <div className="space-y-4 pt-4">
                      <label className="text-[11px] font-black text-[#1C1C1C] uppercase tracking-widest block">
                        Miembros del Comité (Designados hoy)
                      </label>
                      <textarea 
                        className="w-full p-6 bg-[#EFEFEF] border-2 border-[#B85C38]/10 rounded-2xl font-black uppercase text-[11px] h-40 focus:border-[#B85C38] outline-none leading-loose shadow-inner" 
                        placeholder="INGRESE LOS NOMBRES DE LOS DESIGNADOS..." 
                        value={dignatarios.comision} 
                        onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}
                      ></textarea>
                    </div>
                  </Card>
                </div>

                <div className="bg-[#1C1C1C] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#B85C38]">
                  <Gavel className="text-[#E06A2C] mb-10 mx-auto" size={56} />
                  <h4 className="font-black text-2xl mb-6 uppercase tracking-tighter">Normativa Ley 675</h4>
                  <p className="text-[11px] font-black text-white/60 leading-loose uppercase tracking-[0.2em]">
                    La mesa directiva coordina la deliberación. El comité verificador garantiza la fidelidad de lo registrado en el acta oficial.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 5: ACTA ANTERIOR */}
          {activeSection === 'acta-anterior' && (
            <div className="space-y-10 animate-in fade-in duration-500 uppercase">
              <SectionHeader 
                title="5. Validación Acta Anterior" 
                icon={FileText} 
                agendaIndices={[4]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="Validación Documental" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4">
                    <p className="text-[11px] font-bold text-[#6A6A6A] leading-loose">
                      REVISIÓN Y VALIDACIÓN DEL ACTA DE LA ASAMBLEA GENERAL ORDINARIA ANTERIOR.
                    </p>
                    <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-[#B85C38]/20 flex flex-col items-center justify-center text-center">
                        <FileText size={40} className="text-[#B85C38] mb-4 opacity-40" />
                        
                        <a 
                          href="https://drive.google.com/file/d/1jorhGRnXkaaxmlQOL9EUdnzFOvNzjGPV/view?usp=sharing" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mb-4 inline-flex items-center gap-2 bg-[#E06A2C] text-white px-6 py-3 rounded-xl font-black text-[10px] hover:bg-[#B85C38] transition-colors shadow-lg"
                        >
                          <FileText size={14} />
                          VER ACTA ANTERIOR COMPLETA
                        </a>

                        <p className="text-[9px] font-black text-slate-400">EXPEDIDA POR LA ADMINISTRACIÓN</p>
                    </div>
                  </div>
                </Card>

                <Card title="Observaciones" icon={ClipboardCheck}>
                  <div className="space-y-6 pt-4">
                    <p className="text-[10px] font-black text-[#6A6A6A] tracking-widest uppercase">
                      COMENTARIOS SOBRE EL ACTA ANTERIOR
                    </p>
                    <textarea 
                      className="w-full p-6 bg-[#EFEFEF] border-2 border-[#B85C38]/10 rounded-2xl font-black uppercase text-[11px] h-32 focus:border-[#B85C38] outline-none shadow-inner"
                      placeholder="REGISTRE AQUÍ LAS OBSERVACIONES AL ACTA ANTERIOR..."
                    ></textarea>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 6: INFORME GESTIÓN (REPLICA COMPLETA DE DOCUMENTOS) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="6. Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndices={[5]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              {/* PARTE I: GESTIÓN ADMINISTRATIVA Y CONSEJO */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Card title="ACTUACIONES DEL CONSEJO" icon={Activity} highlight>
                  <div className="p-6 bg-[#1C1C1C] rounded-[32px] text-white mb-6">
                    <p className="text-[10px] text-white/40 mb-3 tracking-widest">CONSEJEROS ACTIVOS 2025</p>
                    <ul className="space-y-4">
                      {["NANCY MÁRQUEZ", "MARTHA KAISER", "HUGO MEZA"].map((name, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-xl font-black border-b border-white/5 pb-2 last:border-0">
                          <div className="w-2 h-2 bg-[#E06A2C] rounded-full"></div> {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-[#EFEFEF] rounded-2xl border-l-8 border-[#B85C38]">
                    <p className="text-[10px] font-black text-[#B85C38] mb-1">REPRESENTANTE LEGAL</p>
                    <p className="text-sm font-black text-[#1C1C1C]">ANA LUCIA YEPEZ C.</p>
                  </div>
                  <p className="mt-6 text-xs font-bold text-[#6A6A6A] leading-relaxed">
                    ESFUERZOS ENFOCADOS EN OPTIMIZAR RECURSOS, CUMPLIMIENTO NORMATIVO Y FORTALECIMIENTO DE SEGURIDAD.
                  </p>
                </Card>

                <Card title="SEGURIDAD FÍSICA Y ELECTRÓNICA" icon={ShieldCheck}>
                   <div className="space-y-4">
                      <EvidenceCard 
                        title="Inversión Priorizada"
                        content="Priorización de inversión en seguridad general equilibrando efectividad con viabilidad económica."
                      />
                      <EvidenceCard 
                        title="Cámaras y Monitoreo"
                        color="#E06A2C"
                        icon={Camera}
                        content="Evaluación de cotizaciones comparativas (Tálamo y Sedec) para cámaras en pisos superiores y ascensor con cable viajero."
                      />
                      <EvidenceCard 
                        title="Prevención de Acceso"
                        icon={AlertCircle}
                        content="Evaluación de instalación de sistema de alarma sonora preventiva en puertas de acceso principales."
                      />
                   </div>
                </Card>
              </div>

              {/* RED DE GAS Y CONVIVENCIA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-[#B85C38] p-12 rounded-[56px] text-white shadow-xl relative overflow-hidden">
                   <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                         <Flame size={40} className="text-white" />
                         <h4 className="text-3xl font-black uppercase tracking-tighter">NORMATIVA Y RIESGOS (GAS)</h4>
                      </div>
                      <p className="text-sm font-bold leading-relaxed mb-8 opacity-90">
                        GESTIONES CON MONTAGAS PARA TRASLADO DEL TANQUE ESTACIONARIO A LA JARDINERA DE ENTRADA PARA CUMPLIR VENTILACIÓN TÉCNICA.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                            <p className="text-[9px] font-black uppercase mb-1">OBRA CIVIL (APROX)</p>
                            <p className="text-xl font-black">$1.500.000</p>
                         </div>
                         <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                            <p className="text-[9px] font-black uppercase mb-1">OBJETIVO</p>
                            <p className="text-xl font-black">SEGURIDAD</p>
                         </div>
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 p-8 opacity-10"><Flame size={120} /></div>
                </div>

                <Card title="Gestión de Convivencia" icon={HeartPulse}>
                   <div className="p-8 bg-[#EFEFEF] rounded-[40px] border-4 border-[#B85C38]/10 h-full flex flex-col justify-center">
                      <p className="text-sm font-black text-[#B85C38] mb-4 tracking-widest">Intervención Pedagógica</p>
                      <p className="text-sm font-bold text-[#6A6A6A] leading-loose italic">
                        "SE TRABAJÓ CON ALGUNOS APARTAMENTOS SOBRE EL CIERRE AUTOMÁTICO DE PUERTAS PEATONALES, LOGRANDO ACUERDOS SIN NECESIDAD DE SANCIONES."
                      </p>
                   </div>
                </Card>
              </div>

              {/* PARTE II: EJECUCIÓN FINANCIERA - TABLAS REPLICADAS */}
              <div className="space-y-12">
                <ManagementTable 
                  title="1. GASTOS MENSUALES FIJOS 2025"
                  headers={["PROVEEDOR / CONTRATISTA", "CONCEPTO", "DETALLE"]}
                  data={[
                    {p: "ANA LUCIA YEPEZ", c: "HONORARIOS ADMINISTRACIÓN", d: "PAGO MENSUAL GESTIÓN ADMINISTRATIVA."},
                    {p: "LUZ JANETH LOPEZ", c: "HONORARIOS CONTABILIDAD", d: "PAGO MENSUAL SERVICIOS CONTABLES."},
                    {p: "SERVIN LTDA", c: "SERVICIO DE ASEO", d: "PAGO MENSUAL ASEO ÁREAS COMUNES."},
                    {p: "EUROLIFT SAS", c: "MANTENIMIENTO ASCENSORES", d: "CONTRATO DE MANTENIMIENTO PREVENTIVO."},
                    {p: "CEDENAR SA ESP", c: "SERVICIO DE ENERGÍA", d: "FACTURACIÓN MENSUAL ÁREAS COMUNES."},
                    {p: "EMPOPASTO SA ESP", c: "ACUEDUCTO Y ALCANTARILLADO", d: "FACTURACIÓN MENSUAL SERVICIO DE AGUA."},
                    {p: "EMAS SA ESP", c: "SERVICIO DE ASEO (PÚBLICO)", d: "FACTURACIÓN RECOLECCIÓN BASURAS."},
                    {p: "COMCEL SA", c: "INTERNET Y TELEFONÍA", d: "SERVICIOS DE TELECOMUNICACIONES."},
                    {p: "DIAN / ALCALDÍA DE PASTO", c: "IMPUESTOS Y RETENCIONES", d: "RETEFUENTE MENSUAL Y RETEICA BIMESTRAL."}
                  ]}
                  icon={Activity}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   <ManagementTable 
                      title="2. SISTEMA DE SEGURIDAD (CÁMARAS) - Juan Sebastia Ceron"
                      headers={["ACTIVIDAD"]}
                      data={[
                        {d: "TRABAJOS DE DUCTERÍA PARA CÁMARAS."},
                        {d: "CÁMARAS EN PISOS 3, 4 Y 8."},
                        {d: "CÁMARAS EN PISOS 5, 6 Y 7."}
                      ]}
                      icon={ShieldCheck}
                   />
                   <ManagementTable 
                      title="3. MANTENIMIENTO DE PUERTAS"
                      headers={["PROVEEDOR", "ACTIVIDAD"]}
                      data={[
                        {p: "OSCAR MALES", d: "4 PUERTAS VEHICULARES Y GATO CIERRA PUERTAS."},
                        {p: "GUSTAVO QUELAL", d: "INSTALACIÓN MOTOR Y MANTENIMIENTO."},
                        {p: "MANUEL GUSTAVO QUELAL", d: "MANTENIMIENTO PUERTAS PEATONALES Y VEHICULARES."}
                      ]}
                      icon={Wrench}
                   />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-1">
                      <ManagementTable 
                        title="4. SGSST"
                        headers={["PROVEEDOR", "ACTIVIDAD"]}
                        data={[{p: "RICARDO FIERRO ARANGO", d: "ACTUALIZACIÓN INTEGRAL SGSST 2025."}]}
                        icon={Scale}
                      />
                   </div>
                   <div className="lg:col-span-2">
                      <ManagementTable 
                        title="5. MANTENIMIENTO PLANTA ELÉCTRICA"
                        headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD"]}
                        data={[
                          {p: "CUMMINS DE LOS ANDES SA", c: "PREVENTIVO", d: "MANTENIMIENTOS CUATRIMESTRALES Y CALIBRACIÓN."},
                          {p: "CUMMINS DE LOS ANDES SA", c: "SUMINISTRO", d: "COMPRA DE BATERÍA 30H DUNCAN TIPO POSTE."}
                        ]}
                        icon={Cog}
                      />
                   </div>
                </div>

                <ManagementTable 
                  title="6. INTERVENCIONES Y MANTENIMIENTOS MENORES"
                  headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD"]}
                  data={[
                    {p: "JHON FRANCO CUATIN", c: "LIMPIEZA", d: "LAVADO DE TANQUE DE RESERVA."},
                    {p: "EUROLIFT SAS", c: "REPUESTOS", d: "COMPRA DE IMPULSOR CIGARRO."},
                    {p: "HERNANDO TOBAR", c: "SEGURIDAD", d: "RECARGA DE 3 EXTINTORES 10 LBS ABC."},
                    {p: "ADRIANA BARRERA", c: "SUMINISTROS", d: "SUMINISTROS GENERALES DE ASEO."},
                    {p: "ANA LUCIA YEPEZ", c: "SUMINISTROS", d: "COMPRA DE COMBUSTIBLE (ACPM)."},
                    {p: "LUIS HUMBERTO BARRERA", c: "SUMINISTROS", d: "SUMINISTROS ELÉCTRICOS."}
                  ]}
                  icon={Wrench}
                />

                <ManagementTable 
                  title="7. GASTOS ADMINISTRATIVOS, EXTRAORDINARIOS Y PÓLIZA"
                  headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD"]}
                  data={[
                    {p: "PREVISORA SA", c: "SEGUROS", d: "PAGOS PÓLIZA DE COPROPIEDAD."},
                    {p: "PALMA PRODUCCIONES", c: "LOGÍSTICA", d: "ALQUILER SILLAS Y MESAS ASAMBLEA."},
                    {p: "STEFANIA MUÑOZ", c: "GESTIÓN LEGAL", d: "COBRO Y REQUERIMIENTO DE CARTERA."},
                    {p: "JAVIER MAURICIO ROSERO", c: "VARIOS", d: "DECORACIÓN NAVIDEÑA."}
                  ]}
                  icon={DollarSign}
                />
              </div>

              {/* ANÁLISIS DE PÓLIZA - LA PREVISORA SA */}
              <div className="space-y-12 mt-20 uppercase">
                <div className="bg-[#B85C38] p-16 rounded-[60px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
                  <div className="z-10 text-center md:text-left">
                    <span className="bg-white/20 px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] mb-4 inline-block">PÓLIZA DE COPROPIEDAD</span>
                    <h3 className="text-6xl font-black uppercase tracking-tighter mb-2">La Previsora SA</h3>
                    <p className="text-white/80 font-bold text-2xl uppercase tracking-[0.1em]">Protección Integral Edificio Área 42</p>
                    <div className="flex items-center gap-4 mt-6 text-white/60 font-black text-xs tracking-widest">
                      <Calendar size={18} />
                      VIGENCIA: 20/08/2025 AL 29/08/2026
                    </div>
                  </div>
                  <ShieldCheck size={160} className="text-white opacity-10 absolute right-[-20px] top-[-20px]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2">
                    <Card title="Desglose de Coberturas" icon={ShieldCheck} highlight>
                      <div className="overflow-hidden rounded-[32px] border-2 border-slate-100">
                        <table className="w-full text-left">
                          <tbody className="divide-y divide-slate-100">
                            {[
                              { label: "Edificio Área Común", val: "$2.930.200.400" },
                              { label: "Edificio Área Privada", val: "$732.550.100" },
                              { label: "Subtotal Incendio / Terremoto", val: "$3.912.205.508" },
                              { label: "Maquinaria y Equipo (Rotura/Sustracción)", val: "$160.450.000" },
                              { label: "Equipo Eléctrico y Electrónico Fijo", val: "$15.750.000" },
                              { label: "RC Extracontractual", val: "$300.000.000" },
                              
                            ].map((item, i) => (
                              <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-5 text-[11px] font-black text-slate-600">{item.label}</td>
                                <td className="px-8 py-5 text-xl font-black text-[#1C1C1C] text-right">{item.val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-10">
                    <Card title="Costo de Póliza" icon={DollarSign}>
                       <div className="space-y-6 pt-4 text-center">
                          <p className="text-[10px] font-black text-[#6A6A6A] tracking-[0.2em]">PRIMA TOTAL CON IVA</p>
                          <p className="text-5xl font-black text-[#B85C38] tracking-tighter">
                             $3.602.054
                          </p>
                          
                       </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 7: ESTADOS FINANCIEROS */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader 
                title="7. Estados Financieros" 
                icon={BarChart3} 
                agendaIndices={[6]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-[60px] p-16 shadow-2xl border-4 border-[#B85C38]/10 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="p-8 bg-[#B85C38]/5 rounded-[40px] mb-10">
                    <Landmark size={80} className="text-[#B85C38]" />
                  </div>
                  <h3 className="text-4xl font-black text-[#B85C38] mb-6 tracking-tighter">ESTADOS FINANCIEROS 2025</h3>
                  <div className="w-24 h-2 bg-[#1C1C1C] mb-10 rounded-full"></div>
                  <div className="space-y-4">
                    <p className="text-[14px] font-black text-[#1C1C1C] tracking-[0.4em]">Presentación Contable:</p>
                    <p className="text-3xl font-black text-[#1C1C1C] tracking-tight">LUZ JANETH LÓPEZ - CONTADORA</p>
                    <p className="text-xl font-bold text-[#6A6A6A] mt-4 tracking-widest">CIERRE A 31 DE DICIEMBRE</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 8: PRESUPUESTO */}
          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="8. Presupuesto 2026" icon={PieChart} agendaIndices={[7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="max-w-5xl mx-auto">
                <div className="bg-[#1C1C1C] rounded-[60px] p-16 shadow-2xl border-b-[20px] border-[#B85C38] flex flex-col items-center text-center">
                  <div className="p-8 bg-white/10 rounded-[40px] mb-10">
                    <Wallet size={80} className="text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">PRESUPUESTO VIGENCIA 2026</h3>
                  <div className="w-24 h-2 bg-[#E06A2C] mb-10 rounded-full"></div>
                  <p className="text-lg font-black text-white/60 tracking-widest max-w-xl">
                    DEFINICIÓN DE CUOTAS DE SOSTENIMIENTO SEGÚN PROYECCIÓN DE GASTOS Y FONDO DE IMPREVISTOS.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 9-10: ELECCIONES */}
          {activeSection === 'elecciones' && (
            <div className="space-y-10 animate-in fade-in duration-500 uppercase">
              <SectionHeader 
                title="9-10. Elecciones 2026" 
                icon={Users} 
                agendaIndices={[8, 9]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card title="9. Consejo de Administración" icon={Users} highlight>
                  <div className="space-y-6">
                    <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#B85C38]/20">
                      {postuladosConsejo.length === 0 ? (
                        <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS POSTULADOS</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {postuladosConsejo.map(p => (
                            <span key={p} className="bg-[#B85C38] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                          <span className="text-[11px] font-black text-slate-700">{r.unidad} | {r.propietario}</span>
                          <button 
                            onClick={() => togglePostulacion(r.propietario, 'consejo')} 
                            className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all ${
                              postuladosConsejo.includes(r.propietario) ? 'bg-[#1C1C1C] text-white' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {postuladosConsejo.includes(r.propietario) ? 'POSTULADO' : 'POSTULAR'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card title="10. Comité de Convivencia" icon={HeartPulse}>
                  <div className="space-y-6">
                    <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#B85C38]/20">
                      {postuladosConvivencia.length === 0 ? (
                        <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS POSTULADOS</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {postuladosConvivencia.map(p => (
                            <span key={p} className="bg-[#1C1C1C] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'convivencia')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                          <span className="text-[11px] font-black text-slate-700">{r.unidad} | {r.propietario}</span>
                          <button 
                            onClick={() => togglePostulacion(r.propietario, 'convivencia')} 
                            className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all ${
                              postuladosConvivencia.includes(r.propietario) ? 'bg-[#B85C38] text-white' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {postuladosConvivencia.includes(r.propietario) ? 'POSTULADO' : 'POSTULAR'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 11: PROPOSICIONES */}
          {activeSection === 'proposiciones' && (
            <div className="space-y-10 animate-in slide-in-from-right-10 uppercase">
              <SectionHeader title="11. Proposiciones y Varios" icon={MessageSquare} agendaIndices={[10]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card title="Registrar Proposición" highlight>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  <div className="md:col-span-1 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest">UNIDAD / APTO</label>
                    <input type="text" className="w-full p-4 bg-[#EFEFEF] border-2 border-[#B85C38]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#B85C38]" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} placeholder="EJ: 301" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest">PROPUESTA</label>
                    <input type="text" className="w-full p-4 bg-[#EFEFEF] border-2 border-[#B85C38]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#B85C38]" value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})} placeholder="DESCRIPCIÓN BREVE..." />
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={() => {
                        if (tempProp.proponente && tempProp.texto) {
                          setProposiciones([...proposiciones, { ...tempProp, id: Date.now() }]);
                          setTempProp({ proponente: '', texto: '' });
                        }
                      }} 
                      className="w-full bg-[#E06A2C] text-white py-4 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-3"
                    >
                      <Plus size={18} /> AGREGAR
                    </button>
                  </div>
                </div>
              </Card>
              <div className="space-y-6">
                {proposiciones.map((prop) => (
                    <div key={prop.id} className="bg-white p-8 rounded-[32px] border-2 border-[#B85C38]/5 shadow-lg flex justify-between items-center group">
                       <div className="flex items-start gap-6">
                          <div className="h-14 w-14 bg-[#B85C38] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl">P</div>
                          <div>
                             <p className="text-[10px] font-black text-[#E06A2C] mb-1">PROPUESTA DE: {prop.proponente}</p>
                             <p className="text-sm font-black text-[#1C1C1C] uppercase">{prop.texto}</p>
                          </div>
                       </div>
                       <button onClick={() => setProposiciones(proposiciones.filter(p => p.id !== prop.id))} className="text-red-500 p-4 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20} /></button>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN FINAL */}
          {activeSection === 'final' && (
            <div className="space-y-16 animate-in zoom-in-95 text-center uppercase">
              <div className="flex justify-between items-center print:hidden bg-[#1C1C1C] p-10 rounded-[40px] shadow-2xl">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">FINALIZAR ASAMBLEA 2026</h2>
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL DEL EDIFICIO ÁREA 42</p>
                </div>
                <button onClick={handlePrint} className="bg-[#E06A2C] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl hover:scale-110 transition-all text-xs tracking-[0.2em]">
                  <Printer size={24} /> IMPRIMIR ACTA FINAL
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#B85C38] print:shadow-none print:border-none print:p-0 bg-white">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#B85C38] pb-10">
                  <h1 className="text-4xl font-black mb-4 uppercase">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                  <p className="text-xl font-black text-[#B85C38] uppercase">EDIFICIO ÁREA 42 P.H. - NIT 900.799.185-8</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-slate-50 rounded-[56px] border-2 border-[#B85C38]/10 flex flex-col items-center">
                    <p className="text-[11px] font-black text-[#1C1C1C] mb-10 tracking-[0.3em]">Quórum de Cierre</p>
                    <p className="text-7xl font-black text-[#B85C38] leading-none">{totalQuorum.toFixed(2)}%</p>
                  </div>
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#1C1C1C] tracking-[0.3em] uppercase leading-none mb-12">Mesa Directiva</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-4 border-[#B85C38]/10 pb-4">
                          <p className="text-[9px] text-[#B85C38] mb-2 font-black">PRESIDENTE:</p>
                          <p className="text-lg text-[#1C1C1C]">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-4 border-[#B85C38]/10 pb-4">
                          <p className="text-[9px] text-[#B85C38] mb-2 font-black">SECRETARIO(A):</p>
                          <p className="text-lg text-[#1C1C1C]">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>
                  <div className="p-12 bg-[#B85C38] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#1C1C1C]">
                    <ShieldCheck size={72} className="text-white mb-10 opacity-50" />
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] opacity-60">Sesión Finalizada</p>
                    <p className="text-xl font-black mt-4">PASTO, MARZO 2026</p>
                  </div>
                </div>
                <div className="hidden print:grid grid-cols-2 gap-64 mt-64 mb-32">
                  <div className="border-t-4 border-[#1C1C1C] pt-8 text-center uppercase">
                    <p className="text-[11px] font-black">FIRMA PRESIDENTE</p>
                  </div>
                  <div className="border-t-4 border-[#1C1C1C] pt-8 text-center uppercase">
                    <p className="text-[11px] font-black">FIRMA SECRETARIO</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #B85C3833; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #B85C3855; }

        @media print {
          @page { margin: 1cm; size: letter; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
        }
      `}} />
    </div> 
  );
}