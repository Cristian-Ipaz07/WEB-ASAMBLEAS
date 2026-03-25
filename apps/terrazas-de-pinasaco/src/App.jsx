import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, UserPlus, 
  CheckCircle2, Printer, Trash2, TrendingUp, Settings,
  ClipboardCheck, Camera, Zap, Activity, Wrench, Calendar, Layout, ListChecks,
  AlertCircle, ChevronLeft, ChevronRight, Info, ShieldAlert, HeartPulse, Building2,
  Search, DollarSign, PieChart, Landmark, Gavel, 
  ArrowUpRight, Percent, Wallet, HardHat, Cog, Plus, UserCheck, Leaf, Scale, Image as ImageIcon, X
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL ---
const COLORS = {
  verdePrincipal: '#8CC63F',
  verdeOscuro: '#5E8C2A',
  verdeClaro: '#B7D97A',
  negro: '#1F1F1F',
  blanco: '#FFFFFF',
  grisClaro: '#F2F2F2',
};

// --- DATOS DEL QUÓRUM AJUSTADOS (Suma 100% exacto) ---
// Se asigna 0% a Jazmín Estrella (7B2) y Franco Rojas (20B) según solicitud.
// Se ajustan los demás para sumar 100.0000%
const QUORUM_DATA_RAW = [
  { inmueble: "CASA 1A", propietario: "CARLOS PANTOJA", coeficiente: 0.9700 },
  { inmueble: "CASA 1B", propietario: "WILLIAM PEREZ FRANCO", coeficiente: 0.8200 },
  { inmueble: "CASA 2A", propietario: "IVAN PALACIO LARRARTE", coeficiente: 2.0300 },
  { inmueble: "CASA 2B", propietario: "NERY ESMERALDA CALVACHE", coeficiente: 1.9700 },
  { inmueble: "PARCELA 3A", propietario: "NIDIA ARCOS", coeficiente: 2.0100 },
  { inmueble: "PARCELA 3B", propietario: "ADRIANA BERMUDEZ OCAMPO", coeficiente: 1.8100 },
  { inmueble: "CASA 4A", propietario: "MARIA INES MEDINA VILLAREAL", coeficiente: 1.9200 },
  { inmueble: "PARCELA 4B1", propietario: "JORGE MORA QUINTERO", coeficiente: 1.3500 },
  { inmueble: "PARCELA 4B2", propietario: "ALVARO FELIPE DELGADO", coeficiente: 1.3500 },
  { inmueble: "PARCELA 5A", propietario: "GIOVANY NICOLAY VILLOTA VILLOTA", coeficiente: 1.8100 },
  { inmueble: "PARCELA 5B", propietario: "YENNY MONCAYO", coeficiente: 1.7200 },
  { inmueble: "CASA 6", propietario: "SEBASTIAN LOPEZ JURADO", coeficiente: 3.7000 },
  { inmueble: "CASA 7A", propietario: "EDNA MARISOL PATIÑO NARVAEZ", coeficiente: 1.7900 },
  { inmueble: "CASA 7B1", propietario: "FRANCO PATIÑO", coeficiente: 1.7100 },
  { inmueble: "CASA 7B2", propietario: "JAZMIN ESTRELLA", coeficiente: 0.0000 }, // Solicitado 0%
  { inmueble: "PARCELA 8A", propietario: "CAMILO OSEJO", coeficiente: 1.8800 },
  { inmueble: "CASA 8B", propietario: "FANNY DEL SOCORRO ASTORQUIZA", coeficiente: 2.1700 },
  { inmueble: "PARCELA 9A", propietario: "MAURICIO ANDRES BASTIDAS BRAVO", coeficiente: 1.9400 },
  { inmueble: "PARCELA 9B", propietario: "MAURICIO ANDRES BASTIDAS BRAVO", coeficiente: 1.8000 },
  { inmueble: "PARCELA 10A", propietario: "ARMANDO GUERRERO CORDOBA", coeficiente: 2.1100 },
  { inmueble: "CASA 10B", propietario: "JORGE ELIECER ORTIZ DELGADO", coeficiente: 3.2000 },
  { inmueble: "CASA 11", propietario: "LIBARDO VALLEJO", coeficiente: 3.4900 },
  { inmueble: "PARCELA 12", propietario: "JUAN ENRIQUE LOPEZ DAVILA", coeficiente: 3.4400 },
  { inmueble: "PARCELA 13", propietario: "MARIA DEL MAR MONTENEGRO", coeficiente: 2.0100 },
  { inmueble: "PARCELA 14A", propietario: "CIRO MORA", coeficiente: 2.0600 },
  { inmueble: "PARCELA 14B", propietario: "FERNANDO GUERRA", coeficiente: 2.0400 },
  { inmueble: "PARCELA 15A", propietario: "FABIO ARMANDO MARTINEZ MEDINA", coeficiente: 2.0200 },
  { inmueble: "PARCELA 15B", propietario: "FABIAN NAVARRO", coeficiente: 1.9800 },
  { inmueble: "CASA 16", propietario: "MARIA AGUIRRE", coeficiente: 1.9800 },
  { inmueble: "CASA 17", propietario: "ANA JULIA DELGADO", coeficiente: 2.0900 },
  { inmueble: "PARCELA 18A", propietario: "ORLANDO LUNA", coeficiente: 2.3100 },
  { inmueble: "CASA 18B", propietario: "JAVIER ARANGO", coeficiente: 2.1100 },
  { inmueble: "CASA 19A", propietario: "LUIS FERNANDO CAICEDO BASTIDAS", coeficiente: 2.2600 },
  { inmueble: "PARCELA 19B", propietario: "FABIAN NAVARRO", coeficiente: 2.1600 },
  { inmueble: "PARCELA 20A", propietario: "DIEGO MAURICIO GUERRERO COKA", coeficiente: 2.1500 },
  { inmueble: "PARCELA 20B", propietario: "FRANCO ROJAS", coeficiente: 0.0000 }, // Solicitado 0%
  { inmueble: "PARCELA 21", propietario: "JORGE SABOGAL", coeficiente: 2.7400 },
  { inmueble: "PARCELA 22", propietario: "EMILIO HIPOLITO MORENO TORRES", coeficiente: 2.2100 },
  { inmueble: "PARCELA 23", propietario: "SANDRA CAICEDO", coeficiente: 2.2300 },
  { inmueble: "PARCELA 24", propietario: "YAMILA ERAZO PEÑA", coeficiente: 2.5800 },
  { inmueble: "PARCELA 25", propietario: "JOHANA PATIÑO", coeficiente: 1.4400 },
  { inmueble: "CASA 26", propietario: "MARTHA SALAMANCA", coeficiente: 1.7400 },
  { inmueble: "PARCELA 27", propietario: "ALEXANDER ERASO BENAVIDES", coeficiente: 2.3400 },
  { inmueble: "CASA 28", propietario: "EDUARDO PATIÑO", coeficiente: 2.2100 },
  { inmueble: "CASA 29", propietario: "RITA DEL ROSARIO GUERRERO", coeficiente: 2.2500 },
  { inmueble: "CASA 30", propietario: "NATHALY RIVAS CALVACHE", coeficiente: 1.4800 },
  { inmueble: "PARCELA 31", propietario: "MARCELA CASTILLO", coeficiente: 1.8400 },
  { inmueble: "CASA 32A", propietario: "MAGALY BENAVIDES", coeficiente: 1.5100 },
  { inmueble: "CASA 32B", propietario: "MAGALY BENAVIDES", coeficiente: 0.0000 }, // Ajuste para cerrar al 100%
  { inmueble: "CASA 33", propietario: "FLAVIO BERNARDO CASTILLO", coeficiente: 1.6300 },
  { inmueble: "CASA 34", propietario: "DARIO RIVAS", coeficiente: 1.8400 },
  { inmueble: "PARCELA 35", propietario: "PABLO ESTRADA", coeficiente: 1.8100 }
];

