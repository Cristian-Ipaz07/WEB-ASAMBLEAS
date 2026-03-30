import React, { useState, useMemo, useEffect } from 'react';
import {
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home,
  ShieldCheck, ExternalLink, UserPlus,
  CheckCircle2, Printer, Trash2, TrendingUp, Settings,
  ClipboardCheck, Camera, Zap, Activity, Wrench, Calendar, Layout, ListChecks,
  AlertCircle, ChevronRight, Info, ShieldAlert, HeartPulse, Building2,
  Search, DollarSign, PieChart, Landmark, Gavel,
  ArrowUpRight, Percent, Wallet, HardHat, Cog, Plus, UserCheck, Leaf, Scale,
  MapPin, Clock, Phone, Mail, Award
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL EDIFICIO LAS PLAZUELAS ---
const COLORS = {
  verdeOscuro: '#2E5E3B',    // Institucional Oscuro
  verdeArq: '#3F7A4F',      // Verde Arquitectónico
  verdeClaro: '#A9C5AE',    // Verde Claro Suave
  blanco: '#FFFFFF',        // Blanco Institucional
  grisClaro: '#F2F2F2',     // Gris Claro Profesional
  texto: '#2B2B2B',         // Gris Oscuro Texto
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#2E5E3B]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#2E5E3B] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#2E5E3B] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[11px] text-[#2B2B2B] font-black uppercase tracking-[0.2em]">
          {agendaIndices.length > 1
            ? `Puntos ${agendaIndices.map(i => i + 1).join(' y ')} del Orden del día`
            : `Punto ${agendaIndices[0] + 1} del Orden del día`}
        </p>
      </div>
    </div>
    <button
      onClick={() => toggleAgendaItem(agendaIndices)}
      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all border-2 shadow-md ${agendaIndices.every(idx => agendaStatus[idx])
        ? 'bg-[#2B2B2B] border-[#2B2B2B] text-white'
        : 'bg-white border-[#2E5E3B]/20 text-[#2E5E3B] hover:bg-[#2E5E3B] hover:text-white'
        }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#2E5E3B] ring-4 ring-[#2E5E3B]/10' : 'border-[#2E5E3B]/5'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#2B2B2B] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#2E5E3B]' : 'bg-[#3F7A4F]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#2E5E3B]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#2E5E3B] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#2E5E3B]/10 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#2E5E3B] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#2E5E3B] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#F2F2F2] text-[#2B2B2B] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2E5E3B]/5 uppercase font-bold text-[#2B2B2B]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#2E5E3B]/5 transition-colors">
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

// --- COMPONENTE DE EVIDENCIAS ---
const EvidenceSection = ({ title, content, icon: Icon, photos = [], color = "#2E5E3B" }) => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className={`p-8 bg-slate-50 rounded-[40px] border-l-[16px] shadow-sm flex flex-col relative group transition-all hover:shadow-md`} style={{ borderColor: color }}>
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-black uppercase tracking-widest" style={{ color: color }}>{title}</p>

        {photos.length > 0 && (
          <button
            onClick={() => setShowGallery(true)}
            className="flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95"
          >
            <div className="p-3 bg-white rounded-2xl border-2 shadow-sm text-[#2B2B2B] hover:bg-[#2E5E3B] hover:text-white transition-all" style={{ borderColor: `${color}20` }}>
              <Camera size={22} />
            </div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Evidencias</span>
          </button>
        )}
      </div>

      <div className="text-xl font-bold text-slate-800 leading-relaxed tracking-tight">
        {content}
      </div>

      {/* MODAL DE GALERÍA */}
      {showGallery && (
        <div className="fixed inset-0 z-[200] bg-[#2B2B2B]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 sm:p-12 animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-8 right-8 text-white bg-[#2E5E3B] px-10 py-5 rounded-full font-black text-xs shadow-2xl hover:bg-black transition-all flex items-center gap-3 border-2 border-white/20 z-[210]"
          >
            CERRAR GALERÍA <Trash2 size={20} />
          </button>

          <div className="w-full max-w-6xl h-full flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full overflow-y-auto max-h-[80vh] p-4 custom-scrollbar">
              {photos.map((ph, i) => (
                <div key={i} className="rounded-[40px] overflow-hidden border-8 border-white shadow-2xl bg-white group">
                  <img
                    src={ph}
                    alt={`Evidencia ${i + 1}`}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/2E5E3B/ffffff?text=EVIDENCIA+FOTOGRÁFICA";
                    }}
                  />
                  <div className="bg-white p-6 text-center">
                    <p className="text-[#2E5E3B] font-black text-xs uppercase tracking-[0.2em]">EDIFICIO LAS PLAZUELAS - EVIDENCIA {i + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- DATA ---

const ORDEN_DIA = [
  "Registro de firmas y verificación del quórum.",
  "Lectura y aprobación del orden del día.",
  "Elección de dignatarios de la Asamblea (Presidente y Secretario).",
  "Elección del comité de verificación de la presente acta.",
  "Validación de la Acta Anterior.",
  "Presentación informe Consejo de Administración y Administración.",
  "Presentación y aprobación de Estados Financieros a diciembre 31 de 2025.",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos 2026.",
  "Elección del consejo de administración.",
  "Elección Comité de convivencia.",
  "Proposiciones y varios."
];

const COEFICIENTES_DATA = [
  { id: 1, unidad: '101', propietario: 'PEDRO LEON MORA REBOLLEDO', coeficiente: 4.516 },
  { id: 2, unidad: '102', propietario: 'KETHY ALEXANRA NIETO OBANDO', coeficiente: 3.808 },
  { id: 3, unidad: '103', propietario: 'ISABEL RODRIGUEZ PIÑERES', coeficiente: 1.632 },
  { id: 4, unidad: '104', propietario: 'DANNY STEPHAN ROSALES RUIZ', coeficiente: 1.850 },
  { id: 5, unidad: '105', propietario: 'OMAR LIBARDO ARTEAGA PANTOJA', coeficiente: 4.081 },
  { id: 6, unidad: '106', propietario: 'EVER JESUS VALLEJOS ARTEAGA', coeficiente: 5.767 },
  { id: 7, unidad: '201', propietario: 'LUISA GUADALUPE GELPUD CADENA', coeficiente: 4.516 },
  { id: 8, unidad: '202', propietario: 'DEISSY ORTIZ', coeficiente: 4.189 },
  { id: 9, unidad: '203', propietario: 'GLADIS NORALBA CASTILLO DE QUIÑONEZ', coeficiente: 1.578 },
  { id: 10, unidad: '204', propietario: 'JOSE MORA', coeficiente: 1.360 },
  { id: 11, unidad: '205', propietario: 'EMIRO GUERRERO', coeficiente: 4.081 },
  { id: 12, unidad: '206', propietario: 'ALBA LUCY BURBANO', coeficiente: 5.114 },
  { id: 13, unidad: '301', propietario: 'GERSON JAIRO SALAZAR', coeficiente: 4.516 },
  { id: 14, unidad: '302', propietario: 'MARCO ANDRES MONTENEGRO ROSERO', coeficiente: 3.808 },
  { id: 15, unidad: '303', propietario: 'MONICA ADRIANA FUENMAYOR MELO', coeficiente: 1.469 },
  { id: 16, unidad: '304', propietario: 'HERNAN DIAZ', coeficiente: 1.360 },
  { id: 17, unidad: '305', propietario: 'MIGUEL ANGEL ROMERO CHAMORRO', coeficiente: 4.081 },
  { id: 18, unidad: '306', propietario: 'ALBA ARTRO DE CORDOBA', coeficiente: 5.114 },
  { id: 19, unidad: '401', propietario: 'MARIA ISABEL ROSERO ERAZO', coeficiente: 3.101 },
  { id: 20, unidad: '402', propietario: 'NERIETH GAVIRIA GOMEZ', coeficiente: 2.557 },
  { id: 21, unidad: '403', propietario: 'MARYSTELLA CHACON', coeficiente: 3.264 },
  { id: 22, unidad: '404', propietario: 'MILENA MELO', coeficiente: 1.469 },
  { id: 23, unidad: '405', propietario: 'ADRIANA BURBANO YEPEZ', coeficiente: 4.081 },
  { id: 24, unidad: '406', propietario: 'JUAN MANUEL ERAZO ORDOÑEZ', coeficiente: 5.060 },
  { id: 25, unidad: '501', propietario: 'ELENA DIAZ BOLAÑOS', coeficiente: 3.101 },
  { id: 26, unidad: '502', propietario: 'LEON BOLIVAR HOYOS MARTINEZ', coeficiente: 4.353 },
  { id: 27, unidad: '503', propietario: 'ANDRES MAURICIO BETANCOURTH JURADO', coeficiente: 3.428 },
  { id: 28, unidad: '504', propietario: 'LAUREANO LEDESMA ARCOS', coeficiente: 3.101 },
  { id: 29, unidad: '505', propietario: 'LUIS FERNANDO ENRIQUEZ GOMEZ', coeficiente: 3.645 }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  // Persistencia segura de estados
  const [asistencia, setAsistencia] = useState(() => {
    try {
      const saved = localStorage.getItem('asistencia_plazuelas_2026');
      return saved ? JSON.parse(saved) : COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    } catch (e) {
      return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    }
  });

  const [agendaStatus, setAgendaStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('agenda_plazuelas_2026');
      return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
    } catch (e) {
      return new Array(ORDEN_DIA.length).fill(false);
    }
  });

  const [dignatarios, setDignatarios] = useState(() => {
    try {
      const saved = localStorage.getItem('dignatarios_plazuelas_2026');
      return saved ? JSON.parse(saved) : { presidente: '', secretario: '', comision: '' };
    } catch (e) {
      return { presidente: '', secretario: '', comision: '' };
    }
  });

  const [proposiciones, setProposiciones] = useState(() => {
    try {
      const saved = localStorage.getItem('proposiciones_plazuelas_2026');
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
      localStorage.setItem('asistencia_plazuelas_2026', JSON.stringify(asistencia));
      localStorage.setItem('agenda_plazuelas_2026', JSON.stringify(agendaStatus));
      localStorage.setItem('dignatarios_plazuelas_2026', JSON.stringify(dignatarios));
      localStorage.setItem('proposiciones_plazuelas_2026', JSON.stringify(proposiciones));
    } catch (e) { }
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
    <div className="flex min-h-screen bg-[#F2F2F2] font-sans text-[#2B2B2B] print:bg-white overflow-x-hidden">

      {/* SIDEBAR */}
      <aside className="w-80 bg-[#2B2B2B] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#2E5E3B] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 border-4 border-white/20 flex items-center justify-center rounded-[28px] shadow-lg">
              <Building2 className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none uppercase mb-2">
            LAS <span className="text-[#A9C5AE] block text-sm mt-1 tracking-[0.2em]">PLAZUELAS PH</span>
          </h1>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Gestión Institucional</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar">
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
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest ${activeSection === item.id
                ? 'bg-[#2E5E3B] text-white shadow-xl translate-x-2'
                : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-white/5 text-[10px] font-black text-center opacity-40 uppercase tracking-[0.3em]">
          Pasto, Nariño <br /> Vigencia 2026
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#F2F2F2]">

        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#2E5E3B]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest">Quórum Actual</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#2E5E3B]' : 'text-[#2B2B2B]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#2E5E3B] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VÁLIDO' : 'INSUFICIENTE'}
                </div>
              </div>
            </div>

            <div className="border-l-2 pl-12 border-[#2E5E3B]/10">
              <span className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest">Progreso de Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#2E5E3B]/5 shadow-inner">
                  <div className="h-full bg-[#2E5E3B] transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-sm font-black text-[#2E5E3B]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
              <p className="text-[14px] font-black text-[#2B2B2B] uppercase tracking-tight">EDIFICIO LAS PLAZUELAS PH</p>
              <p className="text-[11px] text-[#2E5E3B] font-black uppercase tracking-widest">Administración General</p>
            </div>
            <div className="h-14 w-14 bg-[#2E5E3B] rounded-2xl flex items-center justify-center text-white shadow-xl">
              <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">

          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
              <div className="bg-[#2B2B2B] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#2E5E3B]">
                <div className="relative z-10 text-center">
                  <span className="bg-[#2E5E3B] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Sesión Ordinaria de Copropietarios</span>
                  <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">LAS <span className="text-[#2E5E3B] italic block text-4xl mt-4">PLAZUELAS</span></h1>
                  <div className="w-32 h-2 bg-[#2E5E3B] mx-auto mb-10 rounded-full"></div>
                  <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">Asamblea General 2026<br />Gestión 2025 - Proyección 2026</p>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                <Card title="Copropiedad" highlight>
                  <div className="space-y-4 pt-2">
                    <p className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest leading-none">NIT: 900.485.144-7</p>
                    <p className="text-lg font-black text-[#2B2B2B]">Calle 20A No. 27 A 20</p>
                    <p className="text-[10px] font-black text-[#2E5E3B]">Barrio Las Cuadras, Pasto</p>
                  </div>
                </Card>
                <Card title="Convocatoria">
                  <div className="space-y-3 pt-2 text-[#2B2B2B]">
                    <p className="text-lg font-black">Lunes 30 de Marzo 2026</p>
                    <p className="text-[11px] font-black text-[#2E5E3B] opacity-80 uppercase">Lugar: Restaurante El Velero del Mar</p>
                  </div>
                </Card>
                <Card className="bg-[#2E5E3B] text-white border-none flex flex-col items-center justify-center shadow-2xl !bg-[#2E5E3B]">
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
                  <h3 className="text-[#2E5E3B] font-black text-lg uppercase tracking-tighter">Listado de Unidades</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Registre la presencia de los copropietarios</p>
                </div>

                <button
                  onClick={() => {
                    const todosPresentes = asistencia.every(a => a.presente);
                    setAsistencia(prev => prev.map(a => ({ ...a, presente: !todosPresentes })));
                  }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md hover:scale-105 active:scale-95 border-b-4 ${asistencia.every(a => a.presente)
                    ? 'bg-slate-100 text-[#2E5E3B] border-slate-200'
                    : 'bg-[#2E5E3B] text-white border-black/20'
                    }`}
                >
                  {asistencia.every(a => a.presente) ? (
                    <> <Trash2 size={16} /> Desmarcar Todo </>
                  ) : (
                    <> <UserCheck size={16} /> Seleccionar Todo </>
                  )}
                </button>
              </div>

              <div className="space-y-8 print:hidden">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="relative group w-full max-w-2xl">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#2E5E3B]" size={24} />
                    <input
                      type="text"
                      placeholder="BUSCAR POR APARTAMENTO O NOMBRE..."
                      className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-slate-200 focus:border-[#2E5E3B] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-[32px] shadow-sm border border-slate-100">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-[#2B2B2B] uppercase tracking-widest">ASISTENTES</p>
                      <p className="text-3xl font-black text-[#2E5E3B]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                    </div>
                    <Users className="text-[#2E5E3B]" size={40} />
                  </div>
                </div>

                <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F2F2F2] text-[#2B2B2B] font-black uppercase tracking-widest text-[11px] border-b-2 border-slate-100">
                      <tr>
                        <th className="px-12 py-8">APARTAMENTO</th>
                        <th className="px-12 py-8">COPROPIETARIO</th>
                        <th className="px-12 py-8 text-center">COEFICIENTE (%)</th>
                        <th className="px-12 py-8 text-center">ASISTENCIA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 uppercase">
                      {filteredAsistencia.map((item) => (
                        <tr key={item.id} className={`${item.presente ? 'bg-[#2E5E3B]/5' : ''} hover:bg-slate-50 transition-colors`}>
                          <td className="px-12 py-8 font-black text-[#2E5E3B] text-xl">APTO {item.unidad}</td>
                          <td className="px-12 py-8 font-black text-[#2B2B2B] text-sm tracking-tight">{item.propietario}</td>
                          <td className="px-12 py-8 font-black text-[#2B2B2B] text-center text-xl">{item.coeficiente.toFixed(3)}%</td>
                          <td className="px-12 py-8 text-center">
                            <button
                              onClick={() => toggleAsistencia(item.id)}
                              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${item.presente ? 'bg-[#2E5E3B]' : 'bg-slate-200'
                                }`}
                            >
                              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${item.presente ? 'translate-x-9' : 'translate-x-1'
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
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#2E5E3B] bg-[#2E5E3B]/5' : 'border-[#2E5E3B]/10 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#2B2B2B] text-white' : 'bg-[#2E5E3B] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#2E5E3B]' : 'text-[#2B2B2B]'}`}>
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
                title="3-4. Dignatarios y Comisión"
                icon={UserPlus}
                agendaIndices={[2, 3]}
                agendaStatus={agendaStatus}
                toggleAgendaItem={toggleAgendaItem}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
                  <Card title="Elección Mesa Directiva" icon={ShieldCheck} highlight>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest block">
                          Presidente de Asamblea
                        </label>
                        <input
                          type="text"
                          className="w-full p-6 bg-slate-50 border-2 border-[#2E5E3B]/10 rounded-2xl font-black uppercase text-xs focus:border-[#2E5E3B] outline-none shadow-inner"
                          placeholder="NOMBRE COMPLETO..."
                          value={dignatarios.presidente}
                          onChange={(e) => setDignatarios({ ...dignatarios, presidente: e.target.value })}
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest block">
                          Secretario(a)
                        </label>
                        <input
                          type="text"
                          className="w-full p-6 bg-slate-50 border-2 border-[#2E5E3B]/10 rounded-2xl font-black uppercase text-xs focus:border-[#2E5E3B] outline-none shadow-inner"
                          placeholder="NOMBRE COMPLETO..."
                          value={dignatarios.secretario}
                          onChange={(e) => setDignatarios({ ...dignatarios, secretario: e.target.value })}
                        />
                      </div>
                    </div>
                  </Card>

                  <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                    <div className="space-y-4 pt-4">
                      <label className="text-[11px] font-black text-[#2B2B2B] uppercase tracking-widest block">
                        Miembros Comisión 2026
                      </label>
                      <textarea
                        className="w-full p-6 bg-slate-50 border-2 border-[#2E5E3B]/10 rounded-2xl font-black uppercase text-[11px] h-40 focus:border-[#2E5E3B] outline-none leading-loose shadow-inner"
                        placeholder="INGRESE LOS DESIGNADOS..."
                        value={dignatarios.comision}
                        onChange={(e) => setDignatarios({ ...dignatarios, comision: e.target.value })}
                      ></textarea>
                    </div>
                  </Card>
                </div>

                <div className="bg-[#2B2B2B] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#2E5E3B]">
                  <Gavel className="text-white mb-10 mx-auto" size={56} />
                  <h4 className="font-black text-2xl mb-6 uppercase tracking-tighter">Normatividad Ley 675</h4>
                  <p className="text-[11px] font-black text-white/60 leading-loose uppercase tracking-[0.2em]">
                    La asamblea decide válidamente con el quórum de ley. Las decisiones obligan a todos los copropietarios.
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
                <Card title="Estado del Acta 2025" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4">
                    <p className="text-[11px] font-bold text-slate-600 leading-loose">
                      REVISIÓN Y VALIDACIÓN DEL ACTA DE LA ASAMBLEA GENERAL ORDINARIA LLEVADA A CABO EL 21 DE MARZO DE 2025.
                    </p>
                    <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-[#2E5E3B]/20 flex flex-col items-center justify-center text-center">
                      <FileText size={40} className="text-[#2E5E3B] mb-4 opacity-40" />
                      <a
                        href="https://drive.google.com/file/d/1E0I37i2XbK5bYq9Q2EcF2QnFOjpl5Xwu/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 inline-flex items-center gap-2 bg-[#2E5E3B] text-white px-6 py-3 rounded-xl font-black text-[10px] hover:bg-[#3F7A4F] transition-colors shadow-lg shadow-[#2E5E3B]/20"
                      >
                        <FileText size={14} />
                        VER ACTA ANTERIOR (DRIVE)
                      </a>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Libro de actas disponible en administración</p>
                    </div>
                  </div>
                </Card>

                <Card title="Observaciones de Asamblea" icon={ClipboardCheck}>
                  <div className="space-y-6 pt-4">
                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Registro de comentarios</p>
                    <textarea
                      className="w-full p-6 bg-slate-50 border-2 border-[#2E5E3B]/10 rounded-2xl font-black uppercase text-[11px] h-32 focus:border-[#2E5E3B] outline-none shadow-inner"
                      placeholder="INGRESE AQUÍ LAS OBSERVACIONES AL ACTA ANTERIOR..."
                    ></textarea>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 6: INFORME GESTIÓN (REPRODUCCIÓN COMPLETA SEGÚN PDF) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="6. Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndices={[5]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              {/* ENCABEZADO INFORME ADMINISTRATIVO */}
              <div className="bg-[#2B2B2B] p-12 rounded-[56px] text-white shadow-2xl relative overflow-hidden border-b-[12px] border-[#2E5E3B]">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div>
                    <span className="bg-[#2E5E3B] px-6 py-2 rounded-full text-[10px] font-black tracking-widest mb-4 inline-block">VIGENCIA: 01 DE ENERO A 31 DE DICIEMBRE 2025</span>
                    <h3 className="text-5xl font-black tracking-tighter mb-2">INFORME DE ADMINISTRACIÓN</h3>
                    <p className="text-white/60 font-bold text-xl uppercase tracking-widest">Leidy Tatiana Artunduaga - Administradora</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-[10px] font-black tracking-[0.3em]">ENTREGA OFICIAL</p>
                    <p className="text-3xl font-black">26-02-2026</p>
                  </div>
                </div>
                <TrendingUp size={160} className="text-white opacity-5 absolute right-[-20px] top-[-20px]" />
              </div>

              {/* I. ASPECTOS GENERALES DE NORMA */}
              <div className="space-y-12">
                <Card title="I. Aspectos Generales de Norma" icon={Gavel} highlight className="p-10">
                  <div className="flex flex-col gap-8 pt-4">

                    <EvidenceSection
                      title="1. Convocatoria y Asamblea General"
                      content="SE CONVOCÓ Y COORDINÓ LA ASAMBLEA GENERAL ORDINARIA LLEVADA A CABO EL 21 DE MARZO DEL 2025, PARA EXAMINAR LA SITUACIÓN GENERAL, EFECTUAR NOMBRAMIENTOS Y APROBAR EL PRESUPUESTO."
                    />

                    <EvidenceSection
                      title="2. Libro de Actas y Correspondencia"
                      color="#3F7A4F"
                      content={
                        <div className="space-y-4">
                          <p>SE ELABORÓ EL ACTA DE LA ASAMBLEA 2025, DISPONIBLE EN EL LIBRO DE ACTAS. SE ATENDIÓ TODA LA CORRESPONDENCIA VÍA EMAIL, FÍSICO Y WHATSAPP (PQR'S, PERMISOS, CONCILIACIÓN DE CARTERA).</p>
                          <div className="bg-white/50 p-4 rounded-2xl border-2 border-dashed border-[#2E5E3B]/20">
                            <p className="text-xs font-black text-[#2E5E3B]">ATENCIÓN PERSONALIZADA: MARTES Y JUEVES EN PORTERÍA.</p>
                          </div>
                        </div>
                      }
                    />

                    <EvidenceSection
                      title="3. Publicación de Actas"
                      content="EL ACTA DE LA ASAMBLEA DEL 21 DE MARZO SE PUBLICÓ EL 9 DE MAYO DE 2025, CUMPLIENDO EL ART. 44 DE LA LEY 675 DE 2001."
                    />

                    <EvidenceSection
                      title="4. Preparación de Cuentas"
                      color="#3F7A4F"
                      content="EL CARGO SE ENTREGA EL 27 DE MARZO DE 2026, PRESENTANDO ESTADOS FINANCIEROS, BALANCE, FLUJOS DE CAJA Y EJECUCIÓN PRESUPUESTAL PREVIO A ESTA ASAMBLEA."
                    />
                  </div>
                </Card>

                {/* II. ASPECTOS CONTABLES Y FINANCIEROS */}
                <Card title="II. Aspectos Contables y Financieros" icon={BarChart3} className="p-10">
                  <div className="space-y-8 pt-4">
                    <EvidenceSection
                      title="5. Gestión Contable Profesional"
                      content="LA CONTABILIDAD FUE ELABORADA, REVISADA Y FIRMADA POR EL SR. FABIO MUÑOZ (TP 137.430-T) BAJO LEY 43 DE 1990. SE PAGÓ EL SERVICIO EN ENERO DE 2026 TRAS LA CAUSACIÓN DE DICIEMBRE."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-[#F2F2F2] rounded-[32px] border-l-8 border-[#2E5E3B]">
                        <p className="text-[10px] font-black text-[#2E5E3B] mb-2 uppercase tracking-widest">SISTEMA DE REGISTRO</p>
                        <p className="text-sm font-bold text-slate-700">CONTABILIDAD LLEVADA EN EXCEL DANDO FE PÚBLICA DE ESTADOS FINANCIEROS.</p>
                      </div>
                      <div className="p-6 bg-[#F2F2F2] rounded-[32px] border-l-8 border-[#3F7A4F]">
                        <p className="text-[10px] font-black text-[#3F7A4F] mb-2 uppercase tracking-widest">PRODUCTOS ENTREGADOS</p>
                        <p className="text-sm font-bold text-slate-700">ESTADO DE SITUACIÓN FINANCIERA Y ESTADO DE RESULTADOS 2025.</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* III. ASPECTOS DE ACTOS LEGALES Y ADMINISTRATIVOS */}
                <Card title="III. Actos Legales y Administrativos" icon={ShieldCheck} highlight className="p-10">
                  <div className="space-y-8 pt-4">


                    <EvidenceSection
                      title="6. Vigilancia y Gestión Financiera"
                      color="#3F7A4F"
                      content={
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#2E5E3B] rounded-full mt-2 shrink-0"></div>
                            <span>FORMALIZACIÓN BANCARIA: CUENTA EN **DAVIVIENDA** EN CONVENIO CON **JELPIT** PARA PAGOS PSE.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#2E5E3B] rounded-full mt-2 shrink-0"></div>
                            <span>VIGILANCIA: SERVICIO DE **VIGÍAS DEL GALERAS LTDA** (12H DIURNAS) + ASEO 3 VECES POR SEMANA.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#2E5E3B] rounded-full mt-2 shrink-0"></div>
                            <span>NORMATIVA: IMPLEMENTACIÓN DE **SGSST** (DECRETO 1072) Y RECARGA DE EXTINTORES AL DÍA.</span>
                          </li>
                        </ul>
                      }
                    />
                  </div>
                </Card>



                {/* IV. GESTIÓN DE CUIDADO, CONSERVACIÓN Y DISPOSICIÓN */}
                <Card title="IV. Mantenimientos y Mejoras Locativas" icon={Wrench} className="p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <EvidenceSection
                      title="IMPERMEABILIZACIÓN TERRAZA"
                      content="EJECUTADA CON LA CUOTA EXTRAORDINARIA APROBADA EN EL AÑO 2024."

                    />
                    <EvidenceSection
                      title="PINTURA ZONAS COMUNES"
                      color="#3F7A4F"
                      content="PINTURA INTEGRAL DE PASILLOS, PORTONES ELÉCTRICOS Y GABINETES DE MEDIDORES."

                    />
                    <EvidenceSection
                      title="PORTÓN ELÉCTRICO PRINCIPAL"
                      content="ARREGLO DE LAS DOS NAVES: CAMBIO DE RESORTE, GUAYAS ROTAS, SOLDADURA Y CALIBRACIÓN DE CONTROLES."

                    />
                    <EvidenceSection
                      title="MEJORAS Y JARDINERÍA"
                      color="#3F7A4F"
                      content="LIMPIEZA DE ZONAS COMUNES, MANTENIMIENTO DE JARDINERÍA Y REEMPLAZO VÁLVULAS DE GAS (PISO 1)."

                    />
                    <EvidenceSection
                      title="ESTÉTICA Y TEMPORADA"
                      content="RESTAURACIÓN PESEBRE DE NAVIDAD DE FACHADA Y DECORACIÓN INTEGRAL NAVIDEÑA."


                    />
                    <EvidenceSection
                      title="OTROS"
                      content={
                        <>
                          • MANTENIMIENTO GENERAL TANQUE DE RESERVA <br />
                          • MANTENIMIENTO CIRCUITO CERRADO DE TV
                        </>
                      }
                    />
                  </div>
                </Card>

                {/* V. GESTIÓN DE RECUPERACIÓN DE CARTERA */}
                <Card title="V. Recuperación de Cartera Morosa" icon={DollarSign} highlight className="p-10">
                  <div className="space-y-10 pt-4">
                    <p className="text-sm font-bold text-slate-600 text-justify">
                      EL PROCESO INICIÓ CON CIRCULARIZACIÓN DE CARTERA Y CONCILIACIÓN. SE APLICAN INTERESES MORATORIOS SEGÚN LEY 675 ART. 30. SE LOGRÓ ACUERDO CON EL APTO 501 Y 106.
                    </p>


                    <div className="bg-[#2B2B2B] text-white p-12 rounded-[48px] relative overflow-hidden border-b-8 border-[#2E5E3B]">
                      <Gavel className="absolute right-[-10px] top-[-10px] text-white/5" size={180} />
                      <h4 className="text-2xl font-black mb-6 text-[#A9C5AE] uppercase">Estado Proceso Jurídico Apto 406</h4>
                      <div className="space-y-4 text-xs font-bold leading-relaxed relative z-10 max-w-2xl">
                        <p>DADO EL RECHAZO A LOS COBROS ADMINISTRATIVOS, SE ENTREGÓ LA CARTERA A LA FIRMA **MARTÍNEZ CONSULTING GROUPS**.</p>
                        <p>EL JUZGADO QUINTO DE PEQUEÑAS CAUSAS DE PASTO ADMITIÓ LA DEMANDA Y PROFIRIÓ MANDAMIENTO DE PAGO. SE DECRETÓ Y PRACTICÓ EL **EMBARGO DEL BIEN INMUEBLE**.</p>
                        <div className="p-4 bg-white/10 rounded-2xl border border-white/20 mt-4">
                          <p className="text-[#A9C5AE]">NOTA: HONORARIOS PENDIENTES DE PAGO TRAS ALCANZAR ESTADO PROCESAL ACTUAL.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* VI. ASPECTOS JURÍDICOS Y CONVIVENCIA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Card title="Caso Parqueadero 504" icon={Info}>
                    <div className="space-y-4 pt-2">
                      <p className="text-xs font-bold text-slate-600 text-justify uppercase leading-loose">
                        CITACIÓN EN CASA DE JUSTICIA POR EL SR. LAUREANO LEDESMA. SE ACLARA QUE ES ZONA COMÚN DE USO EXCLUSIVO. SE TRASLADA A ESTA ASAMBLEA LA SOLICITUD DE MODIFICACIÓN DEL ESPACIO.
                      </p>
                    </div>
                  </Card>
                  <Card title="Gestión Normativa" icon={Award}>
                    <div className="space-y-4 pt-2">
                      <p className="text-xs font-bold text-slate-600 text-justify uppercase leading-loose">
                        REPRESENTACIÓN LEGAL VIGENTE ANTE PLANEACIÓN MUNICIPAL. EXPEDICIÓN OPORTUNA DE PAZ Y SALVOS Y CUMPLIMIENTO DEL REGLAMENTO DE PH. NO SE IMPUSIERON MULTAS EN ESTE PERIODO.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* NUEVA SECCIÓN: SEGUROS Y PÓLIZAS */}
                <Card title="Seguros y Pólizas de Copropiedad" icon={ShieldAlert} highlight className="p-10">
                  <div className="space-y-12 pt-4">
                    <div className="bg-[#2E5E3B] p-10 rounded-[48px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl relative overflow-hidden">
                      <div className="z-10 text-center md:text-left">
                        <span className="bg-white/20 px-4 py-1 rounded-full text-[9px] font-black tracking-widest mb-4 inline-block uppercase">Pólizas Vigentes 2025-2026</span>
                        <h4 className="text-4xl font-black mb-2 uppercase tracking-tighter">Seguros del Estado SA</h4>
                        <div className="flex items-center gap-3 text-[#A9C5AE] font-bold text-xs">
                          <Calendar size={16} />
                          <span>VIGENCIA: 16 DE JULIO 2025 AL 16 DE JULIO 2026</span>
                        </div>
                      </div>
                      <ShieldCheck size={120} className="text-white opacity-10 absolute right-[-10px] top-[-10px]" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Póliza 1 */}
                      <div className="p-8 bg-[#F2F2F2] rounded-[40px] border-l-[12px] border-[#2E5E3B]">
                        <p className="text-[10px] font-black text-[#2E5E3B] mb-2 uppercase tracking-widest">1. PÓLIZA DE SEGURO COPROPIEDADES</p>
                        <h5 className="font-black text-lg mb-4 text-[#2B2B2B]">TODO RIESGO DAÑOS MATERIALES</h5>
                        <p className="text-[11px] font-bold text-slate-500 mb-6 italic uppercase leading-relaxed">
                          Ampara bienes comunes frente a daños materiales y responsabilidad civil frente a terceros.
                        </p>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Póliza No.</span>
                            <span className="text-sm font-black text-[#2B2B2B]">41-22-101000587</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Valor Asegurado</span>
                            <span className="text-sm font-black text-[#2E5E3B]">$4.052.750.000</span>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t-2 border-white">
                          <p className="text-[9px] font-black text-slate-400 mb-2 uppercase tracking-widest">Coberturas</p>
                          <ul className="grid grid-cols-2 gap-2">
                            {["Edificio ($3.500M)", "RC Extracontractual ($300M)", "Maquinaria ($50M)", "Eq. Electrónico ($20M)"].map((c, i) => (
                              <li key={i} className="text-[10px] font-bold text-slate-600 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-[#2E5E3B] rounded-full"></div> {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Póliza 2 */}
                      <div className="p-8 bg-[#F2F2F2] rounded-[40px] border-l-[12px] border-[#3F7A4F]">
                        <p className="text-[10px] font-black text-[#3F7A4F] mb-2 uppercase tracking-widest">2. PÓLIZA RESPONSABILIDAD CIVIL (D&O)</p>
                        <h5 className="font-black text-lg mb-4 text-[#2B2B2B]">DIRECTORES Y ADMINISTRADORES</h5>
                        <p className="text-[11px] font-bold text-slate-500 mb-6 italic uppercase leading-relaxed">
                          Protege el patrimonio frente a presuntos errores u omisiones en el ejercicio del cargo.
                        </p>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Póliza No.</span>
                            <span className="text-sm font-black text-[#2B2B2B]">41-01-101000584</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Valor Asegurado</span>
                            <span className="text-sm font-black text-[#3F7A4F]">$100.000.000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Deducible</span>
                            <span className="text-sm font-black text-red-600">$4.000.000</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ManagementTable
                      title="RESUMEN EJECUTIVO DE COSTOS - PÓLIZAS 2025"
                      headers={["TIPO DE PÓLIZA", "VALOR ASEGURADO", "PRIMA (NETA)", "TOTAL (CON IVA)"]}
                      data={[
                        { t: "Copropiedades (Áreas Comunes)", v: "$4.052.750.000", p: "$3.338.992", i: "$3.973.401" },
                        { t: "D&O (Administradores)", v: "$100.000.000", p: "$140.000", i: "$166.600" },
                        { t: <span className="font-black">TOTAL GENERAL</span>, v: "$4.152.750.000", p: "$3.478.992", i: <span className="text-[#2E5E3B] text-xl font-black">$4.140.001</span> },
                      ]}
                      icon={DollarSign}
                    />

                    <EvidenceSection
                      title="DOCUMENTACIÓN SEGUROS"
                      content="CARPETA DE PÓLIZAS DISPONIBLE PARA CONSULTA EN EL DESPACHO DE ADMINISTRACIÓN."
                    />
                  </div>
                </Card>

                <div className="p-12 bg-white rounded-[56px] border-4 border-[#2E5E3B]/10 text-center shadow-xl">
                  <p className="text-xs font-black text-[#2E5E3B] uppercase tracking-[0.4em] mb-4">Finalización del Informe</p>
                  <p className="text-sm font-bold text-slate-400 mb-10">LAS DEMÁS FUNCIONES PREVISTAS EN LEY 675 Y REGLAMENTO FUERON CUMPLIDAS A CABALIDAD.</p>
                  <div className="flex justify-center items-center gap-4">
                    <div className="h-0.5 w-16 bg-[#2E5E3B]/20"></div>
                    <p className="text-lg font-black text-[#2B2B2B]">LEIDY TATIANA ARTUNDUAGA ALVAREZ</p>
                    <div className="h-0.5 w-16 bg-[#2E5E3B]/20"></div>
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
                <div className="bg-white rounded-[60px] p-16 shadow-2xl border-4 border-[#2E5E3B]/10 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5"><BarChart3 size={200} className="text-[#2E5E3B]" /></div>
                  <div className="p-8 bg-[#2E5E3B]/5 rounded-[40px] mb-10 border-2 border-[#2E5E3B]/10">
                    <Landmark size={80} className="text-[#2E5E3B]" />
                  </div>
                  <h3 className="text-4xl font-black text-[#2E5E3B] mb-6 tracking-tighter">ESTADOS FINANCIEROS</h3>
                  <div className="w-24 h-2 bg-[#2B2B2B] mb-10 rounded-full"></div>
                  <div className="space-y-4">
                    <p className="text-[14px] font-black text-[#2B2B2B] tracking-[0.4em]">Certificados por:</p>
                    <p className="text-3xl font-black text-[#2B2B2B] tracking-tight">FABIO MUÑOZ - CONTADOR PÚBLICO</p>
                    <p className="text-xl font-bold text-slate-400 mt-4 tracking-widest">CIERRE 31 DE DICIEMBRE 2025</p>
                  </div>
                  <div className="mt-16 bg-[#F2F2F2] p-10 rounded-[40px] w-full max-w-xl">
                    <p className="text-xs font-black leading-relaxed">Presentación bajo normatividad Ley 43 de 1990 y marcos técnicos contables vigentes.</p>
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
                <div className="bg-[#2B2B2B] rounded-[60px] p-16 shadow-2xl border-b-[20px] border-[#2E5E3B] flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 p-12 opacity-10"><Wallet size={250} className="text-white" /></div>
                  <div className="p-8 bg-white/10 rounded-[40px] mb-10 border-2 border-white/20 backdrop-blur-md">
                    <DollarSign size={80} className="text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">PROYECCIÓN VIGENCIA 2026</h3>
                  <div className="w-24 h-2 bg-[#2E5E3B] mb-10 rounded-full"></div>
                  <div className="space-y-4">
                    <p className="text-[14px] font-black text-white/60 tracking-[0.4em]">Propuesta Administrativa:</p>
                    <p className="text-lg font-black text-white tracking-widest max-w-xl">ESTABLECIMIENTO DE CUOTAS DE ADMINISTRACIÓN Y FONDO DE IMPREVISTOS.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 9-10: ELECCIONES */}
          {activeSection === 'consejo' && (
            <div className="space-y-10 animate-in fade-in duration-500 uppercase">
              <SectionHeader
                title="9-10. Elecciones 2026"
                icon={Users}
                agendaIndices={[8, 9]}
                agendaStatus={agendaStatus}
                toggleAgendaItem={toggleAgendaItem}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card title="Consejo de Administración" icon={Users} highlight>
                  <div className="space-y-6">
                    <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#2E5E3B]/20">
                      {postuladosConsejo.length === 0 ? (
                        <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS POSTULADOS</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {postuladosConsejo.map(p => (
                            <span key={p} className="bg-[#2E5E3B] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                          <span className="text-[11px] font-black text-slate-700">Apto {r.unidad} | {r.propietario}</span>
                          <button
                            onClick={() => togglePostulacion(r.propietario, 'consejo')}
                            className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all ${postuladosConsejo.includes(r.propietario) ? 'bg-[#2B2B2B] text-white' : 'bg-slate-100 text-slate-400'
                              }`}
                          >
                            {postuladosConsejo.includes(r.propietario) ? 'POSTULADO' : 'POSTULAR'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card title="Comité de Convivencia" icon={HeartPulse}>
                  <div className="space-y-6">
                    <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#2E5E3B]/20">
                      {postuladosConvivencia.length === 0 ? (
                        <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS POSTULADOS</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {postuladosConvivencia.map(p => (
                            <span key={p} className="bg-[#2B2B2B] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'convivencia')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                          <span className="text-[11px] font-black text-slate-700">Apto {r.unidad} | {r.propietario}</span>
                          <button
                            onClick={() => togglePostulacion(r.propietario, 'convivencia')}
                            className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all ${postuladosConvivencia.includes(r.propietario) ? 'bg-[#2E5E3B] text-white' : 'bg-slate-100 text-slate-400'
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
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase">APARTAMENTO</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#2E5E3B]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#2E5E3B]" value={tempProp.proponente} onChange={(e) => setTempProp({ ...tempProp, proponente: e.target.value })} placeholder="EJ: 301" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase">DESCRIPCIÓN</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#2E5E3B]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#2E5E3B]" value={tempProp.texto} onChange={(e) => setTempProp({ ...tempProp, texto: e.target.value })} placeholder="INGRESE LA PROPUESTA..." />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addProposicion} className="w-full bg-[#2E5E3B] text-white py-4 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-3 uppercase"><Plus size={18} /> AGREGAR</button>
                  </div>
                </div>
              </Card>
              <div className="space-y-6">
                {proposiciones.map((prop) => (
                  <div key={prop.id} className="bg-white p-8 rounded-[32px] border-2 border-[#2E5E3B]/5 shadow-lg flex justify-between items-center group">
                    <div className="flex items-start gap-6">
                      <div className="h-14 w-14 bg-[#2E5E3B] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shrink-0 group-hover:bg-[#2B2B2B] transition-colors">P</div>
                      <div>
                        <p className="text-[10px] font-black text-[#2E5E3B] mb-1">PROPOSICIÓN DEL APARTAMENTO {prop.proponente}</p>
                        <p className="text-sm font-black text-[#2B2B2B] leading-relaxed uppercase">{prop.texto}</p>
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
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL DEL EDIFICIO LAS PLAZUELAS PH</p>
                </div>
                <button onClick={handlePrint} className="bg-[#2E5E3B] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl hover:scale-110 transition-all text-xs tracking-[0.2em]">
                  <Printer size={24} /> IMPRIMIR ACTA FINAL
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#2E5E3B] print:shadow-none print:border-none print:p-0 bg-white">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#2E5E3B] pb-10">
                  <h1 className="text-4xl font-black mb-4 uppercase">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                  <p className="text-xl font-black text-[#2E5E3B] uppercase">EDIFICIO LAS PLAZUELAS PH - NIT 900.485.144-7</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-slate-50 rounded-[56px] border-2 border-[#2E5E3B]/10 flex flex-col items-center">
                    <p className="text-[11px] font-black text-[#2B2B2B] mb-10 tracking-[0.3em]">Quórum de Cierre</p>
                    <p className="text-7xl font-black text-[#2E5E3B] leading-none">{totalQuorum.toFixed(2)}%</p>
                  </div>
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#2B2B2B] tracking-[0.3em] uppercase leading-none mb-12">Mesa Directiva</p>
                    <div className="text-[12px] font-black space-y-10">
                      <div className="border-b-4 border-[#2E5E3B]/10 pb-4">
                        <p className="text-[9px] text-[#2E5E3B] mb-2 font-black">PRESIDENTE:</p>
                        <p className="text-lg text-[#2B2B2B]">{dignatarios.presidente || '___________________________'}</p>
                      </div>
                      <div className="border-b-4 border-[#2E5E3B]/10 pb-4">
                        <p className="text-[9px] text-[#2E5E3B] mb-2 font-black">SECRETARIO(A):</p>
                        <p className="text-lg text-[#2B2B2B]">{dignatarios.secretario || '___________________________'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-12 bg-[#2E5E3B] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#2B2B2B]">
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

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; background-color: #F2F2F2; }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2E5E3B33; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2E5E3B55; }

        @media print {
          @page { margin: 1cm; size: letter; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          .Card { break-inside: avoid !important; border: 1px solid #000 !important; border-radius: 10px !important; box-shadow: none !important; margin-bottom: 20px !important; }
          table { border-collapse: collapse !important; width: 100% !important; border: 1px solid #000 !important; font-size: 9pt !important; }
          th { background: #2E5E3B !important; color: white !important; -webkit-print-color-adjust: exact; padding: 8px !important; border: 1px solid #000 !important; }
          td { border: 1px solid #000 !important; padding: 8px !important; }
        }
      `}} />
    </div>
  );
}