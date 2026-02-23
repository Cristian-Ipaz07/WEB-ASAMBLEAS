import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, FileText, BarChart3, CheckSquare, MessageSquare, Home, 
  ShieldCheck, ExternalLink, UserPlus, 
  CheckCircle2, Printer, Trash2, TrendingUp, Settings,
  ClipboardCheck, Camera, Zap, Activity, Wrench, Calendar, Layout, ListChecks,
  AlertCircle, ChevronRight, Info, ShieldAlert, HeartPulse, Building2,
  Search, DollarSign, PieChart, Landmark, Gavel, 
  ArrowUpRight, Percent, Wallet, HardHat, Cog, Plus, UserCheck, Leaf, Scale
} from 'lucide-react';

// --- CONFIGURACIÓN DE IDENTIDAD VISUAL RINCÓN VALLE DE ATRIZ ---
const COLORS = {
  vinotinto: '#8C1D2C',
  negro: '#1F1F1F',
  grisOscuro: '#3A3A3A',
  blanco: '#FFFFFF',
  grisClaro: '#F5F5F5',
  acento: '#8C1D2C'
};

// --- COMPONENTES DE UI ---

const SectionHeader = ({ title, icon: Icon, agendaIndices = [], agendaStatus, toggleAgendaItem }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 pb-6 border-[#8C1D2C]/10 print:hidden">
    <div className="flex items-center gap-4">
      <div className="p-4 bg-[#8C1D2C] rounded-2xl text-white shadow-xl">
        {Icon && <Icon size={32} />}
      </div>
      <div>
        <h2 className="text-4xl font-black text-[#8C1D2C] uppercase tracking-tighter leading-none mb-1">{title}</h2>
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
        : 'bg-white border-[#8C1D2C]/20 text-[#8C1D2C] hover:bg-[#8C1D2C] hover:text-white'
      }`}
    >
      <CheckCircle2 size={20} />
      {agendaIndices.every(idx => agendaStatus[idx]) ? 'PUNTO EVACUADO' : 'MARCAR COMO EVACUADO'}
    </button>
  </div>
);

const Card = ({ children, title, className = "", icon: Icon, badge, highlight = false }) => (
  <div className={`bg-white rounded-[24px] shadow-lg border-2 ${highlight ? 'border-[#8C1D2C] ring-4 ring-[#8C1D2C]/10' : 'border-[#8C1D2C]/5'} p-8 ${className}`}>
    <div className="flex justify-between items-start mb-6">
      {title && <h3 className="text-[13px] font-black text-[#1F1F1F] flex items-center gap-3 uppercase tracking-[0.15em]">
        <div className={`w-2 h-7 ${highlight ? 'bg-[#8C1D2C]' : 'bg-[#3A3A3A]'} rounded-full shrink-0`}></div>
        {Icon && <Icon size={22} className="text-[#8C1D2C]" />}
        {title}
      </h3>}
      {badge && <span className="bg-[#8C1D2C] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{badge}</span>}
    </div>
    {children}
  </div>
);

const ManagementTable = ({ title, headers, data, icon: Icon, total }) => (
  <div className="bg-white rounded-[24px] border-2 border-[#8C1D2C]/10 overflow-hidden shadow-md flex flex-col h-full mb-8">
    <div className="bg-[#8C1D2C] px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {Icon && <Icon className="text-white" size={22} />}
        <h4 className="text-[12px] font-black text-white uppercase tracking-[0.2em]">{title}</h4>
      </div>
      {total && <div className="bg-white text-[#8C1D2C] px-4 py-1.5 rounded-full text-[11px] font-black">{total}</div>}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead className="bg-[#F5F5F5] text-[#1F1F1F] font-black uppercase tracking-widest border-b-2">
          <tr>
            {headers.map((h, i) => <th key={i} className="px-8 py-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#8C1D2C]/5 uppercase font-bold text-[#1F1F1F]">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-[#8C1D2C]/5 transition-colors">
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
  "Registro de firmas y verificación del quórum.",
  "Elección de dignatarios de la Asamblea (presidente, secretario y Comisión verificadora de la presente acta).",
  "Lectura y aprobación del orden del día.",
  "Validación de la comisión verificadora del Acta Anterior.",
  "Informes de gestión de Consejo de Administración y Administración.",
  "Lectura dictamen del Revisor Fiscal.",
  "Presentación y aprobación Estados Financieros a diciembre 31 de 2025.",
  "Presentación y aprobación del proyecto de presupuesto de ingresos y gastos para el año 2026.",
  "Elección del consejo de administración 2026.",
  "Elección Comité de convivencia 2026.",
  "Elección del Revisor Fiscal 2026.",
  "Proposiciones y varios"
];

const COEFICIENTES_DATA = [
  { id: 1, torre: '1', unidad: '101', propietario: 'LILIANA MALO', coeficiente: 1.0732143 },
  { id: 2, torre: '1', unidad: '102', propietario: 'VICKY SAA', coeficiente: 2.2138321 },
  { id: 3, torre: '1', unidad: '103', propietario: 'GLADYS ALICIA GUERRERO', coeficiente: 0.7800486 },
  { id: 4, torre: '1', unidad: '201', propietario: 'SOFIA SANTACRUZ', coeficiente: 1.0493611 },
  { id: 5, torre: '1', unidad: '203', propietario: 'MAURICIO ROSERO', coeficiente: 0.8217917 },
  { id: 6, torre: '1', unidad: '301', propietario: 'NELLY YEPEZ PONCE', coeficiente: 0.9491896 },
  { id: 7, torre: '1', unidad: '302', propietario: 'GLADYS DELGADO', coeficiente: 1.0158100 },
  { id: 8, torre: '1', unidad: '303', propietario: 'ALMA KAISER', coeficiente: 0.8155272 },
  { id: 9, torre: '1', unidad: '401', propietario: 'HERMAN RODRIGUEZ-SEBASTIAN WOOD', coeficiente: 1.0401451 },
  { id: 10, torre: '1', unidad: '402', propietario: 'CARMEN ORTEGA', coeficiente: 1.0289413 },
  { id: 11, torre: '1', unidad: '403', propietario: 'CARMELITA ORTIZ DEL HIERRO', coeficiente: 0.7972759 },
  { id: 12, torre: '1', unidad: '501', propietario: 'TERESA BENAVIDES', coeficiente: 1.0880322 },
  { id: 13, torre: '1', unidad: '502', propietario: 'ALEGRIA LEONOR ROSERO', coeficiente: 1.1260408 },
  { id: 14, torre: '1', unidad: '503', propietario: 'LORENA REALPE', coeficiente: 0.8448017 },
  { id: 15, torre: '1', unidad: '601', propietario: 'ALVARO ARCINIEGAS ALVEAR', coeficiente: 1.1367025 },
  { id: 16, torre: '1', unidad: '602', propietario: 'YOLIMA GUERRERO', coeficiente: 1.0308086 },
  { id: 17, torre: '1', unidad: '603', propietario: 'JAVIER VITERY', coeficiente: 0.8310680 },
  { id: 18, torre: '1', unidad: '701', propietario: 'MAURICIO RENJIFO', coeficiente: 1.8232657 },
  { id: 19, torre: '1', unidad: '702', propietario: 'MARIO VITERY', coeficiente: 1.7606811 },
  { id: 20, torre: '1', unidad: '703', propietario: 'MIRIAM PAREDES AGUIRRE', coeficiente: 1.3301786 },
  { id: 21, torre: '2', unidad: '101', propietario: 'ORLANDO RODRIGUEZ', coeficiente: 1.0539992 },
  { id: 22, torre: '2', unidad: '102', propietario: 'FRNACO SOLARTE', coeficiente: 1.0525536 },
  { id: 23, torre: '2', unidad: '103', propietario: 'LUIS LOPEZ MONTENEGRO', coeficiente: 0.7165002 },
  { id: 24, torre: '2', unidad: '201', propietario: 'JULIAN LARA', coeficiente: 1.1114638 },
  { id: 25, torre: '2', unidad: '202', propietario: 'MINA ALBAN DE CANAL', coeficiente: 1.0628538 },
  { id: 26, torre: '2', unidad: '203', propietario: 'IGNACIO TORRES', coeficiente: 0.7110188 },
  { id: 27, torre: '2', unidad: '301', propietario: 'JORGE EFRAIN ORDOÑEZ', coeficiente: 1.1729642 },
  { id: 28, torre: '2', unidad: '302', propietario: 'LUIS ENRIQUEZ-LEZETH VALDERRAMA', coeficiente: 1.0957424 },
  { id: 29, torre: '2', unidad: '303', propietario: 'JAVIER VICUÑA', coeficiente: 0.8293814 },
  { id: 30, torre: '2', unidad: '401', propietario: 'ULPIANO HINESTROZA', coeficiente: 1.0381573 },
  { id: 31, torre: '2', unidad: '402', propietario: 'SOFIA SANTACRUZ-BRUSPOL', coeficiente: 1.0783343 },
  { id: 32, torre: '2', unidad: '403', propietario: 'MANUEL ENRIQUEZ ROSERO-ROCIO BURBANO', coeficiente: 0.9270230 },
  { id: 33, torre: '2', unidad: '501', propietario: 'CARMEN ELISA CASAS', coeficiente: 1.0627334 },
  { id: 34, torre: '2', unidad: '502', propietario: 'PATRICIA PEÑAFIEL', coeficiente: 1.1092351 },
  { id: 35, torre: '2', unidad: '503', propietario: 'JAIME NUÑEZ', coeficiente: 0.8169127 },
  { id: 36, torre: '2', unidad: '601', propietario: 'JAIME ZAMBRANO-NIDIA DELGADO', coeficiente: 1.0654440 },
  { id: 37, torre: '2', unidad: '602', propietario: 'ELBA DE CORDOBA', coeficiente: 1.0535174 },
  { id: 38, torre: '2', unidad: '603', propietario: 'JORGE MARIO SALAZAR', coeficiente: 0.8846775 },
  { id: 39, torre: '2', unidad: '701', propietario: 'JORGE ALBERTO ROMO', coeficiente: 1.0549028 },
  { id: 40, torre: '2', unidad: '702', propietario: 'OSCAR GUERRERO', coeficiente: 1.0779127 },
  { id: 41, torre: '2', unidad: '703', propietario: 'MAURICIO VELASQUEZ-CITY SONTISAS', coeficiente: 0.8808827 },
  { id: 42, torre: '2', unidad: '801', propietario: 'IGNACIO ARTEAGA', coeficiente: 1.7067704 },
  { id: 43, torre: '2', unidad: '802', propietario: 'PEDRO BASTIDAS', coeficiente: 1.7586331 },
  { id: 44, torre: '2', unidad: '803', propietario: 'ALEJANDRA VILLOTA', coeficiente: 1.2370547 },
  { id: 45, torre: '3', unidad: '101', propietario: 'LUCIA ENRIQUEZ', coeficiente: 0.8905203 },
  { id: 46, torre: '3', unidad: '102', propietario: 'FRANCISCO GUTIERREZ-MARLENE RUBIO', coeficiente: 0.8770276 },
  { id: 47, torre: '3', unidad: '103', propietario: 'WILLIAM VARGAS', coeficiente: 0.7269210 },
  { id: 48, torre: '3', unidad: '201', propietario: 'CONSTANZA CERON', coeficiente: 0.8712450 },
  { id: 49, torre: '3', unidad: '202', propietario: 'JAIME FIGUEROA', coeficiente: 0.8638360 },
  { id: 50, torre: '3', unidad: '203', propietario: 'LILIANA DE LOS RIOS', coeficiente: 0.8573909 },
  { id: 51, torre: '3', unidad: '301', propietario: 'DIEGO VELA', coeficiente: 0.9093740 },
  { id: 52, torre: '3', unidad: '302', propietario: 'EDUARDO ARCINIEGAS', coeficiente: 0.8711848 },
  { id: 53, torre: '3', unidad: '303', propietario: 'TANIA HERRERA ROMO', coeficiente: 0.8476930 },
  { id: 54, torre: '3', unidad: '401', propietario: 'LEONOR GARZON', coeficiente: 0.9123858 },
  { id: 55, torre: '3', unidad: '402', propietario: 'JAIME DAVID', coeficiente: 0.8707631 },
  { id: 56, torre: '3', unidad: '403', propietario: 'JOSE ANTONIO TORRES', coeficiente: 0.8536563 },
  { id: 57, torre: '3', unidad: '501', propietario: 'CARLOS JAVIER VENTIMILLA', coeficiente: 0.9272037 },
  { id: 58, torre: '3', unidad: '502', propietario: 'GLORIA ELVIRA PAREDES', coeficiente: 0.8697993 },
  { id: 59, torre: '3', unidad: '503', propietario: 'LETICIA VALLEJO-ALFONSO ACOSTA', coeficiente: 0.7993842 },
  { id: 60, torre: '3', unidad: '601', propietario: 'CECILIA ACOSTA ERAZO', coeficiente: 0.9099764 },
  { id: 61, torre: '3', unidad: '602', propietario: 'EDUARDO RUBIO', coeficiente: 0.9275049 },
  { id: 62, torre: '3', unidad: '603', propietario: 'LUZ BENAVIDES DE LOPEZ', coeficiente: 0.8657636 },
  { id: 63, torre: '3', unidad: '701', propietario: 'MARIO RUANO', coeficiente: 1.6766527 },
  { id: 64, torre: '3', unidad: '702', propietario: 'EDUARDO MINUCHE', coeficiente: 0.8770276 },
  { id: 65, torre: '3', unidad: '703', propietario: 'JAIRO LOPEZ', coeficiente: 0.8775697 },
  { id: 66, torre: '3', unidad: '802', propietario: 'FRANKLIN FLORES', coeficiente: 0.8596196 },
  { id: 67, torre: '3', unidad: '803', propietario: 'CRISTIANA SUAREZ', coeficiente: 0.8238397 },
  { id: 68, torre: '3', unidad: '901', propietario: 'JUAN DIAZ DEL CASTILLO', coeficiente: 1.5119088 },
  { id: 69, torre: '3', unidad: '902', propietario: 'GEOVANNY LUNA', coeficiente: 1.5096199 },
  { id: 70, torre: '3', unidad: '903', propietario: 'CRISTIAN HAROLF', coeficiente: 1.3848724 },
  { id: 71, torre: '3', unidad: 'E9', propietario: 'KAROL BIVIANA ORDOÑEZ', coeficiente: 0.1239645 },
  { id: 72, torre: '4', unidad: '101', propietario: 'ALEJANDRA GUERRERO', coeficiente: 0.9250955 },
  { id: 73, torre: '4', unidad: '102', propietario: 'MIREYA PASCUAS-LILIANA RIASCOS', coeficiente: 1.1153791 },
  { id: 74, torre: '4', unidad: '103', propietario: 'MARIA DEL CARMEN GARZON', coeficiente: 0.6666855 },
  { id: 75, torre: '4', unidad: '201', propietario: 'GLADIS ORTEGA', coeficiente: 0.8804610 },
  { id: 76, torre: '4', unidad: '202', propietario: 'WILLIAM CERON', coeficiente: 0.9311190 },
  { id: 77, torre: '4', unidad: '203', propietario: 'DIOSECIS DE PASTO', coeficiente: 0.7875178 },
  { id: 78, torre: '4', unidad: '301', propietario: 'MARCELA MAZUERA', coeficiente: 0.8866653 },
  { id: 79, torre: '4', unidad: '302', propietario: 'EMILY SARASTY', coeficiente: 0.9062418 },
  { id: 80, torre: '4', unidad: '303', propietario: 'DIOSECIS DE PASTO', coeficiente: 0.8800996 },
  { id: 81, torre: '4', unidad: '401', propietario: 'CRISTINA CALVACHE', coeficiente: 0.9079886 },
  { id: 82, torre: '4', unidad: '402', propietario: 'MARIO ROJAS', coeficiente: 0.9161204 },
  { id: 83, torre: '4', unidad: '403', propietario: 'DORIS ORTEGA', coeficiente: 0.8743772 },
  { id: 84, torre: '4', unidad: '501', propietario: 'DARIO ERAZO', coeficiente: 0.9270230 },
  { id: 85, torre: '4', unidad: '502', propietario: 'CELINA ZARAMA', coeficiente: 0.9061815 },
  { id: 86, torre: '4', unidad: '503', propietario: 'GABRIELA MAZUERA', coeficiente: 0.8761843 },
  { id: 87, torre: '4', unidad: '601', propietario: 'HAROLD ORTEGA', coeficiente: 0.9102173 },
  { id: 88, torre: '4', unidad: '602', propietario: 'OLGA GARZON DIAZ DEL CASTILLO', coeficiente: 0.9022662 },
  { id: 89, torre: '4', unidad: '603', propietario: 'AURA ROSA ORTIZ BURBANO', coeficiente: 0.8970258 },
  { id: 90, torre: '4', unidad: '701', propietario: 'ALBA INES GOMEZ', coeficiente: 0.9790062 },
  { id: 91, torre: '4', unidad: '702', propietario: 'NELLY RODRIGUEZ', coeficiente: 1.8707914 },
  { id: 92, torre: '4', unidad: '703', propietario: 'GERARDO RESTREPO', coeficiente: 0.9102173 },
  { id: 93, torre: '4', unidad: '801', propietario: 'CARMITA PORTILLA', coeficiente: 0.9102173 },
  { id: 94, torre: '4', unidad: '803', propietario: 'ORLANDO RODRIGUEZ', coeficiente: 0.9430456 },
  { id: 95, torre: '4', unidad: '901', propietario: 'FAVIO VILLOTA', coeficiente: 1.6420173 },
  { id: 96, torre: '4', unidad: '902', propietario: 'RAUL GOMEZ', coeficiente: 1.8076045 },
  { id: 97, torre: '4', unidad: '903', propietario: 'ALICIA DAVILA', coeficiente: 1.3915585 }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  const InvestmentTable = ({ title, headers, data, icon: Icon, total, photos = [] }) => (
    <div className="bg-white rounded-[40px] border-4 border-[#8C1D2C]/10 overflow-hidden shadow-2xl flex flex-col mb-12">
      <div className="bg-[#8C1D2C] px-10 py-7 flex justify-between items-center border-b-[6px] border-[#3A3A3A]">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-white/10 rounded-2xl">
            {Icon && <Icon className="text-white" size={28} />}
          </div>
          <h4 className="text-lg font-black text-white uppercase tracking-[0.2em]">{title}</h4>
        </div>
        
        <div className="flex items-center gap-6">
          {total && (
            <div className="bg-[#3A3A3A] text-white px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-widest shadow-inner">
              {total}
            </div>
          )}
          {photos.length > 0 && (
            <button 
              onClick={() => {}}
              className="flex flex-col items-center gap-1 group transition-all"
            >
              <div className="p-3 bg-white/20 text-white rounded-xl group-hover:bg-white group-hover:text-[#8C1D2C] shadow-lg transition-colors">
                <Camera size={20} />
              </div>
              <span className="text-[8px] font-black text-white uppercase tracking-tighter opacity-80 group-hover:opacity-100">Evidencias</span>
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#F5F5F5] text-[#8C1D2C] font-black uppercase tracking-widest border-b-2">
            <tr>
              {headers.map((h, i) => <th key={i} className="px-10 py-6 text-sm">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-50 uppercase font-bold text-slate-700">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#8C1D2C]/5 transition-colors">
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
    try {
      const saved = localStorage.getItem('asistencia_rincon_2026');
      return saved ? JSON.parse(saved) : COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    } catch (e) {
      return COEFICIENTES_DATA.map(c => ({ ...c, presente: false }));
    }
  });
  
  const [agendaStatus, setAgendaStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('agenda_rincon_2026');
      return saved ? JSON.parse(saved) : new Array(ORDEN_DIA.length).fill(false);
    } catch (e) {
      return new Array(ORDEN_DIA.length).fill(false);
    }
  });

  const [dignatarios, setDignatarios] = useState(() => {
    try {
      const saved = localStorage.getItem('dignatarios_rincon_2026');
      return saved ? JSON.parse(saved) : { presidente: '', secretario: '', comision: '' };
    } catch (e) {
      return { presidente: '', secretario: '', comision: '' };
    }
  });

  const [proposiciones, setProposiciones] = useState(() => {
    try {
      const saved = localStorage.getItem('proposiciones_rincon_2026');
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
      localStorage.setItem('asistencia_rincon_2026', JSON.stringify(asistencia));
      localStorage.setItem('agenda_rincon_2026', JSON.stringify(agendaStatus));
      localStorage.setItem('dignatarios_rincon_2026', JSON.stringify(dignatarios));
      localStorage.setItem('proposiciones_rincon_2026', JSON.stringify(proposiciones));
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
      a.propietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.torre.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="flex min-h-screen bg-[#F5F5F5] font-sans text-[#1F1F1F] print:bg-white overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#1F1F1F] text-white fixed h-full flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-10 text-center bg-[#8C1D2C] border-b-2 border-white/5">
          <div className="flex justify-center mb-6">
             <div className="w-20 h-20 bg-white/10 border-4 border-white/20 flex items-center justify-center rounded-[28px] shadow-lg">
                <Building2 className="text-white" size={40} />
             </div>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tighter leading-none uppercase mb-2">
            RINCÓN <span className="text-[#F5F5F5]/60 block text-sm mt-1">VALLE DE ATRIZ</span>
          </h1>
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Propiedad Horizontal</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'quorum', label: '1. Quórum', icon: Users },
            { id: 'dignatarios', label: '2. Dignatarios', icon: UserPlus },
            { id: 'orden', label: '3. Orden del Día', icon: ListChecks },
            { id: 'acta-anterior', label: '4. Acta Anterior', icon: FileText },
            { id: 'gestion', label: '5. Informe Gestión', icon: TrendingUp },
            { id: 'financiero', label: '6-7. Financiero', icon: BarChart3 },
            { id: 'presupuesto', label: '8. Presupuesto', icon: PieChart },
            { id: 'consejo', label: '9-10. Elecciones', icon: Users },
            { id: 'revisoria', label: '11. Revisoría Fiscal', icon: ShieldCheck },
            { id: 'proposiciones', label: '12. Proposiciones', icon: MessageSquare },
            { id: 'final', label: 'Finalizar Acta', icon: Printer },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest ${
                activeSection === item.id 
                ? 'bg-[#8C1D2C] text-white shadow-xl translate-x-2' 
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
      <main className="ml-80 flex-1 h-screen overflow-y-auto pb-20 print:ml-0 bg-[#F5F5F5]">
        
        {/* HEADER */}
        <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b-2 border-[#8C1D2C]/10 px-12 py-6 flex justify-between items-center shadow-md print:hidden">
          <div className="flex gap-16">
            <div>
              <span className="text-[11px] font-black text-[#1F1F1F] uppercase tracking-widest">Quórum Actual</span>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-4xl font-black tracking-tighter ${totalQuorum >= 50.1 ? 'text-[#8C1D2C]' : 'text-[#1F1F1F]'}`}>
                  {totalQuorum.toFixed(2)}%
                </span>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${totalQuorum >= 50.1 ? 'bg-[#8C1D2C] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {totalQuorum >= 50.1 ? 'VALIDADO' : 'PENDIENTE'}
                </div>
              </div>
            </div>
            
            <div className="border-l-2 pl-12 border-[#8C1D2C]/10">
              <span className="text-[11px] font-black text-[#1F1F1F] uppercase tracking-widest">Progreso de Agenda</span>
              <div className="flex items-center gap-4 mt-2">
                 <div className="h-3 w-48 bg-slate-100 rounded-full overflow-hidden border border-[#8C1D2C]/5 shadow-inner">
                    <div className="h-full bg-[#8C1D2C] transition-all duration-1000 ease-out" style={{width: `${progress}%`}}></div>
                 </div>
                 <span className="text-sm font-black text-[#8C1D2C]">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-right">
            <div>
               <p className="text-[14px] font-black text-[#1F1F1F] uppercase tracking-tight">CONDOMINIO RINCÓN V. ATRIZ</p>
               <p className="text-[11px] text-[#8C1D2C] font-black uppercase tracking-widest">Ana Lucia Yepez | Admin.</p>
            </div>
            <div className="h-14 w-14 bg-[#8C1D2C] rounded-2xl flex items-center justify-center text-white shadow-xl">
               <ShieldCheck size={28} />
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-12 space-y-16 print:p-0">
          
          {/* SECCIÓN INICIO */}
          {activeSection === 'inicio' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#1F1F1F] rounded-[56px] p-24 text-white relative overflow-hidden shadow-2xl border-b-[16px] border-[#8C1D2C]">
                  <div className="relative z-10 text-center">
                     <span className="bg-[#8C1D2C] text-white text-[11px] font-black uppercase px-10 py-4 rounded-full mb-12 inline-block tracking-[0.5em] shadow-xl">Sesión Ordinaria de Copropietarios</span>
                     <h1 className="text-8xl font-black mb-6 leading-none tracking-tighter uppercase">RINCÓN <span className="text-[#8C1D2C] italic block text-4xl mt-4">VALLE DE ATRIZ</span></h1>
                     <div className="w-32 h-2 bg-[#8C1D2C] mx-auto mb-10 rounded-full"></div>
                     <p className="text-white/80 max-w-2xl text-2xl font-bold leading-relaxed mx-auto italic uppercase tracking-[0.1em]">Asamblea General 2026<br/>Gestión 2025 - Proyección 2026</p>
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-32"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase">
                  <Card title="Copropiedad" highlight>
                    <div className="space-y-4 pt-2">
                       <p className="text-[11px] font-black text-[#1F1F1F] uppercase tracking-widest leading-none">NIT: 814.006.315-5</p>
                       <p className="text-lg font-black text-[#1F1F1F]">Calle 19 C N° 40-A-26</p>
                       <p className="text-[10px] font-black text-[#8C1D2C]">San Juan de Pasto</p>
                    </div>
                  </Card>
                  <Card title="Convocatoria">
                    <div className="space-y-3 pt-2 text-[#1F1F1F]">
                       <p className="text-lg font-black">23 de Febrero 2026</p>
                       <p className="text-[11px] font-black text-[#8C1D2C] opacity-80 uppercase">Hora: 7:00 P.M. - Salón Comunal</p>
                    </div>
                  </Card>
                  <Card className="bg-[#8C1D2C] text-white border-none flex flex-col items-center justify-center shadow-2xl !bg-[#8C1D2C]">
                    <div className="text-center">
                      <p className="text-6xl font-black text-white mb-2 leading-none tracking-tighter">
                        {asistencia.length}
                      </p>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90 leading-none">
                        Unidades Residenciales
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
                  <h3 className="text-[#8C1D2C] font-black text-lg uppercase tracking-tighter">Listado de Unidades</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active el switch para registrar presencia</p>
                </div>

                <button 
                  onClick={() => {
                    const todosPresentes = asistencia.every(a => a.presente);
                    setAsistencia(prev => prev.map(a => ({ ...a, presente: !todosPresentes })));
                  }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md hover:scale-105 active:scale-95 border-b-4 ${
                    asistencia.every(a => a.presente)
                    ? 'bg-slate-100 text-[#8C1D2C] border-slate-200' 
                    : 'bg-[#8C1D2C] text-white border-black/20'
                  }`}
                >
                  {asistencia.every(a => a.presente) ? (
                    <> <Trash2 size={16} /> Quitar Todo </>
                  ) : (
                    <> <UserCheck size={16} /> Marcar Todos </>
                  )}
                </button>
              </div>

              <div className="space-y-8 print:hidden">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="relative group w-full max-w-2xl">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-[#8C1D2C] group-focus-within:text-[#8C1D2C] transition-colors" size={24} />
                    <input 
                      type="text" 
                      placeholder="BUSCAR UNIDAD, TORRE O PROPIETARIO..." 
                      className="w-full pl-20 pr-10 py-7 bg-white border-b-4 border-slate-200 focus:border-[#8C1D2C] font-black text-[14px] uppercase tracking-widest outline-none transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-6 bg-white px-10 py-6 rounded-[32px] shadow-sm border border-slate-100">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-[#1F1F1F] uppercase tracking-widest">PRESENTES</p>
                        <p className="text-3xl font-black text-[#8C1D2C]">{asistencia.filter(a => a.presente).length} / {asistencia.length}</p>
                    </div>
                    <Users className="text-[#8C1D2C]" size={40} />
                  </div>
                </div>

                <div className="w-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F5F5F5] text-[#1F1F1F] font-black uppercase tracking-widest text-[11px] border-b-2 border-slate-100">
                      <tr>
                        <th className="px-12 py-8">TORRE / APTO</th>
                        <th className="px-12 py-8">COPROPIETARIO</th>
                        <th className="px-12 py-8 text-center">COEF (%)</th>
                        <th className="px-12 py-8 text-center">ASISTENCIA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 uppercase">
                      {filteredAsistencia.map((item) => (
                        <tr key={item.id} className={`${item.presente ? 'bg-[#8C1D2C]/5' : ''} hover:bg-slate-50 transition-colors`}>
                          <td className="px-12 py-8 font-black text-[#8C1D2C] text-xl">T{item.torre} - {item.unidad}</td>
                          <td className="px-12 py-8 font-black text-[#1F1F1F] text-sm tracking-tight">{item.propietario}</td>
                          <td className="px-12 py-8 font-black text-[#1F1F1F] text-center text-xl">{item.coeficiente.toFixed(4)}%</td>
                          <td className="px-12 py-8 text-center">
                            <button 
                              onClick={() => toggleAsistencia(item.id)} 
                              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${
                                item.presente ? 'bg-[#8C1D2C]' : 'bg-slate-200'
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

          {/* SECCIÓN 2: DIGNATARIOS */}
          {activeSection === 'dignatarios' && (
            <div className="space-y-10 animate-in zoom-in-95 uppercase">
              <SectionHeader 
                title="2. Dignatarios de Asamblea" 
                icon={UserPlus} 
                agendaIndices={[1]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
                  <Card title="Elección de Mesa Directiva" icon={ShieldCheck} highlight>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#1F1F1F] uppercase tracking-widest block">
                          Presidente de Asamblea
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-6 bg-slate-50 border-2 border-[#8C1D2C]/10 rounded-2xl font-black uppercase text-xs focus:border-[#8C1D2C] outline-none shadow-inner" 
                          placeholder="NOMBRE COMPLETO..." 
                          value={dignatarios.presidente} 
                          onChange={(e) => setDignatarios({...dignatarios, presidente: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-[#1F1F1F] uppercase tracking-widest block">
                          Secretario(a)
                        </label>
                        <input 
                          type="text" 
                          className="w-full p-6 bg-slate-50 border-2 border-[#8C1D2C]/10 rounded-2xl font-black uppercase text-xs focus:border-[#8C1D2C] outline-none shadow-inner" 
                          placeholder="NOMBRE COMPLETO..." 
                          value={dignatarios.secretario} 
                          onChange={(e) => setDignatarios({...dignatarios, secretario: e.target.value})} 
                        />
                      </div>
                    </div>
                  </Card>
                  
                  <Card title="Comisión Verificadora del Acta" icon={ClipboardCheck}>
                    <div className="space-y-4 pt-4">
                      <label className="text-[11px] font-black text-[#1F1F1F] uppercase tracking-widest block">
                        Miembros Comisión 2026
                      </label>
                      <textarea 
                        className="w-full p-6 bg-slate-50 border-2 border-[#8C1D2C]/10 rounded-2xl font-black uppercase text-[11px] h-40 focus:border-[#8C1D2C] outline-none leading-loose shadow-inner" 
                        placeholder="INGRESE NOMBRES DE LOS DESIGNADOS..." 
                        value={dignatarios.comision} 
                        onChange={(e) => setDignatarios({...dignatarios, comision: e.target.value})}
                      ></textarea>
                    </div>
                  </Card>
                </div>

                <div className="bg-[#1F1F1F] rounded-[48px] p-12 text-white flex flex-col justify-center text-center shadow-2xl border-b-[12px] border-[#8C1D2C]">
                  <Gavel className="text-white mb-10 mx-auto" size={56} />
                  <h4 className="font-black text-2xl mb-6 uppercase tracking-tighter">Normativa Ley 675</h4>
                  <p className="text-[11px] font-black text-white/60 leading-loose uppercase tracking-[0.2em]">
                    La asamblea decide válidamente con el quórum de ley. Las decisiones obligan a todos los copropietarios.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 3: ORDEN DEL DÍA */}
          {activeSection === 'orden' && (
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="3. Orden del Día" icon={ListChecks} agendaIndices={[2]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card highlight title="Puntos del Orden del Día">
                <div className="space-y-4 pt-6">
                  {ORDEN_DIA.map((punto, idx) => (
                    <div key={idx} className={`p-6 rounded-[28px] border-2 flex items-center gap-6 transition-all ${agendaStatus[idx] ? 'border-[#8C1D2C] bg-[#8C1D2C]/5' : 'border-[#8C1D2C]/10 bg-white shadow-sm'}`}>
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg ${agendaStatus[idx] ? 'bg-[#1F1F1F] text-white' : 'bg-[#8C1D2C] text-white'}`}>
                        {idx + 1}
                      </div>
                      <p className={`text-[12px] font-black uppercase tracking-tight leading-relaxed ${agendaStatus[idx] ? 'text-[#8C1D2C]' : 'text-[#1F1F1F]'}`}>
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
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
                      VALIDACIÓN DE LA COMISIÓN VERIFICADORA DEL TEXTO DEL ACTA DE LA ASAMBLEA GENERAL ORDINARIA ANTERIOR.
                    </p>
                    <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-[#8C1D2C]/20 flex flex-col items-center justify-center text-center">
                        <FileText size={40} className="text-[#8C1D2C] mb-4 opacity-40" />
                        
                        {/* BOTÓN AGREGADO */}
                        <a 
                          href="https://drive.google.com/file/d/1Xlxfs3eMFE_y3Tda6E3DSJqLX_OT1WDJ/view?usp=sharing" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mb-4 inline-flex items-center gap-2 bg-[#8C1D2C] text-white px-6 py-3 rounded-xl font-black text-[10px] hover:bg-[#6d1622] transition-colors shadow-lg shadow-[#8C1D2C]/20"
                        >
                          <FileText size={14} />
                          VER ACTA COMPLETA
                        </a>

                        <p className="text-[9px] font-black text-slate-400">ARCHIVOS SOPORTE DISPONIBLES EN ADMINISTRACIÓN</p>
                    </div>
                  </div>
                </Card>

                <Card title="Observaciones" icon={ClipboardCheck}>
                  <div className="space-y-6 pt-4">
                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                      COMENTARIOS DE LA ASAMBLEA
                    </p>
                    <textarea 
                      className="w-full p-6 bg-slate-50 border-2 border-[#8C1D2C]/10 rounded-2xl font-black uppercase text-[11px] h-32 focus:border-[#8C1D2C] outline-none shadow-inner"
                      placeholder="REGISTRE AQUÍ LAS OBSERVACIONES AL ACTA ANTERIOR..."
                    ></textarea>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECCIÓN 5: INFORME GESTIÓN (ACTUALIZADO CON DOCUMENTO ADMINISTRATIVO) */}
          {activeSection === 'gestion' && (
            <div className="space-y-16 animate-in slide-in-from-bottom-10 uppercase">
              <SectionHeader title="5. Informe Integral de Gestión 2025" icon={TrendingUp} agendaIndices={[4]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />

              {/* GESTIÓN OPERATIVA - SEGURIDAD */}
              <Card title="1. Seguridad y Control de Acceso" icon={ShieldCheck} highlight className="p-10">
                <div className="flex flex-col gap-6 pt-4">
                  <div className="p-8 bg-slate-50 rounded-[40px] border-l-[16px] border-[#8C1D2C] shadow-sm">
                    <p className="text-sm font-black text-[#8C1D2C] mb-3 uppercase tracking-widest">Sistemas de Vigilancia</p>
                    <p className="text-xl font-bold text-slate-800 leading-relaxed tracking-tight">
                      INSTALACIÓN DE CÁMARAS: SE APROBÓ LA CONTRATACIÓN PARA INSTALAR NUEVAS CÁMARAS EN TODO EL PERÍMETRO. SE REEMPLAZARON 9 CÁMARAS Y SE REUBICARON OTRAS PARA MEJORAR RESOLUCIÓN Y COBERTURA. SE ACORDÓ SOLICITAR COTIZACIONES PARA CÁMARAS AL INTERIOR DE ASCENSORES.
                    </p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[40px] border-l-[16px] border-[#3A3A3A] shadow-sm">
                    <p className="text-sm font-black text-[#3A3A3A] mb-3 uppercase tracking-widest">Infraestructura de Acceso</p>
                    <p className="text-xl font-bold text-slate-800 leading-relaxed tracking-tight">
                      MODIFICACIÓN PUERTA TORRE 1: SE CONTRATÓ A LA EMPRESA IMAP PARA CAMBIAR EL SENTIDO DE LA PUERTA VEHICULAR, BUSCANDO QUE SEA CORREDIZA PARA NO AFECTAR EL PASO PEATONAL TRAS UN ACCIDENTE CON UNA RESIDENTE.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-[#8C1D2C]/5 rounded-3xl border-2 border-[#8C1D2C]/10">
                       <p className="text-[10px] font-black text-[#8C1D2C] mb-2">PROYECTOS EN ANÁLISIS</p>
                       <ul className="text-xs font-bold space-y-2 text-slate-600 list-disc pl-4">
                         <li>TALANQUERA DOBLE PARA HORAS PICO.</li>
                         <li>PUERTAS EN PARQUEADEROS PARA RESTRINGIR ACCESO A PISOS.</li>
                         <li>CONTROLES BIOMÉTRICOS DE INGRESO.</li>
                         <li>MAYOR SEGURIDAD EN PUERTA DE BASURAS.</li>
                       </ul>
                    </div>
                    <div className="bg-[#1F1F1F] p-8 rounded-[40px] flex flex-col items-center justify-center text-center text-white">
                        <p className="text-[10px] font-black text-white/40 mb-2">INVERSIÓN PUERTA T1</p>
                        <p className="text-4xl font-black tracking-tighter text-[#8C1D2C]">$16.350.750</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* OBRAS Y MANTENIMIENTO */}
              <Card title="2. Obras, Mantenimiento e Infraestructura" icon={Wrench} className="p-10">
                <div className="flex flex-col gap-6 pt-4">
                  {[
                    { t: "MANTENIMIENTO GENERAL", d: "JARDINERÍA, MANTENIMIENTO DE PLANTA ELÉCTRICA Y CERCA ELÉCTRICA. LABORES DE DESRATIZACIÓN Y FUMIGACIÓN." },
                    { t: "REPARACIONES ESTRUCTURALES", d: "INTERVENCIÓN EN TORRES 3 Y 4 PARA REPARAR HUMEDADES Y FILTRACIONES EN PARQUEADEROS." },
                    { t: "ZONAS DE SERVICIO", d: "MANTENIMIENTO DE PUERTAS DE CUARTOS DE BASURAS Y CAMBIO DE PUERTAS DE BAÑO/BODEGA DEL PERSONAL." },
                    { t: "ENERGÍA SOLAR", d: "ESTUDIO TÉCNICO CON EVOLTI PARA EVALUAR VIABILIDAD DE PANELES SOLARES DE NUEVA GENERACIÓN EN ZONAS COMUNES." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-8 p-8 border-2 border-slate-50 rounded-[40px] bg-white shadow-sm hover:border-[#8C1D2C]/20 transition-all">
                      <div className="h-12 w-12 bg-[#8C1D2C] rounded-2xl flex items-center justify-center text-white shrink-0">
                        <Activity size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#8C1D2C] mb-1">{item.t}</p>
                        <p className="text-sm font-bold text-slate-700 leading-tight tracking-tight">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* GESTIÓN FINANCIERA */}
              <Card title="3. Gestión Financiera y Presupuestal" icon={BarChart3} highlight className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-6">
                    <div className="p-10 bg-[#1F1F1F] rounded-[48px] text-white flex flex-col items-center justify-center text-center shadow-xl">
                      <p className="text-[10px] font-black text-white/40 mb-3 tracking-[0.3em]">EFECTIVO LÍQUIDO (OCT)</p>
                      <p className="text-6xl font-black text-[#8C1D2C] tracking-tighter">$145.000.000</p>
                    </div>
                    <div className="p-8 border-4 border-slate-50 rounded-[40px] flex gap-6 items-center">
                        <div className="p-4 bg-[#8C1D2C]/10 rounded-2xl text-[#8C1D2C]"><Percent size={32}/></div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400">EJECUCIÓN PRESUPUESTAL</p>
                          <p className="text-3xl font-black text-slate-800">76% <span className="text-xs text-slate-400">(A SEP 2025)</span></p>
                        </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-[48px] p-10 flex flex-col justify-center space-y-8">
                     <div className="border-b-2 border-slate-200 pb-6">
                        <p className="text-xs font-black text-[#8C1D2C] mb-2">INVERSIÓN DE EXCEDENTES</p>
                        <p className="text-sm font-bold text-slate-600">MANTENER $50.000.000 PARA OPERACIÓN Y DESTINAR EXCEDENTE A RENTA DIARIA O CDT.</p>
                     </div>
                     <div>
                        <p className="text-xs font-black text-[#8C1D2C] mb-2">RECUPERACIÓN DE CARTERA</p>
                        <p className="text-sm font-bold text-slate-600">CONTRATACIÓN DRA. STEFANIA MUÑOZ. RECOMENDACIÓN DE COBRO JURÍDICO SOBRE CUOTAS EXTRAORDINARIAS.</p>
                     </div>
                  </div>
                </div>
              </Card>

              {/* TABLAS COMPLETAS DEL INFORME */}
              <div className="space-y-12">
                <ManagementTable 
                  title="CUADRO DE GASTOS MENSUALES FIJOS"
                  headers={["PROVEEDOR", "CONCEPTO", "DETALLE DEL GASTO"]}
                  data={[
                    {p: "SEGURIDAD DEL SUR LTDA", c: "Vigilancia", d: "Servicio de vigilancia y seguridad privada mensual."},
                    {p: "ESCOBA MÁGICA SAS", c: "Aseo y Jardinería", d: "Limpieza, zonas verdes y servicios generales."},
                    {p: "MITSUBISHI ELECTRIC", c: "Mantenimiento", d: "Mantenimiento preventivo mensual de ascensores."},
                    {p: "ENERTOTAL SA ESP", c: "Energía Eléctrica", d: "Consumo de energía de áreas comunes."},
                    {p: "EMPOPASTO SA ESP", c: "Acueducto", d: "Servicio de agua y alcantarillado."},
                    {p: "EMAS SA ESP", c: "Aseo Público", d: "Servicio de recolección de residuos."},
                    {p: "COLOMBIANA TELECOMUNICACIONES", c: "Conectividad", d: "Internet y telefonía para administración."},
                    {p: "ANA LUCIA YEPEZ C.", c: "Administración", d: "Honorarios gestión administrativa mensual."},
                    {p: "LUZ JANETH LOPEZ VELA", c: "Contabilidad", d: "Honorarios servicios contables mensuales."},
                    {p: "ALVARO ARCINIEGAS", c: "Revisoría Fiscal", d: "Honorarios revisoría fiscal mensual."},
                    {p: "NELSY ROCIO VELASQUEZ", c: "Cafetería", d: "Servicio mensual de cafetería e insumos."}
                  ].map(item => ({
                    ...item,
                    p: <span className="text-lg font-black text-[#8C1D2C]">{item.p}</span>,
                    c: <span className="text-lg font-bold text-slate-700">{item.c}</span>,
                    d: <span className="text-base font-medium text-slate-500 italic">{item.d}</span>
                  }))}
                  icon={Activity}
                />

                <div className="flex flex-col gap-12">
                  <InvestmentTable 
                    title="MANTENIMIENTO Y REPARACIONES LOCATIVAS"
                    headers={["PROVEEDOR", "OBRA REALIZADA", "DETALLE"]}
                    icon={Wrench}
                    data={[
                      {p: "BELLAVISTA JT SAS", o: "Cubiertas/Techos", d: "Inspección, ajuste de láminas y siliconado de tornillos."},
                      {p: "BELLAVISTA JT SAS", o: "Limpieza Fachada", d: "Alquiler de hidrolavadora y reparaciones varias."},
                      {p: "JUAN IGNACIO DIAZ", o: "Humedades", d: "Reparación de daños causados por humedad."},
                      {p: "OSCAR MALES", o: "Cerrajería", d: "Arreglo de puerta y soldadura puerta doble hoja."},
                      {p: "LUIS HERNANDO VILLOTA", o: "Citofonía", d: "Arreglo y mantenimiento de citófonos."},
                      {p: "ANDRES GUERRERO", o: "Señalética", d: "Instalación de placas PVC vinilo con remaches."}
                    ]}
                  />

                  <InvestmentTable 
                    title="SUMINISTROS, EQUIPOS E INSUMOS"
                    headers={["PROVEEDOR", "CATEGORÍA", "DETALLE"]}
                    icon={Cog}
                    data={[
                      {p: "ADRIANA BARRERA", o: "Aseo", d: "Compra de suministros y productos de limpieza."},
                      {p: "LUIS HUMBERTO BARRERA", o: "Eléctrico", d: "Suministros eléctricos (FE 1056 y 1067)."},
                      {p: "PEDRO NEL SALAS", o: "Dotación", d: "Suministro de 4 tapetes de caucho para ascensores."},
                      {p: "WILSON ANDRES GUACHA", o: "Combustibles", d: "Gasolina y ACPM para maquinaria."},
                      {p: "NELSON JAIRO GUERRERO", o: "Jardinería", d: "Compra de manguera con regadera e insumos."},
                      {p: "ANA LUCIA YEPEZ", o: "Dotación", d: "Compra de 2 termos para el servicio."},
                      {p: "DISTRIBUIDORA DE ACABADOS", o: "Ferretería", d: "Materiales de acabados (Facturas pendientes)."}
                    ]}
                  />

                  <InvestmentTable 
                    title="GASTOS LEGALES, SEGUROS Y ADMINISTRATIVOS"
                    headers={["PROVEEDOR", "CATEGORÍA", "DETALLE"]}
                    icon={Scale}
                    data={[
                      {p: "LA EQUIDAD SEGUROS", o: "Seguros", d: "Pago de cuotas de la póliza de áreas comunes."},
                      {p: "CLAUDIA ARCINIEGAS TORRES", o: "Jurídico", d: "Honorarios por asesoría y gestiones jurídicas."},
                      {p: "DIAN", o: "Impuestos", d: "Pagos de Retención en la Fuente e IVA."},
                      {p: "KUMARA SEG Y SALUD", o: "SGSST", d: "Acompañamiento implementación Salud y Seguridad."},
                      {p: "JESUS ARNULFO CORDOBA", o: "Sistemas", d: "Mantenimiento físico y lógico de equipos."},
                      {p: "COLOMBIANA DE COMERCIO", o: "Asamblea", d: "Refrigerios para Asamblea de Copropietarios."}
                    ]}
                  />
                </div>
              </div>

              {/* CAJA MENOR */}
              <Card title="Listado de Gastos de Caja Menor" icon={Wallet} className="p-12">
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm uppercase">
                      <thead className="bg-[#F5F5F5] text-[#8C1D2C] font-black border-b-2">
                        <tr>
                           <th className="px-6 py-4">PROVEEDOR</th>
                           <th className="px-6 py-4">CONCEPTO</th>
                           <th className="px-6 py-4">DETALLE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-bold text-slate-600">
                        {[
                          {p: "LA CALI", c: "Papelería", d: "Micropunta y marcador Sharpie"},
                          {p: "DORALINE M. BRAVO", c: "Servicios", d: "Creación de base de datos residentes"},
                          {p: "SUPERMERCADOS ANDI", c: "Alimentación", d: "Sándwich de pollo"},
                          {p: "SU FERRETERIA PANDIACO", c: "Ferretería", d: "Pulsador y duplicado de llave"},
                          {p: "ALCALDÍA DE PASTO", c: "Impuestos", d: "Rete ICA Bimestre 6 - 2024"},
                          {p: "ALFONSO J. BENITEZ", c: "Legal", d: "Gastos de autenticación"},
                          {p: "ALSACIA SLS SAS", c: "Alimentación", d: "11 Sándwiches"},
                          {p: "SU FERRETERIA PANDIACO", c: "Ferretería", d: "Chapa alcoba metal / Pistola calafateadora"},
                          {p: "ALCALDÍA DE PASTO", c: "Legal", d: "Certificación representación legal"},
                          {p: "KETHY ALEXANDRA NIETO", c: "Insumos", d: "Compra de brocha profesional"}
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-6 py-4 text-[#8C1D2C]">{row.p}</td>
                            <td className="px-6 py-4">{row.c}</td>
                            <td className="px-6 py-4 italic font-medium">{row.d}</td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </Card>

              {/* SEGUROS (ACTUALIZADO CON CIFRAS REALES) */}
              <div className="space-y-12 mt-20">
                <div className="bg-[#8C1D2C] p-16 rounded-[60px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
                  <div className="z-10 text-center md:text-left">
                    <h3 className="text-6xl font-black uppercase tracking-tighter mb-4">Póliza de Copropiedad</h3>
                    <p className="text-white/80 font-bold text-2xl uppercase tracking-[0.2em]">La Equidad Seguros (AA006031) | 2025 - 2026</p>
                  </div>
                  <ShieldCheck size={120} className="text-white opacity-20 absolute right-12" />
                </div>

                <div className="flex flex-col gap-10">
                  <Card title="Valores Asegurados Totales" icon={ShieldCheck} badge="Vigente" highlight className="p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                      <div className="p-10 bg-slate-50 rounded-[48px] border-4 border-[#8C1D2C]/10 flex flex-col items-center justify-center shadow-inner">
                        <p className="text-base font-black text-slate-500 uppercase mb-3 tracking-widest">V. Asegurado Total</p>
                        <p className="text-6xl font-black text-[#8C1D2C] tracking-tighter">$44.825.000.000</p>
                      </div>
                      <div className="p-10 bg-slate-50 rounded-[48px] border-4 border-[#8C1D2C]/10 flex flex-col items-center justify-center shadow-inner">
                        <p className="text-base font-black text-slate-500 uppercase mb-3 tracking-widest">Prima Total Anual</p>
                        <p className="text-6xl font-black text-[#1F1F1F] tracking-tighter">$48.633.078</p>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto rounded-[40px] border-4 border-slate-50 shadow-sm">
                      <table className="w-full text-left uppercase">
                        <tbody className="divide-y-4 divide-white">
                          <tr className="bg-slate-50">
                            <td className="px-12 py-8 text-xl font-black text-slate-600">EDIFICIO (ÁREAS COMUNES)</td>
                            <td className="px-12 py-8 text-4xl font-black text-[#8C1D2C] text-right">$42.000.000.000</td>
                          </tr>
                          <tr>
                            <td className="px-12 py-8 text-xl font-black text-slate-600">RC EXTRACONTRACTUAL</td>
                            <td className="px-12 py-8 text-4xl font-black text-[#8C1D2C] text-right">$500.000.000</td>
                          </tr>
                          <tr className="bg-slate-50">
                            <td className="px-12 py-8 text-xl font-black text-slate-600">ROTURA DE MAQUINARIA</td>
                            <td className="px-12 py-8 text-4xl font-black text-[#8C1D2C] text-right">$795.000.000</td>
                          </tr>
                          <tr>
                            <td className="px-12 py-8 text-xl font-black text-slate-600">DIRECTORES Y ADMIN (D&O)</td>
                            <td className="px-12 py-8 text-4xl font-black text-[#8C1D2C] text-right">$200.000.000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              </div>

              {/* CONVIVENCIA Y NORMATIVA */}
              <div className="space-y-12 mt-20">
                <Card title="4. Convivencia y Normativas Internas" icon={Activity} highlight className="p-12">
                  <div className="flex flex-col gap-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-slate-50 rounded-[40px] border-l-[12px] border-[#8C1D2C]">
                           <p className="text-xs font-black text-[#8C1D2C] mb-2 uppercase">OBRAS PRIVADAS</p>
                           <p className="text-sm font-bold text-slate-700 uppercase">LÍMITE NOV 2025 PARA INTERVENCIONES ESTRUCTURALES EN APTO 1-602. SUSPENSIÓN DE TODA ACTIVIDAD DE OBRA EN DICIEMBRE.</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[40px] border-l-[12px] border-[#3A3A3A]">
                           <p className="text-xs font-black text-[#3A3A3A] mb-2 uppercase">ZONAS COMUNES</p>
                           <p className="text-sm font-bold text-slate-700 uppercase">NO ES PROCEDENTE LA COMERCIALIZACIÓN DE PRODUCTOS PARTICULARES POR COLABORADORES EN ÁREAS COMUNES.</p>
                        </div>
                     </div>
                     <div className="bg-[#1F1F1F] p-10 rounded-[48px] text-white">
                        <div className="flex items-center gap-6 mb-6">
                           <UserPlus size={40} className="text-[#8C1D2C]" />
                           <h4 className="text-2xl font-black uppercase tracking-tighter">CONSEJO DE ADMINISTRACIÓN VIGENTE</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-8 uppercase">
                           <div>
                              <p className="text-[10px] text-white/40 mb-1">PRESIDENTE DEL CONSEJO</p>
                              <p className="text-xl font-black">SR. MARIO ROJAS</p>
                           </div>
                           <div>
                              <p className="text-[10px] text-white/40 mb-1">PRESIDENTE SUPLENTE</p>
                              <p className="text-xl font-black">DR. JUAN CARLOS NARVAEZ</p>
                           </div>
                        </div>
                     </div>
                  </div>
                </Card>
              </div>

            </div>
          )}
          
          {/* SECCIÓN 6-7: FINANCIERO */}
          {activeSection === 'financiero' && (
            <div className="space-y-10 animate-in fade-in">
              <SectionHeader title="6-7. Informe Financiero 2025" icon={BarChart3} agendaIndices={[5, 6]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              
              <div className="max-w-5xl mx-auto uppercase">
                <div className="bg-white rounded-[60px] p-16 shadow-2xl border-4 border-[#8C1D2C]/10 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5"><BarChart3 size={200} className="text-[#8C1D2C]" /></div>
                  <div className="p-8 bg-[#8C1D2C]/5 rounded-[40px] mb-10 border-2 border-[#8C1D2C]/10">
                    <ShieldCheck size={80} className="text-[#8C1D2C]" />
                  </div>
                  <h3 className="text-4xl font-black text-[#8C1D2C] mb-6 tracking-tighter">DICTAMEN & ESTADOS FINANCIEROS</h3>
                  <div className="w-24 h-2 bg-[#1F1F1F] mb-10 rounded-full"></div>
                  <div className="space-y-4">
                    <p className="text-[14px] font-black text-[#1F1F1F] tracking-[0.4em]">Presentación por:</p>
                    <p className="text-3xl font-black text-[#1F1F1F] tracking-tight">LUZ JANETH LÓPEZ VELA - CONTADORA</p>
                    <p className="text-xl font-bold text-slate-400 mt-4 tracking-widest">CIERRE A DICIEMBRE 31 DE 2025</p>
                  </div>
                  <div className="mt-16 bg-[#F5F5F5] p-10 rounded-[40px] w-full max-w-xl">
                      <p className="text-xs font-black leading-relaxed">Presentación bajo normas NIIF vigentes para copropiedades del Grupo 3.</p>
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
                <div className="bg-[#1F1F1F] rounded-[60px] p-16 shadow-2xl border-b-[20px] border-[#8C1D2C] flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 p-12 opacity-10"><Wallet size={250} className="text-white" /></div>
                  <div className="p-8 bg-white/10 rounded-[40px] mb-10 border-2 border-white/20 backdrop-blur-md">
                    <Landmark size={80} className="text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">PRESUPUESTO VIGENCIA 2026</h3>
                  <div className="w-24 h-2 bg-[#8C1D2C] mb-10 rounded-full"></div>
                  <div className="space-y-4">
                    <p className="text-[14px] font-black text-white/60 tracking-[0.4em]">Propuesta de Ejecución:</p>
                    <p className="text-lg font-black text-white tracking-widest max-w-xl">DEFINICIÓN DE CUOTAS DE ADMINISTRACIÓN Y FONDO DE IMPREVISTOS.</p>
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
                    <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#8C1D2C]/20">
                      {postuladosConsejo.length === 0 ? (
                        <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS POSTULADOS</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {postuladosConsejo.map(p => (
                            <span key={p} className="bg-[#8C1D2C] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'consejo')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                          <span className="text-[11px] font-black text-slate-700">T{r.torre}-{r.unidad} | {r.propietario}</span>
                          <button 
                            onClick={() => togglePostulacion(r.propietario, 'consejo')} 
                            className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all ${
                              postuladosConsejo.includes(r.propietario) ? 'bg-[#1F1F1F] text-white' : 'bg-slate-100 text-slate-400'
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
                    <div className="min-h-[60px] p-4 bg-slate-50 rounded-[24px] border-2 border-dashed border-[#8C1D2C]/20">
                      {postuladosConvivencia.length === 0 ? (
                        <p className="text-[9px] text-slate-400 font-black text-center py-2">SIN CANDIDATOS POSTULADOS</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {postuladosConvivencia.map(p => (
                            <span key={p} className="bg-[#1F1F1F] text-white px-3 py-1.5 rounded-lg text-[9px] font-black flex items-center gap-2">
                              {p} <button onClick={() => togglePostulacion(p, 'convivencia')}><Trash2 size={12} /></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {asistencia.filter(a => a.presente).map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                          <span className="text-[11px] font-black text-slate-700">T{r.torre}-{r.unidad} | {r.propietario}</span>
                          <button 
                            onClick={() => togglePostulacion(r.propietario, 'convivencia')} 
                            className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all ${
                              postuladosConvivencia.includes(r.propietario) ? 'bg-[#8C1D2C] text-white' : 'bg-slate-100 text-slate-400'
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

          {/* SECCIÓN 11: REVISORÍA FISCAL */}
          {activeSection === 'revisoria' && (
            <div className="space-y-12 animate-in zoom-in-95 uppercase">
              <SectionHeader 
                title="11. Elección Revisor Fiscal" 
                icon={Gavel} 
                agendaIndices={[10]} 
                agendaStatus={agendaStatus} 
                toggleAgendaItem={toggleAgendaItem} 
              />

              <div className="max-w-4xl mx-auto">
                <div className="bg-[#8C1D2C] rounded-[56px] p-16 text-white text-center shadow-2xl border-b-[20px] border-[#1F1F1F] relative overflow-hidden">
                  <div className="relative z-10">
                    <ShieldCheck size={80} className="mx-auto mb-8 text-white/40" />
                    <h3 className="text-4xl font-black mb-6 tracking-tighter">REVISORÍA FISCAL 2026</h3>
                    <p className="text-white/70 text-sm font-bold max-w-xl mx-auto mb-12 leading-relaxed">
                      PRESENTACIÓN DE PROPUESTAS Y ELECCIÓN DEL PROFESIONAL PARA LA VIGILANCIA FISCAL DE LA COPROPIEDAD.
                    </p>
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-[40px] border-2 border-white/20">
                        <p className="text-[10px] font-black text-white/60 mb-2 tracking-widest">Sujeto a votación</p>
                        <p className="text-2xl font-black italic">POSTULACIONES ABIERTAS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 12: PROPOSICIONES */}
          {activeSection === 'proposiciones' && (
            <div className="space-y-10 animate-in slide-in-from-right-10 uppercase">
              <SectionHeader title="12. Proposiciones y Varios" icon={MessageSquare} agendaIndices={[11]} agendaStatus={agendaStatus} toggleAgendaItem={toggleAgendaItem} />
              <Card title="Registrar Proposición" highlight>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  <div className="md:col-span-1 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase">UNIDAD / APTO</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#8C1D2C]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#8C1D2C]" value={tempProp.proponente} onChange={(e) => setTempProp({...tempProp, proponente: e.target.value})} placeholder="EJ: 301" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[11px] font-black text-slate-400 tracking-widest uppercase">DESCRIPCIÓN</label>
                    <input type="text" className="w-full p-4 bg-slate-50 border-2 border-[#8C1D2C]/10 rounded-2xl font-black uppercase text-xs outline-none focus:border-[#8C1D2C]" value={tempProp.texto} onChange={(e) => setTempProp({...tempProp, texto: e.target.value})} placeholder="INGRESE LA PROPUESTA..." />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addProposicion} className="w-full bg-[#8C1D2C] text-white py-4 rounded-2xl font-black text-xs shadow-lg flex items-center justify-center gap-3 uppercase"><Plus size={18} /> AGREGAR</button>
                  </div>
                </div>
              </Card>
              <div className="space-y-6">
                {proposiciones.map((prop) => (
                    <div key={prop.id} className="bg-white p-8 rounded-[32px] border-2 border-[#8C1D2C]/5 shadow-lg flex justify-between items-center group">
                       <div className="flex items-start gap-6">
                          <div className="h-14 w-14 bg-[#8C1D2C] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shrink-0 group-hover:bg-[#1F1F1F] transition-colors">P</div>
                          <div>
                             <p className="text-[10px] font-black text-[#8C1D2C] mb-1">PROPOSICIÓN DE: {prop.proponente}</p>
                             <p className="text-sm font-black text-[#1F1F1F] leading-relaxed uppercase">{prop.texto}</p>
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
              <div className="flex justify-between items-center print:hidden bg-[#1F1F1F] p-10 rounded-[40px] shadow-2xl">
                <div className="text-left text-white">
                  <h2 className="text-3xl font-black tracking-tighter mb-2">FINALIZAR ASAMBLEA 2026</h2>
                  <p className="text-white/60 font-black text-[10px] tracking-[0.3em]">GENERE EL ACTA OFICIAL DEL CONDOMINIO RINCÓN VALLE DE ATRIZ</p>
                </div>
                <button onClick={handlePrint} className="bg-[#8C1D2C] text-white px-12 py-6 rounded-[24px] font-black flex items-center gap-5 shadow-2xl hover:scale-110 transition-all text-xs tracking-[0.2em]">
                  <Printer size={24} /> IMPRIMIR ACTA FINAL
                </button>
              </div>

              <Card className="p-24 border-t-[24px] border-[#8C1D2C] print:shadow-none print:border-none print:p-0 bg-white">
                <div className="hidden print:block text-center mb-20 border-b-8 border-[#8C1D2C] pb-10">
                  <h1 className="text-4xl font-black mb-4 uppercase">ACTA ASAMBLEA GENERAL ORDINARIA 2026</h1>
                  <p className="text-xl font-black text-[#8C1D2C] uppercase">CONDOMINIO RINCÓN VALLE DE ATRIZ - NIT 814.006.315-5</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
                  <div className="p-12 bg-slate-50 rounded-[56px] border-2 border-[#8C1D2C]/10 flex flex-col items-center">
                    <p className="text-[11px] font-black text-[#1F1F1F] mb-10 tracking-[0.3em]">Quórum de Cierre</p>
                    <p className="text-7xl font-black text-[#8C1D2C] leading-none">{totalQuorum.toFixed(2)}%</p>
                  </div>
                  <div className="space-y-10 py-6 text-left">
                    <p className="text-[11px] font-black text-[#1F1F1F] tracking-[0.3em] uppercase leading-none mb-12">Mesa Directiva</p>
                    <div className="text-[12px] font-black space-y-10">
                       <div className="border-b-4 border-[#8C1D2C]/10 pb-4">
                          <p className="text-[9px] text-[#8C1D2C] mb-2 font-black">PRESIDENTE:</p>
                          <p className="text-lg text-[#1F1F1F]">{dignatarios.presidente || '___________________________'}</p>
                       </div>
                       <div className="border-b-4 border-[#8C1D2C]/10 pb-4">
                          <p className="text-[9px] text-[#8C1D2C] mb-2 font-black">SECRETARIO(A):</p>
                          <p className="text-lg text-[#1F1F1F]">{dignatarios.secretario || '___________________________'}</p>
                       </div>
                    </div>
                  </div>
                  <div className="p-12 bg-[#8C1D2C] rounded-[56px] text-white flex flex-col items-center justify-center shadow-2xl border-b-[16px] border-[#1F1F1F]">
                    <ShieldCheck size={72} className="text-white mb-10 opacity-50" />
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] opacity-60">Sesión Finalizada</p>
                    <p className="text-xl font-black mt-4">PASTO, FEBRERO 2026</p>
                  </div>
                </div>
                <div className="hidden print:grid grid-cols-2 gap-64 mt-64 mb-32">
                  <div className="border-t-4 border-[#1F1F1F] pt-8 text-center uppercase">
                    <p className="text-[11px] font-black leading-loose">FIRMA PRESIDENTE</p>
                  </div>
                  <div className="border-t-4 border-[#1F1F1F] pt-8 text-center uppercase">
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
        
        body { font-family: 'Inter', sans-serif; background-color: #F5F5F5; }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #8C1D2C33; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #8C1D2C55; }

        @media print {
          @page { margin: 1cm; size: letter; }
          html, body { background: white !important; font-size: 10pt !important; color: black !important; }
          aside, header, .print\\:hidden, button, input, textarea { display: none !important; }
          main { margin-left: 0 !important; width: 100% !important; padding: 0 !important; }
          .max-w-6xl { max-width: 100% !important; width: 100% !important; margin: 0 !important; }
          .Card { break-inside: avoid !important; border: 1px solid #000 !important; border-radius: 10px !important; box-shadow: none !important; margin-bottom: 20px !important; }
          table { border-collapse: collapse !important; width: 100% !important; border: 1px solid #000 !important; font-size: 9pt !important; }
          th { background: #8C1D2C !important; color: white !important; -webkit-print-color-adjust: exact; padding: 8px !important; border: 1px solid #000 !important; }
          td { border: 1px solid #000 !important; padding: 8px !important; }
        }
      `}} />
    </div> 
  );
}