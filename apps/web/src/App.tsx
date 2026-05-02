import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MonitoringDashboard from './pages/MonitoringDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400 max-w-md mx-auto">The synthetic execution grid is currently orchestrating distributed agents and aggregating global performance metrics. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<MonitoringDashboard />} />
          <Route path="/checks" element={<Placeholder name="Check Definition & Scripting Hub" />} />
          <Route path="/results" element={<Placeholder name="Live Results & Trace Explorer" />} />
          <Route path="/correlation" element={<Placeholder name="Incident Correlation & Outage Detection" />} />
          <Route path="/heatmap" element={<Placeholder name="Global Performance Heatmap" />} />
          <Route path="/alerts" element={<Placeholder name="Alert History & Threshold Management" />} />
          <Route path="/agents" element={<Placeholder name="Distributed Agent Grid Management" />} />
          <Route path="/governance" element={<Placeholder name="Observability Governance & Policies" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
