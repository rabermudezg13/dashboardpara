import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Users, TrendingUp, AlertTriangle, CheckCircle, Calendar, UserCheck, UserX, Download, Filter } from 'lucide-react';

const AbsenceDashboard = () => {
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('separate');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Datos basados en la imagen que mostraste
    const dashboardData = {
      teacherData: [
        { absenceReason: "VACANCY", unfilled: 1394, filled: 37597, total: 38991, fillRate: 96.4, category: "Teacher" },
        { absenceReason: "ILLNESS-SELF", unfilled: 3085, filled: 27885, total: 30970, fillRate: 90.0, category: "Teacher" },
        { absenceReason: "TEMPORARY DUTY", unfilled: 777, filled: 23823, total: 24600, fillRate: 96.8, category: "Teacher" },
        { absenceReason: "PERS CHARGE TO SICK", unfilled: 886, filled: 14505, total: 15391, fillRate: 94.2, category: "Teacher" },
        { absenceReason: "ILLNESS/DEATH-OTHER", unfilled: 531, filled: 6469, total: 7000, fillRate: 92.4, category: "Teacher" },
        { absenceReason: "APPROVED LOA", unfilled: 83, filled: 3517, total: 3600, fillRate: 97.7, category: "Teacher" },
        { absenceReason: "IEP MEETING", unfilled: 80, filled: 1744, total: 1824, fillRate: 95.6, category: "Teacher" },
        { absenceReason: "TESTING", unfilled: 83, filled: 1367, total: 1450, fillRate: 94.3, category: "Teacher" },
        { absenceReason: "WORKERS COMP", unfilled: 12, filled: 1363, total: 1375, fillRate: 99.1, category: "Teacher" },
        { absenceReason: "WORKERS COMP RELATED", unfilled: 30, filled: 970, total: 1000, fillRate: 97.0, category: "Teacher" },
        { absenceReason: "ABSENT UNREPORTED", unfilled: 24, filled: 976, total: 1000, fillRate: 97.6, category: "Teacher" },
        { absenceReason: "B.O.-INJURY ONLINE", unfilled: 32, filled: 768, total: 800, fillRate: 96.0, category: "Teacher" },
        { absenceReason: "JURY DUTY", unfilled: 5, filled: 245, total: 250, fillRate: 98.0, category: "Teacher" },
        { absenceReason: "ADMIN/EXAM DAY", unfilled: 8, filled: 242, total: 250, fillRate: 96.8, category: "Teacher" },
        { absenceReason: "MILITARY LEAVE UNDER 30 DAYS", unfilled: 5, filled: 145, total: 150, fillRate: 96.7, category: "Teacher" }
      ],
      paraData: [
        { absenceReason: "VACANCY", unfilled: 441, filled: 19759, total: 20200, fillRate: 97.8, category: "Para" },
        { absenceReason: "ILLNESS-SELF", unfilled: 1050, filled: 13950, total: 15000, fillRate: 93.0, category: "Para" },
        { absenceReason: "TEMPORARY DUTY", unfilled: 300, filled: 11700, total: 12000, fillRate: 97.5, category: "Para" },
        { absenceReason: "PERS CHARGE TO SICK", unfilled: 250, filled: 7750, total: 8000, fillRate: 96.9, category: "Para" },
        { absenceReason: "ILLNESS/DEATH-OTHER", unfilled: 180, filled: 4320, total: 4500, fillRate: 96.0, category: "Para" },
        { absenceReason: "APPROVED LOA", unfilled: 45, filled: 2155, total: 2200, fillRate: 97.9, category: "Para" },
        { absenceReason: "IEP MEETING", unfilled: 40, filled: 960, total: 1000, fillRate: 96.0, category: "Para" },
        { absenceReason: "TESTING", unfilled: 35, filled: 765, total: 800, fillRate: 95.6, category: "Para" },
        { absenceReason: "WORKERS COMP", unfilled: 8, filled: 692, total: 700, fillRate: 98.9, category: "Para" },
        { absenceReason: "WORKERS COMP RELATED", unfilled: 15, filled: 485, total: 500, fillRate: 97.0, category: "Para" },
        { absenceReason: "ABSENT UNREPORTED", unfilled: 12, filled: 488, total: 500, fillRate: 97.6, category: "Para" },
        { absenceReason: "B.O.-INJURY ONLINE", unfilled: 16, filled: 384, total: 400, fillRate: 96.0, category: "Para" },
        { absenceReason: "JURY DUTY", unfilled: 3, filled: 147, total: 150, fillRate: 98.0, category: "Para" },
        { absenceReason: "ADMIN/EXAM DAY", unfilled: 4, filled: 146, total: 150, fillRate: 97.3, category: "Para" },
        { absenceReason: "MILITARY LEAVE UNDER 30 DAYS", unfilled: 2, filled: 98, total: 100, fillRate: 98.0, category: "Para" }
      ],
      summary: {
        totalAbsences: { teacher: 128281, para: 66300 },
        totalUnfilled: { teacher: 7545, para: 2401 },
        overallFillRate: { teacher: 94.1, para: 96.4 }
      }
    };

    setData(dashboardData);
    setLoading(false);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // Combinar datos de ambas categorías para el gráfico principal
  const combinedChartData = data.teacherData.map(teacher => {
    const para = data.paraData.find(p => p.absenceReason === teacher.absenceReason) || 
      { unfilled: 0, filled: 0, total: 0, fillRate: 0 };
    
    const combinedTotal = teacher.total + para.total;
    const combinedFilled = teacher.filled + para.filled;
    const combinedUnfilled = teacher.unfilled + para.unfilled;
    const combinedFillRate = combinedTotal > 0 ? (combinedFilled / combinedTotal) * 100 : 0;
    
    return {
      reason: teacher.absenceReason,
      shortReason: teacher.absenceReason.length > 12 ? 
        teacher.absenceReason.substring(0, 12).replace(/\s+$/, '') : 
        teacher.absenceReason,
      total: combinedTotal,
      filled: combinedFilled,
      unfilled: combinedUnfilled,
      fillRate: combinedFillRate,
      teacherTotal: teacher.total,
      paraTotal: para.total,
      teacherFillRate: teacher.fillRate,
      paraFillRate: para.fillRate
    };
  }).sort((a, b) => b.total - a.total);

  // Top 15 para el gráfico principal
  const top15Data = combinedChartData.slice(0, 15);

  // Datos para las tarjetas de estadísticas
  const totalAbsences = data.summary.totalAbsences.teacher + data.summary.totalAbsences.para;
  const totalUnfilled = data.summary.totalUnfilled.teacher + data.summary.totalUnfilled.para;
  const overallFillRate = ((totalAbsences - totalUnfilled) / totalAbsences) * 100;

  // Key insights
  const keyInsights = [
    {
      percentage: ((top15Data.find(d => d.reason === 'ILLNESS-SELF')?.total || 0) / totalAbsences * 100).toFixed(1),
      text: "of total absences are Illness-Self"
    },
    {
      percentage: ((top15Data.find(d => d.reason === 'PERS CHARGE TO SICK')?.total || 0) / totalAbsences * 100).toFixed(1),
      text: "of total absences are Personal-Charge to sick"
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{`${label}`}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-blue-600 mr-2"></span>
              Teacher Total: {data.teacherTotal.toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-green-600 mr-2"></span>
              Para Total: {data.paraTotal.toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
              Teacher Fill Rate: {data.teacherFillRate.toFixed(1)}%
            </p>
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>
              Para Fill Rate: {data.paraFillRate.toFixed(1)}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header similar al PowerPoint */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Absence Reason Analysis (Top 15)</h1>
              <p className="text-gray-600 text-sm mt-1">Lee County Annual ABR 2024-2025</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => window.print()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-print"
              >
                <Download className="w-4 h-4 mr-2" />
                Print/PDF
              </button>
              <button 
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard.writeText(url);
                  alert('Dashboard link copied to clipboard!');
                }}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors no-print"
              >
                <Download className="w-4 h-4 mr-2" />
                Share Link
              </button>
              <div className="text-right text-sm text-gray-500">
                <div>Kelly Education</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Main Chart - Similar al PowerPoint */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">System-Wide Absence Analysis</h2>
                <p className="text-gray-600 text-sm">Teachers vs Paraprofessionals Comparison</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm rounded bg-green-600 text-white">
                  Teachers vs Paraprofessionals
                </button>
              </div>
            </div>
            
            <div style={{ width: '100%', height: '500px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={top15Data}
                  margin={{ top: 20, right: 80, bottom: 80, left: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="shortReason" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    fontSize={11}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left"
                    fontSize={11}
                    stroke="#6b7280"
                    label={{ value: 'Absences', angle: -90, position: 'insideLeft' }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right"
                    domain={[85, 100]}
                    fontSize={11}
                    stroke="#6b7280"
                    label={{ value: 'Fill Rate %', angle: 90, position: 'insideRight' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    iconType="rect"
                  />
                  
                  {/* Vista Separada - Teachers vs Paras */}
                  <Bar 
                    yAxisId="left" 
                    dataKey="teacherTotal" 
                    fill="#3b82f6" 
                    name="Teacher Total"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar 
                    yAxisId="left" 
                    dataKey="paraTotal" 
                    fill="#10b981" 
                    name="Para Total"
                    radius={[2, 2, 0, 0]}
                  />
                  
                  {/* Líneas - Fill Rates Separados */}
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="teacherFillRate" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                    name="Teacher Fill Rate %"
                    strokeDasharray="5 5"
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="paraFillRate" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    dot={{ fill: '#16a34a', strokeWidth: 2, r: 3 }}
                    name="Para Fill Rate %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Tabla de datos - Solo vista separada */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-2 py-2 text-left font-semibold text-gray-700">Category</th>
                    {top15Data.slice(0, 15).map((item, index) => (
                      <th key={index} className="px-1 py-2 text-center font-semibold text-gray-700 min-w-16">
                        {item.shortReason}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr className="border-b bg-blue-50">
                    <td className="px-2 py-2 text-left font-medium text-gray-700">Teacher Total</td>
                    {top15Data.slice(0, 15).map((item, index) => (
                      <td key={index} className="px-1 py-2 text-gray-900">
                        {item.teacherTotal.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-green-50">
                    <td className="px-2 py-2 text-left font-medium text-gray-700">Para Total</td>
                    {top15Data.slice(0, 15).map((item, index) => (
                      <td key={index} className="px-1 py-2 text-gray-900">
                        {item.paraTotal.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-red-50">
                    <td className="px-2 py-2 text-left font-medium text-gray-700">Teacher Fill Rate %</td>
                    {top15Data.slice(0, 15).map((item, index) => (
                      <td key={index} className="px-1 py-2 text-gray-900 font-medium">
                        {item.teacherFillRate.toFixed(1)}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b bg-green-100">
                    <td className="px-2 py-2 text-left font-medium text-gray-700">Para Fill Rate %</td>
                    {top15Data.slice(0, 15).map((item, index) => (
                      <td key={index} className="px-1 py-2 text-gray-900 font-medium">
                        {item.paraFillRate.toFixed(1)}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Key Insights Panel - Similar al lado derecho del PowerPoint */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Statistics Cards */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {overallFillRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Overall Fill Rate</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {totalAbsences.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Absences</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {totalUnfilled.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Unfilled</div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-gray-800 text-white rounded-lg shadow-sm border p-6">
            <div className="space-y-4">
              {keyInsights.map((insight, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-2xl font-bold text-green-400 mr-3">
                    {insight.percentage}%
                  </div>
                  <div className="text-sm leading-tight">
                    of total absences are {insight.text.split(' ').slice(4).join(' ')}.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Teacher Performance */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <UserCheck className="mr-2 text-blue-600" />
                Teacher Performance Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Absence Reason</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Total</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Fill Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.teacherData.slice(0, 10).map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900 font-medium">
                          {item.absenceReason.length > 20 ? 
                            item.absenceReason.substring(0, 20) + '...' : 
                            item.absenceReason}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-900">
                          {
