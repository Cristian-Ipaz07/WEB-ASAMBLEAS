import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, Search, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, UserPlus, CheckCircle2, Printer, Trash2, 
  TrendingUp, Settings, ClipboardCheck, Camera, Zap, Activity, Wrench, 
  Calendar, Layout, ListChecks, AlertCircle, ChevronRight, Info, 
  ShieldAlert, HeartPulse, Building2, DollarSign, PieChart, Landmark, 
  Gavel, ArrowUpRight, Percent, Wallet, HardHat, Cog, Plus, UserCheck, 
  Leaf, Scale,
  Building,
  Hammer
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL EDIFICIO CONCASA ---
const COLORS = {
  naranjaCorp: '#E85A1A',
  naranjaSuave: '#F07A3A',
  doradoArena: '#D9B56B',
  blanco: '#FFFFFF',
  grisOscuro: '#2F2F2F',
  beigeClaro: '#F5EFE3'
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#E85A1A]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#E85A1A] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#E85A1A] uppercase tracking-tighter leading-none mb-1">{title}</h2>
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
        ? 'bg-[#2F2F2F] border-[#2F2F2F] text-white' 
        : 'bg-white border-[#E85A1A]/20 text-[#E85A1A] hover:bg-[#E85A1A] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#E85A1A] ring-4 ring-[#E85A1A]/10' : 'border-[#D9B56B]/20'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#2F2F2F] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#E85A1A]' : 'bg-[#D9B56B]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#E85A1A]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#E85A1A] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#D9B56B]/20 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#E85A1A] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#E85A1A] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#F5EFE3] text-[#2F2F2F] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#D9B56B]/10 uppercase font-bold text-[#2F2F2F]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#E85A1A]/5 transition-colors">
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
  "Llamado a lista y verificación del quórum.",
  "Lectura y aprobación del orden del día.",
  "Elección de dignatarios de la Asamblea (presidente, secretario, comisión verificadora del texto del acta).",
  "Lectura del concepto de la comisión verificadora del acta de la asamblea del año 2025.",
  "Presentación y aprobación informe de administración.",
  "Dictamen e informe de Revisoría Fiscal.",
  "Presentación y aprobación de Estados Financieros y ejecución presupuestal a diciembre 31 de 2025.",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos para el año 2026 - Definición de cuotas de administración.",
  "Nombramiento del consejo de administración período 2026-2027.",
  "Elección Revisor Fiscal período 2026-2027.",
  "Proposiciones y asuntos varios."
];