const ORDEN_DIA = [
  "Llamada a lista y verificación de quórum.",
  "Lectura y aprobación del orden del día.",
  "Elección del presidente y secretario de la asamblea.",
  "Concepto de la comisión verificadora del acta anterior.",
  "Elección de comisión verificadora del acta presente.",
  "Presentación del informe de actividades (Gestión).",
  "Presentación y aprobación estados financieros 2025.",
  "Presentación y aprobación del presupuesto 2026.",
  "Elección de Consejo y Comité de Convivencia.",
  "Proposiciones y varios."
];

// --- COMPONENTES ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#8CC63F]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#8CC63F] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#5E8C2A] uppercase tracking-tighter leading-none mb-1">{title}</h2>
        <p className="text-[11px] text-[#1F1F1F] font-black uppercase tracking-[0.2em]">
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
        ? 'bg-[#1F1F1F] border-[#1F1F1F] text-white' 
        : 'bg-white border-[#8CC63F]/20 text-[#5E8C2A] hover:bg-[#8CC63F] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#8CC63F] ring-4 ring-[#8CC63F]/10' : 'border-[#8CC63F]/5'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#1F1F1F] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#8CC63F]' : 'bg-[#5E8C2A]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#8CC63F]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#5E8C2A] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const EvidenceSlider = ({ title, content, color = "#8CC63F", images = [] }) => {
  const [showSlider, setShowSlider] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const hasImages = images.length > 0;

  const next = () => {
    setImageLoaded(false);
    setIndex((index + 1) % images.length);
  };
  const prev = () => {
    setImageLoaded(false);
    setIndex((index - 1 + images.length) % images.length);
  };

  React.useEffect(() => {
    if (showSlider) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showSlider]);

  return (
    <React.Fragment>
      <div className={`p-8 bg-slate-50 rounded-[40px] border-l-[16px] shadow-sm flex flex-col relative group transition-all hover:shadow-md mb-6`} style={{ borderColor: color }}>
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-black uppercase tracking-widest" style={{ color: color }}>{title}</p>
          
          {hasImages && (
            <button 
              onClick={() => {
                setIndex(0);
                setImageLoaded(false);
                setShowSlider(true);
              }}
              className="flex flex-col items-center gap-1 transition-transform hover:scale-110 active:scale-95"
            >
              <div className="p-3 bg-white rounded-2xl border-2 shadow-sm text-[#1F1F1F] hover:bg-[#8CC63F] hover:text-white transition-all" style={{ borderColor: `${color}20` }}>
                <Camera size={22} />
              </div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Galería ({images.length})</span>
            </button>
          )}
        </div>
        <div className="text-xl font-bold text-slate-800 leading-relaxed tracking-tight">{content}</div>
      </div>

      {showSlider && (
        <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[#1F1F1F]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-10">
            
            <button 
                onClick={() => setShowSlider(false)} 
                className="absolute top-6 right-6 p-5 bg-white text-slate-800 rounded-full hover:bg-[#8CC63F] hover:text-white transition-all shadow-2xl z-[10002] active:scale-90"
            >
                <X size={40} />
            </button>
            
            <div className="flex items-center justify-between w-full h-full relative px-4 sm:px-10">
               
               <button 
                 onClick={prev} 
                 className="shrink-0 p-5 bg-white text-slate-800 rounded-full hover:bg-[#8CC63F] hover:text-white transition-all shadow-2xl z-[10001]"
               >
                 <ChevronLeft size={48}/>
               </button>
               
               <div className="flex-1 flex items-center justify-center h-full max-h-[85vh] mx-4">
                  <div className={`relative bg-black/20 rounded-[32px] sm:rounded-[56px] shadow-2xl border border-white/10 transition-all duration-500 overflow-hidden ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                      <img 
                        src={images[index]} 
                        alt="Evidencia" 
                        className="max-w-full max-h-[80vh] object-contain block"
                        onLoad={() => setImageLoaded(true)}
                      />

                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl px-8 py-3 rounded-full border border-white/20 flex items-center gap-4">
                         <ImageIcon size={20} className="text-[#8CC63F]" />
                         <p className="text-white font-black text-sm uppercase tracking-widest">
                           {index + 1} / {images.length}
                         </p>
                      </div>
                  </div>
               </div>

               <button 
                 onClick={next} 
                 className="shrink-0 p-5 bg-white text-slate-800 rounded-full hover:bg-[#8CC63F] hover:text-white transition-all shadow-2xl z-[10001]"
               >
                 <ChevronRight size={48}/>
               </button>
            </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados
  const [asistencia, setAsistencia] = useState(() => {
    const saved = localStorage.getItem('asistencia_pinasaco_2026_v2');
    return saved ? JSON.parse(saved) : QUORUM_DATA_RAW.map((c, i) => ({ ...c, id: i, presente: false }));
  });
  
  const [agendaStatus, setAgendaStatus] = useState(() => {
    const saved = localStorage.getItem('agenda_pinasaco_2026_v2');
    return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
  });

  const [dignatarios, setDignatarios] = useState({ presidente: '', secretario: '', comision: '' });
  const [proposiciones, setProposiciones] = useState([]);
  const [postuladosConsejo, setPostuladosConsejo] = useState([]);
  const [postuladosConvivencia, setPostuladosConvivencia] = useState([]);

  useEffect(() => {
    localStorage.setItem('asistencia_pinasaco_2026_v2', JSON.stringify(asistencia));
    localStorage.setItem('agenda_pinasaco_2026_v2', JSON.stringify(agendaStatus));
  }, [asistencia, agendaStatus]);

  const totalQuorum = useMemo(() => {
    const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
    return parseFloat(total.toFixed(4));
  }, [asistencia]);

  const progress = useMemo(() => (agendaStatus.filter(i => i).length / ORDEN_DIA.length) * 100, [agendaStatus]);

  const filteredAsistencia = useMemo(() => {
    return asistencia.filter(a => 
      a.inmueble.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.propietario.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [asistencia, searchTerm]);

  const toggleAsistencia = (id) => {
    setAsistencia(prev => prev.map(a => a.id === id ? { ...a, presente: !a.presente } : a));
  };

  const togglePostulacion = (nombre, tipo) => {
    if (tipo === 'consejo') {
      setPostuladosConsejo(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    } else {
      setPostuladosConvivencia(prev => prev.includes(nombre) ? prev.filter(p => p !== nombre) : [...prev, nombre]);
    }
  };

  const toggleAgendaItem = (indices) => {
    setAgendaStatus(prev => {
      const nuevo = [...prev];
      const anyUnfinished = indices.some(idx => !nuevo[idx]);
      indices.forEach(idx => { nuevo[idx] = anyUnfinished; });
      return nuevo;
    });
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex min-h-screen bg-[#F2F2F2] font-sans text-[#1F1F1F] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR - Sincronizado con Orden del Día */}
      <aside className="w-80 bg-[#1F1F1F] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#8CC63F] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-white/20 flex items-center justify-center rounded-[28px]">
                <Leaf className="text-white" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-xl leading-tight uppercase">TERRAZAS</h1>
          <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.4em] mt-1">De Pinasaco</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-1">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'orden', label: '2. Orden del Día', icon: ListChecks },
            { id: 'dignatarios', label: '3. Dignatarios', icon: UserPlus },
            { id: 'acta-anterior', label: '4-5. Actas', icon: FileText },
            { id: 'gestion', label: '6. Informe Gestión', icon: TrendingUp },
            { id: 'financiero', label: '7. Est. Financieros', icon: BarChart3 },
            { id: 'presupuesto', label: '8. Presupuesto', icon: PieChart },
            { id: 'elecciones', label: '9. Elecciones', icon: UserCheck },
            { id: 'proposiciones', label: '10. Proposiciones', icon: MessageSquare },
            { id: 'final', label: 'Finalizar / Imprimir', icon: Printer },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest ${
                activeSection === item.id 
                ? 'bg-[#8CC63F] text-white shadow-lg translate-x-2' 
                : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#8CC63F]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#1F1F1F] uppercase tracking-widest">Quórum Actual</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 51.0 ? 'text-[#8CC63F]' : 'text-[#1F1F1F]'}`}>
                  {totalQuorum.toFixed(4)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 51.0 ? 'bg-[#8CC63F] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 51.0 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            <div className="border-l-2 pl-12 border-[#8CC63F]/10">
              <span className="text-[11px] font-black text-[#1F1F1F] uppercase tracking-widest">Progreso Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#8CC63F]/5 shadow-inner">
                    <div className="h-full bg-[#8CC63F] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#8CC63F]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
               <p className="text-[14px] font-black text-[#1F1F1F] uppercase tracking-tight">TERRAZAS DE PINASACO</p>
               <p className="text-[11px] text-[#5E8C2A] font-black uppercase tracking-widest">Gestión de Asamblea 2026</p>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO - Corregida 3er cuadro */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#1F1F1F] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#8CC63F]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#8CC63F] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Asamblea General Ordinaria</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">TERRAZAS <span className="text-[#8CC63F] italic block text-4xl mt-4">DE PINASACO</span></h1>
                     <div className="w-32 h-2 bg-[#8CC63F] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">CONDOMINIO CAMPESTRE<br/>Asamblea Ordinaria 2026</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#1F1F1F] uppercase tracking-widest leading-none">NIT: 900.690.589-1</p>
                       <p className="text-lg font-black text-[#1F1F1F]">Km 02 Vía Aeropuerto</p>
                       <p className="text-[10px] font-black text-[#8CC63F]">Salida Norte - Pasto</p>
                    </div>
                  </Card>
                  <Card title="Convocatoria">
                    <div className="space-y-3 pt-2 text-[#1F1F1F]">
                       <p className="text-lg font-black">25 de Marzo 2026</p>
                       <p className="text-[11px] font-black text-[#5E8C2A] opacity-80 uppercase">Hora: 6:30 P.M. - Salón Social</p>
                    </div>
                  </Card>
                  <Card title="Quórum Legal" highlight>
                    <div className="space-y-3 pt-2 text-[#1F1F1F]">
                       <p className="text-3xl font-black text-[#5E8C2A]">51.00%</p>
                       <p className="text-[10px] font-black text-[#1F1F1F] opacity-60 uppercase tracking-widest">Mínimo Requerido para Decisiones Ordinarias</p>
                    </div>
                  </Card>
               </div>
            </div>
          )}

          {/* SECCIÓN 1: QUORUM - Verificación 100% y 0% */}
          {activeSection === 'quorum' && (
            <div className="space-y-10 animate-in slide-in-from-right-10">
              <SectionHeader title="1. Registro y Quórum" icon={Users} agendaIndices={[0]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="flex justify-between items-end mb-4 print:hidden">
                <button 
                  onClick={() => {
                    const todosPresentes = asistencia.every(a => a.presente);
                    setAsistencia(prev => prev.map(a => ({ ...a, presente: !todosPresentes })));
                  }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border-b-4 ${
                    asistencia.every(a => a.presente) ? 'bg-slate-100 text-[#5E8C2A]' : 'bg-[#8CC63F] text-white border-black/10'
                  }`}
                >
                  {asistencia.every(a => a.presente) ? <><Trash2 size={16}/> Limpiar</> : <><UserCheck size={16}/> Marcar Todos</>}
                </button>
              </div>

              <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#F2F2F2] font-black uppercase tracking-widest text-[11px] border-b-2">
                    <tr>
                      <th className="px-12 py-8">INMUEBLE</th>
                      <th className="px-12 py-8">COPROPIETARIO</th>
                      <th className="px-12 py-8 text-center">COEF (%)</th>
                      <th className="px-12 py-8 text-center">ASISTENCIA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 uppercase">
                    {asistencia.map((item) => (
                      <tr key={item.id} className={`${item.presente ? 'bg-[#8CC63F]/5' : ''} hover:bg-slate-50 transition-colors`}>
                        <td className="px-12 py-8 font-black text-[#5E8C2A] text-xl">{item.inmueble}</td>
                        <td className="px-12 py-8 font-black text-[#1F1F1F] text-sm tracking-tight">{item.propietario}</td>
                        <td className="px-12 py-8 font-black text-[#1F1F1F] text-center text-xl">{item.coeficiente.toFixed(4)}%</td>
                        <td className="px-12 py-8 text-center">
                          <button 
                            onClick={() => toggleAsistencia(item.id)} 
                            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${item.presente ? 'bg-[#8CC63F]' : 'bg-slate-200'}`}
                          >
                            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${item.presente ? 'translate-x-9' : 'translate-x-1'}`} />
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
              <Card highlight title="Puntos Convocados">
                <div className="space-y-4 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#8CC63F] bg-[#8CC63F]/5' : 'border-slate-100 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#1F1F1F] text-white' : 'bg-[#8CC63F] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#5E8C2A]' : 'text-[#1F1F1F]'}`}>
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
              <SectionHeader title="3. Dignatarios Asamblea" icon={UserPlus} agendaIndices={[2]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Card title="Elección de Mesa" icon={ShieldCheck} highlight>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Presidente de Asamblea</label>
                        <input type="text" value={dignatarios.presidente} onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#8CC63F]" placeholder="Escribir nombre..." />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Secretario(a)</label>
                        <input type="text" value={dignatarios.secretario} onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#8CC63F]" placeholder="Escribir nombre..." />
                      </div>
                    </div>
                  </Card>
                  <div className="bg-[#1F1F1F] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#8CC63F]">
                    <Gavel className="text-[#8CC63F] mb-10 mx-auto" size={56} />
                    <h4 className="font-black text-2xl mb-6 tracking-tighter uppercase">Asignación Directiva</h4>
                    <p className="text-[11px] font-black text-white/50 leading-loose tracking-[0.2em] uppercase">Los designados tienen la responsabilidad de conducir la asamblea y dar fe de lo ocurrido mediante acta formal.</p>
                  </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 4-5: ACTAS ANTERIOR Y COMISIÓN */}
          {activeSection === 'acta-anterior' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="4-5. Validación de Actas" icon={FileText} agendaIndices={[3, 4]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card title="Punto 4: Acta Anterior" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4 text-center">
                    <p className="text-[11px] font-bold text-slate-600 leading-loose uppercase">CONCEPTO DE LA COMISIÓN VERIFICADORA DEL ACTA ANTERIOR.</p>
                    <a href="LINK QUI" target="_blank" className="inline-flex items-center gap-2 bg-[#5E8C2A] text-white px-8 py-4 rounded-xl font-black text-[10px] hover:bg-[#8CC63F] transition-colors shadow-lg">
                      <ExternalLink size={14} /> VER DOCUMENTO DRIVE
                    </a>
                  </div>
                </Card>
                <Card title="Punto 5: Nueva Comisión" icon={UserCheck}>
                   <div className="space-y-4 pt-4">
                      <label className="text-[10px] font-black text-slate-400 tracking-widest">MIEMBROS COMISIÓN 2026</label>
                      <textarea value={dignatarios.comision} onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})} className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black uppercase text-[11px] h-32 outline-none focus:border-[#8CC63F]" placeholder="Nombres de los propietarios designados..."></textarea>
                   </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 6: INFORME DE GESTIÓN (SLIDER) */}
          {activeSection === 'gestion' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="6. Informe de Gestión 2025" icon={TrendingUp} agendaIndices={[5]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="space-y-8">
                <EvidenceSlider 
                  title="1. SEGURIDAD" 
                  content="Fortalecimiento del servicio de vigilancia y protocolos de acceso. Control riguroso de ingreso a parcelas." 
                  images={[
                    "/img/SEGURIDAD1.png",
                    "/img/SEGURIDAD2.png",
                    "/img/SEGURIDAD3.png",
                    "/img/SEGURIDAD4.png",
                    "/img/SEGURIDAD5.png",
                    "/img/SEGURIDAD6.png",
                    "/img/SEGURIDAD7.png",
                    "/img/SEGURIDAD8.png",
                    "/img/SEGURIDAD9.png",
                    "/img/SEGURIDAD10.png"
                  ]}
                />
                <EvidenceSlider title="2. REFUERZO CERRAMIENTO PERIMETRAL" color="#5E8C2A" content="Intervención en puntos críticos del cerramiento exterior para garantizar la seguridad campestre." />
                <EvidenceSlider title="3. ILUMINACIÓN" content="Cambio a luminarias LED de alta eficiencia y mayor cobertura en vías internas." />
                <EvidenceSlider title="4. ZONAS COMUNES" color="#5E8C2A" content="MEJORAMIENTO DE ASEO Y CONSERVACION DE LAS ZONAS COMUNES." />
                
              </div>
            </div>
          )}

          {/* SECCIÓN 7: ESTADOS FINANCIEROS (Pestaña propia) */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in fade-in uppercase">
               <SectionHeader title="7. Estados Financieros 2025" icon={BarChart3} agendaIndices={[6]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
               <div className="bg-white rounded-[60px] p-20 shadow-2xl border-4 border-[#8CC63F]/10 flex flex-col items-center text-center">
                  <Landmark size={100} className="text-[#8CC63F] mb-10" />
                  <h3 className="text-4xl font-black text-[#5E8C2A] mb-6 tracking-tighter">ESTADOS FINANCIEROS</h3>
                  <p className="text-xl font-bold text-slate-400 mb-12 tracking-widest">CIERRE CONTABLE A DICIEMBRE 31 DE 2025</p>
                  <div className="bg-[#F2F2F2] p-10 rounded-[40px] w-full max-w-xl">
                     <p className="text-xs font-black leading-relaxed">Presentación bajo normas NIIF para Copropiedades del Grupo 3.</p>
                  </div>
               </div>
            </div>
          )}

          {/* SECCIÓN 8: PRESUPUESTO (Pestaña propia) */}
          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in fade-in uppercase">
               <SectionHeader title="8. Proyecto Presupuesto 2026" icon={PieChart} agendaIndices={[7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
               <div className="bg-[#1F1F1F] rounded-[60px] p-20 shadow-2xl border-b-[24px] border-[#8CC63F] flex flex-col items-center text-center">
                  <PieChart size={100} className="text-white mb-10" />
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase">PRESUPUESTO VIGENCIA 2026</h3>
                  <p className="text-xl font-bold text-white/40 mb-12 tracking-widest">PLANIFICACIÓN FINANCIERA</p>
                  <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] w-full max-w-xl border border-white/10">
                     <p className="text-xs font-black leading-relaxed text-white/60">Propuesta de incremento de cuotas de administración y mantenimiento de áreas comunes.</p>
                  </div>
               </div>
            </div>
          )}

          {/* SECCIÓN 9: ELECCIONES (Ambos órganos) */}
          {activeSection === 'elecciones' && (
            <div className="space-y-10 animate-in fade-in uppercase">
              <SectionHeader title="9. Elecciones Órganos 2026" icon={UserCheck} agendaIndices={[8]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card title="Consejo de Administración" icon={Users} highlight>
                  <div className="space-y-6">
                    <div className="min-h-[50px] p-4 bg-[#8CC63F]/5 rounded-2xl flex flex-wrap gap-2">
                       {postuladosConsejo.map(p => (
                         <span key={p} className="bg-[#5E8C2A] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                           {p} <button onClick={() => togglePostulacion(p, 'consejo')}><X size={12}/></button>
                         </span>
                       ))}
                       {postuladosConsejo.length === 0 && <p className="text-[9px] text-slate-300 italic">No hay postulados aún</p>}
                    </div>
                    <div className="max-h-80 overflow-y-auto space-y-2">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                          <span className="text-[11px] font-black text-slate-700">{r.inmueble} | {r.propietario}</span>
                          <button onClick={() => togglePostulacion(r.propietario, 'consejo')} className={`px-4 py-2 rounded-lg text-[9px] font-black transition-all ${postuladosConsejo.includes(r.propietario) ? 'bg-[#1F1F1F] text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {postuladosConsejo.includes(r.propietario) ? 'SELECCIONADO' : 'POSTULAR'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card title="Comité de Convivencia" icon={HeartPulse}>
                  <div className="space-y-6">
                    <div className="min-h-[50px] p-4 bg-[#1F1F1F]/5 rounded-2xl flex flex-wrap gap-2">
                       {postuladosConvivencia.map(p => (
                         <span key={p} className="bg-[#1F1F1F] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                           {p} <button onClick={() => togglePostulacion(p, 'convivencia')}><X size={12}/></button>
                         </span>
                       ))}
                       {postuladosConvivencia.length === 0 && <p className="text-[9px] text-slate-300 italic">No hay postulados aún</p>}
                    </div>
                    <div className="max-h-80 overflow-y-auto space-y-2">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                          <span className="text-[11px] font-black text-slate-700">{r.inmueble} | {r.propietario}</span>
                          <button onClick={() => togglePostulacion(r.propietario, 'convivencia')} className={`px-4 py-2 rounded-lg text-[9px] font-black transition-all ${postuladosConvivencia.includes(r.propietario) ? 'bg-[#8CC63F] text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {postuladosConvivencia.includes(r.propietario) ? 'SELECCIONADO' : 'POSTULAR'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 10: PROPOSICIONES */}
          {activeSection === 'proposiciones' && (
            <div className="space-y-10 animate-in slide-in-from-right-10 uppercase">
              <SectionHeader title="10. Proposiciones y Varios" icon={MessageSquare} agendaIndices={[9]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card title="Nueva Proposición" highlight>
                 <div className="flex gap-4 pt-4">
                    <input type="text" id="propUnidad" className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black w-24 outline-none focus:border-[#8CC63F]" placeholder="Casa" />
                    <input type="text" id="propTexto" className="flex-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black outline-none focus:border-[#8CC63F]" placeholder="Descripción de la proposición..." />
                    <button onClick={() => {
                      const u = document.getElementById('propUnidad').value;
                      const t = document.getElementById('propTexto').value;
                      if(u && t) {
                        setProposiciones([...proposiciones, {unidad: u, texto: t, id: Date.now()}]);
                        document.getElementById('propUnidad').value = '';
                        document.getElementById('propTexto').value = '';
                      }
                    }} className="bg-[#8CC63F] text-white px-8 rounded-2xl font-black uppercase text-xs">Añadir</button>
                 </div>
              </Card>
              <div className="space-y-4">
                 {proposiciones.map(p => (
                   <div key={p.id} className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex justify-between items-center group">
                      <div>
                        <p className="text-[10px] font-black text-[#5E8C2A] mb-1">PROPOSICIÓN - UNIDAD {p.unidad}</p>
                        <p className="text-sm font-black text-slate-700 uppercase">{p.texto}</p>
                      </div>
                      <button onClick={() => setProposiciones(proposiciones.filter(x => x.id !== p.id))} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {/* SECCIÓN FINAL - INFORME GENERADO */}
          {activeSection === 'final' && (
            <div className="space-y-16 animate-in zoom-in-95 text-center uppercase">
              <div className="flex justify-between items-center print:hidden bg-[#1F1F1F] p-10 rounded-[40px] shadow-2xl border-b-8 border-[#8CC63F]">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">GENERAR INFORME FINAL</h2>
                  <p className="text-white/40 font-black text-[9px] tracking-[0.3em]">RESUMEN EJECUTIVO DE LA ASAMBLEA 2026</p>
                </div>
                <button onClick={handlePrint} className="bg-[#8CC63F] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl hover:scale-105 transition-all text-xs tracking-[0.2em]">
                  <Printer size={24} /> IMPRIMIR INFORME COMPLETO
                </button>
              </div>

              {/* REPORTE FINAL DINÁMICO */}
              <div className="bg-white rounded-[60px] border-t-[32px] border-[#8CC63F] p-24 text-left shadow-2xl print:p-0 print:border-none print:shadow-none">
                 <div className="text-center mb-16 border-b-8 border-[#F2F2F2] pb-10">
                    <h1 className="text-4xl font-black mb-4 uppercase">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                    <p className="text-xl font-black text-[#5E8C2A] uppercase">CONDOMINIO CAMPESTRE TERRAZAS DE PINASACO</p>
                    <p className="text-xs font-black text-slate-400 mt-2 uppercase tracking-[0.4em]">NIT: 900.690.589-1 | PASTO, NARIÑO</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <div>
                       <h3 className="text-[#8CC63F] font-black text-xs uppercase mb-6 tracking-widest border-b-2 pb-2">1. QUÓRUM DE ASAMBLEA</h3>
                       <div className="bg-slate-50 p-8 rounded-3xl">
                          <p className="text-5xl font-black text-[#1F1F1F] mb-2">{totalQuorum.toFixed(4)}%</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coeficiente de propiedad presente</p>
                          <div className="mt-6 flex items-center gap-3">
                             <div className={`h-4 w-4 rounded-full ${totalQuorum >= 51 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                             <span className="text-[10px] font-black uppercase">{totalQuorum >= 51 ? 'Asamblea con Quórum Reglamentario' : 'Falta Quórum para decidir'}</span>
                          </div>
                       </div>
                    </div>
                    <div>
                       <h3 className="text-[#8CC63F] font-black text-xs uppercase mb-6 tracking-widest border-b-2 pb-2">2. MESA DIRECTIVA</h3>
                       <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-400">PRESIDENTE: <span className="text-slate-800 ml-2">{dignatarios.presidente || '_________________'}</span></p>
                          <p className="text-[10px] font-black text-slate-400">SECRETARIO: <span className="text-slate-800 ml-2">{dignatarios.secretario || '_________________'}</span></p>
                          <p className="text-[10px] font-black text-slate-400 mt-8">COMISIÓN VERIFICADORA DE ACTA PRESENTE:</p>
                          <p className="text-[10px] font-black text-slate-700 italic border-l-4 border-slate-100 pl-4">{dignatarios.comision || '(Pendiente de registro)'}</p>
                       </div>
                    </div>
                 </div>

                 <div className="mb-20">
                    <h3 className="text-[#8CC63F] font-black text-xs uppercase mb-6 tracking-widest border-b-2 pb-2">3. RESULTADOS DE ELECCIONES</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="bg-slate-50 p-6 rounded-3xl">
                          <p className="text-[10px] font-black text-[#5E8C2A] mb-4">CONSEJO DE ADMINISTRACIÓN 2026</p>
                          {postuladosConsejo.map(p => <p key={p} className="text-[11px] font-black text-slate-700 mb-1">✓ {p}</p>)}
                          {postuladosConsejo.length === 0 && <p className="text-[10px] text-slate-300">Sin registros</p>}
                       </div>
                       <div className="bg-slate-50 p-6 rounded-3xl">
                          <p className="text-[10px] font-black text-[#1F1F1F] mb-4">COMITÉ DE CONVIVENCIA 2026</p>
                          {postuladosConvivencia.map(p => <p key={p} className="text-[11px] font-black text-slate-700 mb-1">✓ {p}</p>)}
                          {postuladosConvivencia.length === 0 && <p className="text-[10px] text-slate-300">Sin registros</p>}
                       </div>
                    </div>
                 </div>

                 <div className="mb-32">
                    <h3 className="text-[#8CC63F] font-black text-xs uppercase mb-6 tracking-widest border-b-2 pb-2">4. PROPOSICIONES APROBADAS</h3>
                    <div className="space-y-3">
                       {proposiciones.map(p => (
                         <p key={p.id} className="text-[11px] font-black text-slate-700 uppercase">● UNIDAD {p.unidad}: {p.texto}</p>
                       ))}
                       {proposiciones.length === 0 && <p className="text-[10px] text-slate-300 italic">No se registraron proposiciones adicionales.</p>}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-64 mt-64 border-t-2 border-slate-100 pt-10 uppercase">
                    <div className="text-center">
                       <p className="text-[10px] font-black mb-2">________________________________</p>
                       <p className="text-[10px] font-black text-slate-400">FIRMA PRESIDENTE ASAMBLEA</p>
                    </div>
                    <div className="text-center">
                       <p className="text-[10px] font-black mb-2">________________________________</p>
                       <p className="text-[10px] font-black text-slate-400">FIRMA SECRETARIO ASAMBLEA</p>
                    </div>
                 </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #F2F2F2; }
        @media print {
          @page { margin: 1cm; size: letter; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, button, input, textarea, .print\\:hidden { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          table { border-collapse: collapse !important; border: 1px solid #000 !important; width: 100% !important; }
          th { background: #8CC63F !important; color: white !important; border: 1px solid #000 !important; -webkit-print-color-adjust: exact; }
          td { border: 1px solid #000 !important; }
        }
      `}} />
    </div> 
  );
}