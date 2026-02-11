import React, { useState, useMemo } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, Save, Clock, UserPlus, Download, 
  CheckCircle2, Printer, ChevronRight, Trash2, TrendingUp, Settings,
  ClipboardCheck, AlertTriangle, Info, Camera, Zap, Droplets, Shield,
  BookOpen, Scale, FolderOpen, AlertCircle, CheckCircle, Wallet, Gavel,
  Construction, Activity, HeartPulse, HardHat, Landmark, ListChecks
} from 'lucide-react';

// --- COMPONENTES DE UI EXTERNOS ---
const SectionHeader = ({ title, icon: Icon, agendaIndex, agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b pb-4 border-slate-200 print:hidden">
    <div className="flex items-center gap-3">
      <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
        {Icon && <Icon size={24} />}
      </div>
      <div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{title}</h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          {agendaIndex === 2 ? 'Puntos 3 y 4 del Orden del día' : 
           agendaIndex === 5 ? 'Puntos 5 y 6 del Orden del día' : 
           agendaIndex === 6 ? 'Puntos 7 y 8 del Orden del día' : 
           agendaIndex === 9 ? 'Puntos 10 y 11 del Orden del día' : 
           `Punto ${agendaIndex + 1} del Orden del día`}
        </p>
      </div>
    </div>
    <button 
      onClick={() => toggleAgendaItem(agendaIndex)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all border-2 ${
        agendaStatus[agendaIndex] 
        ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100' 
        : 'bg-white border-slate-200 text-slate-400 hover:border-emerald-500 hover:text-emerald-500'
      }`}
    >
      <CheckCircle2 size={18} />
      {agendaStatus[agendaIndex] ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {title && <h3 className="text-lg font-bold text-slate-700 mb-5 flex items-center gap-2 text-balance">
      <div className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0"></div>
      {title}
    </h3>}
    {children}
  </div>
);

// === BASE DE DATOS COPROPIEDAD ===
const INITIAL_DATA = [
  { id: 1, unidad: '101', propietario: 'ROSA M GONZALES', coeficiente: 2.55 },
  { id: 2, unidad: '102', propietario: 'ZOILA MARIA GARZON', coeficiente: 2.09 },
  { id: 3, unidad: '103', propietario: 'MERCEDES JURADO', coeficiente: 2.84 },
  { id: 4, unidad: '201', propietario: 'OSCAR DELGADO', coeficiente: 4.14 },
  { id: 5, unidad: '202', propietario: 'DORIS OBANDO', coeficiente: 4.47 },
  { id: 6, unidad: '203', propietario: 'MARGOTH DE GUERRERO', coeficiente: 1.92 },
  { id: 7, unidad: '204', propietario: 'MARINO DELGADO', coeficiente: 3.76 },
  { id: 8, unidad: '205', propietario: 'GUIDO FERNANDO PALOMINO', coeficiente: 2.78 },
  { id: 9, unidad: '206', propietario: 'CESAR DUQUE', coeficiente: 4.87 },
  { id: 10, unidad: '301', propietario: 'CLAUDIA SOLARTE', coeficiente: 4.12 },
  { id: 11, unidad: '302', propietario: 'EDGAR DELGADO', coeficiente: 4.47 },
  { id: 12, unidad: '303', propietario: 'LEONOR SARASTY', coeficiente: 1.92 },
  { id: 13, unidad: '304', propietario: 'FERNANDO LOZANO', coeficiente: 3.78 },
  { id: 14, unidad: '305', propietario: 'MIRIAM ACOSTA', coeficiente: 2.78 },
  { id: 15, unidad: '306', propietario: 'LILIANA ESCOBAR', coeficiente: 4.47 },
  { id: 16, unidad: '401', propietario: 'JORGE WHITE', coeficiente: 4.14 },
  { id: 17, unidad: '402', propietario: 'ARMANDO MUÑOZ', coeficiente: 4.85 },
  { id: 18, unidad: '403', propietario: 'CARMENZA RIVAS', coeficiente: 1.92 },
  { id: 19, unidad: '404', propietario: 'RAUL VILLOTA', coeficiente: 3.78 },
  { id: 20, unidad: '405', propietario: 'ALVARO ALBORNOZ', coeficiente: 2.72 },
  { id: 21, unidad: '406', propietario: 'LUIS NARVAEZ', coeficiente: 2.85 },
  { id: 22, unidad: '407', propietario: 'ALEXANDRA RUIZ', coeficiente: 2.04 },
  { id: 23, unidad: '501', propietario: 'MARGOTH PAZ', coeficiente: 4.14 },
  { id: 24, unidad: '502', propietario: 'CARLOS MUÑOZ', coeficiente: 4.47 },
  { id: 25, unidad: '503', propietario: 'YOLANDA BASTIDAS', coeficiente: 1.90 },
  { id: 26, unidad: '504', propietario: 'VIVIANA INSUASTY', coeficiente: 3.78 },
  { id: 27, unidad: '505', propietario: 'JIMENA SANTACRUZ', coeficiente: 2.72 },
  { id: 28, unidad: '506', propietario: 'SANDRA CHAVEZ', coeficiente: 2.85 },
  { id: 29, unidad: '507', propietario: 'JOSE OBANDO', coeficiente: 2.43 },
  { id: 30, unidad: '601', propietario: 'MIRIAM CHAVEZ', coeficiente: 1.63 },
  { id: 31, unidad: 'L1', propietario: 'MIRIAM DEL C. GARCIA', coeficiente: 0.97 },
  { id: 32, unidad: 'L2', propietario: 'MARTHA ACOSTA', coeficiente: 0.94 },
  { id: 33, unidad: 'L3', propietario: 'FABIAN ERAZO ACOSTA', coeficiente: 0.90 }
];

const ORDEN_DIA_OFICIAL = [
  "Registro y verificación del quórum.",
  "Lectura y aprobación del orden del día.",
  "Elección de dignatarios de la Asamblea (presidente, secretario, comisión verificadora del texto del acta).",
  "Lectura del concepto de la comisión verificadora del acta de la asamblea.",
  "Informe Consejo de administración.",
  "Presentación y aprobación informe de administración.",
  "Estados financieros a diciembre 31 de 2025 y ejecución presupuestal año 2025.",
  "Dictamen e informe de Revisoría Fiscal.",
  "Presupuesto 2026 y cuotas de administración.",
  "Nombramiento del consejo de administración período 2026 - 2027.",
  "Elección Revisor Fiscal período 2026-2027.",
  "Proposiciones y varios."
];

export default function App() {
  const [activeSection, setActiveSection] = useState('bienvenida');
  const [asistencia, setAsistencia] = useState(INITIAL_DATA.map(c => ({ ...c, presente: false })));
  const [agendaStatus, setAgendaStatus] = useState(new Array(ORDEN_DIA_OFICIAL.length).fill(false));
  const [dignatarios, setDignatarios] = useState({ presidente: '', secretario: '', comision: '' });
  const [obsAgenda, setObsAgenda] = useState("");
  const [proposiciones, setProposiciones] = useState([]);
  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });
  const [postuladosConsejo, setPostuladosConsejo] = useState([]);
  const [postuladosConvivencia, setPostuladosConvivencia] = useState([]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(2));
  }, [asistencia]);

  const progress = useMemo(() => {
    return (agendaStatus.filter(i => i).length / ORDEN_DIA_OFICIAL.length) * 100;
  }, [agendaStatus]);

  const handleNombreChange = (id, nuevoNombre) => {
    setAsistencia(prev => prev.map(a => a.id === id ? { ...a, propietario: nuevoNombre.toUpperCase() } : a));
  };

  const toggleAsistencia = (id) => {
    setAsistencia(prev => prev.map(a => a.id === id ? { ...a, presente: !a.presente } : a));
  };

  const toggleAgendaItem = (idx) => {
    const newStatus = [...agendaStatus];
    const isNewStateCompleted = !newStatus[idx];
    newStatus[idx] = isNewStateCompleted;
    
    // Lógica de sincronización de puntos vinculados
    if (idx === 2) newStatus[3] = isNewStateCompleted; // Dignatarios (3 y 4)
    if (idx === 5) newStatus[4] = isNewStateCompleted; // Gestión (6) vincula Informe Consejo (5)
    if (idx === 6) newStatus[7] = isNewStateCompleted; // Financiero (7) vincula Revisoría Fiscal (8)
    if (idx === 9) newStatus[10] = isNewStateCompleted; // Elecciones (10 y 11)
    
    setAgendaStatus(newStatus);
  };

  const addProposicion = () => {
    if (tempProp.proponente && tempProp.texto) {
      setProposiciones([...proposiciones, { ...tempProp, id: Date.now() }]);
      setTempProp({ proponente: '', texto: '' });
    }
  };

  const removeProposicion = (id) => setProposiciones(proposiciones.filter(p => p.id !== id));

  const togglePostulacion = (propietario, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => prev.includes(propietario) ? prev.filter(p => p !== propietario) : [...prev, propietario]);
    } else {
      setPostuladosConvivencia(prev => prev.includes(propietario) ? prev.filter(p => p !== propietario) : [...prev, propietario]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 print:bg-white">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 text-slate-400 fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-8 border-b border-slate-800 text-center">
          <h1 className="text-white font-black text-xl tracking-tighter flex flex-col items-center gap-1">
            <ShieldCheck className="text-blue-500" size={28} />
            <span className="uppercase text-xs font-bold tracking-widest opacity-60">Condominio</span>
            <span className="text-blue-500 uppercase leading-none text-center">Esquina Real <br/> 2026</span>
          </h1>
          <p className="text-[10px] font-bold mt-4 text-slate-500 uppercase tracking-widest">Gestión Profesional PH</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {[
            { id: 'bienvenida', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: CheckSquare },
            { id: 'dignatarios', label: '3-4. Dignatarios', icon: UserPlus },
            { id: 'gestion', label: '5-6. Gestión 2025', icon: TrendingUp },
            { id: 'financiero', label: '7-8. Financiero', icon: BarChart3 },
            { id: 'presupuesto', label: '9. Presupuesto', icon: Settings },
            { id: 'postulaciones', label: '10-11. Elecciones', icon: UserPlus },
            { id: 'proposiciones', label: '12. Proposiciones', icon: MessageSquare },
            { id: 'resumen', label: 'Resumen Final', icon: Printer },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm font-bold ${
                  activeSection === item.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-72 flex-1 pb-20 print:ml-0">
        
        {/* HEADER */}
        <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 py-4 z-10 flex justify-between items-center print:bg-white print:border-none print:shadow-none">
          <div className="flex gap-10">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quórum en Vivo</span>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-black ${totalQuorum >= 50.1 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black print:hidden ${totalQuorum >= 50.1 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {totalQuorum >= 50.1 ? 'DELIBERATORIO' : 'PENDIENTE'}
                </span>
              </div>
            </div>
            
            <div className="border-l pl-8 border-slate-200">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Presidente Electo</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-black text-slate-800 uppercase truncate max-w-[150px]">
                  {dignatarios.presidente || 'PENDIENTE'}
                </span>
              </div>
            </div>

            <div className="border-l pl-8 border-slate-200 print:hidden">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avance Asamblea</span>
              <div className="flex items-center gap-3 mt-1">
                  <div className="h-2.5 w-24 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                    <div className="h-full bg-blue-600 transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-blue-600">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
               <p className="text-sm font-black text-slate-800 uppercase leading-none tracking-tight">Condominio Esquina Real</p>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">San Juan de Pasto | 12 Feb 2026</p>
            </div>
            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 print:hidden">
               <Clock size={20} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-10 space-y-12 print:p-0">
          
          {/* SECCIÓN INICIO */}
          <div className={`${activeSection === 'bienvenida' ? 'block' : 'hidden'} print:hidden`}>
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 text-center">
              <div className="bg-slate-900 rounded-[40px] p-16 text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <span className="bg-blue-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-full mb-6 inline-block tracking-widest">Vigencia 2026</span>
                    <h1 className="text-6xl font-black mb-6 leading-none tracking-tighter uppercase tracking-widest text-center">Condominio <br/><span className="text-blue-500 italic">Esquina Real</span></h1>
                    <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed mx-auto">Asamblea General Ordinaria de Copropietarios. Jueves 12 de febrero de 2026 - 7:00 p.m.</p>
                 </div>
                 <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center uppercase">
                 <Card title="Identificación" className="border-l-4 border-blue-600">
                     <div className="space-y-2 text-left">
                       <p className="text-sm font-bold text-slate-500">NIT: <span className="text-slate-800 font-black">900.367.280-6</span></p>
                       <p className="text-sm font-bold text-slate-500">Lugar: <span className="text-slate-800 font-black tracking-tight text-xs uppercase">Condominio Esquina Real</span></p>
                     </div>
                 </Card>
                 <Card title="Citación Oficial" className="border-l-4 border-amber-600">
                    <p className="text-[10px] text-slate-600 mb-4 font-medium italic text-left">"Sesiona y decide si está representado el 50,1% de los coeficientes de participación."</p>
                    <button onClick={() => setActiveSection('quorum')} className="text-xs font-black text-amber-700 uppercase flex items-center gap-2 hover:underline mx-auto">Ir a Registro <ChevronRight size={14}/></button>
                 </Card>
                 <Card title="Unidades Totales" className="bg-blue-600 text-white border-none shadow-blue-200 shadow-xl flex flex-col justify-center items-center text-center">
                    <p className="text-4xl font-black mb-1">{asistencia.length}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Copropietarios</p>
                 </Card>
              </div>
            </div>
          </div>

          {/* 1. QUÓRUM */}
          <div className={`${activeSection === 'quorum' ? 'block' : 'hidden'} print:block print:break-after-page`}>
            <SectionHeader title="Verificación del Quórum" icon={Users} agendaIndex={0} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm uppercase">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-black uppercase tracking-widest">
                    <tr>
                      <th className="p-4">Unidad</th>
                      <th className="p-4">Propietario (Editable)</th>
                      <th className="p-4 text-center">Coef (%)</th>
                      <th className="p-4 text-center print:hidden">Asistencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {asistencia.map((item) => (
                      <tr key={item.id} className={`${item.presente ? 'bg-blue-50/40' : ''} hover:bg-slate-50 transition-colors`}>
                        <td className="p-4 font-black text-slate-800">{item.unidad}</td>
                        <td className="p-4 font-bold text-slate-600">
                          <input type="text" value={item.propietario} onChange={(e) => handleNombreChange(item.id, e.target.value)} className="bg-transparent border-none w-full focus:ring-1 focus:ring-blue-400 rounded px-1 outline-none transition-all uppercase" />
                        </td>
                        <td className="p-4 font-black text-slate-400 text-center">{item.coeficiente.toFixed(2)}%</td>
                        <td className="p-4 text-center print:hidden">
                          <button onClick={() => toggleAsistencia(item.id)} className={`w-14 h-7 rounded-full relative transition-all ${item.presente ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${item.presente ? 'left-8' : 'left-1'}`}></div>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* 2. ORDEN DEL DÍA */}
          <div className={`${activeSection === 'orden' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>
            <SectionHeader title="Aprobación del Orden del Día" icon={CheckSquare} agendaIndex={1} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <Card>
              <div className="grid gap-3 mb-8">
                 {ORDEN_DIA_OFICIAL.map((punto, idx) => (
                   <div key={idx} className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${agendaStatus[idx] ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-sm ${agendaStatus[idx] ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                         {idx + 1}
                      </div>
                      <span className={`font-bold text-sm text-left ${agendaStatus[idx] ? 'text-emerald-900' : 'text-slate-600'}`}>{punto}</span>
                   </div>
                 ))}
              </div>
              <div className="pt-6 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block text-left">Observaciones de Aprobación</label>
                <textarea 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm h-32 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all uppercase"
                  placeholder="Registre modificaciones si las hay..."
                  value={obsAgenda}
                  onChange={(e) => setObsAgenda(e.target.value)}
                ></textarea>
              </div>
            </Card>
          </div>

          {/* 3-4. DIGNATARIOS */}
          <div className={`${activeSection === 'dignatarios' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>
            <SectionHeader title="Dignatarios y Comisión" icon={UserPlus} agendaIndex={2} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               <Card title="Elección Punto 3 y 4" className="md:col-span-2">
                  <div className="space-y-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Presidente de Asamblea</label>
                          <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:border-blue-500 outline-none uppercase" placeholder="Nombre..." value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} />
                       </div>
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Secretario de Asamblea</label>
                          <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:border-blue-500 outline-none uppercase" placeholder="Nombre..." value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} />
                       </div>
                     </div>
                     <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Comisión Verificadora del Acta</label>
                        <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm h-24 focus:border-blue-500 outline-none uppercase" placeholder="Designados..." value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}></textarea>
                     </div>
                  </div>
               </Card>
               <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center text-center print:hidden">
                  <Scale className="text-blue-400 mb-4 mx-auto" size={32} />
                  <h4 className="font-bold mb-2 uppercase">Protocolo</h4>
                  <p className="text-[11px] leading-relaxed text-slate-400 uppercase">Se designan responsables de dirigir la sesión y validar el texto final del acta según Ley 675.</p>
               </div>
            </div>
          </div>

          {/* 5-6. INFORME DE GESTIÓN INTEGRAL (WORD DATA) */}
          <div className={`${activeSection === 'gestion' ? 'block' : 'hidden'} print:block print:break-after-page uppercase`}>
            <SectionHeader title="Informe de Gestión Administrativa y Financiera" icon={TrendingUp} agendaIndex={5} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            
            <div className="space-y-8 text-left">
              {/* 1. OBJETIVO DE LA GESTIÓN */}
              <Card title="1. Objetivo de la Gestión" className="border-l-4 border-l-blue-600">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-4">
                    <p className="text-sm font-bold text-slate-600 leading-relaxed uppercase">
                      BAJO LA SUPERVISIÓN DEL CONSEJO DE ADMINISTRACIÓN 2025-2026 PRESIDIDO POR EL <span className="text-blue-600 font-black">SR. CARLOS OBANDO SOTO</span>, SE ENFOCARON ESFUERZOS EN LA RECUPERACIÓN DE CARTERA, MANTENIMIENTO PREVENTIVO DE EQUIPOS CRÍTICOS Y ADECUACIÓN A LAS NORMAS LEGALES VIGENTES (<span className="text-slate-800 font-black">LEY 675 DE 2001 Y SGSST</span>).
                    </p>
                  </div>
                  <div className="shrink-0 bg-blue-50 p-6 rounded-2xl flex items-center gap-4 border border-blue-100">
                    <ShieldCheck className="text-blue-600" size={40} />
                    <div>
                      <p className="text-[10px] font-black text-blue-400 uppercase">Estado General</p>
                      <p className="text-lg font-black text-blue-900">7 REUNIONES</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">ORDINARIAS DE CONSEJO</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 2. GESTIÓN ADMINISTRATIVA Y OPERATIVA */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* A. INFRAESTRUCTURA */}
                <Card title="A. Decisiones de Infraestructura" className="border-l-4 border-l-amber-500">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-[11px] font-black text-amber-600 mb-1 flex items-center gap-2"><Construction size={16}/> FACHADA Y CUBIERTAS:</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">ANTE DETERIORO Y RIESGO DE SINIESTRO, SE APROBÓ EL DESMONTAJE DE VIDRIOS EN MAL ESTADO EN EL VACÍO DEL EDIFICIO, REEMPLAZÁNDOLOS POR CUBIERTA EN POLICARBONATO (ÓSCAR MALES - ACTA 06).</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-[11px] font-black text-blue-600 mb-1 flex items-center gap-2"><Zap size={16}/> SISTEMA DE ELEVACIÓN:</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">CONTROL ESTRICTO ASCENSORES MITSUBISHI. EN MAYO SE EVALUÓ CAMBIO DE BANDAS ($3.000.000), DECIDIENDO PRIORIZAR EL MANTENIMIENTO PREVENTIVO MENSUAL (ACTA 03).</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-[11px] font-black text-red-600 mb-1 flex items-center gap-2"><AlertTriangle size={16}/> SEGURIDAD ESTRUCTURAL (APTO 204):</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">RECLAMACIÓN MARINO DELGADO. INTERVENCIÓN V&J SEGUROS Y EXPERTOS CONCLUYÓ QUE NO HAY DAÑO ESTRUCTURAL DERIVADO DE MOTORES DE PUERTAS (ACTAS 02 Y 03).</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-[11px] font-black text-slate-600 mb-1 flex items-center gap-2"><HardHat size={16}/> CONTROL DE ACCESOS:</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">MANTENIMIENTO CORRECTIVO PUERTA VEHICULAR (CAMBIO RESORTES) Y AJUSTE BRAZO PEATONAL PARA CIERRE AUTOMÁTICO (ACTA 04).</p>
                    </div>
                  </div>
                </Card>

                {/* B & C. ADMINISTRATIVA Y CONVIVENCIA */}
                <Card title="B & C. Legal y Convivencia" className="border-l-4 border-l-emerald-500">
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <p className="text-[11px] font-black text-emerald-700 mb-2 flex items-center gap-2"><Shield size={16}/> CUMPLIMIENTO LEGAL:</p>
                      <ul className="text-[10px] font-bold text-slate-600 space-y-2 uppercase leading-tight">
                        <li>• RATIFICACIÓN POR UNANIMIDAD DE <span className="text-emerald-800">ANA LUCIA YEPES</span> (ACTA 01).</li>
                        <li>• FORMALIZACIÓN CONTRATOS REVISORÍA Y CONTABILIDAD.</li>
                        <li>• SGSST: COMPRA/INSTALACIÓN EXTINTORES, CAMILLA Y SEÑALIZACIÓN REGLAMENTARIA (ACTA 04).</li>
                        <li>• DESOCUPACIÓN DE PARQUEADEROS PROPIEDAD DEL CONDOMINIO USADOS POR TERCEROS (ACTAS 01 Y 03).</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                      <p className="text-[11px] font-black text-amber-700 mb-2 flex items-center gap-2"><Droplets size={16}/> SALUBRIDAD Y MASCOTAS:</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed mb-2">CONTROL ROEDORES EN TERRAZAS Y PARQUEADEROS CON SOLUCIONES AGROINDUSTRIALES (ACTA 07).</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">DIRECTRICES SOBRE TENENCIA RESPONSABLE DE ANIMALES PARA EVITAR MOLESTIAS EN ZONAS COMUNES.</p>
                    </div>
                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                      <p className="text-[11px] font-black text-blue-700 mb-2 flex items-center gap-2"><Users size={16}/> MANUAL DE CONVIVENCIA:</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">MITIGACIÓN RUIDOS CIERRE DE PUERTAS. PROHIBICIÓN USO DE SHUT DE BASURA POR SALUBRIDAD (DEPÓSITO DIRECTO EN PUNTO DE ACOPIO - ACTA 07).</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* TABLA DE CUMPLIMIENTO */}
              <Card title="Resumen de Cumplimiento de Órdenes del Consejo">
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-[10px] font-bold uppercase">
                    <thead className="bg-slate-900 text-white">
                      <tr>
                        <th className="p-3">Tarea Encomendada</th>
                        <th className="p-3">Estado</th>
                        <th className="p-3">Soporte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="p-3">CONTRATACIÓN DE PÓLIZA MULTIRRIESGO</td><td className="p-3 text-emerald-600">CUMPLIDO</td><td className="p-3">ACTA 02 / ANEXO PÓLIZA</td></tr>
                      <tr><td className="p-3">COMPRA DE EXTINTORES Y CAMILLA</td><td className="p-3 text-emerald-600">CUMPLIDO</td><td className="p-3">ACTA 04</td></tr>
                      <tr><td className="p-3">REPARACIÓN CUBIERTA VACÍO</td><td className="p-3 text-emerald-600">CUMPLIDO</td><td className="p-3">ACTA 06</td></tr>
                      <tr><td className="p-3">DESOCUPACIÓN DE PARQUEADEROS COMUNES</td><td className="p-3 text-emerald-600">CUMPLIDO</td><td className="p-3">ACTA 03</td></tr>
                      <tr><td className="p-3">CONCEPTO TÉCNICO APTO 204</td><td className="p-3 text-emerald-600">CUMPLIDO</td><td className="p-3">ACTA 03</td></tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* 3. RELACIÓN DESCRIPTIVA DE GASTOS Y OBRAS */}
              <div className="space-y-8">
                <Card title="3A. Gastos Mensuales Fijos (Operación Base)" className="border-l-4 border-l-indigo-600">
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-[10px] font-bold uppercase">
                      <thead className="bg-slate-100 text-slate-600">
                        <tr>
                          <th className="p-3">Concepto</th>
                          <th className="p-3">Proveedor</th>
                          <th className="p-3 text-right">Valor Mensual</th>
                          <th className="p-3">Descripción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr><td className="p-3">ADMINISTRACIÓN</td><td className="p-3">ANA LUCIA YEPES</td><td className="p-3 text-right">$858.300</td><td className="p-3 text-slate-500 font-medium">REPRESENTACIÓN LEGAL Y GESTIÓN.</td></tr>
                        <tr><td className="p-3">SERVICIO DE ASEO</td><td className="p-3">CLARITA SOLUCIONES</td><td className="p-3 text-right">$1.672.504</td><td className="p-3 text-slate-500 font-medium">LIMPIEZA DIARIA DE ZONAS COMUNES.</td></tr>
                        <tr><td className="p-3">MONITOREO</td><td className="p-3">TÁLAMO LTDA.</td><td className="p-3 text-right">$775.500</td><td className="p-3 text-slate-500 font-medium">SISTEMA DE ALARMA Y VIGILANCIA.</td></tr>
                        <tr><td className="p-3">CONTABILIDAD</td><td className="p-3">ANDREA DELGADO</td><td className="p-3 text-right">$390.100</td><td className="p-3 text-slate-500 font-medium">CAUSACIÓN Y ESTADOS FINANCIEROS.</td></tr>
                        <tr><td className="p-3">REVISORÍA FISCAL</td><td className="p-3">ERNESTO MELO</td><td className="p-3 text-right">$135.400</td><td className="p-3 text-slate-500 font-medium">CONTROL Y FISCALIZACIÓN DE RECURSOS.</td></tr>
                        <tr><td className="p-3">ASCENSORES</td><td className="p-3">MITSUBISHI</td><td className="p-3 text-right">$847.147</td><td className="p-3 text-slate-500 font-medium">MANTENIMIENTO PREVENTIVO MENSUAL.</td></tr>
                        <tr><td className="p-3">ENERGÍA ELÉCTRICA</td><td className="p-3">CEDENAR</td><td className="p-3 text-right">$430.000 (APROX)</td><td className="p-3 text-slate-500 font-medium">ALUMBRADO COMÚN Y FUERZA MOTRIZ.</td></tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card title="3B. Ejecución de Obras y Actividades Específicas" className="border-l-4 border-l-orange-500">
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-[10px] font-bold uppercase">
                      <thead className="bg-slate-100 text-slate-600">
                        <tr>
                          <th className="p-3">Actividad</th>
                          <th className="p-3">Proveedor</th>
                          <th className="p-3">Mes</th>
                          <th className="p-3 text-right">Valor</th>
                          <th className="p-3">Descripción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr><td className="p-3">CUBIERTA MARQUESINA</td><td className="p-3">ÓSCAR MALES</td><td className="p-3">SEPT.</td><td className="p-3 text-right font-black">$4.510.000</td><td className="p-3 text-slate-500 font-medium">INSTALACIÓN POLICARBONATO, DESMONTAJE VIDRIOS Y LIMPIEZA CANALES.</td></tr>
                        <tr><td className="p-3">MANTENIMIENTO PUERTAS</td><td className="p-3">JAIME GUZMÁN</td><td className="p-3">AGOSTO</td><td className="p-3 text-right font-black">$200.000</td><td className="p-3 text-slate-500 font-medium">CAMBIO DE RESORTE DE TENSIÓN EN PUERTA VEHICULAR.</td></tr>
                        <tr><td className="p-3">PINTURA ZONAS COMUNES</td><td className="p-3">ROSA E. RODRÍGUEZ</td><td className="p-3">ABRIL</td><td className="p-3 text-right font-black">$610.030</td><td className="p-3 text-slate-500 font-medium">PINTURA DE ESPACIOS COMUNES PARA MEJORAR ESTÉTICA.</td></tr>
                        <tr><td className="p-3">CONTROL DE ROEDORES</td><td className="p-3">SOLUCIONES AGRO.</td><td className="p-3">OCTUBRE</td><td className="p-3 text-right font-black">$150.000</td><td className="p-3 text-slate-500 font-medium">DESRATIZACIÓN PERIÓDICA EN TERRAZAS Y PARQUEADEROS.</td></tr>
                        <tr><td className="p-3">IMPERMEABILIZACIÓN</td><td className="p-3">JAIME GUZMÁN</td><td className="p-3">MAYO</td><td className="p-3 text-right font-black">$90.000</td><td className="p-3 text-slate-500 font-medium">MANO DE OBRA PARA SELLADO DE FILTRACIONES EN TERRAZA.</td></tr>
                        <tr><td className="p-3">MANTENIMIENTO TANQUE</td><td className="p-3">JAVIER ROSERO</td><td className="p-3">DIC.</td><td className="p-3 text-right font-black">$90.000</td><td className="p-3 text-slate-500 font-medium">LAVADO Y DESINFECCIÓN DE TANQUE CISTERNA.</td></tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card title="3C. Relación de Gastos Menores" className="border-l-4 border-l-slate-400">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                      <div><p className="text-[9px] font-black text-slate-400 uppercase">IMPLEMENTOS ASEO</p><p className="text-xs font-black text-slate-700">ACUMULADO AÑO</p></div>
                      <span className="text-sm font-black text-indigo-600">$749.500</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                      <div><p className="text-[9px] font-black text-slate-400 uppercase">PAPELERÍA</p><p className="text-xs font-black text-slate-700">INSUMOS ADMIN</p></div>
                      <span className="text-sm font-black text-indigo-600">$89.000</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                      <div><p className="text-[9px] font-black text-slate-400 uppercase">INCENTIVOS</p><p className="text-xs font-black text-slate-700">BONO NAVIDEÑO</p></div>
                      <span className="text-sm font-black text-indigo-600">$150.000</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100">
                      <div><p className="text-[9px] font-black text-slate-400 uppercase">EMERGENCIAS</p><p className="text-xs font-black text-slate-700">TARJETAS ACCESO</p></div>
                      <span className="text-sm font-black text-indigo-600">$22.000</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* 4. RESUMEN DE SEGUROS */}
              <Card title="4. Resumen de Seguros (La Previsora S.A.)" className="border-l-4 border-l-slate-900 bg-slate-900 text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">COBERTURA INFRAESTRUCTURA</p>
                    <p className="text-2xl font-black">$4.500.000.000</p>
                    <p className="text-[9px] font-bold opacity-60 uppercase">INCENDIO, RAYO, EXPLOSIÓN Y DAÑOS POR AGUA.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">MAQUINARIA Y EQUIPO</p>
                    <p className="text-2xl font-black">$171.031.488</p>
                    <p className="text-[9px] font-bold opacity-60 uppercase">EQUIPOS DE PRESIÓN, ASCENSORES Y PLANTA.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">CONTENIDOS ELÉCTRICOS</p>
                    <p className="text-2xl font-black">$8.000.000</p>
                    <p className="text-[9px] font-bold opacity-60 uppercase">COBERTURA HURTO Y DAÑOS ELÉCTRICOS.</p>
                  </div>
                </div>
              </Card>

              {/* 5. SITUACIÓN FINANCIERA AL CIERRE */}
              <Card title="5. Situación Financiera al Cierre (31 Dic 2025)" className="border-l-4 border-l-blue-600 shadow-xl shadow-blue-900/5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col justify-center">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-1">PATRIMONIO NETO:</p>
                    <p className="text-xl font-black text-blue-900 leading-none">$1.107.084</p>
                  </div>
                  <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col justify-center">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-1">EFECTIVO EN BANCOS:</p>
                    <p className="text-xl font-black text-blue-500 leading-none">$3.702.951</p>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl col-span-1 lg:col-span-2">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><Landmark size={14}/> FONDO DE IMPREVISTOS (CDT)</p>
                      <span className="text-sm font-black text-emerald-600">$816.452</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mb-1">
                      <div className="bg-emerald-500 h-full rounded-full" style={{width: '25.7%'}}></div>
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase">META LEGAL: <span className="text-slate-800">$3.171.927</span> (BANCO SUDAMERIS)</p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase leading-none">REMANENTE POSITIVO OPERACIONAL:</span>
                    <span className="text-sm font-black text-emerald-600">+$45.122</span>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex justify-between items-center">
                    <span className="text-[10px] font-black text-red-400 uppercase leading-none">DÉFICIT NETO (POST-ASIGNACIÓN LEGAL):</span>
                    <span className="text-sm font-black text-red-600">($788.878)</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* 7-8. FINANCIERO */}
          <div className={`${activeSection === 'financiero' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
            <SectionHeader title="Estados Financieros y Revisoría" icon={BarChart3} agendaIndex={6} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
            <Card>
                 <BarChart3 size={48} className="text-blue-600 mb-6 mx-auto" />
                 <h4 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-widest">Balance y Ejecución Presupuestal 2025</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2"><FileText size={18}/> Estados Financieros</button>
                    <button className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2"><ShieldCheck size={18}/> Dictamen Fiscal</button>
                 </div>
            </Card>
          </div>

          {/* 9. PRESUPUESTO */}
          <div className={`${activeSection === 'presupuesto' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
             <SectionHeader title="Presupuesto y Cuotas 2026" icon={Settings} agendaIndex={8} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
             <Card title="Proyecto de Gastos 2026">
                <div className="p-10 border-4 border-dashed border-slate-100 rounded-[40px] text-center bg-slate-50/50">
                   <Settings size={64} className="text-blue-600 mb-6 mx-auto animate-spin-slow" />
                   <h4 className="text-2xl font-black text-slate-800 mb-4 uppercase tracking-tighter">Propuesta Económica 2026</h4>
                   <p className="text-xs text-slate-500 font-bold mb-8 max-w-md mx-auto">DEFINICIÓN DE CUOTAS DE ADMINISTRACIÓN SEGÚN COEFICIENTES DE COPROPIEDAD.</p>
                   <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200">Ver Comparativo</button>
                </div>
             </Card>
          </div>

          {/* 10-11. ELECCIONES */}
          <div className={`${activeSection === 'postulaciones' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
             <SectionHeader title="Elecciones 2026-2027" icon={UserPlus} agendaIndex={9} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left uppercase">
                <Card title="Consejo de Administración">
                   <div className="space-y-6">
                      <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-blue-50 rounded-2xl border-2 border-blue-100 justify-center">
                         {postuladosConsejo.map(p => (
                            <span key={p} className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-2 uppercase tracking-widest">{p} <button onClick={() => togglePostulacion(p, 'consejo')} className="print:hidden"><Trash2 size={12}/></button></span>
                         ))}
                      </div>
                      <div className="max-h-60 overflow-y-auto rounded-2xl border border-slate-100 print:hidden">
                         {asistencia.map(r => (
                            <div key={r.id} className="flex items-center justify-between p-3 border-b border-slate-50 hover:bg-slate-50">
                               <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{r.unidad} - {r.propietario}</span>
                               <button onClick={() => togglePostulacion(r.propietario, 'consejo')} className={`text-[10px] font-black px-3 py-1.5 rounded-xl ${postuladosConsejo.includes(r.propietario) ? 'bg-red-500 text-white' : 'bg-blue-100 text-blue-600'} uppercase tracking-widest`}>{postuladosConsejo.includes(r.propietario) ? 'Remover' : 'Elegir'}</button>
                            </div>
                         ))}
                      </div>
                   </div>
                </Card>
                <Card title="Elección Revisor Fiscal">
                   <div className="p-8 bg-slate-50 rounded-2xl border-2 border-slate-100 text-center flex flex-col items-center justify-center min-h-[300px]">
                      <Gavel size={48} className="text-slate-300 mb-4" />
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Elección del Punto 11</p>
                      <input type="text" className="w-full p-4 bg-white border border-slate-200 rounded-xl text-center font-black uppercase text-sm" placeholder="Nombre Revisor Electo" />
                   </div>
                </Card>
             </div>
          </div>

          {/* 12. PROPOSICIONES */}
          <div className={`${activeSection === 'proposiciones' ? 'block' : 'hidden'} print:block print:break-after-page uppercase text-center`}>
             <SectionHeader title="Proposiciones y Varios" icon={MessageSquare} agendaIndex={11} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left uppercase">
                <div className="md:col-span-1 print:hidden">
                  <Card title="Nuevo Registro">
                      <div className="space-y-4 font-black">
                         <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-blue-500 uppercase tracking-widest" placeholder="Unidad" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} />
                         <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm h-32 outline-none focus:border-blue-500 uppercase tracking-widest" placeholder="Detalle..." value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})}></textarea>
                         <button onClick={addProposicion} className="w-full bg-blue-600 text-white py-4 rounded-2xl uppercase tracking-widest text-[10px] font-black">Añadir Proposición</button>
                      </div>
                   </Card>
                </div>
                <div className="md:col-span-2 print:col-span-3">
                   <Card title="Propuestas Registradas">
                      <div className="space-y-4">
                         {proposiciones.length === 0 ? <p className="text-slate-400 text-center py-10 opacity-40 uppercase font-black">Sin registros en el acta actual</p> : 
                         proposiciones.map(p => (
                            <div key={p.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-start gap-4 print:bg-white">
                               <div><span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Unidad: {p.proponente}</span><p className="text-sm font-bold text-slate-700 leading-relaxed uppercase">{p.texto}</p></div>
                               <button onClick={() => removeProposicion(p.id)} className="text-red-300 hover:text-red-600 print:hidden"><Trash2 size={18}/></button>
                            </div>
                         ))}
                      </div>
                   </Card>
                </div>
             </div>
          </div>

          {/* RESUMEN FINAL */}
          <div className={`${activeSection === 'resumen' ? 'block' : 'hidden print:block'} space-y-8 uppercase tracking-widest text-center`}>
             <div className="flex justify-between items-center print:hidden">
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Cierre de Asamblea</h2>
                <button onClick={handlePrint} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl hover:bg-black transition-all text-xs tracking-widest">
                  <Printer size={20} /> Generar Acta Final
                </button>
             </div>
             
             <Card className="p-10 border-t-8 border-t-blue-600 print:border-none print:shadow-none print:p-0">
                <div className="hidden print:block text-center border-b-2 border-slate-900 pb-8 mb-10 text-center">
                   <h1 className="text-3xl font-black uppercase mb-1 tracking-tighter">Resumen Asamblea Ordinaria 2026</h1>
                   <p className="text-lg font-bold text-slate-600 uppercase leading-none">Condominio Esquina Real - NIT 900.367.280-6</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 print:grid-cols-3 print:gap-8 text-center uppercase">
                   <div className="space-y-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quórum Legal</p>
                      <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 print:bg-white print:border-slate-200">
                         <div className="flex justify-between mb-4"><span className="text-xs font-bold text-slate-500 uppercase">Total:</span><span className="text-lg font-black text-emerald-600">{totalQuorum.toFixed(2)}%</span></div>
                         <div className="flex justify-between"><span className="text-xs font-bold text-slate-500 uppercase">Estado:</span><span className="text-lg font-black text-blue-600">{totalQuorum >= 50.1 ? 'VÁLIDO' : 'INSUF.'}</span></div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Directivos</p>
                      <div className="space-y-4 font-black text-sm">
                         <div><p className="text-[9px] text-slate-400 mb-1 uppercase tracking-widest">Presidente</p><p className="truncate">{dignatarios.presidente || '________________'}</p></div>
                         <div><p className="text-[9px] text-slate-400 mb-1 uppercase tracking-widest">Secretario</p><p className="truncate">{dignatarios.secretario || '________________'}</p></div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Electos 2026</p>
                      <div className="space-y-6">
                         <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">Consejo</p>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {postuladosConsejo.length > 0 ?
                               postuladosConsejo.map(p => <span key={p} className="bg-slate-100 px-2 py-0.5 rounded text-[9px] font-black text-slate-600 print:border uppercase">{p}</span>) : 
                               <span className="text-[9px] italic text-slate-300 font-bold uppercase">Sin registro</span>}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="hidden print:grid grid-cols-2 gap-20 mt-32 text-center">
                   <div className="text-center border-t-2 border-slate-900 pt-4 font-black">
                      <p className="text-xs font-black uppercase mb-1 tracking-widest">{dignatarios.presidente || '_________________________'}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Presidente de Asamblea</p>
                   </div>
                   <div className="text-center border-t-2 border-slate-900 pt-4 font-black">
                      <p className="text-xs font-black uppercase mb-1 tracking-widest">{dignatarios.secretario || '_________________________'}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secretario de Asamblea</p>
                   </div>
                </div>
             </Card>
          </div>

        </div>
      </main>
    </div>
  );
}