const COEFICIENTES_DATA = [
{ id: 1, unidad: 'PARQ 2', propietario: 'ALVARO HIDALGO', coeficiente: 0.36100 },
{ id: 2, unidad: 'PARQ 3', propietario: 'ALVARO HIDALGO', coeficiente: 0.36050 },
{ id: 3, unidad: 'PARQ 4', propietario: 'GLADYS PASUY', coeficiente: 0.36430 },
{ id: 4, unidad: 'PARQ 5', propietario: 'HERNAN UNIGARRO', coeficiente: 0.34940 },
{ id: 5, unidad: 'PARQ 6', propietario: 'JESUS VILLOTA', coeficiente: 0.35240 },
{ id: 6, unidad: 'PARQ 7', propietario: 'SEGUNDO LUNA', coeficiente: 0.33170 },
{ id: 7, unidad: 'PARQ 8', propietario: 'MANUEL ROSERO', coeficiente: 0.32920 },
{ id: 8, unidad: 'PARQ 9', propietario: 'GLADYS PASUY', coeficiente: 0.37690 },
{ id: 9, unidad: 'PARQ 10', propietario: 'DAVIVIENDA', coeficiente: 0.31040 },
{ id: 10, unidad: 'PARQ 11', propietario: 'DAVIVIENDA', coeficiente: 0.31040 },
{ id: 11, unidad: 'PARQ 12', propietario: 'SALIM MAHUD', coeficiente: 0.33000 },
{ id: 12, unidad: 'PARQ 13', propietario: 'JESÚS VILLOTA', coeficiente: 0.33700 },
{ id: 13, unidad: 'PARQ 14', propietario: 'MARIO ERAZO', coeficiente: 0.35270 },
{ id: 14, unidad: 'PARQ 15', propietario: 'IGNACIO MAYA', coeficiente: 0.47420 },
{ id: 15, unidad: 'PARQ 16', propietario: 'FERNANDO CAICEDO', coeficiente: 0.51840 },
{ id: 16, unidad: 'DEPO 1', propietario: 'FERNANDO ARCINIEGAS', coeficiente: 0.24710 },
{ id: 17, unidad: 'PARQ 18 - 19', propietario: 'FERNANDO ARCINIEGAS', coeficiente: 0.87610 },

{ id: 18, unidad: '101', propietario: 'DIOCESIS DE PASTO-TENIS', coeficiente: 8.40310 },
{ id: 19, unidad: '103', propietario: 'LUIS CARLOS MUÑOZ', coeficiente: 0.76460 },
{ id: 20, unidad: '104', propietario: 'JUAN FRANCISCO MURILLO', coeficiente: 0.74140 },
{ id: 21, unidad: '105', propietario: 'LUIS ALBERTO ORTEGA', coeficiente: 1.33790 },
{ id: 22, unidad: '106 A', propietario: 'JANETH DELGADO', coeficiente: 1.33580 },
{ id: 23, unidad: '106 B', propietario: 'HERMAN AREVALO', coeficiente: 0.73150 },
{ id: 24, unidad: '106 C', propietario: 'ALFREDO SANTACRUZ', coeficiente: 0.94160 },
{ id: 25, unidad: '109', propietario: 'DAVIVIENDA', coeficiente: 8.37210 },

{ id: 26, unidad: '201 A', propietario: 'GLADYS PASUY', coeficiente: 0.88500 },
{ id: 27, unidad: '201 B', propietario: 'CAMPO ELIAS LÓPEZ', coeficiente: 0.36880 },
{ id: 28, unidad: '201 C', propietario: 'SANDRA MONTENEGRO', coeficiente: 0.52730 },
{ id: 29, unidad: '201 D', propietario: 'JAVIER RODRIGUEZ', coeficiente: 0.65500 },
{ id: 30, unidad: '202', propietario: 'ERLINTO VELAZCO', coeficiente: 0.65410 },
{ id: 31, unidad: '203', propietario: 'SIERVO HERNANDEZ', coeficiente: 0.59060 },
{ id: 32, unidad: '204', propietario: 'ADRIANA LAGOS', coeficiente: 0.59190 },
{ id: 33, unidad: '205', propietario: 'CAMPO ELIAS LÓPEZ', coeficiente: 0.59590 },
{ id: 34, unidad: '206', propietario: 'ROBERT PORTILLA', coeficiente: 0.59330 },
{ id: 35, unidad: '207', propietario: 'JUDITH ARÉVALO', coeficiente: 0.58460 },
{ id: 36, unidad: '208', propietario: 'DARIO HUERTAS', coeficiente: 0.59430 },
{ id: 37, unidad: '209', propietario: 'NOHORA MILENI PONCE', coeficiente: 0.53180 },
{ id: 38, unidad: '210', propietario: 'LUCIO RODRIGUEZ', coeficiente: 1.52600 },
{ id: 39, unidad: '211', propietario: 'DIEGO EDISSON ORTIZ', coeficiente: 0.57840 },
{ id: 40, unidad: '212', propietario: 'JESUS OSWALDO VILLOTA', coeficiente: 0.60160 },
{ id: 41, unidad: '213', propietario: 'ALVARO SANTIUSTY', coeficiente: 0.58790 },
{ id: 42, unidad: '214', propietario: 'EDISON ARMANDO DELGADO', coeficiente: 0.53700 },
{ id: 43, unidad: '215', propietario: 'MIGUEL ANGEL ROSERO MORÁN', coeficiente: 0.69970 },
{ id: 44, unidad: '216', propietario: 'LUIS ALEJANDRO MUÑOZ', coeficiente: 0.62880 },
{ id: 45, unidad: '217', propietario: 'MARIANO LÓPEZ', coeficiente: 0.51920 },
{ id: 46, unidad: '218', propietario: 'JESÚS OSWALDO VILLOTA', coeficiente: 1.18920 },

{ id: 47, unidad: '301', propietario: 'EUDORO BENAVIDES', coeficiente: 1.18380 },
{ id: 48, unidad: '302', propietario: 'ALBA LUCELLY ROSERO REVELO', coeficiente: 0.54800 },
{ id: 49, unidad: '303', propietario: 'SEGUNDO LUNA ORTEGA', coeficiente: 0.97230 },
{ id: 50, unidad: '304', propietario: 'RODRIGO NELSON ESTUPIÑÁN', coeficiente: 0.97210 },
{ id: 51, unidad: '305', propietario: 'GLADYS RAMÍREZ', coeficiente: 1.47020 },
{ id: 52, unidad: '306', propietario: 'LUIS ALFREDO FAJARDO', coeficiente: 1.14800 },
{ id: 53, unidad: '307', propietario: 'CARLOS FABIÁN MORA PARÍS', coeficiente: 0.83250 },
{ id: 54, unidad: '308', propietario: 'FAMILIA BOLAÑOS', coeficiente: 1.10570 },

{ id: 55, unidad: '401 A', propietario: 'GERMÁN ANDRÉS ORTIZ', coeficiente: 0.90070 },
{ id: 56, unidad: '401 B', propietario: 'ALEJANDRA ESCOBAR', coeficiente: 0.86910 },
{ id: 57, unidad: '401 C', propietario: 'TELMEX COLOMBIA', coeficiente: 2.06750 },
{ id: 58, unidad: '403', propietario: 'ARGENIS LORENA ZAMORA', coeficiente: 1.29640 },
{ id: 59, unidad: '404', propietario: 'JOSÉ ANTONIO ROSERO REVELO', coeficiente: 0.91140 },
{ id: 60, unidad: '405', propietario: 'CARLOS FERNANDO NUÑEZ', coeficiente: 0.99660 },
{ id: 61, unidad: '407', propietario: 'BERTHA ROSAS DE CERON - JORGE CERÓN', coeficiente: 0.84300 },
{ id: 62, unidad: '408', propietario: 'DOLORES ENRÍQUEZ', coeficiente: 0.97040 },
{ id: 63, unidad: '409', propietario: 'FABIO JULIAN VILLOTA', coeficiente: 1.66820 },

{ id: 64, unidad: '501', propietario: 'HEIDY VILLOTA', coeficiente: 1.26730 },
{ id: 65, unidad: '502', propietario: 'JUAN GALVIS', coeficiente: 0.71340 },
{ id: 66, unidad: '503', propietario: 'MARTIN ALONSO ACOSTA', coeficiente: 1.28140 },
{ id: 67, unidad: '504', propietario: 'MANUEL ROSERO', coeficiente: 0.92220 },
{ id: 68, unidad: '505', propietario: 'GUSTAVO CERÓN', coeficiente: 0.98100 },
{ id: 69, unidad: '506', propietario: 'MARÍA INÉS BACCA', coeficiente: 1.08140 },
{ id: 70, unidad: '507', propietario: 'HERNANDO ERAZO', coeficiente: 1.16470 },
{ id: 71, unidad: '508', propietario: 'FLOR ALBA CÓRDOBA', coeficiente: 0.97450 },
{ id: 72, unidad: '509', propietario: 'ALVARO HIDALGO', coeficiente: 1.65640 },
{ id: 73, unidad: '601', propietario: 'MERCEDES NOGUERA', coeficiente: 1.26730 },
{ id: 74, unidad: '602', propietario: 'GERMAN GUERRERO', coeficiente: 0.71320 },
{ id: 75, unidad: '603 A', propietario: 'MARIO GARCIA', coeficiente: 1.28750 },
{ id: 76, unidad: '604', propietario: 'HEYLEN ZAMBRANO', coeficiente: 0.91680 },
{ id: 77, unidad: '605', propietario: 'HEYLEN ZAMBRANO', coeficiente: 0.97580 },
{ id: 78, unidad: '606', propietario: 'HERMAN GONZALES', coeficiente: 1.08140 },

{ id: 79, unidad: '607', propietario: 'RODRIGO FABRICIO PAREDES', coeficiente: 1.16660 },
{ id: 80, unidad: '608', propietario: 'GERMAN PEREZ', coeficiente: 0.96300 },
{ id: 81, unidad: '609 A', propietario: 'JANETH PAZ SUÁREZ', coeficiente: 0.33430 },
{ id: 82, unidad: '609 B', propietario: 'SILVIO ZAMBRANO', coeficiente: 0.33430 },
{ id: 83, unidad: '609 C', propietario: 'KAROL ZAMBRANO', coeficiente: 0.33430 },
{ id: 84, unidad: '609 D', propietario: 'ANGELA ZAMBRANO', coeficiente: 0.33430 },
{ id: 85, unidad: '609 E', propietario: 'MARTHA CALVACHE', coeficiente: 0.33430 },

{ id: 86, unidad: '701 A', propietario: 'ROCÍO JOJOA', coeficiente: 0.71530 },
{ id: 87, unidad: '701 B', propietario: 'FABIÁN ERAZO', coeficiente: 0.55390 },
{ id: 88, unidad: '702', propietario: 'SILVIO CHÁVEZ', coeficiente: 0.71370 },
{ id: 89, unidad: '703 A', propietario: 'JAIRO REVELO', coeficiente: 0.76490 },
{ id: 90, unidad: '703 B', propietario: 'LUIS ANUARIO ALVAREZ', coeficiente: 0.52320 },
{ id: 91, unidad: '704', propietario: 'LUCIO ENRIQUE RODRÍGUEZ', coeficiente: 0.91760 },
{ id: 92, unidad: '705', propietario: 'GABRIEL DARÍO PANTOJA', coeficiente: 0.97310 },
{ id: 93, unidad: '706', propietario: 'REINELIO BURBANO', coeficiente: 1.08470 },
{ id: 94, unidad: '707', propietario: 'MARÍA EDITH SALCEDO', coeficiente: 1.17120 },
{ id: 95, unidad: '708', propietario: 'OSCAR ABEL HURTADO', coeficiente: 0.96690 },
{ id: 96, unidad: '709', propietario: 'LUIS IGNACIO MAYA', coeficiente: 1.66880 },

{ id: 97, unidad: '804', propietario: 'YAMID CHAVES', coeficiente: 0.97230 },
{ id: 98, unidad: '805', propietario: 'PEDRO RODRÍGUEZ GARZÓN', coeficiente: 1.37830 },
{ id: 99, unidad: '807', propietario: 'MAURICIO RODRÍGUEZ OSEJO', coeficiente: 1.92200 },
{ id: 100, unidad: '808', propietario: 'MARÍO CHAMORRO', coeficiente: 1.27000 },
{ id: 101, unidad: '809', propietario: 'CARMENZA MOSQUERA', coeficiente: 1.15760 },
{ id: 102, unidad: '809 A', propietario: 'MARÍO ERAZO', coeficiente: 1.15760 }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. TODOS LOS ESTADOS (Agrupados arriba para evitar errores)
  const [asistencia, setAsistencia] = useState(() => {
    try {
      const saved = localStorage.getItem('asistencia_concasa_2026');
      return saved ? JSON.parse(saved) : COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    } catch (e) { return COEFICIENTES_DATA.map(c => ({ ...c, presente: false })); }
  });
  
  const [agendaStatus, setAgendaStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('agenda_concasa_2026');
      return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
    } catch (e) { return new Array(ORDEN_DIA.length).fill(false); }
  });

  const [dignatarios, setDignatarios] = useState(() => {
    try {
      const saved = localStorage.getItem('dignatarios_concasa_2026');
      return saved ? JSON.parse(saved) : { presidente: '', secretario: '', comision: '' };
    } catch (e) { return { presidente: '', secretario: '', comision: '' }; }
  });

  const [proposiciones, setProposiciones] = useState(() => {
    try {
      const saved = localStorage.getItem('proposiciones_concasa_2026');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });

  const [postuladosConsejo, setPostuladosConsejo] = useState(() => {
    try {
      const saved = localStorage.getItem('postulados_consejo_concasa_2026');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  // MOVIMOS ESTE ARRIBA PARA QUE EL useEffect LO RECONOZCA
  const [revisorElegido, setRevisorElegido] = useState(() => {
    try {
      const saved = localStorage.getItem('revisor_elegido_concasa_2026');
      return saved ? JSON.parse(saved) : "";
    } catch (e) { return ""; }
  });

  // 2. EFECTOS (Van después de los estados)
  useEffect(() => {
    try {
      localStorage.setItem('asistencia_concasa_2026', JSON.stringify(asistencia));
      localStorage.setItem('agenda_concasa_2026', JSON.stringify(agendaStatus));
      localStorage.setItem('dignatarios_concasa_2026', JSON.stringify(dignatarios));
      localStorage.setItem('proposiciones_concasa_2026', JSON.stringify(proposiciones));
      localStorage.setItem('postulados_consejo_concasa_2026', JSON.stringify(postuladosConsejo));
      localStorage.setItem('revisor_elegido_concasa_2026', JSON.stringify(revisorElegido));
    } catch (e) {
      console.error("Error guardando en localStorage", e);
    }
  }, [asistencia, agendaStatus, dignatarios, proposiciones, postuladosConsejo, revisorElegido]);

  // 3. FUNCIONES Y MEMOS
  const togglePostulacion = (nombre, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => 
        prev.includes(nombre) 
          ? prev.filter(p => p !== nombre) 
          : [...prev, nombre]
      );
    }
  };

  const totalQuorum = useMemo(() => {
    const total = asistencia
      .filter(a => a.presente)
      .reduce((acc, curr) => acc + (Number(curr.coeficiente) || 0), 0);
    return parseFloat(total.toFixed(5));
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

  const seleccionarTodo = () => {
    setAsistencia(prev => prev.map(a => ({ ...a, presente: true })));
  };

  const quitarTodo = () => {
    setAsistencia(prev => prev.map(a => ({ ...a, presente: false })));
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

  const handlePrint = () => window.print();

  // Continúa el return...

  return (
    <div className="flex min-h-screen bg-[#F5EFE3] font-sans text-[#2F2F2F] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#2F2F2F] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#E85A1A] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-white/20 flex items-center justify-center rounded-[28px] shadow-lg">
                <Building2 className="text-white" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none uppercase mb-2">
            EDIFICIO <span className="text-[#F5EFE3]/80 block text-sm mt-1">CONCASA P.H.</span>
          </h1>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Asamblea General 2026</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: ListChecks },
            { id: 'dignatarios', label: '3. Dignatarios', icon: UserPlus },
            { id: 'acta-anterior', label: '4. Acta Anterior', icon: FileText },
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
                ? 'bg-[#E85A1A] text-white shadow-xl translate-x-2' 
                : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#F5EFE3]">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#E85A1A]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest">Quórum Representado</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#E85A1A]' : 'text-[#2F2F2F]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#E85A1A] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-12 border-[#E85A1A]/10">
              <span className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest">Progreso de Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#E85A1A]/5 shadow-inner">
                    <div className="h-full bg-[#E85A1A] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#E85A1A]">{Math.floor(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
               <p className="text-[14px] font-black text-[#2F2F2F] uppercase tracking-tight">EDIFICIO CONCASA</p>
               <p className="text-[11px] text-[#E85A1A] font-black uppercase tracking-widest">Pasto, Nariño</p>
            </div>
            <div className="h-14 w-14 bg-[#E85A1A] rounded-2xl flex items-center justify-center text-white shadow-xl">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#2F2F2F] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#E85A1A]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#E85A1A] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Sesión Ordinaria de Copropietarios</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">EDIFICIO <span className="text-[#E85A1A] italic block text-4xl mt-4">CONCASA P.H.</span></h1>
                     <div className="w-32 h-2 bg-[#D9B56B] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">Convocatoria 2026<br/>Gestión 2025 - Proyección 2026</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest leading-none">NIT: 814.000.857-8</p>
                       <p className="text-lg font-black text-[#2F2F2F]">Cra. 24 No. 17-75</p>
                       <p className="text-[10px] font-black text-[#E85A1A]">Centro - Pasto</p>
                    </div>
                  </Card>
                  <Card title="Lugar y Fecha">
                    <div className="space-y-3 pt-2 text-[#2F2F2F]">
                       <p className="text-lg font-black">5 de Marzo 2026</p>
                       <p className="text-[11px] font-black text-[#E85A1A] opacity-80 uppercase">6:00 P.M. - HOTEL DON SAÚL</p>
                    </div>
                  </Card>
                  <Card title="Administración">
                    <div className="space-y-3 pt-2">
                       <p className="text-sm font-black text-[#2F2F2F]">ANA LUCIA YEPEZ C.</p>
                       <p className="text-[10px] font-black text-[#D9B56B]">REPRESENTANTE LEGAL</p>
                    </div>
                  </Card>
               </div>
            </div>
          )}

          {/* SECCIÓN 1: QUORUM */}
          {activeSection === 'quorum' && (
            <div className="space-y-10 animate-in slide-in-from-right-10">
              <SectionHeader 
                title="1. Registro y Quórum" 
                icon={Users} 
                agendaIndices={[0]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              
              <div className="flex flex-col xl:flex-row gap-8 items-center justify-between print:hidden">
                <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl items-center">
                  {/* BUSCADOR */}
                  <div className="relative group w-full">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#E85A1A]" size={24} />
                    <input 
                      type="text" 
                      placeholder="BUSCAR UNIDAD O PROPIETARIO..." 
                      className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-[#D9B56B]/20 focus:border-[#E85A1A] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* BOTONES DE ACCIÓN MASIVA */}
                  <div className="flex gap-3 shrink-0">
                    <button 
                      type="button"
                      onClick={seleccionarTodo}
                      className="px-6 py-4 bg-[#2F2F2F] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#E85A1A] transition-all shadow-lg active:scale-95"
                    >
                      Seleccionar Todo
                    </button>
                    <button 
                      type="button"
                      onClick={quitarTodo}
                      className="px-6 py-4 bg-white border-2 border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:border-red-500 hover:text-red-500 transition-all shadow-sm active:scale-95"
                    >
                      Quitar Todo
                    </button>
                  </div>
                </div>

                {/* CONTADOR DE QUORUM Y UNIDADES */}
                <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-[32px] shadow-sm border border-[#D9B56B]/10 min-w-[320px]">
                  <div className="text-right">
                      <p className="text-[10px] font-black text-[#2F2F2F] uppercase tracking-widest">QUÓRUM TOTAL</p>
                      <p className="text-3xl font-black text-[#E85A1A]">
                        {Math.round(totalQuorum)}%
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">{asistencia.filter(a => a.presente).length} UNIDADES</p>
                  </div>
                  <Percent className="text-[#E85A1A]" size={40} />
                </div>
              </div>

              {/* TABLA */}
              <div className="w-full bg-white rounded-[40px] shadow-sm border border-[#D9B56B]/20 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F5EFE3] text-[#2F2F2F] font-black uppercase tracking-widest text-[11px] border-b-2 border-[#D9B56B]/20">
                    <tr>
                      <th className="px-12 py-8">UNIDAD</th>
                      <th className="px-12 py-8">COPROPIETARIO</th>
                      <th className="px-12 py-8 text-center">COEF (%)</th>
                      <th className="px-12 py-8 text-center print:hidden">ASISTENCIA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 uppercase">
                    {filteredAsistencia.map((item) => (
                      <tr key={item.id} className={`${item.presente ? 'bg-[#E85A1A]/5' : ''} hover:bg-slate-50 transition-colors`}>
                        <td className="px-12 py-8 font-black text-[#E85A1A] text-xl">{item.unidad}</td>
                        <td className="px-12 py-8 font-black text-[#2F2F2F] text-sm tracking-tight">{item.propietario}</td>
                        <td className="px-12 py-8 font-black text-[#2F2F2F] text-center text-xl">
                          {item.coeficiente.toFixed(5)}%
                        </td>
                        <td className="px-12 py-8 text-center print:hidden">
                          <button 
                            type="button"
                            onClick={() => toggleAsistencia(item.id)} 
                            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                              item.presente ? 'bg-[#E85A1A]' : 'bg-slate-200'
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

          {/* SECCIÓN 2: ORDEN DEL DÍA */}
          {activeSection === 'orden' && (
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="2. Orden del Día" icon={ListChecks} agendaIndices={[1]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card highlight title="Puntos Propuestos">
                <div className="space-y-4 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#E85A1A] bg-[#E85A1A]/5' : 'border-[#D9B56B]/20 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#2F2F2F] text-white' : 'bg-[#E85A1A] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#E85A1A]' : 'text-[#2F2F2F]'}`}>
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* SECCIÓN 3: DIGNATARIOS */}
          {activeSection === 'dignatarios' && (
            <div className="space-y-10 animate-in zoom-in-95 uppercase">
              <SectionHeader 
                title="3. Dignatarios de Asamblea" 
                icon={UserPlus} 
                agendaIndices={[2]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="Elección de Mesa Directiva" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest block">Presidente de Asamblea</label>
                      <input 
                        type="text" 
                        className="w-full p-6 bg-slate-50 border-2 border-[#D9B56B]/20 rounded-2xl font-black uppercase text-xs focus:border-[#E85A1A] outline-none" 
                        placeholder="NOMBRE COMPLETO..." 
                        value={dignatarios.presidente} 
                        onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest block">Secretario(a)</label>
                      <input 
                        type="text" 
                        className="w-full p-6 bg-slate-50 border-2 border-[#D9B56B]/20 rounded-2xl font-black uppercase text-xs focus:border-[#E85A1A] outline-none" 
                        placeholder="NOMBRE COMPLETO..." 
                        value={dignatarios.secretario} 
                        onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} 
                      />
                    </div>
                  </div>
                </Card>
                
                <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                  <div className="space-y-4 pt-4">
                    <label className="text-[11px] font-black text-[#2F2F2F] uppercase tracking-widest block">Miembros Comisión 2026</label>
                    <textarea 
                      className="w-full p-6 bg-slate-50 border-2 border-[#D9B56B]/20 rounded-2xl font-black uppercase text-[11px] h-32 focus:border-[#E85A1A] outline-none leading-loose" 
                      placeholder="INGRESE NOMBRES DE LOS DESIGNADOS..." 
                      value={dignatarios.comision} 
                      onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}
                    ></textarea>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN: LECTURA Y APROBACIÓN DEL ACTA ANTERIOR */}
          {activeSection === 'acta-anterior' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader 
                title="3. Lectura y Aprobación del Acta Anterior" 
                icon={FileText} 
                agendaIndices={[3]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="VERIFICACIÓN Y CONSULTA" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4">
                    <p className="text-[11px] font-bold text-slate-600 leading-loose">
                      EL ACTA DE LA ASAMBLEA GENERAL ORDINARIA DE COPROPIETARIOS DEL AÑO ANTERIOR SE ENCUENTRA DISPONIBLE PARA REVISIÓN DE LA COMISIÓN DESIGNADA Y ASAMBLEÍSTAS.
                    </p>
                    
                    {/* BOTÓN INTERACTIVO PARA ABRIR EL ACTA DE CONCASA */}
                    <a 
                      href="https://drive.google.com/file/d/1v2VzjRk2HgmdzDnxkKJjfVOsPJQOV6r-/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group p-8 bg-slate-50 rounded-[40px] border-2 border-dashed border-[#E85A1A]/20 flex flex-col items-center justify-center text-center transition-all hover:bg-[#E85A1A]/5 hover:border-[#E85A1A] hover:shadow-xl cursor-pointer"
                    >
                      <div className="p-5 bg-white rounded-full shadow-md mb-4 group-hover:scale-110 transition-transform">
                        <FileText size={45} className="text-[#E85A1A]" />
                      </div>
                      <p className="text-[10px] font-black text-[#E85A1A] mb-1 tracking-[0.2em]">CLIC PARA CONSULTAR</p>
                      <p className="text-[13px] font-black text-[#2F2F2F]">ACTA ASAMBLEA ANTERIOR.PDF</p>
                      <div className="flex items-center gap-2 mt-4 text-[9px] font-bold text-slate-400">
                        <ExternalLink size={14} />
                        <span>ABRIR EN GOOGLE DRIVE</span>
                      </div>
                    </a>
                  </div>
                </Card>
                
                <Card title="OBSERVACIONES AL TEXTO" icon={ClipboardCheck}>
                  <div className="space-y-4 pt-2">
                    <p className="text-[10px] font-black text-slate-400 mb-2">ESPACIO PARA REGISTRO DE CORRECCIONES O ACLARACIONES:</p>
                    <textarea 
                      className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[30px] font-bold uppercase text-[11px] h-56 focus:border-[#E85A1A] focus:bg-white outline-none transition-all resize-none shadow-inner"
                      placeholder="ESCRIBA AQUÍ LAS OBSERVACIONES DE LA ASAMBLEA..."
                    ></textarea>
                    <div className="flex justify-end">
                      <span className="text-[9px] font-black text-slate-300 italic">SISTEMA DE REGISTRO CONCASA 2025</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">

              <SectionHeader 
                title="5. Informe Integral de Gestión Administrativa 2025" 
                icon={TrendingUp} 
                agendaIndices={[4]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              {/* PARTE 1: CONSEJO Y CARTERA */}
              <div className="grid grid-cols-1  gap-8">

                <Card title="1. CONSEJO DE ADMINISTRACIÓN" highlight icon={UserCheck}>
                  <div className="space-y-4 pt-2">

                    <p className="text-xl font-black text-[#E85A1A]">
                      DRA. JANETH DELGADO (PRESIDENTA)
                    </p>

                    <div className="pt-4 border-t border-slate-100">

                      <p className="text-[11px] font-bold text-slate-600 mb-4 tracking-tighter">
                        SESIONES ORDINARIAS: TERCER MIÉRCOLES DE CADA MES
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-black">

                        {[
                          'Arq. Gustavo Cerón',
                          'Dr. Pedro Rodríguez',
                          'Dra. Janeth Paz',
                          'Dr. Silvio Chávez'
                        ].map(m => (

                          <div key={m} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-[#E85A1A] rounded-full"/> 
                            {m}
                          </div>

                        ))}

                      </div>
                    </div>
                  </div>
                </Card>


                <Card title="2. GESTIÓN DE CARTERA Y COBRO" icon={DollarSign}>
                  <div className="space-y-4">

                    {/* BADGE DE RESPONSABLE LEGAL */}
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border-l-4 border-[#E85A1A]">
                      <div className="p-2 bg-white rounded-full shadow-sm">
                        <ShieldCheck size={20} className="text-[#E85A1A]" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Profesional a Cargo</p>
                        <p className="text-[12px] font-black text-slate-900 uppercase">Dra. Claudia Arciniegas</p>
                      </div>
                    </div>  

                    {/* CONTENEDOR DE INDICADORES EN DOS COLUMNAS */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center transition-all hover:bg-white hover:shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Administración</p>
                        </div>
                      </div>

                      <div className="p-4 bg-[#E85A1A]/5 rounded-2xl border border-[#E85A1A]/10 flex justify-between items-center transition-all hover:bg-[#E85A1A]/10">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-[#E85A1A]"></div>
                          <p className="text-[10px] font-black text-[#E85A1A] uppercase tracking-widest">Consejo de Administración</p>
                        </div>
                      </div>
                    </div>

                    {/* CUADRO OSCURO CON TEXTO ACTUALIZADO Y DISEÑO PULIDO */}
                    <div className="bg-slate-900 p-6 rounded-[32px] text-white border-b-4 border-[#E85A1A] relative overflow-hidden group">
                      {/* Decoración sutil de fondo */}
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={40} className="text-white" />
                      </div>

                      <div className="relative z-10">
                        <p className="text-[10px] font-black text-[#E85A1A] mb-3 tracking-[0.2em] uppercase">Gestión de Cartera</p>
                        <p className="text-[12px] font-medium leading-relaxed text-slate-200">
                          DURANTE EL AÑO SE REALIZÓ SEGUIMIENTO A LA CARTERA, EFECTUANDO LOS RESPECTIVOS COBROS JURÍDICOS Y ACCIONES PARA RECUPERAR LAS OBLIGACIONES EN MORA; SIN EMBARGO, ALGUNOS CANCELAN LA DEUDA Y POSTERIORMENTE VUELVEN A QUEDAR EN MORA CON LA ADMINISTRACIÓN DE SUS OFICINAS.
                        </p>
                      </div>
                    </div>

                  </div>
                </Card>

              </div>


              {/* ADECUACIONES Y LOGROS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {[
                  { t: "SEGURIDAD", d: "9 CÁMARAS NUEVAS + DVR 32 CANALES. ENROLAMIENTO PERSONAL ING. SEBASTIÁN CERÓN.", i: ShieldCheck },
                  { t: "FACHADA", d: "CONTRATO BELLAVISTA JT SAS. LIMPIEZA TOTAL Y SILICONADO EXTERIOR ($28.605.646).", i: Wrench },
                  { t: "LOGRO VIGILANCIA", d: "NEGOCIACIÓN DESCUENTO 50% EN FACTURAS JUNIO Y JULIO CON SEGURIDAD SOLARTE.", i: Zap },
                ].map((item, i) => (

                  <div key={i} className="bg-white p-6 rounded-[35px] border-2 border-slate-50 shadow-sm">
                    <item.i className="text-[#E85A1A] mb-4" size={24} />
                    <h5 className="text-xs font-black mb-2">{item.t}</h5>
                    <p className="text-[10px] font-bold text-slate-500 leading-tight">{item.d}</p>
                  </div>

                ))}

              </div>


              {/* PARTE 2: GASTOS FIJOS Y VARIABLES */}

              <div className="space-y-12">

                <ManagementTable 
                  title="A. GASTOS FIJOS MENSUALES"
                  headers={["PROVEEDOR", "CONCEPTO", "DETALLE"]}
                  icon={Activity}

                  data={[

                    { p: "ENERTOTAL SA ESP", c: "ENERGÍA ZONAS COMUNES", d: "PAGO MENSUAL SERVICIO" },
                    { p: "CEDENAR SA ESP", c: "ENERGÍA OFICINA 106A", d: "PAGO MENSUAL OFICINA" },
                    { p: "EMPOPASTO SA ESP", c: "ACUEDUCTO Y ALCANTAR.", d: "PAGO MENSUAL AGUA" },
                    { p: "EMAS SA ESP", c: "ASEO URBANO", d: "RECOLECCIÓN BASURAS" },
                    { p: "SEGURIDAD JUAN B. SOLARTE", c: "VIGILANCIA PRIVADA", d: "VIGILANCIA FÍSICA" },
                    { p: "LINEAS SURAMERICANAS", c: "SERVICIOS GENERALES", d: "ASEO Y MANTTO BÁSICO" },
                    { p: "EUROLIFT SAS", c: "MANTTO ASCENSORES", d: "CONTRATO PREVENTIVO" },
                    { p: "COLOMBIA TELECOMUNICACIONES", c: "INTERNET Y TELEFONÍA", d: "SERVICIO ADMINISTRACIÓN" },
                    { p: "LUZ JANETH LOPEZ", c: "CONTABILIDAD", d: "SERVICIOS CONTABLES" },
                    { p: "JESUS ERNESTO MELO", c: "REVISORÍA FISCAL", d: "SERVICIOS REVISORÍA" },
                    { p: "ANA LUCIA YEPEZ", c: "ADMINISTRACIÓN", d: "HONORARIOS GESTIÓN" },

                  ].map(i => ({

                    p: <span className="text-[#E85A1A] font-black text-[10px]">{i.p}</span>,
                    c: <span className="font-black text-slate-700 text-[10px]">{i.c}</span>,
                    d: <span className="italic text-slate-500 text-[10px]">{i.d}</span>

                  }))}

                />


                <ManagementTable 
                  title="B3. MANTENIMIENTO E INFRAESTRUCTURA"
                  headers={["PROVEEDOR", "RUBRO", "ACTIVIDAD"]}

                  data={[

                    { p: "CASTEIR MORENO MOSQUERA", r: "OBRA CIVIL", a: "DESINSTALACIÓN E INSTALACIÓN DE TEJAS PARA IMPERMEABILIZACIÓN DE CANALES" },
                    { p: "BELLAVISTA JT SAS", r: "FACHADA", a: "LIMPIEZA DE VENTANAS Y SILICONADO GENERAL" },
                    { p: "JUAN SEBASTIAN CERON", r: "SEGURIDAD", a: "SUMINISTRO E INSTALACIÓN DE CÁMARAS Y DVR" },
                    { p: "EUROLIFT SAS", r: "ASCENSORES", a: "REPARACIÓN MÁQUINA PRINCIPAL Y CAMBIO DE RODAMIENTOS" },
                    { p: "RODAMIENTOS DEL SUR SAS", r: "REPUESTOS", a: "COMPRA DE RODAMIENTOS PARA ASCENSOR" },
                    { p: "FERRELECTRICOS SURAMERICANA", r: "PINTURA", a: "COMPRA DE ESTUCO, VINILO, LIJAS Y RODILLOS" },
                    { p: "DISTRIBUIDORA DE ACABADOS", r: "PINTURA", a: "COMPRA DE VINILO Y BROCHAS" },
                    { p: "OSCAR MALES", r: "CERRAJERÍA", a: "ARREGLO PUERTA DEL PARQUEADERO" },
                    { p: "JAVIER BOTINA", r: "CERRAJERÍA", a: "ELABORACIÓN DE LLAVES CHAPA PRINCIPAL" },
                    { p: "RAY LLAVES", r: "CERRAJERÍA", a: "ELABORACIÓN DE LLAVES" },
                    { p: "JOLMAR VALDES CASTAÑO", r: "MANTENIMIENTO", a: "TRABAJOS VARIOS DE MANTENIMIENTO" },
                    { p: "RICARDO FIERRO", r: "SGSST", a: "ACTUALIZACIÓN E IMPLEMENTACIÓN SISTEMA 2025" },
                    { p: "ALCALDÍA / DIAN", r: "IMPUESTOS", a: "IVA, RETEFUENTE, RENTA Y RETE ICA BIMESTRAL" },
                    { p: "OFICINA DE ADMINISTRACION", r: "ARRIENDO", a: "PAGO SALDO ARRENDAMIENTO OFICINA 106A" },

                  ]}

                />

              </div>

              {/* OBRAS Y MANTENIMIENTOS */}
              {/* OBRAS Y MANTENIMIENTOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <Card
                  title="LIMPIEZA Y SILICONADO DE FACHADA"
                  icon={Building2}
                  className="xl:col-span-2"
                >
                  <p className="text-[10px] font-bold text-slate-500 leading-tight">
                    CONTRATO CON BELLAVISTA JT SAS PARA LIMPIEZA DE VENTANAS,
                    SILICONADO EXTERIOR Y LAVADO DE FACHADA.
                  </p>

                  
                </Card>

                <Card
                  title="SISTEMA DE SEGURIDAD"
                  icon={Camera}
                >
                  <p className="text-[10px] font-bold text-slate-500">
                    INSTALACIÓN DE 9 CÁMARAS NUEVAS Y DVR DE 32 CANALES.
                  </p>
                </Card>

                <Card
                  title="ASCENSORES"
                  icon={HardHat}
                >
                  <p className="text-[10px] font-bold text-slate-500">
                    REPARACIÓN DE MÁQUINA PRINCIPAL Y CAMBIO DE RODAMIENTOS.
                  </p>
                </Card>

                <Card
                  title="SISTEMA SGSST"
                  icon={ShieldCheck}
                >
                  <p className="text-[10px] font-bold text-slate-500">
                    ACTUALIZACIÓN E IMPLEMENTACIÓN DEL SISTEMA DE SEGURIDAD Y SALUD.
                  </p>
                </Card>

                <Card
                  title="OBRA CIVIL"
                  icon={Wrench}
                  className="xl:col-span-2"
                >
                  <p className="text-[10px] font-bold text-slate-500">
                    DESINSTALACIÓN E INSTALACIÓN DE TEJAS PARA IMPERMEABILIZACIÓN
                    DE CANALES DEL EDIFICIO.
                  </p>
                </Card>

              </div>

              {/* CABECERA PRINCIPAL DE PÓLIZA */}
              <div className="bg-[#E85A1A] p-10 rounded-[50px] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-4 inline-block uppercase">
                        Aseguradora: La Previsora S.A.
                      </span>
                      <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
                        Póliza de Copropiedad
                      </h3>
                      <p className="text-white/80 font-bold text-lg flex items-center gap-2">
                        <Calendar size={18} />
                        VIGENCIA: 15 MAR 2025 - 15 MAR 2026
                      </p>
                    </div>
                    
                    <div className="bg-white text-[#E85A1A] p-6 rounded-[35px] text-center shadow-xl border-4 border-[#E85A1A]/20">
                      <p className="text-[10px] font-black opacity-60 uppercase">Total Pagado Anual</p>
                      <p className="text-3xl font-black">$13.434.662</p>
                    </div>
                  </div>

                  {/* DESGLOSE RÁPIDO DE COSTOS */}
                  <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm">
                      <p className="text-[9px] font-black opacity-60">PRIMA NETA</p>
                      <p className="text-lg font-black">$11.289.632</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm">
                      <p className="text-[9px] font-black opacity-60">IVA (19%)</p>
                      <p className="text-lg font-black">$2.145.030</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm">
                      <p className="text-[9px] font-black opacity-60">GASTOS EXP.</p>
                      <p className="text-lg font-black">$0.00</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm">
                      <p className="text-[9px] font-black opacity-60">ESTADO</p>
                      <p className="text-lg font-black uppercase">VIGENTE</p>
                    </div>
                  </div>
                </div>
                <ShieldCheck size={280} className="text-white opacity-5 absolute right-[-40px] bottom-[-40px]" />
              </div>

              {/* COLUMNA 1: SUMAS ASEGURADAS */}
              <Card title="Sumas Aseguradas" icon={DollarSign} highlight>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Áreas Comunes</span>
                    <span className="text-[11px] font-black text-slate-900">$6.755.500.000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Áreas Privadas</span>
                    <span className="text-[11px] font-black text-slate-900">$2.576.474.002</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Maquinaria</span>
                    <span className="text-[11px] font-black text-slate-900">$196.600.000</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-2xl mt-4">
                    <p className="text-[8px] font-black text-[#E85A1A] uppercase tracking-widest">Total Incendio/Terremoto</p>
                    <p className="text-lg font-black text-white">$9.557.174.002</p>
                  </div>
                </div>
              </Card>

              {/* COLUMNA 2: COBERTURAS */}
              <Card title="Amparos Adicionales" icon={ShieldCheck}>
                <div className="grid grid-cols-1 gap-2 pt-2">
                  {[
                    "Terremoto y Erupción (100%)",
                    "Daños por Agua y Anegación",
                    "Vientos Fuertes y Granizo",
                    "Sustracción con Violencia",
                    "Rotura de Maquinaria",
                    "Equipo Eléctrico / Electrónico"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
                      <CheckCircle2 size={12} className="text-[#E85A1A]" />
                      <span className="text-[10px] font-bold uppercase text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* FILA COMPLETA ABAJO: RESPONSABILIDAD CIVIL */}
              <div className="md:col-span-2">
                <Card title="Responsabilidad Civil Extracontractual (R.C.E)" icon={Gavel}>
                  <div className="flex flex-col md:flex-row items-center gap-8 pt-2">
                    {/* Límite Destacado */}
                    <div className="text-center md:text-left min-w-[200px]">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Límite Asegurado</p>
                      <p className="text-4xl font-black text-slate-900">$500.000.000</p>
                      <div className="mt-2 inline-block px-3 py-1 bg-[#E85A1A] text-white text-[9px] font-black rounded-full uppercase">
                        Amparo Integral
                      </div>
                    </div>

                    {/* Sublímites en formato de lista horizontal */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-[#E85A1A]">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Sublímite Suelos/Terrenos</p>
                        <p className="text-[13px] font-black text-slate-900">$4.666.237.001</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-slate-300">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Sublímite Cimientos</p>
                        <p className="text-[13px] font-black text-slate-900">$1.351.200.000</p>
                      </div>
                      <div className="sm:col-span-2 p-3 bg-slate-50 rounded-xl">
                        <p className="text-[10px] font-medium text-slate-500 italic">
                          "Cubre predios, labores y operaciones del Edificio Concasa frente a reclamos de terceros."
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          )}

          

          {/* SECCIÓN 6-7: FINANCIERO */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader 
                title="6-7. Dictamen y Estados Financieros" 
                icon={BarChart3} 
                agendaIndices={[5, 6]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="REVISORÍA FISCAL" icon={ShieldCheck} highlight>
                  <div className="text-center py-10">
                    <p className="text-[14px] font-black text-[#2F2F2F] mb-4">JESUS ERNESTO GABRIEL MELO</p>
                    <div className="w-16 h-1 bg-[#E85A1A] mx-auto mb-6"></div>
                    <p className="text-xs font-bold text-slate-500 italic leading-relaxed">Presentación del Dictamen e Informe sobre la razonabilidad de las cifras 2025.</p>
                  </div>
                </Card>
                <Card title="CONTABILIDAD" icon={Landmark}>
                  <div className="text-center py-10">
                    <p className="text-[14px] font-black text-[#2F2F2F] mb-4">LUZ JANETH LOPEZ VELA</p>
                    <div className="w-16 h-1 bg-[#D9B56B] mx-auto mb-6"></div>
                    <p className="text-xs font-bold text-slate-500 italic leading-relaxed">Presentación de Estados Financieros y Ejecución Presupuestal a Dic 31/2025.</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 8: PRESUPUESTO */}
          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="8. Proyecto Presupuesto 2026" icon={PieChart} agendaIndices={[7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="bg-[#2F2F2F] rounded-[60px] p-20 text-white text-center shadow-2xl relative overflow-hidden border-b-[20px] border-[#E85A1A]">
                <Landmark className="mx-auto mb-8 opacity-20" size={100} />
                <h3 className="text-4xl font-black mb-6 tracking-tighter">PRESUPUESTO VIGENCIA 2026</h3>
                <p className="text-white/60 text-lg font-black tracking-widest uppercase">Definición de Cuotas de Administración y Fondo de Imprevistos</p>
                <div className="mt-12 inline-block bg-[#E85A1A] px-10 py-5 rounded-3xl font-black text-xs tracking-[0.3em] shadow-xl">
                  SUJETO A APROBACIÓN POR ASAMBLEA
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 9-10: ELECCIONES PERÍODO 2026-2027 */}
          {activeSection === 'elecciones' && (
            <div className="space-y-10 animate-in fade-in duration-500 uppercase">
              <SectionHeader 
                title="9-10. Elecciones Período 2026-2027" 
                icon={Gavel} 
                agendaIndices={[8, 9]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              {/* VALIDACIÓN DE ASISTENCIA (Alerta si no hay nadie presente) */}
              {asistencia.filter(a => a.presente).length === 0 && (
                <div className="bg-orange-50 border-2 border-orange-200 p-8 rounded-[30px] text-orange-700 font-black text-center flex items-center justify-center gap-4 animate-bounce">
                  <AlertCircle size={24}/>
                  DEBE REGISTRAR LA ASISTENCIA (PUNTO 1) PARA PODER POSTULAR PROPIETARIOS
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                
                {/* PUNTO 9: CONSEJO DE ADMINISTRACIÓN */}
                <Card title="Nombramiento Consejo 2026-2027" icon={Users} highlight>
                  <div className="space-y-6 pt-2">
                    {/* ÁREA DE ELEGIDOS (BADGES) */}
                    <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#E85A1A]/20 flex flex-wrap gap-2">
                      {postuladosConsejo.length === 0 ? (
                        <p className="text-[9px] text-slate-400 font-black py-2 w-full text-center">ESPERANDO POSTULACIONES...</p>
                      ) : (
                        postuladosConsejo.map(p => (
                          <span key={p} className="bg-[#E85A1A] text-white px-3 py-1.5 rounded-xl text-[9px] font-black flex items-center gap-2 animate-in zoom-in">
                            {p} 
                            <button onClick={() => togglePostulacion(p, 'consejo')} className="hover:text-black">
                              <Trash2 size={12} />
                            </button>
                          </span>
                        ))
                      )}
                    </div>

                    {/* LISTADO DE PROPIETARIOS PRESENTES PARA ELEGIR */}
                    <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                      <p className="text-[10px] font-black text-slate-400 mb-2 sticky top-0 bg-white py-1">PROPIETARIOS PRESENTES:</p>
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex justify-between items-center p-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black text-slate-700">{r.propietario}</span>
                            <span className="text-[9px] font-bold text-[#E85A1A]">APTO {r.apto}</span>
                          </div>
                          <button 
                            onClick={() => togglePostulacion(r.propietario, 'consejo')} 
                            className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all ${
                              postuladosConsejo.includes(r.propietario) 
                                ? 'bg-slate-900 text-white shadow-lg scale-95' 
                                : 'bg-slate-100 text-[#E85A1A] hover:bg-[#E85A1A] hover:text-white'
                            }`}
                          >
                            {postuladosConsejo.includes(r.propietario) ? 'POSTULADO' : 'POSTULAR'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* PUNTO 10: REVISORÍA FISCAL */}
                <Card title="Elección Revisoría Fiscal" icon={ShieldCheck}>
                  <div className="space-y-6 pt-2">
                    <div className="bg-slate-900 p-8 rounded-[40px] text-white text-center relative overflow-hidden">
                      <p className="text-[10px] font-black text-[#E85A1A] tracking-widest mb-2 uppercase">Vigencia 2026-2027</p>
                      <h4 className="text-2xl font-black mb-4">POSTULACIONES EXTERNAS</h4>
                      <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
                        SE PROCEDERÁ CON LA LECTURA DE LAS PROPUESTAS PRESENTADAS POR LOS CONTADORES PÚBLICOS ASPIRANTES. LA VOTACIÓN SE REALIZARÁ POR COEFICIENTE.
                      </p>
                      <ShieldCheck size={100} className="text-white/5 absolute -right-4 -bottom-4" />
                    </div>

                    <div className="p-6 border-2 border-dashed border-slate-200 rounded-[30px] space-y-4">
                      <p className="text-[10px] font-black text-slate-500 text-center">REGISTRO DE ASPIRANTES:</p>
                      {/* Aquí puedes repetir la lógica de botones si tienes una lista de aspirantes a revisoría, 
                          o dejar un campo de texto para el ganador */}
                      <textarea 
                          className="w-full p-4 bg-slate-50 border-none rounded-2xl text-[11px] font-bold uppercase outline-none focus:ring-2 focus:ring-[#E85A1A] h-24"
                          placeholder="NOMBRE DEL REVISOR FISCAL ELEGIDO Y VALOR DE HONORARIOS..."
                      ></textarea>
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
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase">OFICINA / UNIDAD</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#E85A1A]/10 rounded-2xl font-black uppercase text-xs focus:border-[#E85A1A] outline-none" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} placeholder="EJ: 201" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase">DESCRIPCIÓN</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#E85A1A]/10 rounded-2xl font-black uppercase text-xs focus:border-[#E85A1A] outline-none" value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})} placeholder="INGRESE LA PROPUESTA..." />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addProposicion} className="w-full bg-[#E85A1A] text-white py-4 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-3 uppercase"><Plus size={18} /> AGREGAR</button>
                  </div>
                </div>
              </Card>
              <div className="space-y-6">
                {proposiciones.map((prop) => (
                    <div key={prop.id} className="bg-white p-8 rounded-[32px] border-2 border-[#D9B56B]/10 shadow-lg flex justify-between items-center group">
                       <div className="flex items-start gap-6">
                          <div className="h-14 w-14 bg-[#E85A1A] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shrink-0">P</div>
                          <div>
                             <p className="text-[10px] font-black text-[#E85A1A] mb-1">PROPOSICIÓN DE: {prop.proponente}</p>
                             <p className="text-sm font-black text-[#2F2F2F] leading-relaxed uppercase">{prop.texto}</p>
                          </div>
                       </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN FINAL */}
          {activeSection === 'final' && (
            <div className="space-y-16 animate-in zoom-in-95 text-center uppercase">
              <div className="flex justify-between items-center print:hidden bg-[#2F2F2F] p-10 rounded-[40px] shadow-2xl">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">FINALIZAR ASAMBLEA 2026</h2>
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL DEL EDIFICIO CONCASA</p>
                </div>
                <button onClick={handlePrint} className="bg-[#E85A1A] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl hover:scale-110 transition-all text-xs tracking-[0.2em]">
                  <Printer size={24} /> IMPRIMIR ACTA FINAL
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#E85A1A] print:shadow-none print:border-none print:p-0 bg-white">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#E85A1A] pb-10">
                  <h1 className="text-4xl font-black mb-4 uppercase">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                  <p className="text-xl font-black text-[#E85A1A] uppercase">EDIFICIO CONCASA P.H. - NIT 814.000.857-8</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-slate-50 rounded-[56px] border-2 border-[#D9B56B]/10 flex flex-col items-center">
                    <p className="text-[11px] font-black text-[#2F2F2F] mb-10 tracking-[0.3em]">Quórum de Cierre</p>
                    <p className="text-7xl font-black text-[#E85A1A] leading-none">{totalQuorum.toFixed(2)}%</p>
                  </div>
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#2F2F2F] tracking-[0.3em] uppercase leading-none mb-12">Mesa Directiva</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-4 border-[#E85A1A]/10 pb-4">
                          <p className="text-[9px] text-[#E85A1A] mb-2 font-black">PRESIDENTE:</p>
                          <p className="text-lg text-[#2F2F2F]">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-4 border-[#E85A1A]/10 pb-4">
                          <p className="text-[9px] text-[#E85A1A] mb-2 font-black">SECRETARIO(A):</p>
                          <p className="text-lg text-[#2F2F2F]">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>
                  <div className="p-12 bg-[#E85A1A] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#2F2F2F]">
                    <ShieldCheck size={72} className="text-white mb-10 opacity-50" />
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] opacity-60">Sesión Finalizada</p>
                    <p className="text-xl font-black mt-4">PASTO, MARZO 2026</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; background-color: #F5EFE3; }

        @media print {
          @page { margin: 1cm; size: letter; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          table { border-collapse: collapse !important; width: 100% !important; border: 1px solid #000 !important; }
          th { background: #E85A1A !important; color: white !important; -webkit-print-color-adjust: exact; padding: 8px !important; border: 1px solid #000 !important; }
          td { border: 1px solid #000 !important; padding: 8px !important; }
        }
      `}} />
    </div> 
  );
}