import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, UserPlus, 
  CheckCircle2, Printer, Trash2, TrendingUp, Settings,
  ClipboardCheck, Camera, Zap, Activity, Wrench, Calendar, Layout, ListChecks,
  AlertCircle, ChevronRight, Info, ShieldAlert, HeartPulse, Building2,
  Search, DollarSign, PieChart, Landmark, Gavel, 
  ArrowUpRight, Percent, Wallet, HardHat, Cog, Plus, UserCheck, Leaf, Scale,
  Eye, Handshake, MapPin, Shield, Gavel as GavelIcon, Calculator
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL GRAN MURANO ---
const COLORS = {
  terracota: '#833C0C', // Color Institucional Principal
  terracotaClaro: '#A85A2A',
  beige: '#8F716A',
  grisClaro: '#B4AAA8',
  blancoInst: '#F7F7F5',
  negro: '#1A1A1A'
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#833C0C]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#833C0C] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#833C0C] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[11px] text-[#8F716A] font-black uppercase tracking-[0.2em]">
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
        ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' 
        : 'bg-white border-[#833C0C]/20 text-[#833C0C] hover:bg-[#833C0C] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#833C0C] ring-4 ring-[#833C0C]/10' : 'border-[#B4AAA8]/20'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#1A1A1A] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#833C0C]' : 'bg-[#A85A2A]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#833C0C]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#833C0C] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#B4AAA8]/20 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#833C0C] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#833C0C] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#F7F7F5] text-[#8F716A] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#B4AAA8]/10 uppercase font-bold text-[#1A1A1A]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#833C0C]/5 transition-colors">
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
    <div className="bg-white rounded-[40px] border-4 border-[#833C0C]/10 overflow-hidden shadow-2xl flex flex-col mb-12">
      <div className="bg-[#833C0C] px-10 py-7 flex justify-between items-center border-b-[6px] border-[#A85A2A]">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-white/10 rounded-2xl">
            {Icon && <Icon className="text-white" size={28} />}
          </div>
          <h4 className="text-lg font-black text-white uppercase tracking-[0.2em]">{title}</h4>
        </div>
        {total && (
          <div className="bg-[#1A1A1A] text-white px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-widest shadow-inner">
            {total}
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#F7F7F5] text-[#833C0C] font-black uppercase tracking-widest border-b-2">
            <tr>
              {headers.map((h, i) => <th key={i} className="px-10 py-6 text-sm">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-50 uppercase font-bold text-slate-700">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#833C0C]/5 transition-colors">
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

// --- DATA ---

const ORDEN_DIA = [
  "Registro de firmas y verificación del quórum",
  "Lectura y aprobación del orden del día",
  "Elección de dignatarios de la Asamblea (Presidente y Secretario)",
  "Elección del comité de verificación de la presente acta.",
  "Validación de la comisión verificadora del Acta Anterior",
  "Presentación y aprobación del informe de Administración.",
  "Presentación y aprobación de Estados Financieros a diciembre 31 de 2025.",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos para el año 2026 - Definición de cuotas de sostenimiento.",
  "Elección del consejo de administración.",
  "Elección Comité de convivencia.",
  "Proposiciones y varios"
];

const COEFICIENTES_DATA = [
  { id: 1, unidad: '101', propietario: 'WILLIAM VARGAS', coeficiente: 2.33 },
  { id: 2, unidad: '102', propietario: 'JHON JAIRO ORTIZ', coeficiente: 2.18 },
  { id: 3, unidad: '103', propietario: 'JORGE VILLALOBOS', coeficiente: 2.23 },
  { id: 4, unidad: '201', propietario: 'ERNESTINA CASTRO', coeficiente: 5.37 },
  { id: 5, unidad: '202', propietario: 'ALVARO FIGUEROA', coeficiente: 5.35 },
  { id: 6, unidad: '203', propietario: 'STELLA MARTINEZ NARVAEZ', coeficiente: 4.50 },
  { id: 7, unidad: '204', propietario: 'MILENA VILLOTA', coeficiente: 4.23 },
  { id: 8, unidad: '301', propietario: 'NELLY DE ARCINIEGAS', coeficiente: 5.38 },
  { id: 9, unidad: '302', propietario: 'RATEB MARMUD SALIM', coeficiente: 4.88 },
  { id: 10, unidad: '303', propietario: 'FERNANDO ALBORNOZ', coeficiente: 4.07 },
  { id: 11, unidad: '304', propietario: 'ANDREA PAOLA MARTINEZ', coeficiente: 3.80 },
  { id: 12, unidad: '401', propietario: 'MARIELA ENRIQUEZ ZARAMA', coeficiente: 5.60 },
  { id: 13, unidad: '402', propietario: 'GLORIA DE GUZMAN', coeficiente: 4.87 },
  { id: 14, unidad: '403', propietario: 'OFELIA GUZMAN GUZMAN', coeficiente: 4.54 },
  { id: 15, unidad: '404', propietario: 'AMANDA ARELLANO HERNANDEZ', coeficiente: 3.92 },
  { id: 16, unidad: '501', propietario: 'CLARA TORRES DE MARTINZ', coeficiente: 6.42 },
  { id: 17, unidad: '502', propietario: 'AMADO SANTACRUZ', coeficiente: 5.67 },
  { id: 18, unidad: '601', propietario: 'MIGUEL REBOLLEDO MUÑOZ', coeficiente: 6.30 },
  { id: 19, unidad: '602', propietario: 'MARIA DEL PILAR GUERRERO LOPEZ', coeficiente: 5.73 },
  { id: 20, unidad: '701', propietario: 'CLAUDIA TORO', coeficiente: 10.78 },
  { id: 21, unidad: 'OFICINA', propietario: 'JORGE CASTRO', coeficiente: 1.35 },
  { id: 22, unidad: 'PQ37', propietario: 'LUI HIDALGO', coeficiente: 0.50 }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');
  const [asistencia, setAsistencia] = useState(() => COEFICIENTES_DATA.map(c => ({ ...c, presente: false })));
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

  const togglePostulacion = (nombre, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    } else {
      setPostuladosConvivencia(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex min-h-screen bg-[#F7F7F5] font-sans text-[#1A1A1A] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#1A1A1A] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#833C0C] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-white/20 flex items-center justify-center rounded-[28px] shadow-lg">
                <Building2 className="text-white" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none uppercase mb-2">
            GRAN <span className="text-[#B4AAA8] block text-sm mt-1">MURANO</span>
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
                ? 'bg-[#833C0C] text-white shadow-xl translate-x-2' 
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
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#F7F7F5]">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#833C0C]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#8F716A] uppercase tracking-widest">Quórum Representado</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#833C0C]' : 'text-[#1A1A1A]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#833C0C] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-12 border-[#833C0C]/10">
              <span className="text-[11px] font-black text-[#8F716A] uppercase tracking-widest">Estado Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#833C0C]/5 shadow-inner">
                    <div className="h-full bg-[#833C0C] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#833C0C]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
               <p className="text-[14px] font-black text-[#1A1A1A] uppercase tracking-tight">E. GRAN MURANO PH</p>
               <p className="text-[11px] text-[#833C0C] font-black uppercase tracking-widest">Ana Lucia Yepez | Admin.</p>
            </div>
            <div className="h-14 w-14 bg-[#833C0C] rounded-2xl flex items-center justify-center text-white shadow-xl">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#1A1A1A] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#833C0C]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#833C0C] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Asamblea General Ordinaria</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">GRAN <span className="text-[#B4AAA8] italic block text-4xl mt-4">MURANO</span></h1>
                     <div className="w-32 h-2 bg-[#A85A2A] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">Gestión 2025 - Proyectado 2026<br/>San Juan de Pasto</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest leading-none">NIT: 900.417.585-2</p>
                       <p className="text-lg font-black text-[#1A1A1A]">Carrera 39 N° 19-100</p>
                       <p className="text-[10px] font-black text-[#833C0C]">Edificio Gran Murano PH</p>
                    </div>
                  </Card>
                  <Card title="Convocatoria">
                    <div className="space-y-3 pt-2 text-[#1A1A1A]">
                       <p className="text-lg font-black">12 de Marzo 2026</p>
                       <p className="text-[11px] font-black text-[#833C0C] opacity-80 uppercase">7:00 P.M. - Edificio Portal 39</p>
                    </div>
                  </Card>
                  <Card className="bg-[#833C0C] text-white border-none flex flex-col items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <p className="text-6xl font-black text-[#833C0C] mb-2 leading-none tracking-tighter">
                        {asistencia.length}
                      </p>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#833C0C] leading-none">
                        Unidades Registradas
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
                  <h3 className="text-[#833C0C] font-black text-lg uppercase tracking-tighter">Listado de Copropietarios</h3>
                  <p className="text-[10px] text-[#8F716A] font-bold uppercase tracking-widest">Gestione la asistencia para validar el quórum legal (50.1%)</p>
                </div>
                <button 
                  onClick={() => {
                    const todosPresentes = asistencia.every(a => a.presente);
                    setAsistencia(prev => prev.map(a => ({ ...a, presente: !todosPresentes })));
                  }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md ${
                    asistencia.every(a => a.presente) ? 'bg-slate-100 text-[#833C0C]' : 'bg-[#833C0C] text-white'
                  }`}
                >
                  {asistencia.every(a => a.presente) ? 'QUITAR TODO' : 'SELECCIONAR TODOS'}
                </button>
              </div>

              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between print:hidden">
                  <div className="relative group w-full max-w-2xl">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#833C0C]" size={24} />
                    <input 
                      type="text" 
                      placeholder="BUSCAR APARTAMENTO O PROPIETARIO..." 
                      className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-[#833C0C]/20 focus:border-[#833C0C] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-[32px] shadow-sm border border-[#B4AAA8]/20">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest">PRESENTES</p>
                        <p className="text-3xl font-black text-[#833C0C]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                    </div>
                    <Users className="text-[#833C0C]" size={40} />
                  </div>
                </div>

                <div className="w-full bg-white rounded-[40px] shadow-sm border border-[#B4AAA8]/20 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F7F7F5] text-[#1A1A1A] font-black uppercase tracking-widest text-[11px] border-b-2">
                      <tr>
                        <th className="px-12 py-8">UNIDAD</th>
                        <th className="px-12 py-8">COPROPIETARIO</th>
                        <th className="px-12 py-8 text-center">COEF (%)</th>
                        <th className="px-12 py-8 text-center print:hidden">ESTADO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#B4AAA8]/10 uppercase">
                      {filteredAsistencia.map((item) => (
                        <tr key={item.id} className={`${item.presente ? 'bg-[#833C0C]/5' : ''} hover:bg-slate-50 transition-colors`}>
                          <td className="px-12 py-8 font-black text-[#833C0C] text-xl">APTO {item.unidad}</td>
                          <td className="px-12 py-8 font-black text-[#1A1A1A] text-sm tracking-tight">{item.propietario}</td>
                          <td className="px-12 py-8 font-black text-[#1A1A1A] text-center text-xl">{item.coeficiente.toFixed(2)}%</td>
                          <td className="px-12 py-8 text-center print:hidden">
                            <button 
                              onClick={() => toggleAsistencia(item.id)} 
                              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                                item.presente ? 'bg-[#833C0C]' : 'bg-slate-200'
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
              <Card highlight title="Agenda de la Sesión">
                <div className="space-y-4 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#833C0C] bg-[#833C0C]/5' : 'border-[#B4AAA8]/20 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#1A1A1A] text-white' : 'bg-[#833C0C] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#833C0C]' : 'text-[#1A1A1A]'}`}>
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
                title="3-4. Dignatarios" 
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
                        <label className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest block">Presidente de Asamblea</label>
                        <input type="text" className="w-full p-6 bg-[#F7F7F5] border-2 border-[#B4AAA8]/20 rounded-2xl font-black uppercase text-xs" placeholder="NOMBRE..." value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest block">Secretario(a)</label>
                        <input type="text" className="w-full p-6 bg-[#F7F7F5] border-2 border-[#B4AAA8]/20 rounded-2xl font-black uppercase text-xs" placeholder="NOMBRE..." value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} />
                      </div>
                    </div>
                  </Card>
                  
                  <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                    <div className="space-y-4 pt-4">
                      <label className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest block">Nombres de Designados</label>
                      <textarea className="w-full p-6 bg-[#F7F7F5] border-2 border-[#B4AAA8]/20 rounded-2xl font-black uppercase text-[11px] h-40 outline-none leading-loose" placeholder="INGRESE LOS NOMBRES..." value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}></textarea>
                    </div>
                  </Card>
                </div>

                <div className="bg-[#1A1A1A] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#833C0C]">
                  <GavelIcon className="text-white mb-10 mx-auto" size={56} />
                  <h4 className="font-black text-2xl mb-6 uppercase tracking-tighter">Ley 675 de 2001</h4>
                  <p className="text-[11px] font-black text-white/60 leading-loose uppercase tracking-[0.2em]">
                    La elección garantiza la validez jurídica de las decisiones tomadas hoy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 5: ACTA ANTERIOR */}
          {activeSection === 'acta-anterior' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader 
                title="5. Acta Anterior" 
                icon={FileText} 
                agendaIndices={[4]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="Validación Documental" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4 text-center">
                    <p className="text-[11px] font-bold text-slate-600 leading-loose">
                      Verificación de compromisos y acuerdos de la Asamblea 2025.
                    </p>
                    <div className="p-12 bg-[#F7F7F5] rounded-3xl border-2 border-dashed border-[#833C0C]/20 flex flex-col items-center justify-center">
                      <FileText size={48} className="text-[#833C0C] mb-6 opacity-30" />
                      <a 
                        href="https://drive.google.com/file/d/1cJwwHlysUth-jmjWggr0XHrqjvODPSSY/view?usp=sharing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#833C0C] text-white px-10 py-4 rounded-full font-black text-[11px] hover:bg-[#A85A2A] transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl"
                      >
                        LEER ACTA ANTERIOR
                      </a>
                    </div>
                  </div>
                </Card>
                <Card title="Observaciones de la Comisión" icon={ClipboardCheck}>
                  <textarea 
                    className="w-full p-6 bg-[#F7F7F5] border-2 border-[#B4AAA8]/20 rounded-2xl font-black uppercase text-[11px] h-full min-h-[250px] focus:border-[#833C0C] outline-none transition-colors" 
                    placeholder="REGISTRE OBSERVACIONES AL ACTA 2025..."
                  ></textarea>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 6: INFORME GESTIÓN (REPRODUCCIÓN COMPLETA) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="6. Informe Gestión 2025" icon={TrendingUp} agendaIndices={[5]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              <Card title="Consejo de Administración 2025" icon={Users} highlight className="p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="bg-[#1A1A1A] p-10 rounded-[40px] text-white">
                         <h4 className="text-xl font-black mb-6 border-b border-white/10 pb-4">Integrantes</h4>
                         <ul className="grid grid-cols-1 gap-6 text-[14px] font-bold">
                            <li className="flex items-center gap-4"><div className="w-3 h-3 bg-[#A85A2A] rounded-full"></div> Alvaro Arciniegas (Presidente)</li>
                            <li className="flex items-center gap-4"><div className="w-3 h-3 bg-[#A85A2A] rounded-full"></div> Mauricio del Hierro</li>
                            <li className="flex items-center gap-4"><div className="w-3 h-3 bg-[#A85A2A] rounded-full"></div> Jorge Villalobos Paz</li>
                         </ul>
                      </div>
                   </div>
                   <div className="flex flex-col justify-center gap-8">
                      <div className="p-8 bg-[#8F716A]/10 rounded-[40px] border-2 border-[#833C0C]/10">
                        <p className="text-[10px] font-black text-[#833C0C] mb-2 tracking-widest uppercase">Representación Legal</p>
                        <p className="text-2xl font-black text-[#1A1A1A]">ANA LUCIA YEPEZ</p>
                        <p className="text-sm font-bold text-slate-500 mt-2">Continuidad administrativa ratificada en 2025.</p>
                      </div>
                      <div className="p-8 bg-slate-50 rounded-[40px] border-2 border-[#1A1A1A]/10">
                        <p className="text-[10px] font-black text-[#1A1A1A] mb-2 tracking-widest uppercase">Gestión Contable</p>
                        <p className="text-xl font-black text-[#1A1A1A]">LUZ JANETH LÓPEZ</p>
                        <p className="text-xs font-bold text-slate-500 mt-2">Enfoque en estabilización financiera y control presupuestal.</p>
                      </div>
                   </div>
                </div>
              </Card>

              {/* GESTIÓN OPERATIVA */}
              <div className="space-y-10">
                 <h3 className="text-2xl font-black text-[#833C0C] border-l-8 border-[#833C0C] pl-6 py-2">Ejes de Acción 2025</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { t: "FINANZAS", c: "Incremento cuota 23.36% para cubrir déficit 2024. Cuota extraordinaria de $17.136.562 aprobada para cubrir deficit 2023 y motor puerta vehicular.", i: Calculator },
                      { t: "SEGURIDAD", c: "Transición a esquema por monitoreo con Seguridad del Sur. Acuerdo de pago de $5.000.000 mensuales.", i: Shield },
                      { t: "MANTENIMIENTO", c: "Intervención en cubierta, impermeabilización de canales y terraza. Cambio de baterías planta eléctrica.", i: Wrench },
                      { t: "AUTOMATIZACIÓN", c: "Reposición de motores de la puerta vehicular del sótano (Motores Accesmatic).", i: Zap },
                      { t: "TALENTO HUMANO", c: "Cambio de operaria de limpieza por perfil de 'todero' para optimizar mantenimiento.", i: UserCheck }
                      
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-[32px] border-2 border-[#B4AAA8]/20 shadow-sm">
                        <item.i className="text-[#833C0C] mb-4" size={32} />
                        <p className="text-xs font-black text-[#833C0C] mb-2 tracking-widest">{item.t}</p>
                        <p className="text-[14px] font-bold text-[#1A1A1A] leading-relaxed">{item.c}</p>
                      </div>
                    ))}
                 </div>
              </div>

              {/* TABLAS COMPLETAS */}
              <div className="space-y-12 mt-20">
                <ManagementTable 
                  title="RELACIÓN DE GASTOS MENSUALES FIJOS"
                  headers={["PROVEEDOR / CONTRATISTA", "CONCEPTO", "DETALLE"]}
                  data={[
                    {p: "Servicios Especializados Ares SAS", c: "Mantenimiento Ascensores", d: "Pagos mensuales"},
                    {p: "Ana Lucia Yepez Cordoba", c: "Honorarios Administración", d: "Pagos por servicios"},
                    {p: "Luz Janeth Lopez Vela", c: "Honorarios Contabilidad", d: "Pagos por servicios"},
                    {p: "Qualis Soluciones Integrales", c: "Servicio de Aseo", d: "Servicio mensual limpieza"},
                    {p: "Seguridad del Sur Ltda", c: "Servicio de Vigilancia", d: "Seguridad operativa de monitoreo"},
                    {p: "Cedenar SA ESP", c: "Servicio de Energía", d: "Áreas comunes"},
                    {p: "Empopasto SA ESP", c: "Acueducto", d: "Consumo áreas comunes"},
                    {p: "La Previsora SA", c: "Póliza Copropiedad", d: "Seguro obligatorio"},
                    {p: "DIAN", c: "Retención en la Fuente", d: "Obligación tributaria"},
                    {p: "Alcaldía de Pasto", c: "Rete ICA", d: "Impuesto territorial"}
                  ]}
                  icon={Activity}
                />

                <InvestmentTable 
                  title="PROYECTO 1: MANTENIMIENTO DE TECHOS Y LOCATIVOS"
                  headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD"]}
                  data={[
                    {p: "Casteir Moreno Mosquera", c: "Infraestructura", d: "Mantenimiento techo, cambio panel, pintura muros, reparación canal."}
                  ]}
                  icon={Building2}
                />

                <InvestmentTable 
                  title="PROYECTO 2: MODERNIZACIÓN DE SEGURIDAD (EQUIPOS)"
                  headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD"]}
                  data={[
                    {p: "Seguridad del Sur Ltda", c: "Vigilancia Electrónica", d: "Suministro e instalación de sistema de seguridad por monitoreo."}
                  ]}
                  icon={Shield}
                />

                <InvestmentTable 
                  title="PROYECTO 3: AUTOMATIZACIÓN DE PUERTAS"
                  headers={["PROVEEDOR", "CONCEPTO", "ACTIVIDAD"]}
                  data={[
                    {p: "Oscar Felix Males", c: "Puerta Vehicular", d: "Instalación motores Accesmatic y arreglo marco puerta peatonal."},
                    {p: "Manuel Gustavo Quelal", c: "Puerta Vehicular", d: "Cambio de guayas, bisagras y baterías de respaldo para motores."}
                  ]}
                  icon={Zap}
                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ManagementTable 
                    title="OBRA 4: PLANTA ELÉCTRICA"
                    headers={["PROVEEDOR", "ACTIVIDAD"]}
                    icon={Zap}
                    data={[{p: "Albeiro Bastidas Guerrero", d: "Mantenimiento general de la planta eléctrica."}]}
                  />
                 
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ManagementTable 
                    title="OBRA 5: SEGURIDAD INDUSTRIAL"
                    headers={["PROVEEDOR", "ACTIVIDAD"]}
                    icon={ShieldAlert}
                    data={[{p: "Andres Tobar Gomez", d: "Recarga de 4 extintores del edificio."}]}
                  />
                  <ManagementTable 
                    title="OBRA 6: GESTIÓN DE CARTERA"
                    headers={["PROVEEDOR", "ACTIVIDAD"]}
                    icon={Scale}
                    data={[{p: "Stefania Muñoz", d: "Cobro y requerimientos de cartera a deudores morosos."}]}
                  />
                </div>
                <div className="mt-10 mb-4">
                  <h2 className="text-xl font-bold text-[#833C0C] uppercase tracking-wider">
                    Resumen de Gestión Financiera
                  </h2>
                  <hr className="border-t border-gray-300 mt-2" />
                </div>
                
                <ManagementTable 
                  title="GASTOS OPERATIVOS Y CAJA MENOR"
                  headers={["CONCEPTO", "DETALLE"]}
                  data={[
                    {c: "Suministros de Aseo", d: "Compras recurrentes (Blanqueador, ambientador, silicona)."},
                    {c: "Gastos Operativos", d: "Compra de ACPM y Gasolina para planta eléctrica."},
                    {c: "Suministros Eléctricos", d: "Bombillos 9W y materiales menores."},
                    {c: "Herramientas", d: "Compra de escalera tipo tijera (Mercado Libre)."}
                  ]}
                  icon={Plus}
                />
                <div className="flex flex-col gap-12 uppercase">
  
                {/* SECCIÓN 1: PÓLIZA ÁREAS COMUNES - FONDO SUTIL PARA DIFERENCIAR */}
                <Card title="Póliza Todo Riesgo Áreas Comunes" icon={ShieldCheck} badge="No. 1000462" highlight className="p-10 border-t-8 border-t-[#833C0C]">
                  <div className="mb-10 text-center md:text-left">
                    <h3 className="text-4xl font-black text-[#833C0C] tracking-tighter mb-1">LA PREVISORA S.A.</h3>
                    <p className="text-lg font-bold text-slate-400 italic">Vigencia: 14 Sept 2025 — 14 Sept 2026</p>
                  </div>

                  {/* VALORES MASIVOS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="p-10 bg-[#833C0C]/5 rounded-[48px] border-2 border-[#833C0C]/20 flex flex-col items-center justify-center shadow-sm">
                      <p className="text-xs font-black text-slate-500 mb-2 tracking-[0.2em]">Valor Asegurado Total</p>
                      <p className="text-4xl lg:text-5xl xl:text-6xl font-black text-[#833C0C] tracking-tighter leading-none">$5.815.000.000</p>
                    </div>
                    <div className="p-10 bg-slate-50 rounded-[48px] border-2 border-slate-100 flex flex-col items-center justify-center shadow-sm">
                      <p className="text-xs font-black text-slate-500 mb-2 tracking-[0.2em]">Prima Total Anual (IVA Inc.)</p>
                      <p className="text-4xl lg:text-5xl xl:text-6xl font-black text-slate-700 tracking-tighter leading-none">$4.795.224</p>
                    </div>
                  </div>
                  
                  {/* DESGLOSE DE AMPAROS - BIENES COMUNES */}
                  <div className="overflow-x-auto rounded-[35px] border-2 border-slate-50">
                    <table className="w-full text-left">
                      <tbody className="divide-y-2 divide-white">
                        <tr className="bg-slate-50/50">
                          <td className="px-10 py-6 text-lg font-black text-slate-600">Edificio / Áreas Comunes</td>
                          <td className="px-10 py-6 text-3xl font-black text-[#833C0C] text-right">$5.000.000.000</td>
                        </tr>
                        <tr>
                          <td className="px-10 py-6 text-lg font-black text-slate-600">R.C. Extracontractual</td>
                          <td className="px-10 py-6 text-3xl font-black text-[#833C0C] text-right">$300.000.000</td>
                        </tr>
                        <tr className="bg-slate-50/50">
                          <td className="px-10 py-6 text-lg font-black text-slate-600">Maquinaria y Equipos</td>
                          <td className="px-10 py-6 text-3xl font-black text-[#833C0C] text-right">$250.000.000</td>
                        </tr>
                        <tr>
                          <td className="px-10 py-6 text-lg font-black text-slate-600">Equipo Eléctrico / Electrónico</td>
                          <td className="px-10 py-6 text-3xl font-black text-[#833C0C] text-right">$10.000.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* SECCIÓN 2: PÓLIZA D&O - CAMBIO DE COLOR DE ACENTO PARA DIFERENCIAR SECCIÓN */}
                <Card title="Póliza Responsabilidad Civil D&O" icon={Scale} badge="No. 1005727" highlight className="p-10 border-l-8 border-l-slate-800 bg-slate-50/30">
                  <div className="flex flex-col lg:flex-row gap-10 items-center">
                    <div className="flex-1 text-center lg:text-left space-y-4">
                      <p className="text-lg font-black text-[#833C0C] tracking-[0.3em]">Directores y Administradores</p>
                      <p className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-800 tracking-tighter leading-none">$100.000.000</p>
                      <div className="p-6 bg-white rounded-3xl border-l-8 border-[#833C0C] shadow-sm">
                        <p className="text-lg font-bold text-slate-500 leading-tight italic">
                          Protección para el patrimonio de los miembros del Consejo y Administración ante reclamaciones por su gestión.
                        </p>
                      </div>
                    </div>
                    
                    {/* COSTO D&O */}
                    <div className="bg-white p-10 rounded-[50px] border-2 border-slate-100 text-center shrink-0 shadow-lg min-w-[280px]">
                      <p className="text-xs font-black text-slate-400 mb-2 tracking-widest uppercase">Inversión Póliza D&O</p>
                      <p className="text-5xl font-black text-[#833C0C] tracking-tighter">$178.500</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-2">PAGO ÚNICO ANUAL</p>
                    </div>
                  </div>
                </Card>

                {/* SECCIÓN 3: TOTAL DE LA OPERACIÓN (RESUMEN FINAL) */}
                <div className="bg-slate-900 rounded-[50px] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl border-b-8 border-b-[#833C0C]">
                  <div>
                    <p className="text-xs font-black opacity-50 tracking-[0.4em] mb-1">INVERSIÓN TOTAL SEGUROS 2025</p>
                    <h3 className="text-5xl font-black tracking-tighter">$4.973.724</h3>
                  </div>
                  <div className="flex flex-col items-center md:items-end">
                    <div className="bg-white/10 px-6 py-2 rounded-full border border-white/20 mb-2 text-[10px] font-black tracking-widest">
                      PREVISORA + D&O
                    </div>
                    <p className="text-sm font-bold opacity-60 italic text-center md:text-right">Ahorro detectado frente a ofertas de mercado</p>
                  </div>
                </div>
              </div>
              

              </div>
            </div>
          )}

          {/* SECCIONES FINANCIERAS Y PRESUPUESTO */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="7. Estados Financieros" icon={BarChart3} agendaIndices={[6]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-[60px] p-16 shadow-2xl border-4 border-[#833C0C]/10 flex flex-col items-center text-center">
                  <BarChart3 size={80} className="text-[#833C0C] mb-8" />
                  <h3 className="text-4xl font-black text-[#833C0C] mb-6">CIERRE FISCAL 2025</h3>
                  <p className="text-xl font-bold text-slate-500 mb-10">Contabilidad: Luz Janeth López Vela</p>
                  <div className="bg-[#F7F7F5] p-10 rounded-[40px] w-full max-w-xl text-left space-y-4">
                    <p className="text-xs font-black text-[#833C0C] tracking-widest">OBSERVACIONES:</p>
                    <p className="text-[13px] font-bold leading-relaxed">Cierre bajo normas NIIF. Se destaca la gestión de cartera por Stefania Muñoz para reducción de morosidad.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* POLIZA DE COPROPIEDAD (PARTE 3 DEL INFORME) */}
          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="8. Presupuesto y Seguros" icon={PieChart} agendaIndices={[7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="space-y-12">
                <ManagementTable 
                    title="COMPARATIVO DE COTIZACIONES PÓLIZA"
                    headers={["ASEGURADORA", "PRIMA TOTAL"]}
                    data={[
                        {a: "MAPFRE", p: "$10.149.628"},
                        {a: "AXA", p: "$7.839.934"},
                        {a: "EQUIDAD", p: "$6.986.277"},
                        {a: "ESTADO", p: "$6.936.867"},
                        {a: "LA PREVISORA (CONTRATADA)", p: "$6.617.697"}
                    ]}
                    icon={Shield}
                />

                <Card highlight title="Póliza Contratada: LA PREVISORA S.A.">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                        <div className="p-8 bg-[#833C0C]/5 rounded-3xl">
                            <p className="text-[10px] font-black text-[#833C0C] mb-2">VIGENCIA</p>
                            <p className="text-xl font-black">14 Sep 2025 - 14 Sep 2026</p>
                        </div>
                        <div className="p-8 bg-[#1A1A1A] rounded-3xl text-white">
                            <p className="text-[10px] font-black text-white/50 mb-2">VALOR ASEGURADO TOTAL</p>
                            <p className="text-2xl font-black">$5.815.000.000</p>
                        </div>
                    </div>
                </Card>

                <InvestmentTable 
                    title="DETALLE DE COBERTURAS"
                    headers={["AMPARO", "VALOR ASEGURADO", "PRIMA"]}
                    data={[
                        {a: "Edificio (Incendio y Aliadas)", v: "$5.000.000.000", p: "$650.000"},
                        {a: "Terremoto (Edificio)", v: "$5.000.000.000", p: "$2.550.000"},
                        {a: "Maquinaria y Equipo", v: "$250.000.000", p: "$32.500"},
                        {a: "Responsabilidad Civil", v: "$300.000.000", p: "$270.000"},
                        {a: "Directores y Administradores", v: "$100.000.000", p: "$150.000"}
                    ]}
                    icon={ShieldAlert}
                />
              </div>
            </div>
          )}

          {/* ELECCIONES */}
          {activeSection === 'consejo' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="9-10. Elecciones 2026" icon={Users} agendaIndices={[8, 9]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card title="Candidatos Consejo" icon={Users} highlight>
                  <div className="space-y-6">
                    <div className="min-h-[60px] p-4 bg-[#F7F7F5] rounded-[24px] border-2 border-dashed border-[#833C0C]/20">
                      {postuladosConsejo.length === 0 ? <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS REGISTRADOS</p> : 
                        <div className="flex flex-wrap gap-2">
                          {postuladosConsejo.map(p => (
                            <span key={p} className="bg-[#833C0C] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      }
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0">
                          <span className="text-[11px] font-black">APTO {r.unidad} | {r.propietario}</span>
                          <button onClick={() => togglePostulacion(r.propietario, 'consejo')} className={`px-4 py-2 rounded-xl text-[9px] font-black ${postuladosConsejo.includes(r.propietario) ? 'bg-[#1A1A1A] text-white' : 'bg-[#F7F7F5] text-[#833C0C] border border-[#833C0C]/20'}`}>POSTULAR</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card title="Comité de Convivencia" icon={HeartPulse}>
                   <div className="space-y-6">
                    <div className="min-h-[60px] p-4 bg-[#F7F7F5] rounded-[24px] border-2 border-dashed border-[#8F716A]/40">
                      {postuladosConvivencia.length === 0 ? <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS REGISTRADOS</p> : 
                        <div className="flex flex-wrap gap-2">
                          {postuladosConvivencia.map(p => (
                            <span key={p} className="bg-[#1A1A1A] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'convivencia')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      }
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0">
                          <span className="text-[11px] font-black">APTO {r.unidad} | {r.propietario}</span>
                          <button onClick={() => togglePostulacion(r.propietario, 'convivencia')} className={`px-4 py-2 rounded-xl text-[9px] font-black ${postuladosConvivencia.includes(r.propietario) ? 'bg-[#833C0C] text-white' : 'bg-[#F7F7F5] text-[#1A1A1A] border border-[#1A1A1A]/20'}`}>POSTULAR</button>
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
              <SectionHeader title="11. Proposiciones" icon={MessageSquare} agendaIndices={[10]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card title="Nueva Intervención" highlight>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  <div className="md:col-span-1 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase">Unidad</label>
                    <input type="text" className="w-full p-4 bg-[#F7F7F5] border-2 border-[#B4AAA8]/20 rounded-2xl font-black text-xs outline-none" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} placeholder="EJ: 402" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase">Proposición / Comentario</label>
                    <input type="text" className="w-full p-4 bg-[#F7F7F5] border-2 border-[#B4AAA8]/20 rounded-2xl font-black text-xs outline-none" value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})} placeholder="DESCRIBA AQUÍ..." />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addProposicion} className="w-full bg-[#833C0C] text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-3 shadow-lg"><Plus size={18} /> REGISTRAR</button>
                  </div>
                </div>
              </Card>
              <div className="space-y-4">
                 {proposiciones.map(p => (
                   <div key={p.id} className="bg-white p-6 rounded-3xl shadow-sm border-2 border-[#B4AAA8]/10 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black text-[#833C0C] mb-1 uppercase tracking-widest">UNIDAD {p.proponente}</p>
                        <p className="text-sm font-black text-[#1A1A1A]">{p.texto}</p>
                      </div>
                      <button onClick={() => setProposiciones(proposiciones.filter(x => x.id !== p.id))} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={20} /></button>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {/* FINALIZAR */}
          {activeSection === 'final' && (
            <div className="space-y-16 animate-in zoom-in-95 text-center uppercase">
              <div className="flex justify-between items-center print:hidden bg-[#1A1A1A] p-10 rounded-[40px] shadow-2xl">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">CIERRE DE ASAMBLEA</h2>
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL PARA EL EDIFICIO GRAN MURANO</p>
                </div>
                <button onClick={handlePrint} className="bg-[#833C0C] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl transition-all text-xs">
                  <Printer size={24} /> DESCARGAR ACTA FINAL
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#833C0C] print:shadow-none print:border-none print:p-0 bg-white">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#833C0C] pb-10">
                  <h1 className="text-4xl font-black mb-4 uppercase">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                  <p className="text-xl font-black text-[#833C0C] uppercase">EDIFICIO GRAN MURANO PH - NIT: 900.417.585-2</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-[#F7F7F5] rounded-[56px] border-2 border-[#B4AAA8]/20 flex flex-col items-center">
                    <p className="text-[11px] font-black text-[#1A1A1A] mb-10 tracking-[0.3em]">Quórum Representado</p>
                    <p className="text-7xl font-black text-[#833C0C] leading-none">{totalQuorum.toFixed(2)}%</p>
                  </div>
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#1A1A1A] tracking-[0.3em] uppercase leading-none mb-12">Firmas Dignatarios</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-4 border-[#833C0C]/10 pb-4">
                          <p className="text-[9px] text-[#833C0C] mb-2 font-black">PRESIDENTE:</p>
                          <p className="text-lg text-[#1A1A1A]">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-4 border-[#833C0C]/10 pb-4">
                          <p className="text-[9px] text-[#833C0C] mb-2 font-black">SECRETARIO(A):</p>
                          <p className="text-lg text-[#1A1A1A]">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>
                  <div className="p-12 bg-[#833C0C] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#1A1A1A]">
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
        body { font-family: 'Inter', sans-serif; background-color: #F7F7F5; }
        @media print {
          @page { margin: 1cm; size: letter; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          table { border-collapse: collapse !important; width: 100% !important; border: 1px solid #000 !important; font-size: 8pt !important; }
          th { background: #833C0C !important; color: white !important; -webkit-print-color-adjust: exact; padding: 6px !important; border: 1px solid #000 !important; }
          td { border: 1px solid #000 !important; padding: 6px !important; }
          h2, h3 { color: #833C0C !important; }
        }
      `}} />
    </div> 
  );
}