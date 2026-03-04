import React, { useState, useMemo, useEffect } from 'react';
import { 
  // Navegación e Interfaz
  Home, Layout, ChevronRight, Settings, Plus, Search, 
  // Usuarios y Personas
  Users, UserPlus, UserCheck, 
  // Documentos y Listas
  FileText, ListChecks, ClipboardCheck, FileCheck, CheckSquare, CheckCircle2,
  // Gráficos y Finanzas
  BarChart3, PieChart, TrendingUp, DollarSign, Wallet, Landmark, Percent, ArrowUpRight,
  // Seguridad y Legal
  ShieldCheck, ShieldAlert, Gavel, Scale, AlertCircle, Info,
  // Operación y Edificación
  Building2, HardHat, Wrench, Cog, Zap, Activity, HeartPulse,
  // Comunicación y Multimedia
  MessageSquare, Camera, ExternalLink, Printer, Trash2,
  // Otros
  Calendar, Layers, Leaf, Briefcase
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL EDIFICIO HITO ---
const COLORS = {
  negro: '#1A1A1A',     // Negro Arquitectónico
  grisGrafito: '#3A3A3A',
  blanco: '#FFFFFF',
  grisClaro: '#E5E5E5',
  grisMetal: '#8A8A8A',
  acento: '#1A1A1A'
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-2 pb-6 border-[#1A1A1A]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#1A1A1A] rounded-xl text-white shadow-lg">
        {Icon && <Icon size={28} />}
      </div>
      <div>
        <h2 className="text-3xl font-black text-[#1A1A1A] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[10px] text-[#8A8A8A] font-bold uppercase tracking-[0.2em]">
          {agendaIndices.length > 1 
            ? `Puntos ${agendaIndices.map(i => i + 1).join(' y ')} del Orden del día`
            : `Punto ${agendaIndices[0] + 1} del Orden del día`}
        </p>
      </div>
    </div>
    <button 
      onClick={() => toggleAgendaItem(agendaIndices)}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all border-2 ${
        agendaIndices.every(idx => agendaStatus[idx])
        ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' 
        : 'bg-white border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
      }`}
    >
      <CheckCircle2 size={18} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-2xl shadow-sm border ${highlight ? 'border-[#1A1A1A] ring-2 ring-[#1A1A1A]/5' : 'border-[#E5E5E5]'} p-6 ${className}`}>
    <div className="flex justify-between items-start mb-5">
      {title && <h3 className="text-[12px] font-black text-[#1A1A1A] flex items-center gap-3 uppercase tracking-[0.1em]">
        <div className={`w-1.5 h-6 ${highlight ? 'bg-[#1A1A1A]' : 'bg-[#8A8A8A]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={18} className="text-[#1A1A1A]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#3A3A3A] text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">{badge}</span>}
    </div>
    {children}
  </div>
);

const DataTable = ({ title, headers, data, icon: Icon, total, variant = "default" }) => (
  <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm flex flex-col h-full mb-6">
    <div className={`${variant === "dark" ? 'bg-[#1A1A1A]' : 'bg-[#3A3A3A]'} px-6 py-4 flex justify-between items-center`}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-white" size={18} />}
        <h4 className="text-[11px] font-black text-white uppercase tracking-[0.15em]">{title}</h4>
      </div>
      {total && <div className="bg-white/20 text-white px-3 py-1 rounded-lg text-[10px] font-bold">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#F8F8F8] text-[#1A1A1A] font-black uppercase tracking-wider border-b">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-6 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E5E5] text-[#3A3A3A]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50 transition-colors">
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-6 py-4 font-medium">{val}</td>
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
  "Llamado a lista y verificación de Quorum.",
  "Elección de dignatarios de la asamblea: presidente, secretario/a, Comisión verificadora acta presente reunión.",
  "Lectura y aprobación del orden del día.",
  "Lectura Concepto de la Comisión Verificadora Acta asamblea 2025.",
  "Presentación y aprobación Informe de Administración.",
  "Dictamen e informe de Revisoría Fiscal.",
  "Presentación y aprobación Estados Financieros a diciembre 31 del 2025.",
  "Presentación y Aprobación proyecto de Presupuesto de ingresos y gastos vigencia 2026. Definición cuota de administración.",
  "Nombramiento Consejo de administración 2026 - 2027.",
  "Elección Revisor Fiscal.",
  "Proposiciones y varios."
];

// Mock inicial de copropietarios (solicitado 2 personas + espacio para editar)
const COEFICIENTES_DATA = [
  { id: 1, torre: "OF", unidad: "300", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 2.070475727 },
  { id: 2, torre: "OF", unidad: "301", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.581197305 },
  { id: 3, torre: "OF", unidad: "302", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.250928287 },
  { id: 4, torre: "OF", unidad: "303", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.341905659 },
  { id: 5, torre: "OF", unidad: "304", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.311227242 },
  { id: 6, torre: "OF", unidad: "305", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.284991907 },
  { id: 7, torre: "OF", unidad: "306", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.156988861 },
  { id: 8, torre: "OF", unidad: "307", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.550942039 },
  { id: 9, torre: "OF", unidad: "308", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 1.293994436 },
  { id: 10, torre: "OF", unidad: "309", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 1.014080335 },
  { id: 11, torre: "OF", unidad: "401", propietario: "INES REYES ERAZO", coeficiente: 1.698314803 },
  { id: 12, torre: "OF", unidad: "402", propietario: "ORLANDO VÁSQUEZ B", coeficiente: 1.170434470 },
  { id: 13, torre: "OF", unidad: "403", propietario: "ANDRES/CARLOS VILLOTA", coeficiente: 1.704662061 },
  { id: 14, torre: "OF", unidad: "404", propietario: "NIDIA ARCOS", coeficiente: 1.245966846 },
  { id: 15, torre: "OF", unidad: "405", propietario: "GERARDO GÓMEZ ESPAÑA", coeficiente: 1.126215236 },
  { id: 16, torre: "OF", unidad: "406", propietario: "ADRIANA SOFIA SOLANO", coeficiente: 0.910408446 },
  { id: 17, torre: "OF", unidad: "407", propietario: "CLARITA BRAVO", coeficiente: 1.947127337 },
  { id: 18, torre: "OF", unidad: "501", propietario: "EDGAR JOSE MADROÑERO", coeficiente: 1.460504184 },
  { id: 19, torre: "OF", unidad: "502", propietario: "JAQUELINE MADROÑERO", coeficiente: 1.266278073 },
  { id: 20, torre: "OF", unidad: "503", propietario: "L. ORTEGA / N. PORTILLA", coeficiente: 1.972727946 },
  { id: 21, torre: "OF", unidad: "504", propietario: "ARMANDO CHAMORRO", coeficiente: 1.221212538 },
  { id: 22, torre: "OF", unidad: "505", propietario: "DOA ASOCIADOS SAS", coeficiente: 1.101037777 },
  { id: 23, torre: "OF", unidad: "506", propietario: "ROCIO AGUIRRE PANTOJA", coeficiente: 0.903214886 },
  { id: 24, torre: "OF", unidad: "507", propietario: "ROVIRO CAJIGAS", coeficiente: 1.947127337 },
  { id: 25, torre: "OF", unidad: "601", propietario: "BYV PROYECTOS SAS", coeficiente: 1.457753705 },
  { id: 26, torre: "OF", unidad: "602", propietario: "BYV PROYECTOS SAS", coeficiente: 1.264273010 },
  { id: 27, torre: "OF", unidad: "603", propietario: "BYV PROYECTOS SAS", coeficiente: 1.966712756 },
  { id: 28, torre: "OF", unidad: "604", propietario: "A. ROSERO / M. OCAMPO", coeficiente: 1.125368934 },
  { id: 29, torre: "OF", unidad: "605", propietario: "LUZ YANETH LOPEZ VELA", coeficiente: 1.193496176 },
  { id: 30, torre: "OF", unidad: "606", propietario: "HECTOR LOPEZ & CIA", coeficiente: 2.181129600 },
  { id: 31, torre: "OF", unidad: "701-6", propietario: "GREEN SAS / FAM. ENRIQUEZ", coeficiente: 7.781315787 },
  { id: 32, torre: "OF", unidad: "801", propietario: "SEN SAS", coeficiente: 1.408707452 },
  { id: 33, torre: "OF", unidad: "802", propietario: "SEN SAS", coeficiente: 1.223217596 },
  { id: 34, torre: "OF", unidad: "803-4", propietario: "MONICA IBARRA", coeficiente: 3.941435961 },
  { id: 35, torre: "OF", unidad: "805-6", propietario: "SEN SAS", coeficiente: 2.744766156 },
  { id: 36, torre: "OF", unidad: "901", propietario: "OMAR ERASO / DISREDES", coeficiente: 1.195823504 },
  { id: 37, torre: "OF", unidad: "902", propietario: "ANA MARÍA AGUILAR CRUZ", coeficiente: 1.424747961 },
  { id: 38, torre: "OF", unidad: "903-4", propietario: "DISREDES SAS", coeficiente: 2.124004274 },
  { id: 39, torre: "OF", unidad: "905", propietario: "EMILIO MORENO", coeficiente: 1.348630325 },
  { id: 40, torre: "OF", unidad: "906", propietario: "EMILIO MORENO", coeficiente: 2.169916110 },
  { id: 41, torre: "OF", unidad: "1001-3", propietario: "UNIFORCE SAS", coeficiente: 4.199980958 },
  { id: 42, torre: "OF", unidad: "1004", propietario: "A. PEREZ / J. PABON", coeficiente: 1.299918544 },
  { id: 43, torre: "OF", unidad: "1005", propietario: "RAUL/RODRIGO DIAZ", coeficiente: 1.348630325 },
  { id: 44, torre: "OF", unidad: "1006", propietario: "RAUL/RODRIGO DIAZ", coeficiente: 1.984787737 },
  { id: 45, torre: "OF", unidad: "1101", propietario: "FRACER SAS", coeficiente: 1.424747961 },
  { id: 46, torre: "OF", unidad: "1102-5", propietario: "MALLIESA SAS", coeficiente: 3.478086090 },
  { id: 47, torre: "OF", unidad: "1106", propietario: "FRACER SAS", coeficiente: 2.195516720 },
  { id: 48, torre: "OF", unidad: "1201-6", propietario: "NORCO / ALVARO VILLOTA", coeficiente: 7.636175142 },
  { id: 49, torre: "LC", unidad: "LC 1", propietario: "RODRIGO DIAZ DEL CASTILLO", coeficiente: 1.962149182 },
  { id: 50, torre: "LC", unidad: "LC 2", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 1.250567086 },
  { id: 51, torre: "LC", unidad: "LC 3", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 1.411132717 },
  { id: 52, torre: "LC", unidad: "LC 4", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 3.516804367 },
  { id: 53, torre: "DP", unidad: "DEP 1", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.176876937 },
  { id: 54, torre: "DP", unidad: "DEP 2", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.173267540 }
];
export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  // Persistencia de estados
  const [asistencia, setAsistencia] = useState(() => {
    try {
      const saved = localStorage.getItem('asistencia_hito_2026');
      return saved ? JSON.parse(saved) : COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    } catch (e) {
      return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    }
  });
  
  const [agendaStatus, setAgendaStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('agenda_hito_2026');
      return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
    } catch (e) {
      return new Array(ORDEN_DIA.length).fill(false);
    }
  });

  const [dignatarios, setDignatarios] = useState({ presidente: '', secretario: '', comision: '' });
  const [proposiciones, setProposiciones] = useState([]);
  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });

  useEffect(() => {
    localStorage.setItem('asistencia_hito_2026', JSON.stringify(asistencia));
    localStorage.setItem('agenda_hito_2026', JSON.stringify(agendaStatus));
  }, [asistencia, agendaStatus]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(4));
  }, [asistencia]);

  const progress = useMemo(() => (agendaStatus.filter(i => i).length / ORDEN_DIA.length) * 100, [agendaStatus]);

    // 1. Función para un solo propietario
  const toggleAsistencia = (id) => {
    console.log("Cambiando asistencia para ID:", id); // Para depuración
    setAsistencia(prev => 
      prev.map(item => 
        item.id === id ? { ...item, presente: !item.presente } : item
      )
    );
  };

  // 2. Función para marcar/desmarcar TODOS (que te faltaba)
  const toggleAllAsistencia = () => {
    setAsistencia(prev => {
      // Si todos están presentes, desmarcamos todos. Si no, marcamos todos.
      const todosPresentes = prev.every(a => a.presente);
      return prev.map(a => ({ ...a, presente: !todosPresentes }));
    });
  };

  const toggleAgendaItem = (indices) => {
    setAgendaStatus(prev => {
      const nuevo = [...prev];
      const anyUnfinished = indices.some(idx => !nuevo[idx]);
      indices.forEach(idx => { nuevo[idx] = anyUnfinished; });
      return nuevo;
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F8F8F8] font-sans text-[#1A1A1A] print:bg-white">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#1A1A1A] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-8 text-center border-b border-white/5 bg-[#1A1A1A]">
          <div className="flex justify-center mb-4">
             <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center rounded-2xl">
                <Building2 className="text-[#8A8A8A]" size={32} />
             </div>
          </div>
          <h1 className="text-white font-black text-xl tracking-tight uppercase leading-none">
            EDIFICIO <span className="text-[#8A8A8A] block text-lg">HITO PH</span>
          </h1>
          <p className="text-[9px] font-bold text-white/40 uppercase mt-2 tracking-[0.3em]">Asamblea General 2026</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'dignatarios', label: '2. Dignatarios', icon: UserPlus },
            { id: 'orden', label: '3. Orden del Día', icon: ListChecks },
            { id: 'gestion', label: '5. Informe Gestión', icon: TrendingUp },
            { id: 'financiero', label: '7. Estados Financieros', icon: BarChart3 },
            { id: 'presupuesto', label: '8. Presupuesto', icon: PieChart },
            { id: 'seguros', label: 'Pólizas de Seguro', icon: ShieldCheck },
            { id: 'proposiciones', label: '11. Proposiciones', icon: MessageSquare },
            { id: 'final', label: 'Finalizar Acta', icon: Printer },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all text-[10px] font-black uppercase tracking-wider ${
                activeSection === item.id 
                ? 'bg-white text-[#1A1A1A] shadow-lg' 
                : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5 text-[9px] font-bold text-center opacity-30 uppercase tracking-widest">
            NIT: 901.666.109-0
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-72 flex-1 h-screen overflow-y-auto pb-20 print:ml-0">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-[#E5E5E5] px-10 py-5 flex justify-between items-center print:hidden">
          <div className="flex gap-12">
            <div>
              <span className="text-[9px] font-black text-[#8A8A8A] uppercase tracking-widest">Quórum</span>
              <div className="flex items-center gap-3 mt-0.5">
                <span className={`text-2xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#1A1A1A]' : 'text-slate-400'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${totalQuorum >= 50.1 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            <div className="border-l pl-10">
              <span className="text-[9px] font-black text-[#8A8A8A] uppercase tracking-widest">Progreso</span>
              <div className="flex items-center gap-3 mt-1.5">
                 <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1A1A1A] transition-all duration-700" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-[10px] font-black text-[#1A1A1A]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
               <p className="text-[11px] font-black text-[#1A1A1A] uppercase">EDIFICIO HITO PH</p>
               <p className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-tighter">Ana Lucia Yepez | Admin.</p>
            </div>
            <div className="h-10 w-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-white">
               <ShieldCheck size={20} />
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-10 space-y-12 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-8 animate-in fade-in duration-700">
               <div className="bg-[#1A1A1A] rounded-3xl p-16 text-white relative overflow-hidden shadow-xl border-b-[8px] border-[#3A3A3A]">
                  <div className="relative z-10">
                     <span className="bg-white/10 text-white text-[9px] font-black uppercase px-6 py-2 rounded-full mb-8 inline-block tracking-[0.3em] border border-white/10">Citación Oficial</span>
                     <h1 className="text-7xl font-black mb-4 leading-none tracking-tighter uppercase">EDIFICIO <span className="text-[#8A8A8A] block">HITO</span></h1>
                     <p className="text-white/60 max-w-xl text-lg font-bold leading-relaxed uppercase tracking-widest">Asamblea General Ordinaria 2026<br/>Gestión 2025 - San Juan de Pasto</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card title="Identificación" highlight>
                    <div className="space-y-2 pt-1 text-[#3A3A3A]">
                       <p className="text-[10px] font-black uppercase tracking-widest text-[#8A8A8A]">NIT: 901.666.109-0</p>
                       <p className="text-sm font-bold">Carrera 37 No. 19B-35</p>
                    </div>
                  </Card>
                  <Card title="Convocatoria">
                    <div className="space-y-2 pt-1 text-[#3A3A3A]">
                       <p className="text-sm font-black">Miércoles 4 de Marzo 2026</p>
                       <p className="text-[10px] font-bold text-[#8A8A8A] uppercase">7:00 P.M. - Auditorio Hito</p>
                    </div>
                  </Card>
                  <Card title="Segunda Citación" className="bg-[#E5E5E5] border-none">
                    <div className="space-y-1 pt-1">
                       <p className="text-[10px] font-black uppercase tracking-tight">Lunes 9 de Marzo 2026</p>
                       <p className="text-[9px] font-bold text-[#3A3A3A]">En caso de falta de quórum inicial</p>
                    </div>
                  </Card>
               </div>
            </div>
          )}

          {/* SECCIÓN 1: QUORUM */}
          {activeSection === 'quorum' && (
            <div className="space-y-8 animate-in slide-in-from-right-10">
              <SectionHeader title="1. Registro y Quórum" icon={Users} agendaIndices={[0]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="flex justify-between items-center">
                <div className="relative group w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={18} />
                  <input 
                    type="text" 
                    placeholder="BUSCAR UNIDAD O PROPIETARIO..." 
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#E5E5E5] rounded-xl font-bold text-[11px] uppercase tracking-wider outline-none focus:border-[#1A1A1A] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={toggleAllAsistencia}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest bg-[#1A1A1A] text-white border-b-4 border-black/20 hover:scale-105 transition-all shadow-lg"
                  >
                    <UserCheck size={18} /> Marcar/Quitar Todos
                  </button>
                </div>
                
                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-xl border border-[#E5E5E5]">
                  <div className="text-right">
                      <p className="text-[8px] font-black text-[#8A8A8A] uppercase tracking-widest leading-none mb-1">PRESENTES</p>
                      <p className="text-xl font-black text-[#1A1A1A]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                  </div>
                  <Users className="text-[#1A1A1A]" size={28} />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-[#F8F8F8] text-[#1A1A1A] font-black uppercase tracking-widest text-[9px] border-b">
                    <tr>
                      <th className="px-8 py-5">UNIDAD</th>
                      <th className="px-8 py-5">COPROPIETARIO</th>
                      <th className="px-8 py-5 text-center">COEFICIENTE (%)</th>
                      <th className="px-8 py-5 text-center">ASISTENCIA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px] font-bold">
                    {asistencia.filter(a => a.unidad.includes(searchTerm) || a.propietario.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                      <tr key={item.id} className={`${item.presente ? 'bg-slate-50' : ''}`}>
                        <td className="px-8 py-5 font-black text-[#1A1A1A]">{item.unidad}</td>
                        <td className="px-8 py-5 uppercase">{item.propietario}</td>
                        <td className="px-8 py-5 text-center">{item.coeficiente.toFixed(4)}%</td>
                        <td className="px-8 py-5 text-center">
                          <button 
                            onClick={() => toggleAsistencia(item.id)} 
                            className={`px-4 py-1.5 rounded-lg text-[9px] font-black transition-all ${
                              item.presente ? 'bg-[#1A1A1A] text-white' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {item.presente ? 'PRESENTE' : 'AUSENTE'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: DIGNATARIOS (CORREGIDO) */}
          {activeSection === 'dignatarios' && (
            <div className="space-y-10 animate-in zoom-in-95 uppercase">
              <SectionHeader title="2. Dignatarios de Asamblea" icon={UserPlus} agendaIndices={[1]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Card title="Mesa Directiva" icon={ShieldCheck} highlight>
                  <div className="space-y-8 pt-4">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 tracking-widest">Presidente de Asamblea</label>
                      <input 
                        type="text" 
                        className="w-full p-6 bg-slate-50 border-2 border-[#1A1A1A]/10 rounded-2xl font-black uppercase text-xs focus:border-[#1A1A1A] outline-none shadow-inner" 
                        placeholder="Nombre completo..." 
                        value={dignatarios.presidente}
                        onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 tracking-widest">Secretario(a)</label>
                      <input 
                        type="text" 
                        className="w-full p-6 bg-slate-50 border-2 border-[#1A1A1A]/10 rounded-2xl font-black uppercase text-xs focus:border-[#1A1A1A] outline-none shadow-inner" 
                        placeholder="Nombre completo..." 
                        value={dignatarios.secretario}
                        onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})}
                      />
                    </div>
                  </div>
                </Card>

                <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                  <div className="space-y-8 pt-4">
                    <div className="p-6 bg-[#1A1A1A]/5 rounded-3xl border-2 border-dashed border-[#1A1A1A]/20">
                      <p className="text-[10px] font-black text-[#1A1A1A] mb-4">MIEMBROS COMISIÓN 2026 (PRESENTES):</p>
                      <textarea 
                        className="w-full p-6 bg-white border-2 border-[#1A1A1A]/10 rounded-2xl font-black uppercase text-xs h-32 outline-none focus:border-[#1A1A1A]" 
                        placeholder="Ingrese nombres de los designados..."
                        value={dignatarios.comision2026}
                        onChange={(e) => setDignatarios({...dignatarios, comision2026: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 3: ORDEN DEL DÍA */}
          {activeSection === 'orden' && (
            <div className="space-y-8 animate-in fade-in">
              <SectionHeader title="3. Orden del Día" icon={ListChecks} agendaIndices={[2]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card highlight title="Puntos del Orden del Día">
                <div className="space-y-3 pt-4">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${agendaStatus[idx] ? 'border-[#1A1A1A] bg-slate-50' : 'border-[#E5E5E5] bg-white'}`}>
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${agendaStatus[idx] ? 'bg-[#1A1A1A] text-white' : 'bg-[#3A3A3A] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[11px] font-bold uppercase tracking-tight ${agendaStatus[idx] ? 'text-[#1A1A1A]' : 'text-[#3A3A3A]'}`}>
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* SECCIÓN 6: INFORME DE GESTIÓN INTEGRAL (RÉPLICA EXACTA DEL WORD) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader 
                title="6. Informe Integral de Gestión 2025" 
                icon={TrendingUp} 
                agendaIndices={[5]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              {/* PARTE I: GESTIÓN ADMINISTRATIVA ANUAL */}
              <div className="grid grid-cols-1 gap-8">
                <Card title="PARTE I: Gestión Administrativa (Enero - Septiembre)" icon={UserPlus}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {[
                      { label: "Fachadas", desc: "Limpieza general de vidrios exteriores finalizada en Junio.", cost: "$12.000.000" },
                      { label: "Impermeabilización", desc: "Fisuras piso 13, flanches y sellado de ventanas.", cost: "$3.629.049" },
                      { label: "Salud (Botiquín)", desc: "Adquisición de camilla y botiquín (Req. Sec. Salud).", cost: "$350.000" },
                      { label: "Extintores", desc: "Recarga en dos etapas (10 en abril, 14 en julio).", cost: "SEGÚN PLAN" },
                      { label: "Aguas Lluvias", desc: "Adecuación ductería de extracción para motobomba.", cost: "$630.000" },
                      { label: "Montacoches", desc: "Señalización, cinta reflectiva y 3 finales de carrera.", cost: "$1.251.000" },
                      { label: "Iluminación", desc: "Reemplazo de lámparas LED en pasillos (Mayo).", cost: "MANTTO." },
                      { label: "Software SIGO", desc: "Renovación licencia facturación electrónica (Junio).", cost: "LICENCIA" },
                      { label: "Planta Eléctrica", desc: "Mantenimiento preventivo, cambio aceite y filtros.", cost: "$1.565.000" },
                      { label: "Ascensor C", desc: "Cambio de tarjeta principal para servicio.", cost: "$1.669.173" },
                      { label: "Rep. Montacoches", desc: "Sustitución de válvula hidráulica.", cost: "$737.800" },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <h5 className="text-[10px] font-black text-[#B65A3A] mb-1">{item.label}</h5>
                        <p className="text-[10px] font-medium text-slate-500 mb-2 leading-tight">{item.desc}</p>
                        <p className="text-xs font-black text-[#1A1A1A]">{item.cost}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card title="Transición y Nueva Gestión (Octubre - Diciembre)" icon={UserCheck} highlight>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-[#B65A3A] tracking-widest">PROCESOS DE EMPALME</h4>
                      <ul className="space-y-3 text-[11px] font-bold text-slate-700">
                        <li>• 02 OCT: Empalme formal Fabio García España / Ana Lucía Yepez C.</li>
                        <li>• 24 OCT: Entrega contable formal con corte al 30 de septiembre.</li>
                        <li>• Planeación Municipal: Obtención de Resolución Representación Legal.</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-[#B65A3A] tracking-widest">GESTIÓN FINANCIERA</h4>
                      <ul className="space-y-3 text-[11px] font-bold text-slate-700">
                        <li>• DIAN: Actualización del RUT de la Copropiedad.</li>
                        <li>• GNB Sudameris: Inclusión en Grupo Económico para tarifas $0.</li>
                        <li>• Consolidación de base de datos de residentes y censo 2025.</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>

              {/* PARTE II: RELACIÓN FINANCIERA Y GASTOS */}
              <div className="space-y-8">
                <DataTable 
                  title="1. GASTOS MENSUALES FIJOS (OCT - DIC)"
                  headers={["PROVEEDOR", "CONCEPTO", "DETALLE"]}
                  data={[
                    {p: "EMPOPASTO SA ESP", c: "SERVICIOS PÚBLICOS", d: "ACUEDUCTO Y ALCANTARILLADO OCT-DIC"},
                    {p: "CEDENAR SA ESP", c: "SERVICIOS PÚBLICOS", d: "ENERGÍA ZONAS COMUNES SEP-NOV"},
                    {p: "EVOLTI COMPANY SAS", c: "SERVICIOS PÚBLICOS", d: "ENERGÍA SOLAR SEP-NOV"},
                    {p: "SEGURIDAD DEL SUR", c: "SEGURIDAD", d: "VIGILANCIA OCT-NOV"},
                    {p: "CLARITA SOLUCIONES", c: "ASEO Y LOGÍSTICA", d: "ASEO Y PARQUEADEROS OCT-DIC"},
                    {p: "SOLUCIONES VERTICALES", c: "MANTENIMIENTO", d: "ASCENSORES OCT-DIC"},
                    {p: "ALBEIRO BASTIDAS", c: "MANTENIMIENTO", d: "PLANTA ELÉCTRICA OCT-DIC"},
                    {p: "IDEAMOS MAS SAS", c: "TECNOLOGÍA", d: "REGISTRO PARQUEADEROS OCT-DIC"},
                    {p: "ANA LUCÍA YEPEZ", c: "HONORARIOS", d: "ADMINISTRACIÓN OCT-DIC"},
                    {p: "LUZ JANETH LOPEZ", c: "HONORARIOS", d: "CONTABILIDAD OCT-DIC"},
                    {p: "ROSA ALBA CAMPIÑO", c: "HONORARIOS", d: "REVISORÍA FISCAL OCT-DIC"},
                    {p: "DIAN / ALCALDÍA", c: "IMPUESTOS", d: "RETEFUENTE (8-11) Y RETE ICA B5"},
                    {p: "COLOMBIA TELECOM", c: "TELECOM.", d: "PAQUETE DATOS 90 DÍAS"}
                  ]}
                  variant="dark"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <DataTable 
                    title="OBRA A: ACCESO Y FOTOCELDAS"
                    headers={["PROVEEDOR", "ACTIVIDAD"]}
                    data={[
                      {p: "IMAP INGENIERIA", a: "ANTICIPO 70% BARRERA ÓPTICA"},
                      {p: "USAG IMAP SAS", a: "SUMINISTRO FOTOCELDA"},
                      {p: "USAG IMAP SAS", a: "SALDO INSTALACIÓN FOTOCELDA"}
                    ]}
                  />
                  <DataTable 
                    title="OBRA B: EMERGENCIAS Y PLATAFORMAS"
                    headers={["PROVEEDOR", "ACTIVIDAD"]}
                    data={[
                      {p: "USAG IMAP SAS", a: "MANT. EMERGENCIA FEUS81 Y FEUS84"},
                      {p: "USAG IMAP SAS", a: "MANT. PLATAFORMA FEUS 80 Y FEUS 97"},
                      {p: "USAG IMAP SAS", a: "SUMINISTRO REPUESTOS FEUS105"}
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <DataTable 
                    title="OBRA C: LOCATIVOS Y VIDRIOS"
                    headers={["PROVEEDOR", "ACTIVIDAD"]}
                    data={[
                      {p: "SIN ESPECIFICAR", a: "ARREGLO PUERTA SEXTO PISO"},
                      {p: "ANA LUCÍA YEPEZ", a: "REINTEGRO LLAVE, OF. 502 Y FUGA P9"},
                      {p: "JAVIER BOTINA", a: "ARREGLO DE CHAPA"},
                      {p: "LEONARD MAIGUAL", a: "INSTALACIÓN VIDRIO TEMPLADO"}
                    ]}
                  />
                  <DataTable 
                    title="OBRA D: SALUD, SEGURIDAD Y JARDÍN"
                    headers={["PROVEEDOR", "ACTIVIDAD"]}
                    data={[
                      {p: "ANDRES TOBAR", a: "2 EXTINTORES Y SOPORTES"},
                      {p: "PAOLA CORAL", a: "SERVICIO DE FUMIGACIÓN"},
                      {p: "HERNAN FIGUEROA", a: "MANTTO. RED CONTRA INCENDIOS"},
                      {p: "ANDRES GUERRERO", a: "8 PLACAS DE ACRÍLICO"},
                      {p: "NELSON GUERRERO", a: "MANTENIMIENTO JARDINERÍA"}
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <DataTable 
                    title="OBRA E: INSUMOS DE ASEO"
                    headers={["PROVEEDOR", "ACTIVIDAD"]}
                    data={[
                      {p: "ADRIANA BARRERA", a: "INSUMOS ASEO FE 5256"},
                      {p: "ADRIANA BARRERA", a: "INSUMOS ASEO FE 5233"},
                      {p: "ADRIANA BARRERA", a: "INSUMOS ASEO FE 5277"},
                      {p: "ADRIANA BARRERA", a: "INSUMOS ASEO FE 5182"}
                    ]}
                  />
                  <DataTable 
                    title="OBRA F: FINANCIERO Y BIENESTAR"
                    headers={["DESTINO", "ACTIVIDAD"]}
                    data={[
                      {p: "GNB SUDAMERIS", a: "TRASLADO FONDOS DAVIVIENDA ($66M TOTAL)"},
                      {p: "PERSONAL EDIFICIO", a: "BONOS DE NAVIDAD"},
                      {p: "ADMINISTRACIÓN", a: "REEMBOLSO CAJA MENOR"}
                    ]}
                  />
                </div>

                <Card title="Detalle Gastos Caja Menor (Octubre - Diciembre)" icon={Wallet}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[10px]">
                      <thead className="bg-slate-50 border-b">
                        <tr className="font-black text-slate-400">
                          <th className="px-4 py-3">CONCEPTO</th>
                          <th className="px-4 py-3">DETALLE ESPECÍFICO</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-bold text-slate-600">
                        <tr><td className="px-4 py-2">PAPELERÍA</td><td className="px-4 py-2">3 TALONARIOS, TINTA, SEPARADOR KEEPER MATE</td></tr>
                        <tr><td className="px-4 py-2">PAPELERÍA</td><td className="px-4 py-2">3 RESMAS PAPEL CARTA, ROLLO TÉRMICO</td></tr>
                        <tr><td className="px-4 py-2">BIENESTAR</td><td className="px-4 py-2">DULCES HALLOWEEN Y SOBRES BONOS NAVIDEÑOS</td></tr>
                        <tr><td className="px-4 py-2">MANTENIMIENTO</td><td className="px-4 py-2">CEMENTO BLANCO, INSECTICIDA, BROCA MURO</td></tr>
                        <tr><td className="px-4 py-2">MANTENIMIENTO</td><td className="px-4 py-2">ACOPLE MONOCONTROL + TRANSPORTE</td></tr>
                        <tr><td className="px-4 py-2">EQUIPOS</td><td className="px-4 py-2">TRABAJO TÉCNICO MONT ACOCHES</td></tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* PARTE III: PÓLIZAS DE SEGURO */}
              <div className="space-y-8">
                <div className="bg-[#B65A3A] p-12 rounded-[50px] text-white relative overflow-hidden shadow-xl">
                  <div className="z-10 relative">
                    <h3 className="text-4xl font-black mb-2">PÓLIZAS SEGUROS DEL ESTADO</h3>
                    <p className="text-white/70 font-bold tracking-widest">COBERTURA INTEGRAL VIGENCIA 2025-2026</p>
                  </div>
                  <ShieldCheck size={120} className="absolute right-[-20px] bottom-[-20px] text-white/10" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[40px] border-2 border-slate-100 space-y-6">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-black text-slate-800 uppercase">1. Póliza Copropiedad</h4>
                      <span className="bg-green-100 text-green-700 text-[9px] px-3 py-1 rounded-full font-black">ACTIVA</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500">Bienes Comunes y Privados | Póliza 41-22-101000460</p>
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400">SUMA ASEGURADA</span>
                        <span className="text-lg font-black text-slate-800">$21.430.356.065</span>
                      </div>
                      <div className="bg-[#B65A3A]/5 p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-[10px] font-black text-[#B65A3A]">PRIMA TOTAL + IVA</span>
                        <span className="text-lg font-black text-[#B65A3A]">$30.262.878</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[40px] border-2 border-slate-100 space-y-6">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-black text-slate-800 uppercase">2. Póliza D&O (RC Directores)</h4>
                      <span className="bg-green-100 text-green-700 text-[9px] px-3 py-1 rounded-full font-black">ACTIVA</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500">Responsabilidad Civil Residencial | Póliza 41-01-101000458</p>
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400">SUMA ASEGURADA</span>
                        <span className="text-lg font-black text-slate-800">$1.000.000.000</span>
                      </div>
                      <div className="bg-[#B65A3A]/5 p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-[10px] font-black text-[#B65A3A]">PRIMA TOTAL + IVA</span>
                        <span className="text-lg font-black text-[#B65A3A]">$1.666.000</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2B2B2B] p-10 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-[#B65A3A] rounded-2xl"><DollarSign size={32}/></div>
                    <div>
                      <p className="text-[10px] font-black text-white/40 tracking-widest">TOTAL INVERSIÓN PÓLIZAS 2025</p>
                      <p className="text-4xl font-black">$31.928.878</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white/40 italic">Protección total de activos y responsabilidad civil</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* SECCIÓN PÓLIZAS */}
          {activeSection === 'seguros' && (
            <div className="space-y-8 animate-in zoom-in-95">
              <SectionHeader title="Pólizas de Seguro" icon={ShieldCheck} agendaIndices={[]} agendaStatus={agendaStatus} toggleAgendaItem={() => {}} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card title="Póliza Copropiedad" highlight icon={Landmark}>
                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-[10px] font-black text-[#8A8A8A]">ASEGURADORA</span>
                      <span className="text-[10px] font-black">SEGUROS DEL ESTADO S.A.</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-[10px] font-black text-[#8A8A8A]">VIGENCIA</span>
                      <span className="text-[10px] font-black">01/01/2026 - 01/01/2027</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <p className="text-[9px] font-black text-[#8A8A8A] mb-1">SUMA ASEGURADA TOTAL</p>
                      <p className="text-2xl font-black text-[#1A1A1A]">$21.430.356.065</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-[#8A8A8A]">PRIMA TOTAL</p>
                       <p className="text-lg font-black text-[#1A1A1A]">$30.262.878</p>
                    </div>
                  </div>
                </Card>

                <Card title="Responsabilidad Civil (D&O)" icon={ShieldAlert}>
                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-[10px] font-black text-[#8A8A8A]">ASEGURADORA</span>
                      <span className="text-[10px] font-black">SEGUROS DEL ESTADO S.A.</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-[10px] font-black text-[#8A8A8A]">VIGENCIA</span>
                      <span className="text-[10px] font-black">01/01/2025 - 01/01/2026</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <p className="text-[9px] font-black text-[#8A8A8A] mb-1">SUMA ASEGURADA</p>
                      <p className="text-2xl font-black text-[#1A1A1A]">$1.000.000.000</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-[#8A8A8A]">PRIMA TOTAL</p>
                       <p className="text-lg font-black text-[#1A1A1A]">$1.666.000</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="bg-[#1A1A1A] p-8 rounded-2xl text-white flex justify-between items-center shadow-xl">
                 <div>
                    <h4 className="text-[10px] font-black text-[#8A8A8A] uppercase tracking-widest mb-1">Consolidado Seguros</h4>
                    <p className="text-2xl font-black uppercase tracking-tight">Inversión Total Pólizas</p>
                 </div>
                 <div className="text-right">
                    <p className="text-4xl font-black tracking-tighter">$31.928.878</p>
                 </div>
              </div>
            </div>
          )}

          {/* SECCIÓN FINAL */}
          {activeSection === 'final' && (
            <div className="space-y-12 animate-in zoom-in-95 text-center">
              <div className="bg-white border border-[#E5E5E5] p-12 rounded-3xl shadow-sm">
                <Printer size={48} className="mx-auto mb-6 text-[#1A1A1A]" />
                <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">FINALIZAR ASAMBLEA</h2>
                <p className="text-sm font-bold text-[#8A8A8A] mb-10 max-w-md mx-auto uppercase">Genere el acta oficial del Edificio Hito PH con los resultados de la sesión.</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => window.print()} className="bg-[#1A1A1A] text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
                    Imprimir Acta Final
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                 <div className="border-t-2 border-[#1A1A1A] pt-4">
                    <p className="text-[9px] font-black text-[#8A8A8A] uppercase mb-12">Presidente de Asamblea</p>
                    <div className="h-0.5 bg-slate-200 w-full mb-2"></div>
                    <p className="text-[10px] font-bold">Firma y Cédula</p>
                 </div>
                 <div className="border-t-2 border-[#1A1A1A] pt-4">
                    <p className="text-[9px] font-black text-[#8A8A8A] uppercase mb-12">Secretario de Asamblea</p>
                    <div className="h-0.5 bg-slate-200 w-full mb-2"></div>
                    <p className="text-[10px] font-bold">Firma y Cédula</p>
                 </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }

        @media print {
          @page { margin: 1.5cm; size: letter; }
          html, body { background: white !important; font-size: 9pt !important; color: black !important; }
          aside, header, button, input, textarea, .print\\:hidden { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-5xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          .Card, .bg-white { border: 1px solid #000 !important; box-shadow: none !important; break-inside: avoid; }
          table { border-collapse: collapse !important; border: 1px solid #000 !important; }
          th { background: #000 !important; color: white !important; -webkit-print-color-adjust: exact; padding: 5px !important; }
          td { border: 1px solid #000 !important; padding: 5px !important; }
        }
      `}} />
    </div> 
  );
}