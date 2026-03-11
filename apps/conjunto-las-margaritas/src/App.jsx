import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, UserPlus, 
  CheckCircle2, Printer, Trash2, TrendingUp, Settings,
  ClipboardCheck, Camera, Zap, Activity, Wrench, Calendar, Layout, ListChecks,
  AlertCircle, ChevronRight, Info, ShieldAlert, HeartPulse, Building2,
  Search, DollarSign, PieChart, Landmark, Gavel, 
  ArrowUpRight, Percent, Wallet, HardHat, Cog, Plus, UserCheck, Leaf, Scale,
  Eye, Handshake, MapPin
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL LAS MARGARITAS ---
const COLORS = {
  terracota: '#C96F45',
  durazno: '#E5A07B',
  salmon: '#F2C6AD',
  blanco: '#FFFFFF',
  grisClaro: '#F1F1F1',
  grisOscuro: '#333333',
  acento: '#C96F45'
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#C96F45]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#C96F45] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#C96F45] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[11px] text-[#333333] font-black uppercase tracking-[0.2em]">
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
        ? 'bg-[#333333] border-[#333333] text-white' 
        : 'bg-white border-[#C96F45]/20 text-[#C96F45] hover:bg-[#C96F45] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#C96F45] ring-4 ring-[#C96F45]/10' : 'border-[#C96F45]/5'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#333333] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#C96F45]' : 'bg-[#E5A07B]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#C96F45]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#C96F45] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#C96F45]/10 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#C96F45] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#C96F45] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#F1F1F1] text-[#333333] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#C96F45]/5 uppercase font-bold text-[#333333]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#C96F45]/5 transition-colors">
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
  { id: 1, casa: '1', propietario: 'JORGE ANDRES NARVAEZ CORDOBA', coeficiente: 2.97 },
  { id: 2, casa: '2', propietario: 'DAYRA MARGOTH ROSERO - JESSIKA PIANDA', coeficiente: 2.97 },
  { id: 3, casa: '3', propietario: 'AURA BERCELIA DORADO NOGUERA', coeficiente: 2.97 },
  { id: 4, casa: '4', propietario: 'RUBIELA VELASQUEZ', coeficiente: 2.97 },
  { id: 5, casa: '5', propietario: 'FABIAN BETANCOURTH MORÁN', coeficiente: 2.97 },
  { id: 6, casa: '6', propietario: 'LUIS EDMUNDO MELO', coeficiente: 2.97 },
  { id: 7, casa: '7', propietario: 'BLANCA BERNAL ARÉVALO', coeficiente: 2.97 },
  { id: 8, casa: '8', propietario: 'HECTOR ROMÁN MELO', coeficiente: 2.97 },
  { id: 9, casa: '9', propietario: 'JUAN CARLOS SALAS GUERRERO', coeficiente: 3.01 },
  { id: 10, casa: '10', propietario: 'JAIME PAZ OJEDA', coeficiente: 3.01 },
  { id: 11, casa: '11', propietario: 'JOSE LUIS TIMANÁ', coeficiente: 3.09 },
  { id: 12, casa: '12', propietario: 'PAULO SOLARTE', coeficiente: 3.17 },
  { id: 13, casa: '13', propietario: 'JOSE LIBARDO REVELO', coeficiente: 3.15 },
  { id: 14, casa: '14', propietario: 'JULIANA CERÓN RUBIO', coeficiente: 3.15 },
  { id: 15, casa: '15', propietario: 'AYDA MERCEDES DELGADO MARTINEZ', coeficiente: 3.12 },
  { id: 16, casa: '16', propietario: 'JOSE LUIS TIMANÁ', coeficiente: 3.10 },
  { id: 17, casa: '17', propietario: 'MELISA BASTIDAS RIASCOS', coeficiente: 3.05 },
  { id: 18, casa: '18', propietario: 'JULIA BURBANO MUÑOZ', coeficiente: 3.05 },
  { id: 19, casa: '19', propietario: 'AURA MYRIAN LOPEZ', coeficiente: 2.97 },
  { id: 20, casa: '20', propietario: 'NIDIA ARCOS NARVAEZ', coeficiente: 2.97 },
  { id: 21, casa: '21', propietario: 'NATALIA ERASO', coeficiente: 3.91 },
  { id: 22, casa: '22', propietario: 'ROSARIO ERASO', coeficiente: 3.91 },
  { id: 23, casa: '23', propietario: 'ROSA ELVIRA ERASO', coeficiente: 3.91 },
  { id: 24, casa: '24', propietario: 'LUZ ISMENIA GONZÁLEZ', coeficiente: 3.91 },
  { id: 25, casa: '25', propietario: 'BETTY MIREYA TORRES CABEZAS', coeficiente: 2.97 },
  { id: 26, casa: '26', propietario: 'CARMELO GUERRÓN', coeficiente: 2.97 },
  { id: 27, casa: '27', propietario: 'ROSA ELVIRA ERASO', coeficiente: 2.97 },
  { id: 28, casa: '28', propietario: 'ANA BELÉN ROJAS GUERRERO', coeficiente: 2.97 },
  { id: 29, casa: '29', propietario: 'RUBEN DARIO JARRIN ERASO', coeficiente: 2.97 },
  { id: 30, casa: '30', propietario: 'AMPARO PAZ', coeficiente: 2.97 },
  { id: 31, casa: '31', propietario: 'FRANCISCO TERÁN SANCHEZ', coeficiente: 2.97 },
  { id: 32, casa: '32', propietario: 'JAIME DÁVILA GONZALES', coeficiente: 2.97 }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  const EvidenceSection = ({ title, content, icon: Icon, photos = [], color = "#C96F45" }) => {
    const [showGallery, setShowGallery] = useState(false);

    return (
      <div className={`p-8 bg-[#F2C6AD]/10 rounded-[40px] border-l-[16px] shadow-sm flex flex-col relative group transition-all hover:shadow-md`} style={{ borderColor: color }}>
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-black uppercase tracking-widest" style={{ color: color }}>{title}</p>
          {photos.length > 0 && (
            <button onClick={() => setShowGallery(true)} className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
              <div className="p-3 bg-white rounded-2xl border-2 shadow-sm text-[#333333] hover:bg-[#C96F45] hover:text-white transition-all" style={{ borderColor: `${color}20` }}>
                <Camera size={22} />
              </div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Evidencias</span>
            </button>
          )}
        </div>
        <div className="text-xl font-bold text-slate-800 leading-relaxed tracking-tight">
          {content}
        </div>
        {showGallery && (
          <div className="fixed inset-0 z-[200] bg-[#333333]/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 sm:p-12">
            <button onClick={() => setShowGallery(false)} className="absolute top-8 right-8 text-white bg-[#C96F45] px-10 py-5 rounded-full font-black text-xs shadow-2xl">
              CERRAR GALERÍA
            </button>
            <div className="w-full max-w-6xl h-full flex items-center justify-center">
               <div className="text-white text-center">
                  <Camera size={80} className="mx-auto mb-6 opacity-20" />
                  <p className="font-black text-2xl uppercase tracking-widest">Galería de Imágenes Administrativas</p>
                  <p className="text-white/50 mt-4 uppercase text-sm">Visualización de soporte fotográfico para {title}</p>
               </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const InvestmentTable = ({ title, headers, data, icon: Icon, total }) => (
    <div className="bg-white rounded-[40px] border-4 border-[#C96F45]/10 overflow-hidden shadow-2xl flex flex-col mb-12">
      <div className="bg-[#C96F45] px-10 py-7 flex justify-between items-center border-b-[6px] border-[#E5A07B]">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-white/10 rounded-2xl">
            {Icon && <Icon className="text-white" size={28} />}
          </div>
          <h4 className="text-lg font-black text-white uppercase tracking-[0.2em]">{title}</h4>
        </div>
        {total && (
          <div className="bg-[#333333] text-white px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-widest shadow-inner">
            {total}
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#F1F1F1] text-[#C96F45] font-black uppercase tracking-widest border-b-2">
            <tr>
              {headers.map((h, i) => <th key={i} className="px-10 py-6 text-sm">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-50 uppercase font-bold text-slate-700">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#C96F45]/5 transition-colors">
                {Object.values(row).map((val, i) => (
                  <td key={i} className="px-10 py-6 text-[14px]">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Persistencia segura de estados
  const [asistencia, setAsistencia] = useState(() => {
    return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
  });
  
  const [agendaStatus, setAgendaStatus] = useState(new Array(ORDEN_DIA.length).fill(false));
  const [dignatarios, setDignatarios] = useState({ presidente: '', secretario: '', comision: '' });
  const [proposiciones, setProposiciones] = useState([]);
  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });
  const [postuladosConsejo, setPostuladosConsejo] = useState([]);
  const [postuladosConvivencia, setPostuladosConvivencia] = useState([]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(2));
  }, [asistencia]);

  const progress = useMemo(() => (agendaStatus.filter(i => i).length / ORDEN_DIA.length) * 100, [agendaStatus]);

  const filteredAsistencia = useMemo(() => {
    return asistencia.filter(a => 
      a.casa.toLowerCase().includes(searchTerm.toLowerCase()) || 
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
    <div className="flex min-h-screen bg-[#F1F1F1] font-sans text-[#333333] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#333333] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#C96F45] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-white/20 flex items-center justify-center rounded-[28px] shadow-lg">
                <Building2 className="text-white" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none uppercase mb-2">
            LAS <span className="text-[#salmon] block text-sm mt-1">MARGARITAS</span>
          </h1>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Propiedad Horizontal</p>
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
            { id: 'consejo', label: '9-10. Elecciones', icon: Users },
            { id: 'proposiciones', label: '11. Proposiciones', icon: MessageSquare },
            { id: 'final', label: 'Finalizar Acta', icon: Printer },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest ${
                activeSection === item.id 
                ? 'bg-[#C96F45] text-white shadow-xl translate-x-2' 
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
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#F1F1F1]">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#C96F45]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#333333] uppercase tracking-widest">Quórum Actual</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#C96F45]' : 'text-[#333333]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#C96F45] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-12 border-[#C96F45]/10">
              <span className="text-[11px] font-black text-[#333333] uppercase tracking-widest">Progreso de Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#C96F45]/5 shadow-inner">
                    <div className="h-full bg-[#C96F45] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#C96F45]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
               <p className="text-[14px] font-black text-[#333333] uppercase tracking-tight">C.R. LAS MARGARITAS</p>
               <p className="text-[11px] text-[#C96F45] font-black uppercase tracking-widest">Ana Lucia Yepez | Admin.</p>
            </div>
            <div className="h-14 w-14 bg-[#C96F45] rounded-2xl flex items-center justify-center text-white shadow-xl">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#333333] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#C96F45]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#C96F45] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Sesión Ordinaria de Copropietarios</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">LAS <span className="text-[#E5A07B] italic block text-4xl mt-4">MARGARITAS</span></h1>
                     <div className="w-32 h-2 bg-[#E5A07B] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">Asamblea General 2026<br/>Gestión 2025 - Proyección 2026</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#333333] uppercase tracking-widest leading-none">NIT: 814.004.843-3</p>
                       <p className="text-lg font-black text-[#333333]">Cra. 40 No. 15-45</p>
                       <p className="text-[10px] font-black text-[#C96F45]">San Juan de Pasto</p>
                    </div>
                  </Card>
                  <Card title="Convocatoria">
                    <div className="space-y-3 pt-2 text-[#333333]">
                       <p className="text-lg font-black">11 de Marzo 2026</p>
                       <p className="text-[11px] font-black text-[#C96F45] opacity-80 uppercase">Hora: 7:00 P.M. - Salón Social</p>
                    </div>
                  </Card>
                  <Card className="bg-[#C96F45] text-white border-none flex flex-col items-center justify-center shadow-2xl !bg-[#C96F45]">
                    <div className="text-center">
                      <p className="text-6xl font-black text-white mb-2 leading-none tracking-tighter">
                        {asistencia.length}
                      </p>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90 leading-none">
                        Unidades Privadas
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
                  <h3 className="text-[#C96F45] font-black text-lg uppercase tracking-tighter">Listado de Copropietarios</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active el switch para registrar presencia</p>
                </div>
                <button 
                  onClick={() => {
                    const todosPresentes = asistencia.every(a => a.presente);
                    setAsistencia(prev => prev.map(a => ({ ...a, presente: !todosPresentes })));
                  }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md ${
                    asistencia.every(a => a.presente) ? 'bg-slate-100 text-[#C96F45]' : 'bg-[#C96F45] text-white'
                  }`}
                >
                  {asistencia.every(a => a.presente) ? 'QUITAR TODO' : 'MARCAR TODOS'}
                </button>
              </div>

              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between print:hidden">
                  <div className="relative group w-full max-w-2xl">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#C96F45]" size={24} />
                    <input 
                      type="text" 
                      placeholder="BUSCAR CASA O PROPIETARIO..." 
                      className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-[# salmon] focus:border-[#C96F45] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-[32px] shadow-sm border border-slate-100">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-[#333333] uppercase tracking-widest">PRESENTES</p>
                        <p className="text-3xl font-black text-[#C96F45]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                    </div>
                    <Users className="text-[#C96F45]" size={40} />
                  </div>
                </div>

                <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F1F1F1] text-[#333333] font-black uppercase tracking-widest text-[11px] border-b-2">
                      <tr>
                        <th className="px-12 py-8">UNIDAD / CASA</th>
                        <th className="px-12 py-8">COPROPIETARIO</th>
                        <th className="px-12 py-8 text-center">COEF (%)</th>
                        <th className="px-12 py-8 text-center print:hidden">ASISTENCIA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 uppercase">
                      {filteredAsistencia.map((item) => (
                        <tr key={item.id} className={`${item.presente ? 'bg-[#C96F45]/5' : ''} hover:bg-slate-50 transition-colors`}>
                          <td className="px-12 py-8 font-black text-[#C96F45] text-xl">CASA {item.casa}</td>
                          <td className="px-12 py-8 font-black text-[#333333] text-sm tracking-tight">{item.propietario}</td>
                          <td className="px-12 py-8 font-black text-[#333333] text-center text-xl">{item.coeficiente.toFixed(2)}%</td>
                          <td className="px-12 py-8 text-center print:hidden">
                            <button 
                              onClick={() => toggleAsistencia(item.id)} 
                              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                                item.presente ? 'bg-[#C96F45]' : 'bg-slate-200'
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
              <Card highlight title="Puntos del Orden del Día">
                <div className="space-y-4 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#C96F45] bg-[#C96F45]/5' : 'border-[#C96F45]/10 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#333333] text-white' : 'bg-[#C96F45] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#C96F45]' : 'text-[#333333]'}`}>
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
            <div className="space-y-10 animate-in zoom-in-95 uppercase">
              <SectionHeader 
                title="3-4. Dignatarios de Asamblea" 
                icon={UserPlus} 
                agendaIndices={[2, 3]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
                  <Card title="Elección de Mesa Directiva" icon={ShieldCheck} highlight>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#333333] uppercase tracking-widest block">Presidente</label>
                        <input type="text" className="w-full p-6 bg-slate-50 border-2 border-[#C96F45]/10 rounded-2xl font-black uppercase text-xs" placeholder="NOMBRE COMPLETO..." value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#333333] uppercase tracking-widest block">Secretario(a)</label>
                        <input type="text" className="w-full p-6 bg-slate-50 border-2 border-[#C96F45]/10 rounded-2xl font-black uppercase text-xs" placeholder="NOMBRE COMPLETO..." value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} />
                      </div>
                    </div>
                  </Card>
                  
                  <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                    <div className="space-y-4 pt-4">
                      <label className="text-[11px] font-black text-[#333333] uppercase tracking-widest block">Designados para Verificación</label>
                      <textarea className="w-full p-6 bg-slate-50 border-2 border-[#C96F45]/10 rounded-2xl font-black uppercase text-[11px] h-40 outline-none leading-loose" placeholder="INGRESE NOMBRES DE LOS DESIGNADOS..." value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}></textarea>
                    </div>
                  </Card>
                </div>

                <div className="bg-[#333333] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#C96F45]">
                  <Gavel className="text-white mb-10 mx-auto" size={56} />
                  <h4 className="font-black text-2xl mb-6 uppercase tracking-tighter">Normativa Ley 675</h4>
                  <p className="text-[11px] font-black text-white/60 leading-loose uppercase tracking-[0.2em]">
                    La elección de dignatarios garantiza la legalidad de los acuerdos tomados en la presente sesión.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 5: ACTA ANTERIOR */}
          {activeSection === 'acta-anterior' && (
            <div className="space-y-10 animate-in fade-in duration-500 uppercase">
              <SectionHeader title="5. Acta Asamblea Anterior" icon={FileText} agendaIndices={[4]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="Validación del Acta Anterior" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4">
                    <p className="text-[11px] font-bold text-slate-600 leading-loose">
                      Verificación del texto final del acta de la Asamblea General Ordinaria anterior por parte de la comisión designada.
                    </p>
                    <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-[#C96F45]/20 flex flex-col items-center justify-center text-center">
                        <FileText size={40} className="text-[#C96F45] mb-4 opacity-40" />
                        <p className="text-[10px] font-black text-slate-400">DOCUMENTO DISPONIBLE PARA CONSULTA EN SECRETARÍA</p>
                    </div>
                  </div>
                </Card>
                <Card title="Observaciones" icon={ClipboardCheck}>
                  <textarea className="w-full p-6 bg-slate-50 border-2 border-[#C96F45]/10 rounded-2xl font-black uppercase text-[11px] h-40 focus:border-[#C96F45]" placeholder="REGISTRE OBSERVACIONES AL ACTA ANTERIOR..."></textarea>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 6: INFORME GESTIÓN (REPRODUCCIÓN COMPLETA) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="6. Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndices={[5]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              {/* FORMACIÓN CONSEJO */}
              <Card title="Constitución del Consejo y Administración" icon={Users} highlight className="p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="bg-[#333333] p-10 rounded-[40px] text-white">
                         <h4 className="text-xl font-black mb-6 border-b border-white/10 pb-4">Consejo de Administración 2025</h4>
                         <ul className="grid grid-cols-1 gap-4 text-xs font-bold text-white/80">
                            {["Nidia Arcos", "Sandra Ibarra", "Ana Lucia Mora", "Fabian Betancourt", "Ricardo Moncayo", "Marianela Arturo", "Janeth Rosero"].map(n => (
                              <li key={n} className="flex items-center gap-3">
                                 <div className="w-2 h-2 bg-[#E5A07B] rounded-full"></div> {n}
                              </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                   <div className="flex flex-col justify-center gap-8">
                      <div className="p-8 bg-[#F2C6AD]/20 rounded-[40px] border-2 border-[#C96F45]/10">
                        <p className="text-[10px] font-black text-[#C96F45] mb-2 tracking-widest uppercase">Elección Administrativa</p>
                        <p className="text-2xl font-black text-[#333333]">ANA LUCIA YEPEZ</p>
                        <p className="text-sm font-bold text-slate-500 mt-2">Designada por unanimidad el 2 de abril de 2025.</p>
                      </div>
                      <div className="p-8 bg-slate-50 rounded-[40px] border-2 border-[#333333]/10">
                        <p className="text-[10px] font-black text-[#333333] mb-2 tracking-widest uppercase">Gestión Contable</p>
                        <p className="text-xl font-black text-[#333333]">LUZ JANETH LÓPEZ</p>
                        <p className="text-xs font-bold text-slate-500 mt-2">Implementación de Word Office y cultura de pago (intereses del 1.5% legal).</p>
                      </div>
                   </div>
                </div>
              </Card>

              {/* GESTIÓN OPERATIVA */}
              <div className="space-y-10">
                 <h3 className="text-2xl font-black text-[#C96F45] border-l-8 border-[#C96F45] pl-6 py-2">Gestión Operativa y Mantenimiento</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <EvidenceSection title="SERVICIOS GENERALES" content="Cambio en la modalidad de jardinería a conserjería de medio tiempo para apoyo en aseo y manejo de basuras." icon={Leaf} />
                    <EvidenceSection title="INFRAESTRUCTURA" content="Pintura y reparación integral del parque infantil con cambio de maderas estructurales." icon={HardHat} />
                    <EvidenceSection title="GESTIÓN AMBIENTAL" content="Campaña de reciclaje y sensibilización. Instrucción al personal sobre manejo de contenedores y refuerzo de bases." icon={Leaf} />
                    <EvidenceSection title="SGSST" content="Verificación del Sistema de Gestión de Seguridad y Salud. Participación en el simulacro nacional del 22 de octubre." icon={ShieldAlert} />
                    <EvidenceSection title="MODERNIZACIÓN" content="Proyecto de modernización del alumbrado común mediante lámparas solares o paneles LED tipo farol." icon={Zap} />
                    <EvidenceSection title="NAVIDAD 2025" content="Decoración uniforme tipo 'lluvia' desde el 15 de nov. Evento comunitario con música en vivo el 13 de diciembre." icon={Calendar} />
                 </div>
              </div>

              {/* TABLAS COMPLETAS */}
              <div className="space-y-12 mt-20">
                <ManagementTable 
                  title="RELACIÓN DE GASTOS MENSUALES FIJOS"
                  headers={["PROVEEDOR / CONTRATISTA", "CONCEPTO", "DETALLE"]}
                  data={[
                    {p: "Ana Lucia Yepez Cordoba", c: "Honorarios", d: "Administración"},
                    {p: "Luz Janeth Lopez Vela", c: "Honorarios", d: "Contabilidad"},
                    {p: "Ranger Security Ltda", c: "Seguridad", d: "Servicio de vigilancia"},
                    {p: "Fundacion Opcion Vida", c: "Mantenimiento", d: "Mantenimiento de zonas verdes"},
                    {p: "Emas SA ESP", c: "Servicios Públicos", d: "Servicio de recolección de aseo"},
                    {p: "Empopasto SA ESP", c: "Servicios Públicos", d: "Servicio de acueducto y alcantarillado"},
                    {p: "Cedenar SA ESP", c: "Servicios Públicos", d: "Servicio de energía eléctrica"},
                    {p: "DIAN", c: "Impuestos", d: "Retención en la fuente"},
                    {p: "Alcaldía de Pasto", c: "Impuestos", d: "Rete ICA"}
                  ].map(i => ({ p: i.p, c: i.c, d: i.d }))}
                  icon={Activity}
                />

                <InvestmentTable 
                  title="1. MANTENIMIENTO DE ZONAS COMUNES Y PARQUE"
                  headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD / DETALLE"]}
                  data={[
                    {p: "Mauricio Maigual", c: "Mantenimiento Parque", d: "Mantenimiento de bancas del parque, zona de juegos y pintura de 6 bancas."},
                    {p: "Fundacion Opcion Vida", c: "Jardinería", d: "Suministro de fertilizantes"},
                    {p: "Jorge Dario Dorado", c: "Ferretería/Obra", d: "Lámina, tornillos, tuercas y mano de obra para mantenimiento de contenedores."}
                  ]}
                  icon={Wrench}
                />

                <InvestmentTable 
                  title="2. MODERNIZACIÓN E ILUMINACIÓN"
                  headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD / DETALLE"]}
                  data={[
                    {p: "Humberto Barrera-Selco", c: "Suministros Eléctricos", d: "Suministro de luminarias"},
                    {p: "Jose Francisco Jojoa", c: "Mano de Obra Eléctrica", d: "Instalación de lámpara con sensor en caseta y cambio de bombillos"},
                    {p: "Inversiones Electronicas y Tecnologicas", c: "Suministros Eléctricos", d: "Suministro luminarias"}
                  ]}
                  icon={Zap}
                />

                <InvestmentTable 
                  title="3. INSUMOS DE ASEO Y GESTIÓN DE RESIDUOS"
                  headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD / DETALLE"]}
                  data={[
                    {p: "Personal de Vigilancia", c: "Mano de Obra", d: "Servicio de aseo en shut de basuras."},
                    {p: "Andres Guerrero", c: "Infraestructura Shut", d: "Suministro de 3 placas shut de basuras 50*40."},
                    {p: "Adriana Milena Barrera Sarasty", c: "Insumos de Aseo", d: "Ambientador de pisos, blanqueador, jabón e insumos varios."},
                    {p: "Distribuidora de Acabados del Sur", c: "Herramientas", d: "Espátula scraper y cepillo popular en acero y plástico."}
                  ]}
                  icon={Cog}
                />

                <InvestmentTable 
                  title="4. SEGURIDAD Y GESTIÓN DE RIESGOS"
                  headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD / DETALLE"]}
                  data={[
                    {p: "Hernan Guzman", c: "CCTV", d: "Arreglo de cámaras, videobalum, conector jark hembra 12V."},
                    {p: "Paola Alejandra Coral Narvaez", c: "Control de Plagas", d: "Dos servicios de desratización y control de roedores."},
                    {p: "Ricardo Fierro Arango", c: "Normatividad", d: "Pago actualización SGSST."}
                  ]}
                  icon={ShieldCheck}
                />

                {/* TABLA DE CONVIVENCIA COMPLETA */}
                <ManagementTable 
                  title="NORMATIVA PARA CONVIVENCIA Y COMPROMISOS"
                  headers={["NORMATIVA", "DISPOSICIÓN", "RESPONSABILIDAD VIGILANCIA"]}
                  data={[
                    {n: "Presentación Personal", d: "Uniforme completo y limpio.", r: "Abstenerse de prendas no autorizadas."},
                    {n: "Actitud de Servicio", d: "Respetuosa y colaborativa.", r: "Brindar orientación y apoyo."},
                    {n: "Permanencia en el Puesto", d: "Durante toda la jornada.", r: "No abandonar sin relevo."},
                    {n: "Control de Ingresos", d: "Registro obligatorio.", r: "Solicitar ID y confirmar autorización."},
                    {n: "Registro en Minuta", d: "Novedades registradas.", r: "Anotaciones claras y oportunas."},
                    {n: "Control del Portón", d: "Operación responsable.", r: "Garantizar flujo adecuado."},
                    {n: "Control de Parqueaderos", d: "Espacios asignados.", r: "Supervisar ocupación indebida."},
                    {n: "Orden y Aseo", d: "Condiciones adecuadas.", r: "Mantener orden en caseta y lockers."},
                    {n: "Manejo de Residuos", d: "Gestión de reciclaje.", r: "Verificar paso del vehículo EMAS."},
                    {n: "Control de Ruido", d: "Respetar horarios.", r: "Atender reportes de ruido excesivo."},
                    {n: "Obras", d: "Horarios establecidos.", r: "Registrar ingreso de trabajadores."},
                    {n: "Mascotas", d: "Bajo control del dueño.", r: "Verificar correa en zonas comunes."}
                  ].map(i => ({ n: i.n, d: i.d, r: i.r }))}
                  icon={Handshake}
                />
              </div>
            </div>
          )}

          {/* SECCIONES FINANCIERAS Y PRESUPUESTO */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="7. Estados Financieros 2025" icon={BarChart3} agendaIndices={[6]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-[60px] p-16 shadow-2xl border-4 border-[#C96F45]/10 flex flex-col items-center text-center">
                  <BarChart3 size={80} className="text-[#C96F45] mb-8" />
                  <h3 className="text-4xl font-black text-[#C96F45] mb-6">CIERRE FISCAL 2025</h3>
                  <p className="text-xl font-bold text-slate-500 mb-10">Preparado por: Luz Janeth López Vela - Contadora</p>
                  <div className="bg-[#F1F1F1] p-10 rounded-[40px] w-full max-w-xl">
                    <p className="text-xs font-black leading-relaxed">Presentación bajo Normas NIIF para Copropiedades Grupo 3.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="8. Proyecto Presupuesto 2026" icon={PieChart} agendaIndices={[7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card highlight title="Definición de Cuotas 2026">
                 <div className="text-center py-20">
                    <Wallet size={100} className="mx-auto text-[#C96F45] mb-8 opacity-20" />
                    <p className="text-2xl font-black text-[#333333]">DISCUSIÓN Y APROBACIÓN DE CUOTAS DE SOSTENIMIENTO</p>
                    <p className="text-sm font-bold text-slate-400 mt-4 uppercase">Propuesta de ingresos y egresos vigencia 2026</p>
                 </div>
              </Card>
            </div>
          )}

          {/* ELECCIONES */}
          {activeSection === 'consejo' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="9-10. Elecciones 2026" icon={Users} agendaIndices={[8, 9]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card title="Candidatos Consejo" icon={Users} highlight>
                  <div className="space-y-6">
                    <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#C96F45]/20">
                      {postuladosConsejo.length === 0 ? <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS</p> : 
                        <div className="flex flex-wrap gap-2">
                          {postuladosConsejo.map(p => (
                            <span key={p} className="bg-[#C96F45] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      }
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0">
                          <span className="text-[11px] font-black">CASA {r.casa} | {r.propietario}</span>
                          <button onClick={() => togglePostulacion(r.propietario, 'consejo')} className={`px-4 py-2 rounded-xl text-[9px] font-black ${postuladosConsejo.includes(r.propietario) ? 'bg-[#333333] text-white' : 'bg-slate-100 text-slate-400'}`}>POSTULAR</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card title="Candidatos Convivencia" icon={HeartPulse}>
                   <div className="space-y-6">
                    <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#salmon]/40">
                      {postuladosConvivencia.length === 0 ? <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS</p> : 
                        <div className="flex flex-wrap gap-2">
                          {postuladosConvivencia.map(p => (
                            <span key={p} className="bg-[#333333] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'convivencia')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      }
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0">
                          <span className="text-[11px] font-black">CASA {r.casa} | {r.propietario}</span>
                          <button onClick={() => togglePostulacion(r.propietario, 'convivencia')} className={`px-4 py-2 rounded-xl text-[9px] font-black ${postuladosConvivencia.includes(r.propietario) ? 'bg-[#C96F45] text-white' : 'bg-slate-100 text-slate-400'}`}>POSTULAR</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* PROPOSICIONES */}
          {activeSection === 'proposiciones' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="11. Proposiciones y Varios" icon={MessageSquare} agendaIndices={[10]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card title="Registrar Proposición" highlight>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  <div className="md:col-span-1 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase">Casa</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#C96F45]/10 rounded-2xl font-black text-xs outline-none" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} placeholder="EJ: 12" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase">Propuesta</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#C96F45]/10 rounded-2xl font-black text-xs outline-none" value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})} placeholder="ESCRIBA AQUÍ..." />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addProposicion} className="w-full bg-[#C96F45] text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-3"><Plus size={18} /> AGREGAR</button>
                  </div>
                </div>
              </Card>
              <div className="space-y-4">
                 {proposiciones.map(p => (
                   <div key={p.id} className="bg-white p-6 rounded-3xl shadow-sm border-2 border-[#salmon]/10 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black text-[#C96F45] mb-1">CASA {p.proponente}</p>
                        <p className="text-sm font-black text-[#333333]">{p.texto}</p>
                      </div>
                      <button onClick={() => deleteProposicion(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={20} /></button>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {/* FINALIZAR */}
          {activeSection === 'final' && (
            <div className="space-y-16 animate-in zoom-in-95 text-center uppercase">
              <div className="flex justify-between items-center print:hidden bg-[#333333] p-10 rounded-[40px] shadow-2xl">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">FINALIZAR SESIÓN 2026</h2>
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL DEL CONJUNTO LAS MARGARITAS</p>
                </div>
                <button onClick={handlePrint} className="bg-[#C96F45] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl transition-all text-xs">
                  <Printer size={24} /> IMPRIMIR ACTA FINAL
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#C96F45] print:shadow-none print:border-none print:p-0 bg-white">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#C96F45] pb-10">
                  <h1 className="text-4xl font-black mb-4 uppercase">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                  <p className="text-xl font-black text-[#C96F45] uppercase">CONJUNTO RESIDENCIAL LAS MARGARITAS - NIT 814.004.843-3</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-slate-50 rounded-[56px] border-2 border-[#C96F45]/10 flex flex-col items-center">
                    <p className="text-[11px] font-black text-[#333333] mb-10 tracking-[0.3em]">Quórum de Cierre</p>
                    <p className="text-7xl font-black text-[#C96F45] leading-none">{totalQuorum.toFixed(2)}%</p>
                  </div>
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#333333] tracking-[0.3em] uppercase leading-none mb-12">Firmas Dignatarios</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-4 border-[#C96F45]/10 pb-4">
                          <p className="text-[9px] text-[#C96F45] mb-2 font-black">PRESIDENTE:</p>
                          <p className="text-lg text-[#333333]">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-4 border-[#C96F45]/10 pb-4">
                          <p className="text-[9px] text-[#C96F45] mb-2 font-black">SECRETARIO(A):</p>
                          <p className="text-lg text-[#333333]">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>
                  <div className="p-12 bg-[#C96F45] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#333333]">
                    <ShieldCheck size={72} className="text-white mb-10 opacity-50" />
                    <p className="text-xl font-black">PASTO, MARZO 2026</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #F1F1F1; }
        @media print {
          @page { margin: 1cm; size: letter; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          table { border-collapse: collapse !important; width: 100% !important; border: 1px solid #000 !important; font-size: 9pt !important; }
          th { background: #C96F45 !important; color: white !important; -webkit-print-color-adjust: exact; padding: 8px !important; border: 1px solid #000 !important; }
          td { border: 1px solid #000 !important; padding: 8px !important; }
        }
      `}} />
    </div> 
  );
}