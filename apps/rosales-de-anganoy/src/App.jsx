import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, MessageSquare, Home, 
  ShieldCheck, UserPlus, CheckCircle2, Printer, Trash2, 
  TrendingUp, ClipboardCheck, Camera, Activity, Wrench, 
  Calendar, ListChecks, AlertCircle, ShieldAlert, HeartPulse, 
  Building2, Search, DollarSign, PieChart, Landmark, Gavel, 
  Wallet, Plus, UserCheck, Leaf, Scale, Map, Paintbrush
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL ROSALES DE ANGANOY ---
const COLORS = {
  terracota: '#C96A2C',
  naranja: '#E08A4B',
  terracotaOscuro: '#9A4E1F',
  blanco: '#FFFFFF',
  beige: '#F6F2ED',
  texto: '#2D2D2D'
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#C96A2C]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#C96A2C] rounded-2xl text-white shadow-lg">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#C96A2C] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[11px] text-[#2D2D2D] font-black uppercase tracking-[0.2em]">
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
        ? 'bg-[#9A4E1F] border-[#9A4E1F] text-white' 
        : 'bg-white border-[#C96A2C]/20 text-[#C96A2C] hover:bg-[#C96A2C] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#C96A2C] ring-4 ring-[#C96A2C]/10' : 'border-[#C96A2C]/5'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#2D2D2D] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#C96A2C]' : 'bg-[#9A4E1F]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#C96A2C]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#C96A2C] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#C96A2C]/10 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#C96A2C] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#C96A2C] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#F6F2ED] text-[#2D2D2D] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#C96A2C]/5 uppercase font-bold text-[#2D2D2D]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#C96A2C]/5 transition-colors">
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
  "Registro y verificación del quórum.",
  "Lectura y aprobación del orden del día.",
  "Elección de dignatarios de la Asamblea (presidente, secretario, comisión verificadora del texto del acta de la presente reunión).",
  "Lectura del concepto de la comisión verificadora del acta de la asamblea del año 2025.",
  "Presentación informe de administración.",
  "Presentación de Estados Financieros a diciembre 31 de 2025 y ejecución presupuestal año 2025.",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos para el año 2026 - Definición de cuotas de administración.",
  "Nombramiento del consejo de administración.",
  "Nombramiento del comité de convivencia.",
  "Ratificación del Manual de Convivencia.",
  "Aprobación inicio del proceso para acceder a la tarifa multiusuarios Emas.",
  "Análisis y aprobación del cambio de destinación de una zona común verde para su adecuación y uso como parqueadero de motocicletas.",
  "Análisis y aprobación de la limpieza e impermeabilización de las fachadas.",
  "Proposiciones y asuntos varios."
];

