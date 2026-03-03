import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, UserPlus, 
  CheckCircle2, Printer, Trash2, TrendingUp, Settings,
  ClipboardCheck, Camera, Zap, Activity, Wrench, Calendar, Layout, ListChecks,
  AlertCircle, ChevronRight, Info, ShieldAlert, HeartPulse, Building2,
  Search, DollarSign, PieChart, Landmark, Gavel, 
  ArrowUpRight, Percent, Wallet, HardHat, Cog, Plus, UserCheck, Leaf, Scale,
  X, ChevronLeft, Expand, ClipboardList, 
  Trees, Sparkles // <--- AGREGA ESTOS DOS
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL CAMPOS DE CASTILLA ---
const COLORS = {
  terracota: '#B65A3A',
  ladrilloOscuro: '#8C3F2A',
  grisConcreto: '#6E6E6E',
  grisUrbano: '#EDEDED',
  blanco: '#FFFFFF',
  texto: '#2B2B2B'
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#B65A3A]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#B65A3A] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#B65A3A] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[11px] text-[#2B2B2B] font-black uppercase tracking-[0.2em]">
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
        ? 'bg-[#2B2B2B] border-[#2B2B2B] text-white' 
        : 'bg-white border-[#B65A3A]/20 text-[#B65A3A] hover:bg-[#B65A3A] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#B65A3A] ring-4 ring-[#B65A3A]/10' : 'border-[#B65A3A]/5'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#2B2B2B] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#B65A3A]' : 'bg-[#6E6E6E]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#B65A3A]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#B65A3A] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#B65A3A]/10 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#B65A3A] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#B65A3A] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#EDEDED] text-[#2B2B2B] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#B65A3A]/5 uppercase font-bold text-[#2B2B2B]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#B65A3A]/5 transition-colors">
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

const InvestmentTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[40px] border-4 border-[#B65A3A]/10 overflow-hidden shadow-2xl flex flex-col mb-12">
    <div className="bg-[#B65A3A] px-10 py-7 flex justify-between items-center border-b-[6px] border-[#8C3F2A]">
      <div className="flex items-center gap-6">
        <div className="p-3 bg-white/10 rounded-2xl">
          {Icon && <Icon className="text-white" size={28} />}
        </div>
        <h4 className="text-lg font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && (
        <div className="bg-[#2B2B2B] text-white px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-widest shadow-inner">
          {total}
        </div>
      )}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-[#EDEDED] text-[#B65A3A] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-10 py-6 text-sm">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-[#EDEDED] uppercase font-bold text-[#2B2B2B]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#B65A3A]/5 transition-colors">
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-10 py-6 text-[13px]">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- DATA CAMPOS DE CASTILLA ---

const ORDEN_DIA = [
  "Registro de firmas y verificación del quórum",
  "Lectura y aprobación del orden del día",
  "Elección de dignatarios de la Asamblea (Presidente y Secretario)",
  "Elección del comité de verificación de la presente acta.",
  "Validación de la comisión verificadora del Acta Anterior",
  "Presentación y aprobación de informe de Administración",
  "Presentación y aprobación de Estados Financieros a diciembre 31 de 2025",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos para el año 2026 - Definición de cuotas de sostenimiento.",
  "Elección del consejo de administración.",
  "Elección Comité de convivencia.",
  "Proposiciones y varios."
];

const COEFICIENTES_DATA = [
  { id: 1, apto: '101', propietario: 'CARLOS CAVIEDES', coeficiente: 2.10084 },
  { id: 2, apto: '102', propietario: 'AMPARO PATIÑO', coeficiente: 2.10084 },
  { id: 3, apto: '201', propietario: 'RUBY DEL CARMEN MEDINA', coeficiente: 2.10084 },
  { id: 4, apto: '202', propietario: 'SOCORRO ENRIQUEZ', coeficiente: 2.10084 },
  { id: 5, apto: '203', propietario: 'REINERIO MIGUEL DELGADO', coeficiente: 2.10084 },
  { id: 6, apto: '301', propietario: 'ARMANDO CASABON', coeficiente: 2.10084 },
  { id: 7, apto: '302', propietario: 'JAVIER ENRIQUEZ', coeficiente: 2.10084 },
  { id: 8, apto: '303', propietario: 'ADRIANA CAIZA', coeficiente: 2.10084 },
  { id: 9, apto: '401', propietario: 'JUAN CAMILO DELGADO', coeficiente: 2.10084 },
  { id: 10, apto: '402', propietario: 'JUAN ALEJANDRO RODRIGUEZ', coeficiente: 2.10084 },
  { id: 11, apto: '403', propietario: 'CARLOS NARVAEZ OBANDO', coeficiente: 2.10084 },
  { id: 12, apto: '501', propietario: 'JESUS MARIA TORRONTEGUI', coeficiente: 2.10084 },
  { id: 13, apto: '502', propietario: 'FRANCO LEGARDA', coeficiente: 2.10084 },
  { id: 14, apto: '503', propietario: 'ERNESTO CORDOBA', coeficiente: 2.10084 },
  { id: 15, apto: '601', propietario: 'MAGALY REALPE PALACIOS', coeficiente: 2.10084 },
  { id: 16, apto: '602', propietario: 'JAIME NARVAEZ', coeficiente: 2.10084 },
  { id: 17, apto: '603', propietario: 'HERNANDO ARAUJO', coeficiente: 2.10084 },
  { id: 18, apto: '701', propietario: 'JOSE ANTONIO ERASO RIVAS', coeficiente: 2.10084 },
  { id: 19, apto: '702', propietario: 'ALICIA DAVILA CABRERA', coeficiente: 2.10084 },
  { id: 20, apto: '703', propietario: 'JOSE ENRIQUE NARVAEZ', coeficiente: 2.10084 },
  { id: 21, apto: '801', propietario: 'MARTHA SOLARTE', coeficiente: 2.10084 },
  { id: 22, apto: '802', propietario: 'JORGE HERRERA', coeficiente: 2.10084 },
  { id: 23, apto: '803', propietario: 'BLANCA GOMEZ', coeficiente: 2.10084 },
  { id: 24, apto: '901', propietario: 'MARTHA SOLARTE', coeficiente: 2.10084 },
  { id: 25, apto: '902', propietario: 'CATALINA ORTIZ', coeficiente: 2.10084 },
  { id: 26, apto: '903', propietario: 'RICARDO GUZMAN', coeficiente: 2.10084 },
  { id: 27, apto: '1001', propietario: 'EDUARDO CAIZA', coeficiente: 2.10084 },
  { id: 28, apto: '1002', propietario: 'GUILLERMO CHAVES-FANNY DE CHAVES', coeficiente: 2.10084 },
  { id: 29, apto: '1003', propietario: 'SALVADOR ESCOBAR', coeficiente: 2.10084 },
  { id: 30, apto: '1101', propietario: 'SONIA DE LOS RIOS', coeficiente: 2.10084 },
  { id: 31, apto: '1102', propietario: 'SALVADOR ESCOBAR', coeficiente: 2.10084 },
  { id: 32, apto: '1103', propietario: 'RICARDO UNIGARRO', coeficiente: 2.10084 },
  { id: 33, apto: '1201', propietario: 'RICARDO ORTIZ OBANDO', coeficiente: 2.10084 },
  { id: 34, apto: '1202', propietario: 'HAROLD TORRES', coeficiente: 2.10084 },
  { id: 35, apto: '1203', propietario: 'HERNAN F. ARGOTY', coeficiente: 2.10084 },
  { id: 36, apto: '1301', propietario: 'ΧΙΜΕΝΑ ZAMBRANO', coeficiente: 2.10084 },
  { id: 37, apto: '1302', propietario: 'PEDRO GARCIA REALPE', coeficiente: 2.10084 },
  { id: 38, apto: '1303', propietario: 'GLADYS ORTEGA', coeficiente: 2.10084 },
  { id: 39, apto: '1401', propietario: 'ERNESTO PATIÑO', coeficiente: 2.10084 },
  { id: 40, apto: '1402', propietario: 'LUIS CARLOS ROJAS', coeficiente: 2.10084 },
  { id: 41, apto: '1403', propietario: 'ERNESTO PATIÑO', coeficiente: 2.10084 },
  { id: 42, apto: '1501', propietario: 'JAIME CERON', coeficiente: 2.10084 },
  { id: 43, apto: '1502', propietario: 'LUIS FERNANDO CITELLY', coeficiente: 2.10084 },
  { id: 44, apto: '1503', propietario: 'LIGIA SANTANDER PALACIOS', coeficiente: 2.10084 },
  { id: 45, apto: '1601', propietario: 'JOSE GUILLERMO RODRIGUEZ', coeficiente: 2.52101 },
  { id: 46, apto: '1602', propietario: 'OSCAR ARGOTY', coeficiente: 2.52101 },
  { id: 47, apto: '1603', propietario: 'HENRY CHAVES', coeficiente: 2.52101 }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  // Añade esto al principio de tu componente, donde están los otros useState
  const [showCotizaciones, setShowCotizaciones] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  // Persistencia segura de estados
  const [asistencia, setAsistencia] = useState(() => {
    try {
      const saved = localStorage.getItem('asistencia_castilla_2026');
      return saved ? JSON.parse(saved) : COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    } catch (e) {
      return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    }
  });
  
  const [agendaStatus, setAgendaStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('agenda_castilla_2026');
      return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
    } catch (e) {
      return new Array(ORDEN_DIA.length).fill(false);
    }
  });

  const [dignatarios, setDignatarios] = useState(() => {
    try {
      const saved = localStorage.getItem('dignatarios_castilla_2026');
      return saved ? JSON.parse(saved) : { presidente: '', secretario: '', comision: '' };
    } catch (e) {
      return { presidente: '', secretario: '', comision: '' };
    }
  });

  const [proposiciones, setProposiciones] = useState(() => {
    try {
      const saved = localStorage.getItem('proposiciones_castilla_2026');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });
  const [postuladosConsejo, setPostuladosConsejo] = useState([]);
  const [postuladosConvivencia, setPostuladosConvivencia] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('asistencia_castilla_2026', JSON.stringify(asistencia));
      localStorage.setItem('agenda_castilla_2026', JSON.stringify(agendaStatus));
      localStorage.setItem('dignatarios_castilla_2026', JSON.stringify(dignatarios));
      localStorage.setItem('proposiciones_castilla_2026', JSON.stringify(proposiciones));
    } catch (e) {}
  }, [asistencia, agendaStatus, dignatarios, proposiciones]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(4));
  }, [asistencia]);

  const progress = useMemo(() => (agendaStatus.filter(i => i).length / ORDEN_DIA.length) * 100, [agendaStatus]);

  const filteredAsistencia = useMemo(() => {
    return asistencia.filter(a => 
      a.apto.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.propietario.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [asistencia, searchTerm]);

  const toggleAsistencia = (id) => {
    setAsistencia(prev => prev.map(a => a.id === id ? { ...a, presente: !a.presente } : a));
  };

  const toggleAllAsistencia = () => {
    const todosPresentes = asistencia.every(a => a.presente);
    setAsistencia(prev => prev.map(a => ({ ...a, presente: !todosPresentes })));
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
    <div className="flex min-h-screen bg-[#EDEDED] font-sans text-[#2B2B2B] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#2B2B2B] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#B65A3A] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-white/20 flex items-center justify-center rounded-[28px] shadow-lg">
                <Building2 className="text-white" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-xl tracking-tighter leading-none uppercase mb-2">
            CAMPOS DE <span className="text-[#EDEDED]/60 block text-sm mt-1">CASTILLA P.H.</span>
          </h1>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Nit 814.004.252-0</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: ListChecks },
            { id: 'dignatarios', label: '3-4. Dignatarios', icon: UserPlus },
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
                ? 'bg-[#B65A3A] text-white shadow-xl translate-x-2' 
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
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#EDEDED]">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#B65A3A]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest">Quórum Actual</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#B65A3A]' : 'text-[#2B2B2B]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#B65A3A] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-12 border-[#B65A3A]/10">
              <span className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest">Progreso Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#B65A3A]/5 shadow-inner">
                    <div className="h-full bg-[#B65A3A] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#B65A3A]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
               <p className="text-[14px] font-black text-[#2B2B2B] uppercase tracking-tight">EDIFICIO CAMPOS DE CASTILLA</p>
               <p className="text-[11px] text-[#B65A3A] font-black uppercase tracking-widest">Ana Lucia Yepez | Admin.</p>
            </div>
            <div className="h-14 w-14 bg-[#B65A3A] rounded-2xl flex items-center justify-center text-white shadow-xl">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#2B2B2B] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#B65A3A]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#B65A3A] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Asamblea General Ordinaria</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">CAMPOS DE <span className="text-[#B65A3A] italic block text-4xl mt-4">CASTILLA P.H.</span></h1>
                     <div className="w-32 h-2 bg-[#B65A3A] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">Convocatoria 2026<br/>Gestión 2025 - Futuro 2026</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest leading-none">NIT: 814.004.252-0</p>
                       <p className="text-lg font-black text-[#2B2B2B]">Cra 40 No. 16-30</p>
                       <p className="text-[10px] font-black text-[#B65A3A]">Panamericana - Pasto</p>
                    </div>
                  </Card>
                  <Card title="Convocatoria">
                    <div className="space-y-3 pt-2 text-[#2B2B2B]">
                       <p className="text-lg font-black">03 de Marzo 2026</p>
                       <p className="text-[11px] font-black text-[#B65A3A] opacity-80 uppercase">Hora: 7:00 P.M. - Salón Social</p>
                    </div>
                  </Card>
                  <Card className="!bg-[#B65A3A] !border-none shadow-2xl flex flex-col items-center justify-center min-h-[160px]">
                    <div className="text-center py-4">
                      <p className="text-7xl font-black text-white mb-3 leading-none tracking-tighter">
                        47
                      </p>
                      <p className="text-[12px] font-black uppercase tracking-[0.3em] text-white/90 leading-none">
                        Unidades Privadas
                      </p>
                      <div className="w-12 h-1 bg-white/30 mx-auto mt-4 rounded-full"></div>
                    </div>
                  </Card>
               </div>
            </div>
          )}

          {/* SECCIÓN 1: QUORUM */}
          {activeSection === 'quorum' && (
            <div className="space-y-10 animate-in slide-in-from-right-10">
              <SectionHeader title="1. Registro y Quórum" icon={Users} agendaIndices={[0]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="flex flex-col md:flex-row gap-8 items-end justify-between print:hidden">
                <div className="relative group w-full max-w-2xl">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#B65A3A]" size={24} />
                  <input 
                    type="text" 
                    placeholder="BUSCAR APARTAMENTO O PROPIETARIO..." 
                    className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-slate-200 focus:border-[#B65A3A] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={toggleAllAsistencia}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md border-b-4 ${
                      asistencia.every(a => a.presente)
                      ? 'bg-slate-100 text-[#B65A3A] border-slate-200' 
                      : 'bg-[#B65A3A] text-white border-black/20'
                    }`}
                  >
                    {asistencia.every(a => a.presente) ? (
                      <> <Trash2 size={16} /> Quitar Todo </>
                    ) : (
                      <> <UserCheck size={16} /> Marcar Todos </>
                    )}
                  </button>

                  <div className="flex items-center gap-6 bg-white px-10 py-4 rounded-[32px] shadow-sm border border-slate-100">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest">PRESENTES</p>
                        <p className="text-3xl font-black text-[#B65A3A]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                    </div>
                    <Users className="text-[#B65A3A]" size={40} />
                  </div>
                </div>
              </div>

              <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#EDEDED] text-[#2B2B2B] font-black uppercase tracking-widest text-[11px] border-b-2">
                    <tr>
                      <th className="px-12 py-8">APARTAMENTO</th>
                      <th className="px-12 py-8">COPROPIETARIO</th>
                      <th className="px-12 py-8 text-center">COEF (%)</th>
                      <th className="px-12 py-8 text-center print:hidden">ASISTENCIA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 uppercase">
                    {filteredAsistencia.map((item) => (
                      <tr key={item.id} className={`${item.presente ? 'bg-[#B65A3A]/5' : ''} hover:bg-slate-50 transition-colors`}>
                        <td className="px-12 py-8 font-black text-[#B65A3A] text-xl">{item.apto}</td>
                        <td className="px-12 py-8 font-black text-[#2B2B2B] text-sm tracking-tight">{item.propietario}</td>
                        <td className="px-12 py-8 font-black text-[#2B2B2B] text-center text-xl">{item.coeficiente.toFixed(5)}%</td>
                        <td className="px-12 py-8 text-center print:hidden">
                          <button 
                            onClick={() => toggleAsistencia(item.id)} 
                            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                              item.presente ? 'bg-[#B65A3A]' : 'bg-slate-200'
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
          )}

          {/* SECCIÓN 2-4: DIGNATARIOS */}
          {activeSection === 'dignatarios' && (
            <div className="space-y-10 animate-in zoom-in-95 uppercase">
              <SectionHeader 
                title="3-4. Elección de Dignatarios" 
                icon={UserPlus} 
                agendaIndices={[2, 3]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="Mesa Directiva (Punto 3)" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest block">Presidente de Asamblea</label>
                      <input 
                        type="text" 
                        className="w-full p-6 bg-slate-50 border-2 border-[#B65A3A]/10 rounded-2xl font-black uppercase text-xs focus:border-[#B65A3A] outline-none" 
                        placeholder="NOMBRE..." 
                        value={dignatarios.presidente} 
                        onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest block">Secretario(a)</label>
                      <input 
                        type="text" 
                        className="w-full p-6 bg-slate-50 border-2 border-[#B65A3A]/10 rounded-2xl font-black uppercase text-xs focus:border-[#B65A3A] outline-none" 
                        placeholder="NOMBRE..." 
                        value={dignatarios.secretario} 
                        onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} 
                      />
                    </div>
                  </div>
                </Card>
                
                <Card title="Comisión Verificadora (Punto 4)" icon={ClipboardCheck}>
                  <div className="space-y-4 pt-4">
                    <label className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest block">Miembros Comisión 2026</label>
                    <textarea 
                      className="w-full p-6 bg-slate-50 border-2 border-[#B65A3A]/10 rounded-2xl font-black uppercase text-[11px] h-32 focus:border-[#B65A3A] outline-none leading-loose" 
                      placeholder="INGRESE LOS NOMBRES..." 
                      value={dignatarios.comision} 
                      onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}
                    ></textarea>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN ORDEN DEL DÍA */}
          {activeSection === 'orden' && (
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="Orden del Día Oficial" icon={ListChecks} agendaIndices={[1]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card highlight title="2. Lectura y aprobación del orden del día">
                <div className="space-y-3 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#B65A3A] bg-[#B65A3A]/5' : 'border-[#B65A3A]/10 bg-white'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#2B2B2B] text-white' : 'bg-[#B65A3A] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#B65A3A]' : 'text-[#2B2B2B]'}`}>
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* SECCIÓN 5: ACTA ANTERIOR */}
          {activeSection === 'acta-anterior' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader 
                title="5. Acta Asamblea Anterior" 
                icon={FileText} 
                agendaIndices={[4]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="Estado de Validación" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4">
                    <p className="text-[11px] font-bold text-slate-600 leading-loose">
                      Verificación del texto del acta de la asamblea anterior por parte de la comisión designada.
                    </p>
                    
                    {/* BOTÓN INTERACTIVO PARA ABRIR EL ACTA */}
                    <a 
                      href="https://drive.google.com/file/d/1MkHgTp84uYm5ZLwOrkGl1SUw8w5WomO3/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-[#B65A3A]/20 flex flex-col items-center justify-center text-center transition-all hover:bg-[#B65A3A]/5 hover:border-[#B65A3A] hover:shadow-inner cursor-pointer"
                    >
                      <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <FileText size={40} className="text-[#B65A3A]" />
                      </div>
                      <p className="text-[10px] font-black text-[#B65A3A] mb-1">CLIC PARA VER DOCUMENTO</p>
                      <p className="text-[12px] font-black text-[#2B2B2B]">ACTA ASAMBLEA 2025.PDF</p>
                      <ExternalLink size={14} className="mt-3 text-slate-400 group-hover:text-[#B65A3A]" />
                    </a>

                  </div>
                </Card>
                
                <Card title="Observaciones" icon={ClipboardCheck}>
                  <textarea 
                    className="w-full p-6 bg-slate-50 border-2 border-[#B65A3A]/10 rounded-2xl font-black uppercase text-[11px] h-48 focus:border-[#B65A3A] outline-none"
                    placeholder="REGISTRE OBSERVACIONES AL ACTA ANTERIOR..."
                  ></textarea>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 6: INFORME DE GESTIÓN (COMPLETO) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="6. Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndices={[5]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              {/* PARTE I: ACTUACIONES DEL CONSEJO */}
              <Card title="PARTE I: GESTIÓN ADMINISTRATIVA Y CONSEJO" icon={Activity} highlight className="p-12">
                <div className="space-y-12"> {/* Contenedor vertical principal */}
                  
                  {/* FILA SUPERIOR: DOS COLUMNAS DE TEXTO */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* COLUMNA IZQUIERDA: INSTALACIÓN */}
                    <div className="space-y-8">
                      <div className="bg-[#2B2B2B] p-8 rounded-[40px] text-white">
                        <h4 className="text-xl font-black mb-6 uppercase tracking-tighter border-b border-white/10 pb-4">Instalación del Consejo</h4>
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-black text-[#B65A3A]">PRESIDENTE: <span className="text-white">ING. HAROLD TORRES</span></p>
                          <p className="text-xs font-black text-[#B65A3A]">TESORERA: <span className="text-white">SRA. MARIANA CHAMORRO</span></p>
                        </div>
                      </div>
                    </div>

                    {/* COLUMNA DERECHA: ACCIONES OPERATIVAS */}
                    <div className="space-y-8">
                      <div className="p-8 bg-slate-50 rounded-[40px] border-l-[12px] border-[#6E6E6E]">
                        <h4 className="text-sm font-black text-[#2B2B2B] mb-4 uppercase tracking-widest">Acciones Operativas</h4>
                        <ul className="space-y-3 text-xs font-bold text-slate-700">
                          <li>• Suspensión línea fija / Adquisición celular institucional.</li>
                          <li>• Cambio de operador de internet para reducción de costos.</li>
                          <li>• Censo 2025: 99 residentes, 37 empleados, 27 mascotas.</li>
                          <li>• Arrendamiento zona comun de la terraza. Empresa Phoenix Tower Internacional Republica Dominicana.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* FILA INFERIOR: IMAGEN A TODO ANCHO */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-4">
                      <div className="h-[2px] flex-1 bg-slate-100"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Soporte Documental: Estado de Cuenta</span>
                      <div className="h-[2px] flex-1 bg-slate-100"></div>
                    </div>
                    
                    <div className="overflow-hidden rounded-[40px] border-2 border-slate-100 bg-white shadow-sm">
                      <img 
                        src="/img/Estado de cuenta.jpeg" 
                        alt="Estado de cuenta completo" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>

                </div>
              </Card>

              {/* ASENSORES */}
              <Card title="Modernización y Mantenimiento de Ascensores" icon={Zap} className="p-10">
                <div className="flex flex-col gap-6">
                  <div className="p-8 bg-red-50 rounded-[40px] border-2 border-red-100">
                    <p className="text-sm font-black text-red-700 mb-4 uppercase tracking-widest flex items-center gap-3">
                      <AlertCircle size={20}/> Reparación Urgente (Julio 2025)
                    </p>
                    {/* Eliminamos grid-cols-2 para que ocupe el 100% */}
                    <div className="w-full space-y-6">
                      {/* LISTA DE REPARACIONES */}
                      <div className="text-xs font-bold text-slate-700 space-y-3 bg-white/50 p-6 rounded-3xl border border-slate-100">
                        <p className="flex items-start gap-2">
                          <span className="text-[#B65A3A]">•</span> 
                          <span>Cambio poleas y zapatas contrapeso Ascensor 1.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-[#B65A3A]">•</span> 
                          <span>Cambio zapatas Ascensor 2.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-[#B65A3A]">•</span> 
                          <span>Reparación tarjetas de potencia y componentes electrónicos.</span>
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-slate-200/60 text-[#B65A3A] font-black uppercase text-[10px] tracking-wider">
                          💡 Financiado con recursos de ingresos por gas (sin cuotas extra).
                        </div>
                      </div>

                      {/* BOTÓN DE VER PDF (INFORME DRIVE) */}
                      <a 
                        href="https://drive.google.com/file/d/1GiWFw2zSbuZQC6fTLx71Y3U0TrbLDVn4/view?usp=sharing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full p-5 bg-[#B65A3A] hover:bg-[#a14d32] text-white rounded-2xl transition-all duration-300 shadow-lg group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-white/20 p-2 rounded-lg">
                            <FileText size={20} className="text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Documento Completo</p>
                            <p className="text-sm font-black uppercase">Ver Informe de Reparaciones PDF</p>
                          </div>
                        </div>
                        <ExternalLink size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </a>
                    </div>
                  </div>
                  {/* --- INICIO DE LA SECCIÓN ESPECÍFICA CON VISOR INTEGRADO --- */}
                  <div className="w-full relative">
                    {/* Definimos estados locales *justo aquí* para que solo afecten a este bloque */}
                    {(() => {
                      // Si usas React normal, estos hooks irían arriba.
                      // Para que este ejemplo sea autocontenido, asumo que los tienes definidos arriba.
                      // De lo contrario, necesitarías mover esta lógica a un componente separado.
                    })()}

                    {/* CUADRO AZUL CONVERTIDO EN BOTÓN CLIQUEABLE */}
                    <button 
                      onClick={() => setShowCotizaciones(true)} // Activa el modal al hacer clic en cualquier parte del cuadro
                      className="w-full p-8 bg-blue-50 hover:bg-blue-100 rounded-[40px] border-2 border-blue-100 flex justify-between items-center transition-all duration-300 group shadow-sm hover:shadow-md text-left"
                    >
                      <div className="flex-1">
                        <h4 className="text-xs font-black text-blue-800 uppercase tracking-widest">Proyección Modernización Total</h4>
                        <p className="text-xs font-bold text-blue-600 mt-1">Estimada para 2 a 5 años (Costo aprox. $45M por equipo).</p>
                        
                        {/* Indicador visual de que es cliqueable */}
                        <div className="mt-4 inline-flex items-center gap-2 text-blue-700 bg-white/60 px-3 py-1.5 rounded-full border border-blue-200">
                          <ClipboardList size={14} />
                          <span className="text-[10px] font-black uppercase">Ver Cotizaciones</span>
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      
                      {/* Icono a la derecha */}
                      <div className="relative ml-6">
                        <ShieldCheck size={48} className="text-blue-200 group-hover:scale-110 transition-transform" />
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow-lg">
                          <Expand size={14} />
                        </div>
                      </div>
                    </button>

                    {/* MODAL VISOR DE COTIZACIONES CON SCROLL VERTICAL */}
                    {showCotizaciones && (
                      <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col items-center animate-in fade-in duration-300">
                        
                        {/* Botones de navegación fijos en la parte superior para que no se pierdan al bajar */}
                        <div className="w-full flex justify-between items-center p-6 z-[220] bg-black/60 backdrop-blur-md border-b border-white/10">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => setImgIndex(imgIndex === 0 ? 1 : 0)}
                              className="p-3 text-white bg-white/10 hover:bg-[#B65A3A] rounded-full transition-all"
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <p className="text-white/80 font-black text-[12px] uppercase tracking-[0.4em]">
                              Cotización {imgIndex + 1} de 2
                            </p>
                            <button 
                              onClick={() => setImgIndex(imgIndex === 1 ? 0 : 1)}
                              className="p-3 text-white bg-white/10 hover:bg-[#B65A3A] rounded-full transition-all"
                            >
                              <ChevronRight size={24} />
                            </button>
                          </div>

                          <button 
                            onClick={() => setShowCotizaciones(false)}
                            className="text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
                          >
                            <X size={30} />
                          </button>
                        </div>

                        {/* CONTENEDOR CON SCROLL */}
                        <div className="w-full flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pt-10 pb-20">
                          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
                            {/* La imagen ahora tiene un ancho definido (w-full) para forzar el scroll vertical */}
                            <div className="relative shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-lg bg-white overflow-hidden">
                              <img 
                                src={imgIndex === 0 ? "/img/cot1.jpeg" : "/img/cot2.jpeg"} 
                                className="w-full h-auto animate-in zoom-in-95 duration-500"
                                alt={`Cotización ${imgIndex + 1}`}
                                style={{ minWidth: '100%' }} // Asegura que se vea grande
                              />
                            </div>
                            
                            <p className="mt-10 text-white/20 text-[11px] font-black uppercase tracking-[0.5em]">
                              --- Fin del Documento ---
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* --- FIN DE LA SECCIÓN ESPECÍFICA --- */}
                </div>
              </Card>

              {/* TABLAS DE GASTOS */}
              <div className="space-y-12">
                <ManagementTable 
                  title="1. GASTOS MENSUALES FIJOS (RECURRENTES)"
                  headers={["PROVEEDOR / CONTRATISTA", "CONCEPTO", "DETALLE"]}
                  icon={Activity}
                  data={[
                    {p: "SEGURIDAD DEL SUR LTDA", c: "Vigilancia", d: "Promedio mensual $18.5M - $19.3M"},
                    {p: "IMPECOL SAS", c: "Aseo", d: "$5.379.300 mensuales"},
                    {p: "ANA LUCIA YEPEZ C.", c: "Administración", d: "Honorarios mensuales"},
                    {p: "LUIS FELIPE NARVAEZ", c: "Contabilidad", d: "Honorarios mensuales"},
                    {p: "ASCENSUR ELEVADORES SAS", c: "Ascensores", d: "$1.255.516 mensuales"},
                    {p: "CUMMINS DE LOS ANDES", c: "Planta electrica", d: "Mantenimiento cuatrimestral"},
                    {p: "JAMES ARTURO MAIGUAL", c: "Jardinería", d: "Servicio mensual"},
                    {p: "ENERTOTAL SA ESP", c: "Energía", d: "Consumo áreas comunes"},
                    {p: "MONTAGAS", c: "Gas", d: "Suministro copropiedad"},
                    {p: "EMPOPASTO SA ESP", c: "Acueducto", d: "Servicio de agua"},
                    {p: "COMCEL SA (CLARO)", c: "Telecom.", d: "Telefonía e internet Admin"},
                    {p: "MOVISTAR", c: "Telecom.", d: "Servicios de internet"}
                  ]}
                />

                <div className="grid grid-cols-1 gap-12">
                  {/* TABLA A - YA ESTABA BIEN */}
                  <InvestmentTable 
                    title="A. REPARACIONES Y SUMINISTROS LOCATIVOS / ELÉCTRICOS"
                    headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD"]}
                    icon={Wrench}
                    data={[
                      {p: "ALEX MAURICIO MAIGUAL", o: "Metalmecánica", d: "Topes puerta vehicular, shut basuras, balineras."},
                      {p: "OSCAR MALES", o: "Vidrios", d: "Ajuste puerta vidrio templado."},
                      {p: "CHAVES LEON", o: "Hidráulicos", d: "Válvula reductora, manómetro, adaptador."},
                      {p: "LUIS HUMBERTO BARRERA", o: "Eléctricos", d: "Suministros varios."},
                      {p: "INVERSIONES ELECTRONICAS", o: "Eléctricos", d: "Amarras y cinta aislante."},
                      {p: "JOSE FRANCISCO JOJOA", o: "Instalaciones", d: "Kickles, cinta LED y sensores."},
                      {p: "JAMES ARTURO MAIGUAL", o: "Poda", d: "Poda extraordinaria árboles y cancha."},
                      {p: "JOLMAR VALDES CASTAÑO", o: "Seguridad", d: "Recarga de extintores."},
                      {p: "ANDRES TOBAR", o: "Dotación", d: "2 conos de señalización."},
                      {p: "ADRIANA MILENA BARRERA", o: "Insumos Aseo", d: "Materiales de limpieza Edificio."}
                    ]}
                  />

                                   

                  <InvestmentTable 
                    title="B. ACTIVIDADES NAVIDEÑAS E INTEGRACIÓN"
                    headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD"]}
                    icon={HeartPulse}
                    data={[
                      {p: "JOSE FRANCISCO JOJOA", o: "Iluminación", d: "Instalación luces en torres."},
                      {p: "JAVIER MAURICIO ROSERO", o: "Decoración", d: "Materiales decoración general."},
                      {p: "JORGE ELIECER TORO", o: "Refrigerio", d: "Porciones de hornado integración."},                      
                      {p: "ADMINISTRACIÓN", o: "Bonificaciones", d: "Bonos navidad personal edificio."},
                      {p: "ADMINISTRACIÓN", o: "Evento", d: "Misa y grupo musical."},
                      {p: "ADMINISTRACIÓN", o: "Novena", d: "Refrigerio buñuelos, natilla y fresas con crema."}
                    ]}
                  />

                  <ManagementTable 
                    title="C. IMPUESTOS, SEGUROS Y OTROS"
                    headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD"]}
                    icon={Scale}
                    data={[
                      {p: "DIAN", c: "Impuestos", d: "Retención en la Fuente e IVA."},
                      {p: "ALCALDIA DE PASTO", c: "Impuestos", d: "Retención de ICA."},
                      {p: "SEGUROS DEL ESTADO SA", c: "Seguros", d: "Cuotas póliza áreas comunes."},
                      
                    ]}
                  />
                </div>
              </div>

              {/* SECCIÓN CAJA MENOR */}
              <Card title="Otras Gestiones 2025" icon={Wallet}>
                 <div className="overflow-x-auto pt-4">
                    <table className="w-full text-left text-xs">
                       <thead className="bg-slate-50 border-b-2">
                          <tr>
                             <th className="px-6 py-4 font-black">CONCEPTO</th>
                             <th className="px-6 py-4 font-black">DETALLE DEL GASTO</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 font-bold text-slate-600">                          
                          <tr><td className="px-6 py-4">GESTIÓN ADM</td><td className="px-6 py-4">Creación base datos residentes y censo emergencia</td></tr>
                          <tr><td className="px-6 py-4">SEGURIDAD</td><td className="px-6 py-4">INSTALACION DVR Y REPARACION CAMARAS</td></tr>
                          <tr><td className="px-6 py-4">SGSST 2025</td><td className="px-6 py-4">ACTUALIZACION ANUAL POR EL ING. RICARDO FIERRO</td></tr>
                          <tr><td className="px-6 py-4">CELEBRACIÓN HALLOWEEN</td><td className="px-6 py-4">Dulces niños residentes</td></tr>                          
                       </tbody>
                    </table>
                 </div>
              </Card>

              {/* PARTE III: SEGUROS */}
              <div className="space-y-12">
                <div className="bg-[#B65A3A] p-16 rounded-[60px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
                  <div className="z-10 text-center md:text-left">
                    <h3 className="text-6xl font-black uppercase tracking-tighter mb-2">Póliza de Seguros</h3>
                    <p className="text-white/80 font-bold text-2xl uppercase tracking-[0.1em]">Seguros del Estado | Gestión 2025-2026</p>
                  </div>
                  <ShieldCheck size={160} className="text-white opacity-10 absolute right-[-20px] top-[-20px]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <Card title="Póliza 1: Integral Copropiedades" icon={ShieldCheck} highlight>
                    <div className="space-y-6">
                      <div className="bg-[#EDEDED] p-8 rounded-[40px] text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">VALOR ASEGURADO TOTAL</p>
                        <p className="text-4xl font-black text-[#B65A3A]">$23.559.207.000</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase">
                        <div className="p-4 bg-slate-50 rounded-2xl">Bienes Comunes: $18.582M</div>
                        <div className="p-4 bg-slate-50 rounded-2xl">Bienes Privados: $4.645M</div>
                        <div className="p-4 bg-slate-50 rounded-2xl">Maquinaria: $309M</div>
                        <div className="p-4 bg-slate-50 rounded-2xl">Eq. Electrónico: $21M</div>
                      </div>
                      <div className="bg-[#2B2B2B] p-6 rounded-[32px] flex justify-between items-center text-white">
                        <span className="text-[10px] font-black">PRIMA ANUAL (IVA INC)</span>
                        <span className="text-xl font-black">$25.005.277</span>
                      </div>
                    </div>
                  </Card>

                  <Card title="Póliza 2: D&O (Directores)" icon={UserCheck}>
                    <div className="space-y-6">
                       <p className="text-xs font-bold text-slate-500 italic leading-relaxed">Protección del patrimonio de directores y administradores ante reclamaciones por actos incorrectos en sus funciones.</p>
                       <div className="space-y-2">
                          {[
                            "Gastos de representación legal.",
                            "Reembolso a la copropiedad.",
                            "Gastos de publicidad restitución imagen.",
                            "Responsabilidad prácticas laborales."
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[10px] font-black text-slate-600">
                               <div className="w-1.5 h-1.5 bg-[#B65A3A] rounded-full"></div> {item.toUpperCase()}
                            </div>
                          ))}
                       </div>
                       <div className="bg-white border-2 border-[#B65A3A] p-6 rounded-[32px] flex justify-between items-center text-[#B65A3A]">
                        <span className="text-[10px] font-black">PRIMA D&O</span>
                        <span className="text-xl font-black">$499.800</span>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="bg-[#2B2B2B] p-10 rounded-[48px] text-white flex justify-between items-center shadow-2xl">
                   <div className="flex items-center gap-8">
                      <div className="p-6 bg-[#B65A3A] rounded-3xl"><DollarSign size={40}/></div>
                      <div>
                         <p className="text-[11px] font-black text-white/50 tracking-widest uppercase">VALOR TOTAL PAGADO PÓLIZAS</p>
                         <p className="text-5xl font-black text-white">$25.505.077</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 7: ESTADOS FINANCIEROS (DETALLADO SEGÚN INFORME 2025) */}
          {activeSection === 'financiero' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader 
                title="7. Informe de Gestión Financiera 2025" 
                icon={BarChart3} 
                agendaIndices={[6]} 
                agendaStatus={agendaStatus} 
                toggleAgendaIlltem={toggleAgendaItem} 
              />

              {/* BOTÓN DRIVE AL PDF OFICIAL */}
              <div className="max-w-5xl mx-auto">
                <a 
                  href="https://drive.google.com/file/d/1np1EUGz1KuQRxmiGRNtHwGOdf4Z1HL-v/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-8 bg-[#B65A3A] rounded-[40px] text-white shadow-2xl hover:scale-[1.02] transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    <div className="bg-white/20 p-4 rounded-2xl">
                      <FileText size={40} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-black tracking-tighter uppercase">Ver Estados Financieros Completos</h3>
                      <p className="text-white/70 font-bold text-[10px] tracking-widest mt-1 uppercase">Balance General y P&P - Certificado por Contador</p>
                    </div>
                  </div>
                  <ExternalLink size={30} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* 1. RESUMEN DE RESULTADOS */}
              <Card title="1. Resumen de Resultados (Enero - Diciembre 2025)" icon={Activity} highlight className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 mb-2">TOTAL INGRESOS</p>
                    <p className="text-2xl font-black text-[#2B2B2B]">$446.519.386</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 mb-2">GASTOS ADMÓN</p>
                    <p className="text-2xl font-black text-slate-600">$431.318.221</p>
                  </div>
                  <div className="p-6 bg-green-50 rounded-[32px] border border-green-100 text-center">
                    <p className="text-[10px] font-black text-green-600 mb-2">EXCEDENTE OPER.</p>
                    <p className="text-2xl font-black text-green-700">$15.201.164</p>
                  </div>
                  <div className="p-6 bg-[#B65A3A]/10 rounded-[32px] border border-[#B65A3A]/20 text-center">
                    <p className="text-[10px] font-black text-[#B65A3A] mb-2">EXCEDENTE FINAL</p>
                    <p className="text-2xl font-black text-[#B65A3A]">$33.668.337</p>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-[#2B2B2B] rounded-[30px] text-white/90 text-[11px] font-bold leading-relaxed">
                  <span className="text-[#B65A3A] font-black mr-2">NOTA:</span> El excedente final incluye $19.762.030 por aprovechamientos no operacionales. Los ingresos ordinarios sumaron $270.180.000 por cuotas de administración.
                </div>
              </Card>

              {/* 2. ANÁLISIS DE EGRESOS Y 3. SITUACIÓN FINANCIERA */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* 2. ANÁLISIS DE EGRESOS */}
                <div className="space-y-6">
                  <h4 className="text-sm font-black text-[#B65A3A] px-6 tracking-[0.3em] uppercase">2. Análisis de Egresos (Rubros Clave)</h4>
                  <div className="p-10 bg-white rounded-[50px] border-2 border-slate-100 shadow-sm space-y-8">
                    {[
                      { label: "Vigilancia", val: "$222.525.967", p: "w-[51%]" },
                      { label: "Servicio de Aseo", val: "$63.638.224", p: "w-[14%]" },
                      { label: "Energía Eléctrica", val: "$32.417.780", p: "w-[7%]" },
                      { label: "Mantenimiento Ascensores", val: "$21.118.819", p: "w-[5%]" },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-[11px] font-black">
                          <span>{item.label}</span>
                          <span className="text-[#B65A3A]">{item.val}</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full bg-[#B65A3A] ${item.p}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. SITUACIÓN FINANCIERA (TABLA) */}
                <div className="space-y-6">
                  <h4 className="text-sm font-black text-[#2B2B2B] px-6 tracking-[0.3em] uppercase">3. Situación Financiera (Corte Dic 31)</h4>
                  <div className="overflow-hidden rounded-[50px] border-2 border-slate-100 bg-white shadow-sm">
                    <table className="w-full text-[11px]">
                      <thead className="bg-slate-50 border-b">
                        <tr>
                          <th className="px-6 py-4 font-black text-left">CUENTA</th>
                          <th className="px-6 py-4 font-black text-left">VALOR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-bold">
                        <tr><td className="px-6 py-4 text-slate-500 uppercase">Disponible (Bancos)</td><td className="px-6 py-4 font-black">$5.665.989</td></tr>
                        <tr><td className="px-6 py-4 text-slate-500 uppercase">Deudores (Cartera)</td><td className="px-6 py-4 font-black text-red-600">$115.840.650</td></tr>
                        <tr><td className="px-6 py-4 text-slate-500 uppercase">Activo Total</td><td className="px-6 py-4 font-black">$306.791.638</td></tr>
                        <tr><td className="px-6 py-4 text-slate-500 uppercase">Pasivo Total</td><td className="px-6 py-4 font-black">$62.699.136</td></tr>
                        <tr className="bg-slate-50"><td className="px-6 py-4 font-black uppercase">Patrimonio</td><td className="px-6 py-4 font-black text-[#B65A3A]">$244.092.502</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 4. CONCLUSIONES Y RECOMENDACIONES */}
              <div className="bg-[#2B2B2B] p-12 rounded-[60px] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-4 uppercase tracking-tighter">4. Conclusiones y Recomendaciones</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10">
                      <h5 className="text-[#B65A3A] font-black text-xs uppercase">Gestión de Cartera</h5>
                      <p className="text-[10px] leading-relaxed opacity-80 uppercase">Concentración de recursos en deudores ($115.8M). Se recomienda cobro jurídico urgente.</p>
                    </div>
                    <div className="space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10">
                      <h5 className="text-[#B65A3A] font-black text-xs uppercase">Solidez Patrimonial</h5>
                      <p className="text-[10px] leading-relaxed opacity-80 uppercase">Patrimonio robusto de $244M que garantiza el respaldo ante terceros.</p>
                    </div>
                    <div className="space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10">
                      <h5 className="text-[#B65A3A] font-black text-xs uppercase">Fondo Imprevistos</h5>
                      <p className="text-[10px] leading-relaxed opacity-80 uppercase">Traslado cumplido de $1.291.857 según requerimiento legal.</p>
                    </div>
                  </div>
                </div>
                <Info size={120} className="absolute right-[-20px] bottom-[-20px] text-white opacity-5" />
              </div>

              {/* 5. CUADROS INDIVIDUALES (A, B, C, D, E) */}
              <div className="space-y-12">
                <h4 className="text-xl font-black text-center uppercase tracking-[0.2em] border-y py-4 border-slate-100">5. Ejecución Detallada por Actividades</h4>
                
                <div className="grid grid-cols-1 gap-12">
                  {/* A. REPARACIONES Y SUMINISTROS LOCATIVOS - ACTUALIZADO */}
                    <InvestmentTable 
                      title="A. Reparaciones y Suministros Locativos / Eléctricos"
                      headers={["PROVEEDOR", "DETALLE DE LA LABOR / SUMINISTRO", "INVERSIÓN"]}
                      icon={Wrench}
                      data={[
                        {p: "Alex Mauricio Maigual", o: "Metalmecánica (Topes, soldadura, shut, balineras)", d: "$856.900"},
                        {p: "Adriana Milena Barrera", o: "Insumos de Aseo (May, Oct, Dic)", d: "$1.969.244"},
                        {p: "Chaves Leon", o: "Suministros Hidráulicos", d: "$727.365"},
                        {p: "James Arturo Maigual", o: "Poda Extraordinaria (Cancha y Nogales)", d: "$747.200"},
                        {p: "Jolmar Valdés Castaño", o: "Seguridad Industrial", d: "$370.798"},
                        {p: "José Francisco Jojoa", o: "Instalaciones Eléctricas", d: "$200.000"},
                        {p: "Oscar Males", o: "Mantenimiento de Vidrios", d: "$196.140"},
                        {p: "Andrés Tobar", o: "Dotación de Seguridad", d: "$180.000"},
                        {p: "Inversiones Electrónicas Y.", o: "Suministros Eléctricos varios", d: "$122.600"},
                        {p: "Luis Humberto Barrera", o: "Suministros Eléctricos", d: "$45.300"}
                      ]}
                    />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <ManagementTable 
                      title="B. Ascensores y Planta"
                      headers={["CONCEPTO", "VALOR"]}
                      icon={Zap}
                      data={[
                        {p: "Ascensur (Reparación Mayor)", d: "$14.026.900"},
                        {p: "Cummins (Mantenimiento Planta)", d: "$698.814"},
                        {p: "Albeiro Bastidas (Emergencia)", d: "$120.000"}
                      ]}
                    />
                    <ManagementTable 
                      title="C. Seguridad y SGSST"
                      headers={["CONCEPTO", "VALOR"]}
                      icon={ShieldCheck}
                      data={[
                        {p: "Seguridad El Dorado (CCTV)", d: "$435.150"},
                        {p: "Ricardo Fierro (SGSST)", d: "$1.002.430"}
                      ]}
                    />
                  </div>

                  <InvestmentTable 
                    title="D. Actividades Navideñas e Integración"
                    headers={["PROVEEDOR / RUBRO", "CONCEPTO", "VALOR"]}
                    icon={HeartPulse}
                    data={[
                      {p: "Jorge Eliécer Toro", o: "Refrigerio", d: "$1.800.000"},
                      {p: "Javier Mauricio Rosero", o: "Decoración", d: "$1.041.720"},
                      {p: "José Francisco Jojoa", o: "Iluminación", d: "$1.000.000"},
                      {p: "Administración", o: "Bonificaciones", d: "$1.050.000"}
                    ]}
                  />

                  
                </div>
              </div>

              {/* 6. RELACIÓN DE GASTOS CAJA MENOR */}
              <Card title="6. Detalle de Gastos de Caja Menor" icon={Wallet} highlight className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h5 className="text-[11px] font-black text-[#B65A3A] tracking-widest uppercase px-4">Gastos Operativos y Legales</h5>
                    <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
                      <table className="w-full text-[10px]">
                        <tbody className="divide-y divide-slate-50">
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-black uppercase">Impuestos Municipales (Rete ICA)</td>
                            <td className="px-6 py-4 font-bold text-slate-500">$162.000</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-black uppercase">Gestión Administrativa (Base Datos)</td>
                            <td className="px-6 py-4 font-bold text-slate-500">$50.000</td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-black uppercase">Celebración Halloween (Dulces)</td>
                            <td className="px-6 py-4 font-bold text-slate-500">$21.700</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h5 className="text-[11px] font-black text-[#B65A3A] tracking-widest uppercase px-4">Actividades Navideñas y Novenas</h5>
                    <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                      <div className="relative z-10 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                          <span className="text-[10px] font-bold opacity-60 uppercase">Música y Misa</span>
                          <span className="text-sm font-black text-[#B65A3A]">$1.300.000</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                          <span className="text-[10px] font-bold opacity-60 uppercase">Alimentos (Natilla/Buñuelos/Fresas)</span>
                          <span className="text-sm font-black text-[#B65A3A]">$430.799</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold opacity-60 uppercase">Logística y Pedestales</span>
                          <span className="text-sm font-black text-[#B65A3A]">$144.000</span>
                        </div>
                      </div>
                      <Sparkles size={80} className="absolute right-[-20px] top-[-20px] text-white opacity-5" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* 7. PROMEDIO GASTOS MENSUALES FIJOS */}
              {/* 7. PROMEDIO DE GASTOS MENSUALES FIJOS - ACTUALIZADO CON CONTABILIDAD Y TELEFONÍA */}
              <Card title="7. Promedio de Gastos Mensuales Fijos" icon={TrendingUp} className="p-10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 border-b-2 border-slate-100">
                      <tr>
                        <th className="px-6 py-5 font-black uppercase tracking-widest">Concepto de Gasto</th>
                        <th className="px-6 py-5 font-black uppercase tracking-widest">Proveedor / Responsable</th>
                        <th className="px-6 py-5 font-black uppercase tracking-widest">Total Anual</th>
                        <th className="px-6 py-5 font-black uppercase tracking-widest">Promedio Mensual</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-slate-600">
                      <tr>
                        <td className="px-6 py-4 uppercase">Servicio de Energía</td>
                        <td className="px-6 py-4 uppercase opacity-60 font-medium">Enertotal S.A. E.S.P.</td>
                        <td className="px-6 py-4">$32.427.653</td>
                        <td className="px-6 py-4 text-[#B65A3A] font-black bg-[#B65A3A]/5">$2.702.304</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 uppercase">Acueducto y Alcantarillado</td>
                        <td className="px-6 py-4 uppercase opacity-60 font-medium">Empopasto S.A. E.S.P.</td>
                        <td className="px-6 py-4">$2.316.480</td>
                        <td className="px-6 py-4 text-[#B65A3A] font-black bg-[#B65A3A]/5">$193.040</td>
                      </tr>
                      <tr className="bg-slate-50/30">
                        <td className="px-6 py-4 uppercase">Telefonía e Internet</td>
                        <td className="px-6 py-4 uppercase opacity-60 font-medium">Comcel S.A. (Claro)</td>
                        <td className="px-6 py-4">$949.323</td>
                        <td className="px-6 py-4 text-[#B65A3A] font-black bg-[#B65A3A]/5">$79.110</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 uppercase">Honorarios Administración</td>
                        <td className="px-6 py-4 uppercase opacity-60 font-medium">Ana Lucía Yépez</td>
                        <td className="px-6 py-4">$20.279.136</td>
                        <td className="px-6 py-4 text-[#B65A3A] font-black bg-[#B65A3A]/5">$1.689.928</td>
                      </tr>
                      <tr className="bg-slate-50/30">
                        <td className="px-6 py-4 uppercase">Honorarios Contabilidad</td>
                        <td className="px-6 py-4 uppercase opacity-60 font-medium">Luis Felipe Narváez</td>
                        <td className="px-6 py-4">$7.464.200</td>
                        <td className="px-6 py-4 text-[#B65A3A] font-black bg-[#B65A3A]/5">$622.017</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 uppercase">Servicio de Vigilancia</td>
                        <td className="px-6 py-4 uppercase opacity-60 font-medium">Seguridad del Sur</td>
                        <td className="px-6 py-4">$223.415.000</td>
                        <td className="px-6 py-4 text-[#B65A3A] font-black bg-[#B65A3A]/5">$18.617.917</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="px-6 py-4 uppercase">Servicio de Aseo</td>
                        <td className="px-6 py-4 uppercase opacity-60 font-medium">Impecol SAS</td>
                        <td className="px-6 py-4">$64.551.600</td>
                        <td className="px-6 py-4 text-[#B65A3A] font-black bg-[#B65A3A]/5">$5.379.300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 p-8 bg-blue-50 rounded-[40px] border-2 border-blue-100 flex items-start gap-6">
                  <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
                    <Activity size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-800 uppercase tracking-[0.2em] mb-2">Análisis de Estabilidad Presupuestal</p>
                    <p className="text-xs font-bold text-blue-900 leading-relaxed italic uppercase">
                      "El control riguroso de la administración permitió mantener la estabilidad en los gastos fijos. Destaca la optimización en telecomunicaciones con un promedio de $79.110 y la constancia en los servicios tercerizados, garantizando la solvencia necesaria para imprevistos."
                    </p>
                  </div>
                </div>
              </Card>

              {/* 8. GESTIÓN ÁREAS VERDES Y PAISAJISMO - OCUPA TODA LA FILA */}
              <div className="mb-12">
                <InvestmentTable 
                  title="8. Áreas Verdes y Paisajismo"
                  headers={["LABOR REALIZADA", "RESPONSABLE / PROVEEDOR", "INVERSIÓN TOTAL 2025"]}
                  icon={Leaf}
                  data={[
                    {p: "Mantenimiento Mensual de Jardinería", o: "James Arturo Maigual", d: "$7.925.360"},
                    {p: "Poda Extraordinaria (Cancha y Nogales)", o: "James Arturo Maigual", d: "$747.200"}
                  ]}
                />
              </div>

              {/* 9. OBLIGACIONES LEGALES Y DIAN - OCUPA TODA LA FILA */}
              <div className="mb-12 space-y-6">
                <h4 className="text-sm font-black text-[#2B2B2B] px-8 tracking-[0.3em] uppercase flex items-center gap-4">
                  <div className="p-2 bg-[#B65A3A]/10 rounded-lg">
                    <Scale size={20} className="text-[#B65A3A]" />
                  </div>
                  9. Obligaciones Tributarias y Legales (DIAN y Alcaldía)
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-8 bg-white rounded-[40px] border-2 border-slate-100 shadow-sm hover:border-[#B65A3A]/30 transition-all group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-[#B65A3A]">IVA (Ventas)</p>
                    <p className="text-2xl font-black text-[#2B2B2B]">$13.096.000</p>
                    <p className="text-[9px] font-bold text-slate-500 mt-2 uppercase">Pagos Cuatrimestrales (Sept 2024 - Ago 2025)</p>
                  </div>

                  <div className="p-8 bg-white rounded-[40px] border-2 border-slate-100 shadow-sm hover:border-[#B65A3A]/30 transition-all group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-[#B65A3A]">Retención Fuente</p>
                    <p className="text-2xl font-black text-[#2B2B2B]">$1.134.000</p>
                    <p className="text-[9px] font-bold text-slate-500 mt-2 uppercase">Periodos Mensuales (1 al 11 de 2025)</p>
                  </div>

                  <div className="p-8 bg-white rounded-[40px] border-2 border-slate-100 shadow-sm hover:border-[#B65A3A]/30 transition-all group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-[#B65A3A]">Rete ICA (Pasto)</p>
                    <p className="text-2xl font-black text-[#2B2B2B]">$70.000</p>
                    <p className="text-[9px] font-bold text-slate-500 mt-2 uppercase">Bimestres 3 y 4 (Alcaldía de Pasto)</p>
                  </div>
                </div>
              </div>

              {/* 10. OTROS SERVICIOS TÉCNICOS */}
              <Card title="10. Otros Servicios Técnicos y Suministros" icon={Activity} highlight>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                  <div className="p-6 border-l-4 border-[#B65A3A] bg-slate-50 rounded-r-3xl">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Suministro Gas</p>
                    <p className="text-lg font-black text-[#2B2B2B]">$37.731.370</p>
                    <p className="text-[9px] font-bold text-[#B65A3A] mt-1">PROMEDIO: $3.144.280</p>
                  </div>
                  <div className="p-6 border-l-4 border-[#B65A3A] bg-slate-50 rounded-r-3xl">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Ascensores Prev.</p>
                    <p className="text-lg font-black text-[#2B2B2B]">$15.066.192</p>
                    <p className="text-[9px] font-bold text-[#B65A3A] mt-1">FIJO: $1.255.516/MES</p>
                  </div>
                  <div className="p-6 border-l-4 border-[#B65A3A] bg-slate-50 rounded-r-3xl">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Sistema SGSST</p>
                    <p className="text-lg font-black text-[#2B2B2B]">$1.002.430</p>
                    <p className="text-[9px] font-bold text-[#B65A3A] mt-1">ING. RICARDO FIERRO</p>
                  </div>
                  <div className="p-6 border-l-4 border-[#B65A3A] bg-slate-50 rounded-r-3xl">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Insumos de Aseo</p>
                    <p className="text-lg font-black text-[#2B2B2B]">$1.969.244</p>
                    <p className="text-[9px] font-bold text-[#B65A3A] mt-1">ADRIANA M. BARRERA</p>
                  </div>
                </div>
              </Card>

              {/* CIERRE RESPONSABLE */}
              <div className="flex flex-col items-center text-center p-16 bg-[#2B2B2B] rounded-[60px] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="p-6 bg-[#B65A3A] rounded-full mb-8 inline-block shadow-xl">
                    <Landmark size={60} className="text-white" />
                  </div>
                  <p className="text-[11px] font-black text-white/40 tracking-[0.6em] mb-4 uppercase">Certificación de Cierre Financiero 2025</p>
                  <div className="h-px w-64 bg-white/10 mx-auto mb-8"></div>
                  <p className="text-5xl font-black text-white uppercase tracking-tighter">Luis Felipe Narváez</p>
                  <p className="text-sm font-bold text-[#B65A3A] tracking-[0.3em] mt-3 uppercase">Contador Público - T.P. Vigente</p>
                  <p className="text-[10px] font-bold text-white/30 mt-8 uppercase tracking-widest">Edificio Campos de Castilla - Propiedad Horizontal</p>
                </div>
                <ShieldCheck size={200} className="absolute left-[-50px] bottom-[-50px] text-white opacity-[0.03]" />
              </div>
            </div>
          )}

          {/* SECCIÓN 8: PRESUPUESTO */}
          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="8. Proyecto Presupuesto 2026" icon={PieChart} agendaIndices={[7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="max-w-5xl mx-auto">
                <div className="bg-[#2B2B2B] rounded-[60px] p-16 shadow-2xl border-b-[20px] border-[#B65A3A] flex flex-col items-center text-center">
                  <div className="p-8 bg-white/10 rounded-[40px] mb-10 border-2 border-white/20 backdrop-blur-md">
                    <Wallet size={80} className="text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">PROYECTO DE INGRESOS Y GASTOS 2026</h3>
                  <div className="w-24 h-2 bg-[#B65A3A] mb-10 rounded-full"></div>
                  <div className="space-y-4">
                    <p className="text-[14px] font-black text-white/60 tracking-[0.4em]">Definición de:</p>
                    <p className="text-xl font-black text-[#B65A3A] tracking-widest">CUOTAS DE SOSTENIMIENTO Y FONDO DE IMPREVISTOS</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 9-10: ELECCIONES */}
          {activeSection === 'elecciones' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="9-10. Elecciones de Cuerpos Colegiados" icon={Users} agendaIndices={[8, 9]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              {asistencia.filter(a => a.presente).length === 0 && (
                <div className="bg-orange-50 border-2 border-orange-200 p-8 rounded-3xl text-orange-700 font-bold text-center flex items-center justify-center gap-4">
                  <AlertCircle size={24}/>
                  REGISTRE PRIMERO LA ASISTENCIA EN EL PUNTO 1 PARA PODER ELEGIR POSTULADOS
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="Postulados Consejo (Punto 9)" icon={Users} highlight>
                   <div className="space-y-6 pt-4">
                      <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-slate-50 rounded-2xl">
                         {postuladosConsejo.length === 0 ? (
                           <p className="text-[9px] text-slate-400 font-black py-2">SIN POSTULADOS</p>
                         ) : (
                           postuladosConsejo.map(p => (
                             <span key={p} className="bg-[#B65A3A] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                               {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={12} /></button>
                             </span>
                           ))
                         )}
                      </div>
                      <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                         {asistencia.filter(a => a.presente).map(r => (
                           <div key={r.id} className="flex justify-between items-center p-3 border-b text-[10px] font-black hover:bg-slate-50">
                              <span>APTO {r.apto} - {r.propietario}</span>
                              <button 
                                onClick={() => togglePostulacion(r.propietario, 'consejo')} 
                                className={`px-4 py-1.5 rounded-lg transition-all ${
                                  postuladosConsejo.includes(r.propietario) ? 'bg-[#2B2B2B] text-white' : 'bg-[#EDEDED] text-[#B65A3A]'
                                }`}
                              >
                                 {postuladosConsejo.includes(r.propietario) ? 'POSTULADO' : 'POSTULAR'}
                              </button>
                           </div>
                         ))}
                      </div>
                   </div>
                </Card>

                <Card title="Postulados Convivencia (Punto 10)" icon={HeartPulse}>
                  <div className="space-y-6 pt-4">
                      <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-slate-50 rounded-2xl">
                         {postuladosConvivencia.length === 0 ? (
                           <p className="text-[9px] text-slate-400 font-black py-2">SIN POSTULADOS</p>
                         ) : (
                           postuladosConvivencia.map(p => (
                             <span key={p} className="bg-[#2B2B2B] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                               {p} <button onClick={() => togglePostulacion(p, 'convivencia')}><Trash2 size={12} /></button>
                             </span>
                           ))
                         )}
                      </div>
                      <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                         {asistencia.filter(a => a.presente).map(r => (
                           <div key={r.id} className="flex justify-between items-center p-3 border-b text-[10px] font-black hover:bg-slate-50">
                              <span>APTO {r.apto} - {r.propietario}</span>
                              <button 
                                onClick={() => togglePostulacion(r.propietario, 'convivencia')} 
                                className={`px-4 py-1.5 rounded-lg transition-all ${
                                  postuladosConvivencia.includes(r.propietario) ? 'bg-[#B65A3A] text-white' : 'bg-[#EDEDED] text-[#2B2B2B]'
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
              <Card title="Nueva Proposición" highlight>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  <div className="md:col-span-1 space-y-3">
                    <label className="text-[11px] font-black text-slate-400">APTO</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#B65A3A]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#B65A3A]" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} placeholder="EJ: 301" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-400">DESCRIPCIÓN</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#B65A3A]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#B65A3A]" value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})} placeholder="INGRESE LA PROPUESTA..." />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addProposicion} className="w-full bg-[#B65A3A] text-white py-4 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-3"><Plus size={18} /> AGREGAR</button>
                  </div>
                </div>
              </Card>
              <div className="space-y-6">
                {proposiciones.map((prop) => (
                    <div key={prop.id} className="bg-white p-8 rounded-[32px] border-2 border-[#B65A3A]/5 shadow-lg flex justify-between items-center">
                       <div className="flex items-start gap-6">
                          <div className="h-14 w-14 bg-[#B65A3A] text-white rounded-2xl flex items-center justify-center font-black text-lg shrink-0">P</div>
                          <div>
                             <p className="text-[10px] font-black text-[#B65A3A] mb-1">PROPOSICIÓN APTO: {prop.proponente}</p>
                             <p className="text-sm font-black text-[#2B2B2B] leading-relaxed">{prop.texto}</p>
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
              <div className="flex justify-between items-center print:hidden bg-[#2B2B2B] p-10 rounded-[40px] shadow-2xl">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">FINALIZAR ASAMBLEA 2026</h2>
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL DE CAMPOS DE CASTILLA</p>
                </div>
                <button onClick={handlePrint} className="bg-[#B65A3A] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl hover:scale-110 transition-all text-xs tracking-[0.2em]">
                  <Printer size={24} /> IMPRIMIR ACTA
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#B65A3A] print:shadow-none print:border-none print:p-0 bg-white">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#B65A3A] pb-10">
                  <h1 className="text-4xl font-black mb-4">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                  <p className="text-xl font-black text-[#B65A3A]">EDIFICIO CAMPOS DE CASTILLA - NIT 814.004.252-0</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-slate-50 rounded-[56px] border-2 border-[#B65A3A]/10 flex flex-col items-center">
                    <p className="text-[11px] font-black text-[#2B2B2B] mb-10 tracking-[0.3em]">Quórum de Cierre</p>
                    <p className="text-7xl font-black text-[#B65A3A] leading-none">{totalQuorum.toFixed(2)}%</p>
                  </div>
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#2B2B2B] tracking-[0.3em] uppercase leading-none mb-12">Mesa Directiva</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-4 border-[#B65A3A]/10 pb-4">
                          <p className="text-[9px] text-[#B65A3A] mb-2 font-black">PRESIDENTE:</p>
                          <p className="text-lg text-[#2B2B2B]">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-4 border-[#B65A3A]/10 pb-4">
                          <p className="text-[9px] text-[#B65A3A] mb-2 font-black">SECRETARIO(A):</p>
                          <p className="text-lg text-[#2B2B2B]">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>
                  <div className="p-12 bg-[#B65A3A] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#2B2B2B]">
                    <ShieldCheck size={72} className="text-white mb-10 opacity-50" />
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] opacity-60">Sesión Finalizada</p>
                    <p className="text-xl font-black mt-4">PASTO, MARZO 2026</p>
                  </div>
                </div>
                <div className="hidden print:grid grid-cols-2 gap-64 mt-64 mb-32">
                  <div className="border-t-4 border-[#2B2B2B] pt-8 text-center uppercase">
                    <p className="text-[11px] font-black leading-loose">FIRMA PRESIDENTE</p>
                  </div>
                  <div className="border-t-4 border-[#2B2B2B] pt-8 text-center uppercase">
                    <p className="text-[11px] font-black leading-loose">FIRMA SECRETARIO</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; background-color: #EDEDED; }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #B65A3A33; border-radius: 10px; }

        @media print {
          @page { margin: 1cm; size: letter; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          table { border-collapse: collapse !important; width: 100% !important; border: 1px solid #000 !important; font-size: 9pt !important; }
          th { background: #B65A3A !important; color: white !important; -webkit-print-color-adjust: exact; padding: 8px !important; border: 1px solid #000 !important; }
          td { border: 1px solid #000 !important; padding: 8px !important; }
        }
      `}} />
    </div> 
  );
}