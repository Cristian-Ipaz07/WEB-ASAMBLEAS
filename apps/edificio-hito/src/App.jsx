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
  // Otros y Misceláneos
  Calendar, Layers, Leaf, Briefcase, Lightbulb 
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
    // --- OFICINAS Y UNIDADES INDIVIDUALES ---
    { id: 1, unidad: "300", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 2.070475727, presente: false },
    { id: 2, unidad: "301", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.581197305, presente: false },
    { id: 3, unidad: "302", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.250928287, presente: false },
    { id: 4, unidad: "303", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.341905659, presente: false },
    { id: 5, unidad: "304", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.311227242, presente: false },
    { id: 6, unidad: "305", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.284991907, presente: false },
    { id: 7, unidad: "306", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.156988861, presente: false },
    { id: 8, unidad: "307", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.550942039, presente: false },
    { id: 9, unidad: "308", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 1.293994436, presente: false },
    { id: 10, unidad: "309", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 1.014080335, presente: false },
    { id: 11, unidad: "310", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.294512795, presente: false },
    { id: 12, unidad: "311", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.284145606, presente: false },
    { id: 13, unidad: "312", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.277586772, presente: false },
    { id: 14, unidad: "313", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 1.294417586, presente: false },
    { id: 15, unidad: "314", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.798696696, presente: false },
    { id: 16, unidad: "401", propietario: "INES REYES ERAZO", coeficiente: 1.698314803, presente: false },
    { id: 17, unidad: "402", propietario: "ORLANDO VÁSQUEZ B", coeficiente: 1.17043447, presente: false },
    { id: 18, unidad: "403", propietario: "ANDRES VILLOTA BENAVIDES Y CARLOS DANIEL VILLOTA BENAVIDES", coeficiente: 1.704662061, presente: false },
    { id: 19, unidad: "404", propietario: "NIDIA ARCOS", coeficiente: 1.245966846, presente: false },
    { id: 20, unidad: "405", propietario: "GERARDO GÓMEZ ESPAÑA", coeficiente: 1.126215236, presente: false },
    { id: 21, unidad: "406", propietario: "ADRIANA SOFIA SOLANO", coeficiente: 0.910408446, presente: false },
    { id: 22, unidad: "407", propietario: "CLARITA BRAVO", coeficiente: 1.947127337, presente: false },
    { id: 23, unidad: "408", propietario: "LORENA ALEXANDRA FAJARDO ARTURO", coeficiente: 1.04391245, presente: false },
    { id: 24, unidad: "501", propietario: "EDGAR JOSE MADROÑERO", coeficiente: 1.460504184, presente: false },
    { id: 25, unidad: "502", propietario: "JAQUELINE MADROÑERO", coeficiente: 1.266278073, presente: false },
    { id: 26, unidad: "503", propietario: "LEIDY ORTEGA / NESTOR PORTILLA", coeficiente: 1.972727946, presente: false },
    { id: 27, unidad: "504", propietario: "ARMANDO CHAMORRO / ESPOSO DE NIDIA ARCOS", coeficiente: 1.221212538, presente: false },
    { id: 28, unidad: "505", propietario: "DOA ASOCIADOS SAS", coeficiente: 1.101037777, presente: false },
    { id: 29, unidad: "506", propietario: "ROCIO AGUIRRE PANTOJA", coeficiente: 0.903214886, presente: false },
    { id: 30, unidad: "507", propietario: "ROVIRO CAJIGAS", coeficiente: 1.947127337, presente: false },
    { id: 31, unidad: "508", propietario: "MARICELA VALLEJO", coeficiente: 0.766748828, presente: false },
    { id: 32, unidad: "601", propietario: "BYV PROYECTOS SAS", coeficiente: 1.457753705, presente: false },
    { id: 33, unidad: "604", propietario: "ALVARO ANDRES ROSERO / MA FERNANDA OCAMPO", coeficiente: 1.125368934, presente: false },
    { id: 34, unidad: "605", propietario: "LUZ YANETH LOPEZ VELA", coeficiente: 1.193496176, presente: false },
    { id: 35, unidad: "606", propietario: "HECTOR LOPEZ / LUIS FERNANDA LOPEZ / LUIS FERNANDO LOPEZ MONCAYO", coeficiente: 2.1811296, presente: false },
    { id: 36, unidad: "901", propietario: "OMAR ERASO / DISREDES", coeficiente: 1.195823504, presente: false },
    { id: 37, unidad: "902", propietario: "ANA MARÍA AGUILAR CRUZ / DISREDES", coeficiente: 1.424747961, presente: false },
    { id: 38, unidad: "905", propietario: "JESÚS PABÓN / PAULA ANDREA SANTACRUZ", coeficiente: 0.904695913, presente: false },
    { id: 39, unidad: "906", propietario: "EMILIO MORENO", coeficiente: 2.16991611, presente: false },
    { id: 40, unidad: "1004", propietario: "ANA BEATRIZ PEREZ CAMPO / JESUS PABON", coeficiente: 1.299918544, presente: false },
    { id: 41, unidad: "1005", propietario: "BYV PROYECTOS SAS", coeficiente: 1.206402268, presente: false },
    { id: 42, unidad: "1006", propietario: "RAUL DIAZ DEL CASTILLO / RODRIGO DIAZ DEL CASTILLO", coeficiente: 1.984787737, presente: false },
    { id: 43, unidad: "1101", propietario: "JIMENA ROSAS, ILIANA ROSAS / FRACER", coeficiente: 1.195823504, presente: false },
    { id: 44, unidad: "1103", propietario: "ARTURO CORDOBA, LIGIA CORDOBA", coeficiente: 0.93939426, presente: false },
    { id: 45, unidad: "1106", propietario: "FRACER SAS", coeficiente: 2.19551672, presente: false },
    { id: 46, unidad: "1301", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 1.820182166, presente: false },
    { id: 47, unidad: "1302", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.819007923, presente: false },
    { id: 48, unidad: "1303", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 1.003501571, presente: false },
    { id: 49, unidad: "1001, 1002, 1003", propietario: "UNIFORCE SAS / JESÚS HIDALGO", coeficiente: 4.199980958, presente: false },
    { id: 50, unidad: "1102, 1104, 1105", propietario: "MALLIESA SAS / FRACER", coeficiente: 3.47808609, presente: false },
    { id: 51, unidad: "1201, 1202, 1203, 1204, 1205, 1206", propietario: "NORCO / DAVIVIENDA - ALVARO VILLOTA", coeficiente: 7.636175142, presente: false },
    { id: 52, unidad: "602, 603", propietario: "TATIANA JARAMILLO", coeficiente: 2.998656497, presente: false },
    { id: 53, unidad: "701, 702, 703, 704, 705, 706", propietario: "COOPERATIVA COOPROFESORES Pasto", coeficiente: 11.23307528, presente: false },
    
    // CORRECCIÓN PISO 8: Separado Mónica Ibarra y SEN SAS
    { id: 54, unidad: "801, 802, 803, 804", propietario: "MONICA IBARRA", coeficiente: 7.488716853, presente: false },
    { id: 55, unidad: "805, 806", propietario: "SEN SAS", coeficiente: 3.744358427, presente: false },
    
    { id: 56, unidad: "903, 904", propietario: "DISREDES / OMAR ERASO", coeficiente: 2.391647008, presente: false },
    // --- DEPÓSITOS (6 UNIDADES) ---
    { id: 61, unidad: "DEPÓSITO 1", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.082715974, presente: false },
    { id: 62, unidad: "DEPÓSITO 2", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.082715974, presente: false },
    { id: 63, unidad: "DEPÓSITO 3", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.082715974, presente: false },
    { id: 64, unidad: "DEPÓSITO 4", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.082715974, presente: false },
    { id: 65, unidad: "DEPÓSITO 5", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.082715974, presente: false },
    { id: 66, unidad: "DEPÓSITO 6", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.082715974, presente: false },

    // --- LOCALES COMERCIALES (4 UNIDADES) ---
    { id: 57, unidad: "LOCAL COMERCIAL 101", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.822606547, presente: false },
    { id: 58, unidad: "LOCAL COMERCIAL 102", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.933391204, presente: false },
    { id: 59, unidad: "LOCAL COMERCIAL 103", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.470481267, presente: false },
    { id: 60, unidad: "LOCAL COMERCIAL 104", propietario: "PROYECTOS URBANOS HITO SAS", coeficiente: 0.528416625, presente: false },
  ];
  

  export default function App() {
    const [activeSection, setActiveSection] = useState('inicio');
    const [searchTerm, setSearchTerm] = useState('');

    // --- LÓGICA DE ELECCIONES ---
    const [postuladosConsejo, setPostuladosConsejo] = useState([]);
    const [postuladosConvivencia, setPostuladosConvivencia] = useState([]);

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

    // --- LÓGICA DE DIGNATARIOS ---
    const [dignatarios, setDignatarios] = useState(() => {
      const saved = localStorage.getItem('dignatarios_hito');
      return saved ? JSON.parse(saved) : { presidente: '', secretario: '', comision: '' };
    });

    // --- LÓGICA DE PROPOSICIONES ---
    const [proposiciones, setProposiciones] = useState(() => {
      const saved = localStorage.getItem('proposiciones_hito');
      return saved ? JSON.parse(saved) : [];
    });
    const [tempProp, setTempProp] = useState({ proponente: '', texto: '' });

    const addProposicion = () => {
      if (tempProp.proponente.trim() && tempProp.texto.trim()) {
        const nueva = {
          id: Date.now(),
          proponente: tempProp.proponente,
          texto: tempProp.texto
        };
        setProposiciones([...proposiciones, nueva]);
        setTempProp({ proponente: '', texto: '' });
      } else {
        alert("POR FAVOR INGRESE LA UNIDAD Y LA DESCRIPCIÓN");
      }
    };

    const deleteProposicion = (id) => {
      setProposiciones(proposiciones.filter(p => p.id !== id));
    };

    // --- LÓGICA DE ASISTENCIA (CORREGIDA A 86 FILAS) ---
    const [asistencia, setAsistencia] = useState(() => {
      try {
        const saved = localStorage.getItem('asistencia_hito_2026');
        const parsedSaved = saved ? JSON.parse(saved) : null;

        // VALIDACIÓN ACTUALIZADA: Ahora verifica si tiene 86 filas
        if (parsedSaved && parsedSaved.length === 86) {
          return parsedSaved;
        }
        
        // Si el tamaño cambió o es nuevo, cargamos la data limpia
        return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
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

    // --- PERSISTENCIA DE ESTADOS ---
    useEffect(() => {
      localStorage.setItem('asistencia_hito_2026', JSON.stringify(asistencia));
      localStorage.setItem('agenda_hito_2026', JSON.stringify(agendaStatus));
      localStorage.setItem('proposiciones_hito', JSON.stringify(proposiciones));
      localStorage.setItem('dignatarios_hito', JSON.stringify(dignatarios));
    }, [asistencia, agendaStatus, proposiciones, dignatarios]);

    // --- CÁLCULOS ---
    const totalQuorum = useMemo(() => {
      const total = asistencia.filter(a => a.presente).reduce((acc, curr) => acc + curr.coeficiente, 0);
      return Math.round(total * 1000000000) / 1000000000;
    }, [asistencia]);

    const progress = useMemo(() => {
      if (!ORDEN_DIA.length) return 0;
      return (agendaStatus.filter(i => i).length / ORDEN_DIA.length) * 100;
    }, [agendaStatus]);

    // --- MANEJADORES DE EVENTOS ---
    const toggleAsistencia = (id) => {
      setAsistencia(prev => 
        prev.map(item => 
          item.id === id ? { ...item, presente: !item.presente } : item
        )
      );
    };

    const toggleAllAsistencia = () => {
      setAsistencia(prev => {
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
            { id: 'comision', label: '4. Comisión Verificadora', icon: ClipboardCheck }, // NUEVO
            { id: 'gestion', label: '5. Informe Gestión', icon: TrendingUp },
            { id: 'revisoria', label: '6. Dictamen Revisoría', icon: FileCheck },
            { id: 'financiero', label: '7. Estados Financieros', icon: BarChart3 },
            { id: 'presupuesto', label: '8. Presupuesto', icon: PieChart },
            { id: 'eleccion_consejo', label: '9. Consejo 2026', icon: UserPlus }, // <--- AÑADIR ESTA
            { id: 'eleccion_revisor', label: '10. Elección Revisor', icon: Gavel },
            
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
              <SectionHeader 
                title="1. Registro y Quórum" 
                icon={Users} 
                agendaIndices={[0]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              
              <div className="flex flex-wrap justify-between items-center gap-4">
                {/* Buscador */}
                <div className="relative group w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={18} />
                  <input 
                    type="text" 
                    placeholder="BUSCAR UNIDAD O PROPIETARIO..." 
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#E5E5E5] rounded-xl font-bold text-[11px] uppercase tracking-wider outline-none focus:border-[#1A1A1A] transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-6">
                  {/* Botón Maestro */}
                  <button 
                    onClick={toggleAllAsistencia}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest bg-[#1A1A1A] text-white border-b-4 border-black/20 hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all shadow-md"
                  >
                    <UserCheck size={16} /> Marcar/Quitar Todos
                  </button>

                  {/* Contador de Unidades */}
                  <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-xl border border-[#E5E5E5] shadow-sm">
                    <div className="text-right">
                      <p className="text-[8px] font-black text-[#8A8A8A] uppercase tracking-widest leading-none mb-1">PRESENTES</p>
                      <p className="text-lg font-black text-[#1A1A1A]">
                        {asistencia.filter(a => a.presente).length} <span className="text-[#8A8A8A] font-medium text-sm">/ {asistencia.length}</span>
                      </p>
                    </div>
                    <Users className="text-[#1A1A1A]" size={24} />
                  </div>
                </div>
              </div>

              {/* Tabla Extendida (Sin scroll interno) */}
              <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F8F8F8] text-[#1A1A1A] font-black uppercase tracking-widest text-[9px] border-b">
                      <tr>
                        <th className="px-8 py-4">NO. UNIDAD</th>
                        <th className="px-8 py-4">PROPIETARIO</th>
                        <th className="px-8 py-4 text-center">COEFICIENTE</th>
                        <th className="px-8 py-4 text-center">ESTADO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[11px] font-bold">
                      {asistencia
                        .filter(a => 
                          (a.unidad || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (a.propietario || "").toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((item) => (
                          <tr 
                            key={item.id} 
                            className={`transition-colors ${
                              item.presente ? 'bg-green-50/50' : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="px-8 py-4 font-black text-[#1A1A1A]">{item.unidad}</td>
                            <td className="px-8 py-4 uppercase text-[#4A4A4A]">{item.propietario}</td>
                            <td className="px-8 py-4 text-center font-mono text-[#1A1A1A]">
                              {item.coeficiente.toFixed(4)}%
                            </td>
                            <td className="px-8 py-4 text-center">
                              <button 
                                onClick={() => toggleAsistencia(item.id)} 
                                className={`min-w-[120px] px-4 py-2 rounded-lg text-[9px] font-black transition-all ${
                                  item.presente 
                                    ? 'bg-[#1A1A1A] text-white shadow-md scale-105' 
                                    : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-400'
                                }`}
                              >
                                {item.presente ? '✓ PRESENTE' : 'AUSENTE'}
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

          {/* SECCIÓN 4: COMISIÓN VERIFICADORA / ACTA ANTERIOR */}
          {activeSection === 'comision' && (
            <div className="space-y-10 animate-in fade-in duration-500 uppercase">
              <SectionHeader 
                title="4. Lectura Concepto Comisión Verificadora" 
                icon={ClipboardCheck} 
                agendaIndices={[3]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* TARJETA IZQUIERDA: VALIDACIÓN Y DOCUMENTO */}
                <Card title="Estado del Acta Anterior" icon={ShieldCheck} highlight>
                  <div className="space-y-6 pt-4">
                    <p className="text-[11px] font-bold text-slate-600 leading-loose">
                      VALIDACIÓN DE LA COMISIÓN VERIFICADORA SOBRE EL TEXTO DEL ACTA DE LA ASAMBLEA GENERAL ORDINARIA DEL AÑO 2025.
                    </p>
                    
                    <div className="p-8 bg-slate-50 rounded-[40px] border-2 border-dashed border-[#B65A3A]/20 flex flex-col items-center justify-center text-center">
                      <FileText size={40} className="text-[#B65A3A] mb-4 opacity-40" />
                      
                      {/* ENLACE AL DRIVE DE HITO PH */}
                      <a 
                        href="https://drive.google.com/file/d/1Ug-Zz16qqVwRH5s9R0hfqmzmfv5bDob6/view?usp=sharing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mb-6 inline-flex items-center gap-3 bg-[#B65A3A] text-white px-8 py-4 rounded-2xl font-black text-[10px] hover:bg-[#1A1A1A] transition-all shadow-xl shadow-[#B65A3A]/20 transform hover:scale-105"
                      >
                        <ExternalLink size={16} />
                        DESCARGAR ACTA 2025 (PDF)
                      </a>

                      <div className="space-y-2">
                        <p className="text-[9px] font-black text-slate-400 tracking-widest">CONCEPTO: FAVORABLE</p>
                        <p className="text-[8px] font-bold text-slate-300 uppercase italic">DOCUMENTO OFICIAL DISPONIBLE EN ARCHIVOS DE ADMINISTRACIÓN</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* TARJETA DERECHA: OBSERVACIONES EN VIVO */}
                <Card title="Observaciones de la Asamblea" icon={MessageSquare}>
                  <div className="space-y-6 pt-4">
                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                      REGISTRO DE COMENTARIOS O CORRECCIONES
                    </p>
                    <textarea 
                      className="w-full p-6 bg-slate-50 border-2 border-[#B65A3A]/10 rounded-[32px] font-black uppercase text-[11px] h-48 focus:border-[#B65A3A] outline-none shadow-inner transition-all placeholder:text-slate-300"
                      placeholder="INGRESE AQUÍ LAS OBSERVACIONES DE LOS COPROPIETARIOS RESPECTO AL ACTA ANTERIOR..."
                    ></textarea>
                    
                    <div className="flex items-center gap-3 text-[#B65A3A]">
                      <Info size={14} />
                      <span className="text-[9px] font-black italic uppercase">Estas notas se incluirán en el acta del día de hoy</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          
          {/* SECCIÓN 4: INFORME DE GESTIÓN INTEGRAL (RÉPLICA EXACTA DEL WORD) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader 
                title="6. Informe Integral de Gestión 2025" 
                icon={TrendingUp} 
                agendaIndices={[4]} 
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
    headers={["ACTIVIDAD"]}
    data={[
      { a: "ANTICIPO 70% BARRERA ÓPTICA" },
      { a: "SUMINISTRO FOTOCELDA" },
      
    ]}
  />
  <DataTable 
    title="OBRA B: EMERGENCIAS Y PLATAFORMAS"
    headers={["ACTIVIDAD"]}
    data={[
      { a: "MANT. EMERGENCIA FEUS81 Y FEUS84" },
      { a: "MANT. PLATAFORMA FEUS 80 Y FEUS 97" },
      { a: "SUMINISTRO REPUESTOS FEUS105" }
    ]}
  />
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <DataTable 
    title="OBRA C: LOCATIVOS Y VIDRIOS"
    headers={["ACTIVIDAD"]}
    data={[
      { a: "ARREGLO PUERTA SEXTO PISO" },
      { a: "REINTEGRO LLAVE, OF. 502 Y FUGA P9" },
      { a: "ARREGLO DE CHAPA" },
      { a: "INSTALACIÓN VIDRIO TEMPLADO" }
    ]}
  />
  <DataTable 
    title="OBRA D: SALUD, SEGURIDAD Y JARDÍN"
    headers={["ACTIVIDAD"]}
    data={[
      { a: "2 EXTINTORES Y SOPORTES" },
      { a: "SERVICIO DE FUMIGACIÓN" },
      { a: "MANTTO. RED CONTRA INCENDIOS" },
      { a: "8 PLACAS DE ACRÍLICO" },
      { a: "MANTENIMIENTO JARDINERÍA" }
    ]}
  />
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <DataTable 
    title="OBRA E: OTROS"
    headers={["ACTIVIDAD"]}
    data={[
      { a: "INSUMOS ASEO" },
      { a: "BONOS DE NAVIDAD" },
      
    ]}
  />
  
</div>

                
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

          {/* SECCIÓN 6: DICTAMEN DE REVISORÍA FISCAL */}
          {activeSection === 'revisoria' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader 
                title="6. Dictamen de Revisoría Fiscal" 
                icon={FileCheck} 
                agendaIndices={[5]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* TARJETA 1: IDENTIFICACIÓN DEL RESPONSABLE */}
                <Card title="Responsable del Control" icon={UserCheck} highlight>
                  <div className="p-8 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 bg-[#B65A3A]/10 rounded-[32px] flex items-center justify-center text-[#B65A3A] border-2 border-[#B65A3A]/20">
                        <ShieldCheck size={40} />
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-[#B65A3A] tracking-[0.2em] mb-1">REVISORA FISCAL</p>
                        <p className="text-2xl font-black text-slate-800 tracking-tighter">ROSA ALBA CAMPIÑO</p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic">
                        ENCARGADA DE LA VIGILANCIA INTEGRAL, VERIFICANDO QUE TODAS LAS OPERACIONES 
                        ECONÓMICAS SE AJUSTEN A LOS ESTATUTOS DEL EDIFICIO HITO PH Y LA LEY 675 DE 2001.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* TARJETA 2: ALCANCE DEL INFORME (PUNTOS CLAVE) */}
                <Card title="Alcance de la Auditoría" icon={ClipboardCheck}>
                  <div className="p-4 grid grid-cols-1 gap-4">
                    {[
                      { t: "GESTIÓN FINANCIERA", d: "VERIFICACIÓN DE COMPROBANTES DE EGRESO Y SOPORTES" },
                      { t: "SEGURIDAD SOCIAL", d: "AUDITORÍA A PAGOS DE EMPLEADOS Y CONTRATISTAS" },
                      { t: "CONTROL TRIBUTARIO", d: "REVISIÓN DE CUMPLIMIENTO ANTE LA DIAN Y MUNICIPIO" },
                      { t: "CONCILIACIONES", d: "VERIFICACIÓN DE SALDOS BANCARIOS Y CAJA AL DÍA" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-[#B65A3A]/30 transition-colors">
                        <CheckSquare size={18} className="text-[#B65A3A] shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] font-black text-slate-800 mb-1">{item.t}</p>
                          <p className="text-[9px] font-bold text-slate-400">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* SEPARADOR VISUAL INFERIOR PARA CERRAR LA SECCIÓN */}
              <div className="h-2 w-full bg-gradient-to-r from-transparent via-[#B65A3A]/20 to-transparent rounded-full mt-10" />
            </div>
          )}

          {/* SECCIÓN 7: ESTADOS FINANCIEROS (CORREGIDO) */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="7. Estados Financieros" icon={BarChart3} agendaIndices={[6]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-[60px] p-16 shadow-2xl border-4 border-[#1A1A1A]/10 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5"><BarChart3 size={200} /></div>
                    <div className="p-8 bg-[#1A1A1A]/5 rounded-[40px] mb-10 border-2 border-[#1A1A1A]/10">
                      <Landmark size={80} className="text-[#1A1A1A]" />
                    </div>
                    <h3 className="text-4xl font-black text-[#1A1A1A] mb-4 tracking-tighter">BALANCE GENERAL 2025</h3>
                    <div className="w-24 h-2 bg-[#1A1A1A] mb-10 rounded-full"></div>
                    <div className="space-y-4 mb-12">
                      <p className="text-[14px] font-black tracking-[0.4em]">Presentado por:</p>
                      <p className="text-3xl font-black text-[#1A1A1A] tracking-tight">LUZ JANETH LÓPEZ VELA</p>
                      <p className="text-xl font-bold text-[#8A8A8A] tracking-widest">CONTADORA EDIFICIO HITO</p>
                    </div>
                    <div className="bg-[#F5F5F5] p-10 rounded-[40px] w-full max-w-xl border-2 border-dashed border-slate-200">
                      <p className="text-xs font-black leading-relaxed text-slate-500">
                        CIERRE CONTABLE AL 31 DE DICIEMBRE DE 2025 BAJO NORMAS NIIF VIGENTES. INCLUYE EMPALME CONTABLE CON ANDREA ZAMBRANO.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Card title="Indicadores de Gestión" icon={Activity}>
                  <div className="space-y-6 pt-4">
                    <div className="p-6 bg-slate-50 rounded-3xl text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Empalme Contable</p>
                       <p className="text-lg font-black text-[#1A1A1A]">24 OCT 2025</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Corte de Informe</p>
                       <p className="text-lg font-black text-[#1A1A1A]">31 DIC 2025</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 8: PRESUPUESTO (CORREGIDO) */}
          {activeSection === 'presupuesto' && (
            <div className="space-y-10 animate-in zoom-in-95 uppercase">
              <SectionHeader title="8. Proyecto Presupuesto 2026" icon={PieChart} agendaIndices={[7]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-[#1A1A1A] rounded-[60px] p-20 shadow-2xl text-white text-center border-b-[20px] border-[#3A3A3A] relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 p-12 opacity-10"><Wallet size={250} /></div>
                  <h3 className="text-5xl font-black mb-6 tracking-tighter">PRESUPUESTO VIGENCIA 2026</h3>
                  <p className="text-white/60 font-black text-sm tracking-widest max-w-xl mx-auto mb-12 leading-relaxed">
                    INCLUYE PROYECTO DE INGRESOS Y GASTOS PARA LA OPERACIÓN DEL EDIFICIO HITO PH DURANTE EL AÑO 2026.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                     <div className="bg-white/10 backdrop-blur-md p-8 rounded-[40px] border-2 border-white/20">
                        <p className="text-[10px] font-black text-white/50 tracking-widest mb-2">Cuota 2025</p>
                        <p className="text-2xl font-black italic">SEGÚN REGLAMENTO</p>
                     </div>
                     <div className="bg-[#3A3A3A] p-8 rounded-[40px] border-2 border-[#8A8A8A]/30">
                        <p className="text-[10px] font-black text-white/50 tracking-widest mb-2">Ajuste Propuesto</p>
                        <p className="text-2xl font-black italic">A VOTACIÓN</p>
                     </div>
                  </div>

                  <div className="bg-white text-[#1A1A1A] p-6 rounded-3xl inline-flex items-center gap-4 shadow-xl">
                    <Gavel size={24} />
                    <span className="text-sm font-black tracking-widest">Sujeto a aprobación por mayoría calificada</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 9: CONSEJO DE ADMINISTRACIÓN */}
          {activeSection === 'eleccion_consejo' && (
            <div className="space-y-10 animate-in slide-in-from-right-10 uppercase">
              <SectionHeader 
                title="9. Nombramiento Consejo de Administración" 
                icon={Users} 
                agendaIndices={[8]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <Card title="Postulaciones al Consejo" icon={UserPlus} highlight>
                <div className="space-y-6">
                  {/* Chips de Postulados */}
                  <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#B65A3A]/20">
                    {postuladosConsejo.length === 0 ? (
                      <p className="text-[9px] text-slate-400 font-black text-center py-2 italic tracking-widest">SELECCIONE CANDIDATOS DE LA LISTA INFERIOR</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {postuladosConsejo.map(p => (
                          <span key={p} className="bg-[#B65A3A] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                            {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={12} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Selector de Asistencia */}
                  <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                    {asistencia.filter(a => a.presente).map(r => (
                      <div key={r.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                        <span className="text-[11px] font-black text-slate-700">UNIDAD {r.unidad} | {r.propietario}</span>
                        <button 
                          onClick={() => togglePostulacion(r.propietario, 'consejo')} 
                          className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all ${
                            postuladosConsejo.includes(r.propietario) ? 'bg-black text-white' : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {postuladosConsejo.includes(r.propietario) ? 'POSTULADO' : 'POSTULAR'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* SECCIÓN 10: ELECCIÓN REVISOR FISCAL */}
          {activeSection === 'eleccion_revisor' && (
            <div className="space-y-12 animate-in zoom-in-95 uppercase">
              <SectionHeader 
                title="10. Elección Revisor Fiscal" 
                icon={Gavel} 
                agendaIndices={[9]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="max-w-4xl mx-auto">
                {/* TARJETA DE ALTO IMPACTO ESTILO HITO PH */}
                <div className="bg-[#B65A3A] rounded-[56px] p-16 text-white text-center shadow-2xl border-b-[20px] border-[#1A1A1A] relative overflow-hidden">
                  
                  {/* DECORACIÓN DE FONDO */}
                  <Gavel size={200} className="absolute -right-10 -bottom-10 text-white/5 -rotate-12 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <ShieldCheck size={80} className="mx-auto mb-8 text-white/40" />
                    
                    <h3 className="text-4xl font-black mb-6 tracking-tighter">REVISORÍA FISCAL 2026</h3>
                    
                    <p className="text-white/70 text-sm font-bold max-w-xl mx-auto mb-12 leading-relaxed">
                      PRESENTACIÓN DE PROPUESTAS Y ELECCIÓN DEL PROFESIONAL PARA LA VIGILANCIA FISCAL, CONTABLE Y TRIBUTARIA DE LA COPROPIEDAD HITO PH.
                    </p>

                    <div className="grid grid-cols-1  gap-6 max-w-2xl mx-auto">
                      {/* OPCIÓN ACTUAL */}
                      <div className="bg-white/10 backdrop-blur-md p-8 rounded-[40px] border-2 border-white/20">
                        <p className="text-[10px] font-black text-white/60 mb-2 tracking-widest uppercase">CANDIDATA ACTUAL</p>
                        <p className="text-xl font-black italic">ROSA ALBA CAMPIÑO</p>
                        <div className="mt-4 inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-[9px] font-black">CONTINUIDAD</div>
                      </div>

                      
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10">
                      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                        <div>
                          <p className="text-[10px] font-black text-white/40 tracking-[0.2em] mb-1 uppercase">Sujeto a votación</p>
                          <p className="text-sm font-black">MAYORÍA SIMPLE (51%)</p>
                        </div>
                        <div className="h-12 w-px bg-white/10 hidden md:block"></div>
                        <div>
                          <p className="text-[10px] font-black text-white/40 tracking-[0.2em] mb-1 uppercase">Vigencia del cargo</p>
                          <p className="text-sm font-black">PERIODO 2026 - 2027</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NOTA ADICIONAL FUERA DE LA TARJETA */}
                <div className="mt-8 text-center">
                  <p className="text-[10px] font-black text-slate-400 tracking-widest flex items-center justify-center gap-2">
                    <Info size={14} /> EL HONORARIO SE AJUSTARÁ SEGÚN LO APROBADO EN EL PRESUPUESTO
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 11: PROPOSICIONES */}
          {activeSection === 'proposiciones' && (
            <div className="space-y-10 animate-in slide-in-from-right-10 uppercase">
              <SectionHeader 
                title="11. Proposiciones y Varios" 
                icon={MessageSquare} 
                agendaIndices={[10]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              {/* PANEL DE REGISTRO INTERACTIVO */}
              <Card title="Registrar Proposición en Vivo" highlight icon={Plus}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  <div className="md:col-span-1 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase italic">UNIDAD / OFICINA</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 border-2 border-[#B65A3A]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#B65A3A] transition-all" 
                      value={tempProp.proponente} 
                      onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} 
                      placeholder="EJ: OF 301" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase italic">DESCRIPCIÓN DE LA PROPUESTA</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-slate-50 border-2 border-[#B65A3A]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#B65A3A] transition-all" 
                      value={tempProp.texto} 
                      onChange={(e) => setTempProp({...tempProp, texto: e.target.value})} 
                      placeholder="ESCRIBA AQUÍ LA MOCIÓN..." 
                    />
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={addProposicion} 
                      className="w-full bg-[#B65A3A] hover:bg-[#1A1A1A] text-white py-4 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-3 uppercase transition-all transform hover:scale-[1.02]"
                    >
                      <Plus size={18} /> AGREGAR AL ACTA
                    </button>
                  </div>
                </div>
              </Card>

              {/* LISTADO DE PROPOSICIONES AGREGADAS */}
              <div className="space-y-6">
                {proposiciones.length === 0 ? (
                  <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[40px]">
                    <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-[10px] font-black text-slate-400 tracking-[0.2em]">NO SE HAN REGISTRADO PROPOSICIONES AÚN</p>
                  </div>
                ) : (
                  proposiciones.map((prop) => (
                    <div 
                      key={prop.id} 
                      className="bg-white p-8 rounded-[32px] border-2 border-[#B65A3A]/5 shadow-xl flex justify-between items-center group animate-in zoom-in-95"
                    >
                      <div className="flex items-start gap-6">
                        <div className="h-14 w-14 bg-[#B65A3A] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shrink-0 group-hover:bg-[#1A1A1A] transition-colors">
                          P
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-black text-[#B65A3A] tracking-tighter">PROPOSICIÓN DE:</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-black text-slate-600">{prop.proponente}</span>
                          </div>
                          <p className="text-sm font-black text-[#1A1A1A] leading-relaxed uppercase italic">
                            "{prop.texto}"
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteProposicion(prop.id)} 
                        className="bg-red-50 text-red-500 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))
                )}
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