const COEFICIENTES_DATA = [
  { id: 101, unidad: '101', propietario: 'MANUEL ZARAMA DELGADO', coeficiente: 2.774 },
  { id: 102, unidad: '102', propietario: 'MARIA INES ZARAMA / JUAN CARLOS CONTO', coeficiente: 1.853 },
  { id: 103, unidad: '103', propietario: 'DIEGO ARMANDO PORTILLA', coeficiente: 2.145 },
  { id: 104, unidad: '104', propietario: 'MARIA CUASPUD', coeficiente: 1.960 },
  { id: 105, unidad: '105', propietario: 'ESNEDA URBANO', coeficiente: 2.291 },
  { id: 106, unidad: '106', propietario: 'PAOLA ANDREA MOSQUERA', coeficiente: 1.853 },
  { id: 107, unidad: '107', propietario: 'JUAN CARLOS MOGOLLON', coeficiente: 2.181 },
  { id: 108, unidad: '108', propietario: 'YURANI MAGALY VELASCO', coeficiente: 2.154 },
  { id: 109, unidad: '109', propietario: 'EDID LUCIA PIANDA YANGUATIN', coeficiente: 2.109 },
  { id: 201, unidad: '201', propietario: 'IVAN REBOLLEDO ERASO', coeficiente: 2.791 },
  { id: 202, unidad: '202', propietario: 'CARLOS ALBERTO ROSERO', coeficiente: 2.145 },
  { id: 203, unidad: '203', propietario: 'OCTAVIO YELA ECHEVERRY', coeficiente: 2.145 },
  { id: 204, unidad: '204', propietario: 'VIVIANA MATABANCHOY', coeficiente: 2.613 },
  { id: 205, unidad: '205', propietario: 'MARIA DEL SOCORRO PATIÑO', coeficiente: 2.284 },
  { id: 206, unidad: '206', propietario: 'LUIS FERNANDO GOMEZ', coeficiente: 1.853 },
  { id: 207, unidad: '207', propietario: 'FRANCISCO ALEXANDER MENDOZA', coeficiente: 2.145 },
  { id: 208, unidad: '208', propietario: 'LUIS RAFAEL DE LA CRUZ', coeficiente: 2.146 },
  { id: 209, unidad: '209', propietario: 'ANA LUCIA RIASCOS', coeficiente: 2.025 },
  { id: 301, unidad: '301', propietario: 'HELDRIDGEK MELO', coeficiente: 2.703 },
  { id: 302, unidad: '302', propietario: 'JENNY BUCHELLY', coeficiente: 1.853 },
  { id: 303, unidad: '303', propietario: 'JAVIER HIDALGO', coeficiente: 1.853 },
  { id: 304, unidad: '304', propietario: 'MAGDA JOANA BARRERA / HERNAN CORAL', coeficiente: 2.269 },
  { id: 305, unidad: '305', propietario: 'OLGA PATRICIA VILLOTA MONCAYO', coeficiente: 2.252 },
  { id: 306, unidad: '306', propietario: 'MANUEL GUILLERMO ZARAMA', coeficiente: 2.161 },
  { id: 307, unidad: '307', propietario: 'JULY GUERRERO ESPINOSA', coeficiente: 2.144 },
  { id: 308, unidad: '308', propietario: 'MAGDA YOHANA BOLAÑOS', coeficiente: 2.167 },
  { id: 309, unidad: '309', propietario: 'SAMIRA RUIZ DIAZ', coeficiente: 1.723 },
  { id: 401, unidad: '401', propietario: 'CARLOS MEDINA', coeficiente: 2.687 },
  { id: 402, unidad: '402', propietario: 'JUAN CARLOS SANTACRUZ', coeficiente: 1.853 },
  { id: 403, unidad: '403', propietario: 'FRANCO E. RIASCOS', coeficiente: 2.438 },
  { id: 404, unidad: '404', propietario: 'ERIKA A. MESIAS', coeficiente: 1.960 },
  { id: 405, unidad: '405', propietario: 'ANDRES FELIPE GUERRERO', coeficiente: 2.268 },
  { id: 406, unidad: '406', propietario: 'CLAUDIA MILENA RODRIGUEZ', coeficiente: 2.145 },
  { id: 407, unidad: '407', propietario: 'NOHORA ELENA IBARRA', coeficiente: 1.853 },
  { id: 408, unidad: '408', propietario: 'GEOVANNY ALEXANDER ROMERO', coeficiente: 1.852 },
  { id: 409, unidad: '409', propietario: 'LUIS HEBERTH JOSA MONTERO', coeficiente: 1.671 },
  { id: 501, unidad: '501', propietario: 'JHON JAIRO REYES', coeficiente: 2.777 },
  { id: 502, unidad: '502', propietario: 'ARMIDA MORILLO', coeficiente: 2.438 },
  { id: 503, unidad: '503', propietario: 'EDUARDO RUALES MELO', coeficiente: 1.853 },
  { id: 504, unidad: '504', propietario: 'AIDA LUCIA APRAEZ', coeficiente: 1.960 },
  { id: 505, unidad: '505', propietario: 'ALICIA DEL PILAR RIASCOS', coeficiente: 2.546 },
  { id: 506, unidad: '506', propietario: 'JAIRO ALONZO YELA MARTINEZ', coeficiente: 2.164 },
  { id: 507, unidad: '507', propietario: 'JAVIER HIDALGO', coeficiente: 2.145 },
  { id: 508, unidad: '508', propietario: 'JHON GOYES FLORES', coeficiente: 2.158 },
  { id: 509, unidad: '509', propietario: 'ROCIO DEL CARMEN BENAVIDES', coeficiente: 1.667 },
  { id: 1144, unidad: '11-44', propietario: 'MARIELA RINCON ZARAMA', coeficiente: 0.617 },
  { id: 1617, unidad: '16-17-9', propietario: 'VARIOS', coeficiente: 0.964 },
  { id: 2122, unidad: '21-22', propietario: 'VARIOS', coeficiente: 0.806 },
  { id: 28, unidad: '28', propietario: 'VARIOS', coeficiente: 0.293 },
  { id: 32, unidad: '32', propietario: 'VARIOS', coeficiente: 0.293 }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  const EvidenceSection = ({ title, content, icon: Icon, photos = [], color = "#C96A2C" }) => {
    const [showGallery, setShowGallery] = useState(false);

    return (
      <div className={`p-8 bg-[#F6F2ED]/50 rounded-[40px] border-l-[16px] shadow-sm flex flex-col relative group transition-all hover:shadow-md mb-6`} style={{ borderColor: color }}>
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-black uppercase tracking-widest" style={{ color: color }}>{title}</p>
          {photos.length > 0 && (
            <button 
              onClick={() => setShowGallery(true)}
              className="flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95"
            >
              <div className="p-3 bg-white rounded-2xl border-2 shadow-sm text-[#2D2D2D] hover:bg-[#C96A2C] hover:text-white transition-all" style={{ borderColor: `${color}20` }}>
                <Camera size={22} />
              </div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Evidencias</span>
            </button>
          )}
        </div>
        <div className="text-xl font-bold text-slate-800 leading-relaxed tracking-tight">
          {content}
        </div>
      </div>
    );
  };

  const InvestmentTable = ({ title, headers, data, icon: Icon, total }) => (
    <div className="bg-white rounded-[40px] border-4 border-[#C96A2C]/10 overflow-hidden shadow-2xl flex flex-col mb-12">
      <div className="bg-[#C96A2C] px-10 py-7 flex justify-between items-center border-b-[6px] border-[#9A4E1F]">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-white/10 rounded-2xl">
            {Icon && <Icon className="text-white" size={28} />}
          </div>
          <h4 className="text-lg font-black text-white uppercase tracking-[0.2em]">{title}</h4>
        </div>
        {total && (
          <div className="bg-[#9A4E1F] text-white px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-widest shadow-inner">
            {total}
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#F6F2ED] text-[#C96A2C] font-black uppercase tracking-widest border-b-2">
            <tr>
              {headers.map((h, i) => <th key={i} className="px-10 py-6 text-sm">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-50 uppercase font-bold text-slate-700">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#C96A2C]/5 transition-colors">
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

  // Estados persistentes
  const [asistencia, setAsistencia] = useState(() => {
    try {
      const saved = localStorage.getItem('asistencia_rosales_2026');
      return saved ? JSON.parse(saved) : COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    } catch (e) {
      return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    }
  });
  
  const [agendaStatus, setAgendaStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('agenda_rosales_2026');
      return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
    } catch (e) {
      return new Array(ORDEN_DIA.length).fill(false);
    }
  });

  const [dignatarios, setDignatarios] = useState(() => {
    try {
      const saved = localStorage.getItem('dignatarios_rosales_2026');
      return saved ? JSON.parse(saved) : { presidente: '', secretario: '', comision: '' };
    } catch (e) {
      return { presidente: '', secretario: '', comision: '' };
    }
  });

  const [proposiciones, setProposiciones] = useState(() => {
    try {
      const saved = localStorage.getItem('proposiciones_rosales_2026');
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
      localStorage.setItem('asistencia_rosales_2026', JSON.stringify(asistencia));
      localStorage.setItem('agenda_rosales_2026', JSON.stringify(agendaStatus));
      localStorage.setItem('dignatarios_rosales_2026', JSON.stringify(dignatarios));
      localStorage.setItem('proposiciones_rosales_2026', JSON.stringify(proposiciones));
    } catch (e) {}
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
      setPostuladosConsejo(prev => 
        prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]
      );
    } else {
      setPostuladosConvivencia(prev => 
        prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]
      );
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex min-h-screen bg-[#F6F2ED] font-sans text-[#2D2D2D] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#2D2D2D] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#C96A2C] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-white/20 flex items-center justify-center rounded-[28px] shadow-lg">
                <Leaf className="text-white" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none uppercase mb-2">
            ROSALES <span className="text-[#F6F2ED]/60 block text-sm mt-1">DE ANGANOY</span>
          </h1>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Propiedad Horizontal</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: ListChecks },
            { id: 'dignatarios', label: '3. Dignatarios', icon: UserPlus },
            { id: 'acta-anterior', label: '4. Acta Anterior', icon: FileText },
            { id: 'gestion', label: '5. Informe Gestión', icon: TrendingUp },
            { id: 'financiero', label: '6. Est. Financieros', icon: BarChart3 },
            { id: 'presupuesto', label: '7. Presupuesto', icon: PieChart },
            { id: 'elecciones', label: '8-9. Elecciones', icon: Users },
            { id: 'normativa', label: '10-13. Temas Clave', icon: ShieldCheck },
            { id: 'proposiciones', label: '14. Proposiciones', icon: MessageSquare },
            { id: 'final', label: 'Finalizar Acta', icon: Printer },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest ${
                activeSection === item.id 
                ? 'bg-[#C96A2C] text-white shadow-xl translate-x-2' 
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
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#F6F2ED]">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#C96A2C]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#2D2D2D] uppercase tracking-widest">Quórum Representado</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#C96A2C]' : 'text-[#2D2D2D]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#C96A2C] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VÁLIDO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-12 border-[#C96A2C]/10">
              <span className="text-[11px] font-black text-[#2D2D2D] uppercase tracking-widest">Progreso de Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#C96A2C]/5 shadow-inner">
                    <div className="h-full bg-[#C96A2C] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#C96A2C]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
               <p className="text-[14px] font-black text-[#2D2D2D] uppercase tracking-tight">ROSALES DE ANGANOY</p>
               <p className="text-[11px] text-[#C96A2C] font-black uppercase tracking-widest">Luis David Ipaz | Admin.</p>
            </div>
            <div className="h-14 w-14 bg-[#C96A2C] rounded-2xl flex items-center justify-center text-white shadow-xl">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#2D2D2D] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#C96A2C]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#C96A2C] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Asamblea General Ordinaria</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">ROSALES <span className="text-[#C96A2C] italic block text-4xl mt-4">DE ANGANOY</span></h1>
                     <div className="w-32 h-2 bg-[#C96A2C] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">CONVOCATORIA 2026<br/>Gestión 2025 - Futuro 2026</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#2D2D2D] uppercase tracking-widest leading-none">NIT: 901.094.115-1</p>
                       <p className="text-lg font-black text-[#2D2D2D]">Carrera 36 calle 5 Oeste 85</p>
                       <p className="text-[10px] font-black text-[#C96A2C]">San Juan de Pasto</p>
                    </div>
                  </Card>
                  <Card title="Cita Oficial">
                    <div className="space-y-3 pt-2 text-[#2D2D2D]">
                       <p className="text-lg font-black">28 de Febrero 2026</p>
                       <p className="text-[11px] font-black text-[#C96A2C] opacity-80 uppercase">Hora: 6:30 P.M. - Salón Comunal</p>
                    </div>
                  </Card>
                  <Card className="bg-[#C96A2C] text-white border-none flex flex-col items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <p className="text-6xl font-black text-white mb-2 leading-none tracking-tighter">
                        100%
                      </p>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90 leading-none">
                        Coeficiente Total
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
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-8 print:hidden">
                <div className="relative group w-full max-w-2xl">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#C96A2C]" size={24} />
                  <input 
                    type="text" 
                    placeholder="BUSCAR APARTAMENTO O PROPIETARIO..." 
                    className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-slate-200 focus:border-[#C96A2C] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-[32px] shadow-sm border border-slate-100">
                  <div className="text-right">
                      <p className="text-[10px] font-black text-[#2D2D2D] uppercase tracking-widest">PRESENTES</p>
                      <p className="text-3xl font-black text-[#C96A2C]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                  </div>
                  <Users className="text-[#C96A2C]" size={40} />
                </div>
              </div>

              <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F6F2ED] text-[#2D2D2D] font-black uppercase tracking-widest text-[11px] border-b-2">
                    <tr>
                      <th className="px-12 py-8">APARTAMENTO</th>
                      <th className="px-12 py-8">COPROPIETARIO</th>
                      <th className="px-12 py-8 text-center">COEF (%)</th>
                      <th className="px-12 py-8 text-center">ASISTENCIA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 uppercase">
                    {filteredAsistencia.map((item) => (
                      <tr key={item.id} className={`${item.presente ? 'bg-[#C96A2C]/5' : ''} hover:bg-slate-50 transition-colors`}>
                        <td className="px-12 py-8 font-black text-[#C96A2C] text-xl">{item.unidad}</td>
                        <td className="px-12 py-8 font-black text-[#2D2D2D] text-sm tracking-tight">{item.propietario}</td>
                        <td className="px-12 py-8 font-black text-[#2D2D2D] text-center text-xl">{item.coeficiente.toFixed(3)}%</td>
                        <td className="px-12 py-8 text-center">
                          <button 
                            onClick={() => toggleAsistencia(item.id)} 
                            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                              item.presente ? 'bg-[#C96A2C]' : 'bg-slate-200'
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
              <Card highlight title="Desarrollo de la Sesión">
                <div className="space-y-4 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#C96A2C] bg-[#C96A2C]/5' : 'border-[#C96A2C]/10 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#9A4E1F] text-white' : 'bg-[#C96A2C] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#C96A2C]' : 'text-[#2D2D2D]'}`}>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
                  <Card title="Mesa Directiva" icon={ShieldCheck} highlight>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#2D2D2D] uppercase tracking-widest block">Presidente de Asamblea</label>
                        <input 
                          type="text" 
                          className="w-full p-6 bg-[#F6F2ED] border-2 border-[#C96A2C]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#C96A2C]" 
                          placeholder="NOMBRE COMPLETO..." 
                          value={dignatarios.presidente} 
                          onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#2D2D2D] uppercase tracking-widest block">Secretario(a)</label>
                        <input 
                          type="text" 
                          className="w-full p-6 bg-[#F6F2ED] border-2 border-[#C96A2C]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#C96A2C]" 
                          placeholder="NOMBRE COMPLETO..." 
                          value={dignatarios.secretario} 
                          onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} 
                        />
                      </div>
                    </div>
                  </Card>
                  
                  <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                    <div className="space-y-4 pt-4">
                      <label className="text-[11px] font-black text-[#2D2D2D] uppercase tracking-widest block">Designados 2026</label>
                      <textarea 
                        className="w-full p-6 bg-[#F6F2ED] border-2 border-[#C96A2C]/10 rounded-2xl font-black uppercase text-[11px] h-40 focus:border-[#C96A2C] outline-none leading-loose shadow-inner" 
                        placeholder="INGRESE LOS NOMBRES DE LA COMISIÓN..." 
                        value={dignatarios.comision} 
                        onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}
                      ></textarea>
                    </div>
                  </Card>
                </div>

                <div className="bg-[#2D2D2D] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#C96A2C]">
                  <Gavel className="text-white mb-10 mx-auto" size={56} />
                  <h4 className="font-black text-2xl mb-6 uppercase tracking-tighter">Art. 39 Ley 675</h4>
                  <p className="text-[11px] font-black text-white/60 leading-loose uppercase tracking-[0.2em]">
                    La Asamblea es la autoridad suprema del edificio o conjunto. Sus decisiones son de obligatorio cumplimiento.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 4: ACTA ANTERIOR */}
          {activeSection === 'acta-anterior' && (
            <div className="space-y-10 animate-in fade-in duration-500 uppercase">
              <SectionHeader 
                title="4. Acta Asamblea Anterior" 
                icon={FileText} 
                agendaIndices={[3]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="Estado del Acta Anterior" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4">
                    <p className="text-[11px] font-bold text-slate-600 leading-loose">
                      VALIDACIÓN DEL CONCEPTO DE LA COMISIÓN VERIFICADORA DEL TEXTO DEL ACTA DE LA ASAMBLEA GENERAL ORDINARIA DEL AÑO 2025.
                    </p>
                    <div className="p-8 bg-[#F6F2ED] rounded-3xl border-2 border-dashed border-[#C96A2C]/20 flex flex-col items-center justify-center text-center">
                      <FileText size={40} className="text-[#C96A2C] mb-4 opacity-40" />
                      
                      {/* BOTÓN CON EL NUEVO LINK */}
                      <a 
                        href="https://drive.google.com/file/d/1FN70gRde3npIvGykFzvkaIAUzpgyri43/view?usp=sharing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mb-4 inline-flex items-center gap-2 bg-[#C96A2C] text-white px-6 py-3 rounded-xl font-black text-[10px] hover:bg-[#9A4E1F] transition-all shadow-lg shadow-[#C96A2C]/20 uppercase tracking-widest"
                      >
                        <FileText size={14} />
                        VER ACTA 2025 COMPLETA
                      </a>

                      <p className="text-[9px] font-black text-slate-400">EXPEDIENTE DIGITAL - ARCHIVOS DE ADMINISTRACIÓN</p>
                    </div>
                  </div>
                </Card>

                <Card title="Observaciones de la Comisión" icon={ClipboardCheck}>
                  <div className="space-y-6 pt-4">
                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                      REGISTRO DE HALLAZGOS O APROBACIÓN
                    </p>
                    <textarea 
                      className="w-full p-6 bg-[#F6F2ED] border-2 border-[#C96A2C]/10 rounded-2xl font-black uppercase text-[11px] h-40 focus:border-[#C96A2C] outline-none shadow-inner leading-relaxed"
                      placeholder="INDIQUE SI EL ACTA FUE APROBADA POR LA COMISIÓN O SI EXISTEN OBSERVACIONES AL TEXTO..."
                    ></textarea>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 5: INFORME GESTIÓN (RESERVADA PARA DOCUMENTO WORD) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="5. Informe Integral de Gestión" icon={TrendingUp} agendaIndices={[4]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              {/* CONTENEDOR PRINCIPAL DEL INFORME (ESTRUCTURA LISTA) */}
              <Card title="INFORME DE ADMINISTRACIÓN Y REPRESENTACIÓN LEGAL" icon={Activity} highlight className="p-12">
                <div className="flex flex-col gap-10">
                    <div className="bg-[#2D2D2D] p-10 rounded-[48px] text-white">
                      <div className="flex items-center gap-6 mb-6">
                         <UserCheck size={40} className="text-[#C96A2C]" />
                         <h4 className="text-2xl font-black uppercase tracking-tighter">GESTIÓN ADMINISTRATIVA 2025</h4>
                      </div>
                      <p className="text-white/60 font-bold leading-relaxed mb-8">
                        Señores Copropietarios, a continuación se presenta el desglose detallado de las actividades, mantenimientos, gestiones legales y financieras realizadas durante el periodo reportado.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-8 uppercase">
                         <div>
                            <p className="text-[10px] text-white/40 mb-1">ADMINISTRADOR</p>
                            <p className="text-xl font-black">LUIS DAVID IPAZ TORO</p>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="h-3 w-3 bg-[#C96A2C] rounded-full"></div>
                            <p className="text-sm font-black">VIGENCIA: ENERO - DICIEMBRE 2025</p>
                         </div>
                      </div>
                    </div>

                    <div className="p-16 border-4 border-dashed border-[#C96A2C]/20 rounded-[60px] text-center bg-[#F6F2ED]/30">
                        <FileText size={80} className="mx-auto text-[#C96A2C] mb-8 opacity-40" />
                        <h4 className="text-2xl font-black text-[#2D2D2D] mb-4">CARGANDO CONTENIDO DETALLADO...</h4>
                        <p className="text-sm font-bold text-slate-500 max-w-xl mx-auto">
                          ESTA SECCIÓN SERÁ ALIMENTADA CON LA INFORMACIÓN COMPLETA DEL "INFORME PRESENTACIÓN" WORD. SE INCLUIRÁN TODAS LAS TABLAS DE PROVEEDORES, OBRAS, GASTOS Y LOGROS SIN RESUMIR.
                        </p>
                    </div>

                    {/* MOCKUP DE TABLA PARA REFERENCIA (BORRAR AL LLENAR CON WORD) */}
                    <ManagementTable 
                      title="TABLA EJEMPLO DE PROVEEDORES (ESTRUCTURA)"
                      headers={["PROVEEDOR", "TIPO DE SERVICIO", "OBSERVACIÓN"]}
                      data={[
                        {p: "EJEMPLO PROVEEDOR 1", s: "MANTENIMIENTO", o: "CUMPLIMIENTO 100%"},
                        {p: "EJEMPLO PROVEEDOR 2", s: "INSUMOS", o: "FACTURACIÓN AL DÍA"}
                      ]}
                      icon={Wrench}
                    />
                </div>
              </Card>
            </div>
          )}

          {/* SECCIÓN 6: ESTADOS FINANCIEROS */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader 
                title="6. Estados Financieros 2025" 
                icon={BarChart3} 
                agendaIndices={[5]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-[60px] p-16 shadow-2xl border-4 border-[#C96A2C]/10 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5"><BarChart3 size={200} className="text-[#C96A2C]" /></div>
                  <div className="p-8 bg-[#F6F2ED] rounded-[40px] mb-10 border-2 border-[#C96A2C]/10">
                    <Landmark size={80} className="text-[#C96A2C]" />
                  </div>
                  <h3 className="text-4xl font-black text-[#C96A2C] mb-6 tracking-tighter">CIERRE FINANCIERO 2025</h3>
                  <div className="w-24 h-2 bg-[#2D2D2D] mb-10 rounded-full"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-12">
                     <div className="p-8 bg-slate-50 rounded-3xl border-2 border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 mb-2 tracking-widest">ACTIVO TOTAL</p>
                        <p className="text-3xl font-black text-[#2D2D2D]">SUJETO A REPORTE</p>
                     </div>
                     <div className="p-8 bg-slate-50 rounded-3xl border-2 border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 mb-2 tracking-widest">PATRIMONIO</p>
                        <p className="text-3xl font-black text-[#2D2D2D]">BAJO NIIF PYMES</p>
                     </div>
                  </div>

                  <div className="bg-[#F6F2ED] p-10 rounded-[40px] w-full max-w-xl border-2 border-dashed border-[#C96A2C]/20">
                    <p className="text-xs font-black leading-relaxed text-[#9A4E1F]">
                      PRESENTACIÓN DE BALANCES, ESTADO DE RESULTADOS Y EJECUCIÓN PRESUPUESTAL DEL PERIODO FISCAL 2025.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 7: PRESUPUESTO */}
          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader 
                title="7. Proyecto Presupuesto 2026" 
                icon={PieChart} 
                agendaIndices={[6]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              
              <div className="max-w-5xl mx-auto">
                <div className="bg-[#2D2D2D] rounded-[60px] p-16 shadow-2xl border-b-[20px] border-[#C96A2C] flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 p-12 opacity-10"><Wallet size={250} className="text-white" /></div>
                  <div className="p-8 bg-white/10 rounded-[40px] mb-10 border-2 border-white/20 backdrop-blur-md">
                    <DollarSign size={80} className="text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">PRESUPUESTO VIGENCIA 2026</h3>
                  <div className="w-24 h-2 bg-[#C96A2C] mb-10 rounded-full"></div>
                  
                  <div className="space-y-6 max-w-2xl mx-auto">
                    <p className="text-[14px] font-black text-white/60 tracking-[0.4em]">Propuesta de Ajuste:</p>
                    <p className="text-xl font-black text-white tracking-widest">DEFINICIÓN DE CUOTAS DE ADMINISTRACIÓN Y FONDO DE IMPREVISTOS SEGÚN LEY 675.</p>
                  </div>

                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <p className="text-[9px] text-white/40 font-black tracking-widest">INGRESOS PROYECTADOS</p>
                        <p className="text-xl font-black text-[#C96A2C]">CUOTAS ORDINARIAS</p>
                     </div>
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <p className="text-[9px] text-white/40 font-black tracking-widest">EGRESOS PROYECTADOS</p>
                        <p className="text-xl font-black text-[#C96A2C]">OPERATIVOS Y RESERVA</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 8-9: ELECCIONES */}
          {activeSection === 'elecciones' && (
            <div className="space-y-10 animate-in fade-in duration-500 uppercase">
              <SectionHeader 
                title="8-9. Elecciones Órganos de Administración" 
                icon={Users} 
                agendaIndices={[7, 8]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* 8. CONSEJO DE ADMINISTRACIÓN */}
                <Card title="8. Consejo de Administración" icon={Users} highlight>
                  <div className="space-y-6">
                    {/* VISUALIZACIÓN DE SELECCIONADOS */}
                    <div className="min-h-[70px] p-5 bg-[#F6F2ED] rounded-[24px] border-2 border-dashed border-[#C96A2C]/30">
                      <p className="text-[8px] font-black text-[#C96A2C] mb-3 tracking-widest">POSTULADOS AL CONSEJO:</p>
                      {postuladosConsejo.length === 0 ? (
                        <p className="text-[10px] text-slate-400 font-black text-center py-4 italic">SIN CANDIDATOS</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {postuladosConsejo.map(p => (
                            <span key={p} className="bg-[#C96A2C] text-white px-3 py-2 rounded-xl text-[9px] font-black flex items-center gap-2 animate-in zoom-in shadow-sm">
                              {p} 
                              <button onClick={() => togglePostulacion(p, 'consejo')} className="hover:scale-110 transition-transform"><Trash2 size={14} /></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* LISTADO DE NOMBRES PARA POSTULAR */}
                    <div className="max-h-[450px] overflow-y-auto pr-2 custom-scrollbar space-y-1.5">
                      <p className="text-[9px] font-black text-slate-400 px-2 uppercase mb-2">LISTADO DE ASISTENTES:</p>
                      {asistencia.map(r => {
                        const isSelected = postuladosConsejo.includes(r.propietario);
                        return (
                          <div key={r.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-[#C96A2C]/30 transition-all">
                            <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">
                              {r.propietario}
                            </span>
                            <button 
                              onClick={() => togglePostulacion(r.propietario, 'consejo')} 
                              className={`px-6 py-2.5 rounded-xl text-[9px] font-black transition-all ${
                                isSelected 
                                  ? 'bg-[#2D2D2D] text-white' 
                                  : 'bg-slate-50 text-slate-400 hover:bg-[#C96A2C] hover:text-white border border-slate-200'
                              }`}
                            >
                              {isSelected ? 'POSTULADO' : 'POSTULAR'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* 9. COMITÉ DE CONVIVENCIA */}
                <Card title="9. Comité de Convivencia" icon={HeartPulse}>
                  <div className="space-y-6">
                    {/* VISUALIZACIÓN DE SELECCIONADOS */}
                    <div className="min-h-[70px] p-5 bg-[#F6F2ED] rounded-[24px] border-2 border-dashed border-[#C96A2C]/30">
                      <p className="text-[8px] font-black text-[#C96A2C] mb-3 tracking-widest">POSTULADOS A CONVIVENCIA:</p>
                      {postuladosConvivencia.length === 0 ? (
                        <p className="text-[10px] text-slate-400 font-black text-center py-4 italic">SIN CANDIDATOS</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {postuladosConvivencia.map(p => (
                            <span key={p} className="bg-[#2D2D2D] text-white px-3 py-2 rounded-xl text-[9px] font-black flex items-center gap-2 animate-in zoom-in shadow-sm">
                              {p} 
                              <button onClick={() => togglePostulacion(p, 'convivencia')} className="hover:scale-110 transition-transform"><Trash2 size={14} /></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* LISTADO DE NOMBRES PARA POSTULAR */}
                    <div className="max-h-[450px] overflow-y-auto pr-2 custom-scrollbar space-y-1.5">
                      <p className="text-[9px] font-black text-slate-400 px-2 uppercase mb-2">LISTADO DE ASISTENTES:</p>
                      {asistencia.map(r => {
                        const isSelected = postuladosConvivencia.includes(r.propietario);
                        return (
                          <div key={r.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-[#C96A2C]/30 transition-all">
                            <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">
                              {r.propietario}
                            </span>
                            <button 
                              onClick={() => togglePostulacion(r.propietario, 'convivencia')} 
                              className={`px-6 py-2.5 rounded-xl text-[9px] font-black transition-all ${
                                isSelected 
                                  ? 'bg-[#C96A2C] text-white' 
                                  : 'bg-slate-50 text-slate-400 hover:bg-[#2D2D2D] hover:text-white border border-slate-200'
                              }`}
                            >
                              {isSelected ? 'POSTULADO' : 'POSTULAR'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>

              </div>
            </div>
          )}

          {/* SECCIÓN 10-13: TEMAS CLAVE (SEGÚN CITACIÓN) */}
          {activeSection === 'normativa' && (
            <div className="space-y-12 animate-in fade-in uppercase">
              <SectionHeader 
                title="Puntos 10 al 13: Temas Estratégicos" 
                icon={ShieldCheck} 
                agendaIndices={[9, 10, 11, 12]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="10. Manual de Convivencia" icon={HeartPulse} highlight>
                  <p className="text-xs font-bold text-slate-600 leading-loose mb-6">
                    RATIFICACIÓN DE LAS NORMAS QUE RIGEN LA ARMONÍA EN EL CONDOMINIO.
                  </p>
                  <div className="p-6 bg-[#F6F2ED] rounded-3xl border-2 border-[#C96A2C]/10 flex items-center gap-6">
                    <ShieldCheck size={32} className="text-[#C96A2C]" />
                    <p className="text-[10px] font-black tracking-widest">SUJETO A VOTACIÓN DE ASAMBLEA</p>
                  </div>
                </Card>

                <Card title="11. Tarifa Multiusuarios EMAS" icon={Scale}>
                  <p className="text-xs font-bold text-slate-600 leading-loose mb-6">
                    APROBACIÓN PARA EL INICIO DE GESTIÓN ANTE EMAS PARA ACCEDER A BENEFICIOS TARIFARIOS.
                  </p>
                  <div className="p-4 bg-[#C96A2C] text-white rounded-2xl text-center text-[9px] font-black tracking-[0.2em]">
                    GESTIÓN DE AHORRO INSTITUCIONAL
                  </div>
                </Card>

                <Card title="12. Parqueadero Motos (Zona Verde)" icon={Map} highlight>
                  <p className="text-xs font-bold text-[#9A4E1F] leading-loose mb-6">
                    ANÁLISIS DE CAMBIO DE DESTINACIÓN DE ZONA COMÚN VERDE PARA ADECUACIÓN DE PARQUEO.
                  </p>
                  <div className="p-8 border-2 border-dashed border-[#C96A2C]/30 rounded-3xl text-center">
                    <AlertCircle size={40} className="mx-auto mb-4 text-[#C96A2C]" />
                    <p className="text-[10px] font-black uppercase">Requiere Quórum Especial según Ley</p>
                  </div>
                </Card>

                <Card title="13. Fachadas (Limpieza e Impermeabilización)" icon={Paintbrush}>
                  <p className="text-xs font-bold text-slate-600 leading-loose mb-6">
                    PRESENTACIÓN DE PROPUESTAS PARA EL MANTENIMIENTO PREVENTIVO Y CORRECTIVO DE FACHADAS.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-slate-50 rounded-2xl text-[10px] font-black text-center border">LIMPIEZA</div>
                    <div className="flex-1 p-4 bg-slate-50 rounded-2xl text-[10px] font-black text-center border">IMPERMEABILIZACIÓN</div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN FINAL */}
          {activeSection === 'final' && (
            <div className="space-y-16 animate-in zoom-in-95 text-center uppercase">
              <div className="flex justify-between items-center print:hidden bg-[#2D2D2D] p-10 rounded-[40px] shadow-2xl">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">FINALIZAR ASAMBLEA 2026</h2>
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL - CONDOMINIO ROSALES DE ANGANOY</p>
                </div>
                <button onClick={handlePrint} className="bg-[#C96A2C] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl hover:scale-110 transition-all text-xs tracking-[0.2em]">
                  <Printer size={24} /> IMPRIMIR ACTA FINAL
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#C96A2C] print:shadow-none print:border-none print:p-0 bg-white">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#C96A2C] pb-10">
                  <h1 className="text-4xl font-black mb-4 uppercase">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                  <p className="text-xl font-black text-[#C96A2C] uppercase">CONDOMINIO ROSALES DE ANGANOY - NIT 901.094.115-1</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-[#F6F2ED] rounded-[56px] border-2 border-[#C96A2C]/10 flex flex-col items-center">
                    <p className="text-[11px] font-black text-[#2D2D2D] mb-10 tracking-[0.3em]">Quórum de Cierre</p>
                    <p className="text-7xl font-black text-[#C96A2C] leading-none">{totalQuorum.toFixed(2)}%</p>
                  </div>
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#2D2D2D] tracking-[0.3em] uppercase leading-none mb-12">Mesa Directiva</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-4 border-[#C96A2C]/10 pb-4">
                          <p className="text-[9px] text-[#C96A2C] mb-2 font-black">PRESIDENTE:</p>
                          <p className="text-lg text-[#2D2D2D]">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-4 border-[#C96A2C]/10 pb-4">
                          <p className="text-[9px] text-[#C96A2C] mb-2 font-black">SECRETARIO(A):</p>
                          <p className="text-lg text-[#2D2D2D]">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>
                  <div className="p-12 bg-[#C96A2C] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#9A4E1F]">
                    <ShieldCheck size={72} className="text-white mb-10 opacity-50" />
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] opacity-60">Sesión Finalizada</p>
                    <p className="text-xl font-black mt-4">PASTO, FEBRERO 2026</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; background-color: #F6F2ED; }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #C96A2C33; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #C96A2C55; }

        @media print {
          @page { margin: 1cm; size: letter; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          table { border-collapse: collapse !important; width: 100% !important; border: 1px solid #000 !important; }
          th { background: #C96A2C !important; color: white !important; -webkit-print-color-adjust: exact; padding: 8px !important; }
          td { border: 1px solid #000 !important; padding: 8px !important; }
        }
      `}} />
    </div> 
  );
}