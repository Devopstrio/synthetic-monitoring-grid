import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Activity, 
  Globe, 
  Zap, 
  Target,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Server,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Play
} from 'lucide-react';

const uptimeData = [
  { name: '08:00', latency: 120 },
  { name: '09:00', latency: 135 },
  { name: '10:00', latency: 450 },
  { name: '11:00', latency: 125 },
  { name: '12:00', latency: 130 },
  { name: '13:00', latency: 140 },
  { name: '14:00', latency: 128 },
];

const KPI_CARDS = [
  { title: 'Global Uptime', value: '99.98%', trend: '+0.02%', color: 'emerald', icon: CheckCircle2 },
  { title: 'Avg Latency', value: '124ms', trend: '-5ms', color: 'rose', icon: Activity },
  { title: 'Active Checks', value: '1,284', trend: '+12 new', color: 'rose', icon: Target },
  { title: 'Incident Count', value: '2', trend: 'Regional', color: 'rose', icon: AlertTriangle },
];

const MonitoringDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Synthetic Monitoring Grid</h1>
          <p className="text-slate-400">Proactive availability and performance intelligence across distributed regions.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-slate-700">
            View SLA Reports
          </button>
          <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-rose-600/20">
            Run Grid Simulation
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-rose-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-rose-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') && card.title.includes('Uptime') || card.trend.includes('-') && card.title.includes('Latency') ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latency Trend */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Global Latency Trends (ms)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={uptimeData}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="latency" stroke="#f43f5e" fill="url(#colorLatency)" name="Latency (ms)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Health */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Regional Availability</h3>
          <div className="flex-1 space-y-6">
            {[
              { region: 'US East (N. Virginia)', status: 'OPERATIONAL', uptime: 99.99, color: 'text-emerald-400' },
              { region: 'EU West (Ireland)', status: 'DEGRADED', uptime: 98.45, color: 'text-amber-400' },
              { region: 'Asia NE (Tokyo)', status: 'OPERATIONAL', uptime: 99.98, color: 'text-emerald-400' },
              { region: 'US West (Oregon)', status: 'OPERATIONAL', uptime: 100.0, color: 'text-emerald-400' },
            ].map((reg) => (
              <div key={reg.region} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-200">{reg.region}</p>
                  <p className={`text-[10px] font-bold ${reg.color}`}>{reg.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{reg.uptime}%</p>
                  <div className="w-24 h-1 bg-slate-800 rounded-full mt-1">
                    <div className={`h-full ${reg.color.replace('text', 'bg')}`} style={{ width: `${reg.uptime}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex gap-3">
            <AlertTriangle className="text-rose-400 shrink-0" size={18} />
            <p className="text-xs text-slate-400">Incident Detected: High latency spikes observed in <span className="text-rose-400 font-bold">EU West</span> across multiple API health checks.</p>
          </div>
        </div>
      </div>

      {/* Active Checks Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Synthetic Grid Status</h3>
          <button className="text-rose-400 hover:text-rose-300 text-sm font-medium">Configure Grid</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Check ID</th>
                <th className="px-6 py-4 font-semibold">Endpoint</th>
                <th className="px-6 py-4 font-semibold">Avg Latency</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Frequency</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: 'api.auth.health', url: 'auth.api.prod/v1/health', latency: '42ms', status: 'HEALTHY', freq: '60s' },
                { id: 'web.home.load', url: 'app.prod.com/login', latency: '245ms', status: 'SLOW', freq: '30s' },
                { id: 'api.orders.v3', url: 'orders.api.prod/status', latency: '12ms', status: 'HEALTHY', freq: '60s' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.url}</td>
                  <td className="px-6 py-4 text-sm text-slate-200 font-medium">{row.latency}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      row.status === 'HEALTHY' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{row.freq}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-rose-400 transition-all">
                      <Play size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
