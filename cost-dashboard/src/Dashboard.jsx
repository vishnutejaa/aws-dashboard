import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const RAW = [
  { date: "Feb 06", ECS: 0.0077, VPC: 0.6003, "EC2-Other": 0.312, CloudTrail: 0, RDS: 0.1194, ELB: 0, ElastiCache: 0.095, Config: 0, WAF: 0.0521, KMS: 0.0074, Comprehend: 0, ECR: 0.0004, CloudWatch: 0, SecretsManager: 0.0036, DynamoDB: 0.00006, S3: 0.0006 },
  { date: "Feb 07", ECS: 0.74, VPC: 1.1224, "EC2-Other": 0.4808, CloudTrail: 0.000006, RDS: 0.208, ELB: 0, ElastiCache: 0.171, Config: 0, WAF: 0.087, KMS: 0.0655, Comprehend: 0, ECR: 0.0075, CloudWatch: 0, SecretsManager: 0.0067, DynamoDB: 0.00006, S3: 0.0009 },
  { date: "Feb 08", ECS: 0, VPC: 0, "EC2-Other": 0, CloudTrail: 0, RDS: 0, ELB: 0, ElastiCache: 0, Config: 0, WAF: 0, KMS: 0.0357, Comprehend: 0, ECR: 0, CloudWatch: 0, SecretsManager: 0.00001, DynamoDB: 0.000005, S3: 0.000037 },
  { date: "Feb 09", ECS: 0, VPC: 0, "EC2-Other": 0, CloudTrail: 0, RDS: 0, ELB: 0, ElastiCache: 0, Config: 0, WAF: 0, KMS: 0.0357, Comprehend: 0, ECR: 0, CloudWatch: 0, SecretsManager: 0.00001, DynamoDB: 0, S3: 0.00001 },
  { date: "Feb 10", ECS: 0, VPC: 0, "EC2-Other": 0, CloudTrail: 0, RDS: 0, ELB: 0, ElastiCache: 0, Config: 0, WAF: 0, KMS: 0.0357, Comprehend: 0, ECR: 0, CloudWatch: 0, SecretsManager: 0.00001, DynamoDB: 0, S3: 0.000023 },
  { date: "Feb 11", ECS: 0.2075, VPC: 0.5982, "EC2-Other": 0.263, CloudTrail: 0.000028, RDS: 0.1062, ELB: 0, ElastiCache: 0.095, Config: 0, WAF: 0.0448, KMS: 0.2039, Comprehend: 0, ECR: 0.002, CloudWatch: 0, SecretsManager: 0.0082, DynamoDB: 0.000075, S3: 0.0014 },
  { date: "Feb 12", ECS: 0.3715, VPC: 1.6438, "EC2-Other": 0.6775, CloudTrail: 0.000027, RDS: 0.2945, ELB: 0, ElastiCache: 0.209, Config: 0, WAF: 0.0622, KMS: 0.1488, Comprehend: 0, ECR: 0.0003, CloudWatch: 0, SecretsManager: 0.013, DynamoDB: 0.000077, S3: 0.0023 },
  { date: "Feb 13", ECS: 1.582, VPC: 3.4294, "EC2-Other": 1.3066, CloudTrail: 0.000068, RDS: 0.5844, ELB: 0.405, ElastiCache: 0.437, Config: 0, WAF: 0.2115, KMS: 0.1726, Comprehend: 0, ECR: 0.0678, CloudWatch: 0, SecretsManager: 0.0173, DynamoDB: 0.000131, S3: 0.0041 },
  { date: "Feb 14", ECS: 1.7527, VPC: 3.5763, "EC2-Other": 1.252, CloudTrail: 0.000052, RDS: 0.6019, ELB: 0.648, ElastiCache: 0.456, Config: 0, WAF: 0.25, KMS: 0.1786, Comprehend: 0, ECR: 0.081, CloudWatch: 0, SecretsManager: 0.0202, DynamoDB: 0.000116, S3: 0.0036 },
  { date: "Feb 15", ECS: 2.0629, VPC: 3.5762, "EC2-Other": 1.2553, CloudTrail: 0.000059, RDS: 0.6019, ELB: 0.6483, ElastiCache: 0.456, Config: 0, WAF: 0.25, KMS: 0.1786, Comprehend: 0, ECR: 0.1034, CloudWatch: 0, SecretsManager: 0.0175, DynamoDB: 0.001003, S3: 0.0045 },
  { date: "Feb 16", ECS: 3.0381, VPC: 3.5762, "EC2-Other": 1.2839, CloudTrail: 0.000052, RDS: 0.6019, ELB: 0.6487, ElastiCache: 0.456, Config: 0, WAF: 0.25, KMS: 0.1786, Comprehend: 0, ECR: 0.1012, CloudWatch: 0, SecretsManager: 0.0179, DynamoDB: 0.001262, S3: 0.0038 },
  { date: "Feb 17", ECS: 4.0109, VPC: 3.5765, "EC2-Other": 1.2514, CloudTrail: 0.000006, RDS: 0.6019, ELB: 0.6487, ElastiCache: 0.456, Config: 0, WAF: 0.25, KMS: 0.1786, Comprehend: 0, ECR: 0.0866, CloudWatch: 0, SecretsManager: 0.0236, DynamoDB: 0.000106, S3: 0.0024 },
  { date: "Feb 18", ECS: 5.2853, VPC: 7.0033, "EC2-Other": 2.3157, CloudTrail: 1.0551, RDS: 1.0297, ELB: 1.1613, ElastiCache: 0.76, Config: 0, WAF: 0.4385, KMS: 0.2054, Comprehend: 0, ECR: 0.0911, CloudWatch: 0, SecretsManager: 0.0375, DynamoDB: 0.000135, S3: 0.0057 },
  { date: "Feb 19", ECS: 8.8463, VPC: 8.3043, "EC2-Other": 2.5293, CloudTrail: 1.7692, RDS: 1.2037, ELB: 1.2977, ElastiCache: 0.912, Config: 0, WAF: 0.5, KMS: 0.2143, Comprehend: 0, ECR: 0.122, CloudWatch: 0, SecretsManager: 0.0318, DynamoDB: 0.001297, S3: 0.0072 },
  { date: "Feb 20", ECS: 11.9954, VPC: 8.3045, "EC2-Other": 2.5477, CloudTrail: 1.9162, RDS: 1.2037, ELB: 1.2993, ElastiCache: 0.912, Config: 0, WAF: 0.5, KMS: 0.2143, Comprehend: 0, ECR: 0.1644, CloudWatch: 0, SecretsManager: 0.0355, DynamoDB: 0.001281, S3: 0.0066 },
  { date: "Feb 21", ECS: 7.9099, VPC: 4.6082, "EC2-Other": 2.6506, CloudTrail: 2.1201, RDS: 1.2037, ELB: 1.2981, ElastiCache: 0.912, Config: 0, WAF: 0.4534, KMS: 0.2143, Comprehend: 0, ECR: 0.1793, CloudWatch: 0, SecretsManager: 0.0384, DynamoDB: 0.002610, S3: 0.0071 },
  { date: "Feb 22", ECS: 8.2890, VPC: 4.2722, "EC2-Other": 2.5385, CloudTrail: 1.8615, RDS: 1.2037, ELB: 1.2975, ElastiCache: 0.912, Config: 0, WAF: 0.25, KMS: 0.2143, Comprehend: 0, ECR: 0.186, CloudWatch: 0, SecretsManager: 0.0317, DynamoDB: 0.002216, S3: 0.0064 },
  { date: "Feb 23", ECS: 8.5023, VPC: 4.2722, "EC2-Other": 2.5395, CloudTrail: 1.6962, RDS: 1.2037, ELB: 1.2985, ElastiCache: 0.912, Config: 0, WAF: 0.25, KMS: 0.2143, Comprehend: 0, ECR: 0.1603, CloudWatch: 0, SecretsManager: 0.0329, DynamoDB: 0.000868, S3: 0.0057 },
  { date: "Feb 24", ECS: 8.3714, VPC: 4.2722, "EC2-Other": 2.5123, CloudTrail: 1.41, RDS: 1.2037, ELB: 1.2976, ElastiCache: 0.912, Config: 0, WAF: 0.25, KMS: 0.2146, Comprehend: 0, ECR: 0.1447, CloudWatch: 0, SecretsManager: 0.0294, DynamoDB: 0.001416, S3: 0.0048 },
  { date: "Feb 25", ECS: 8.4734, VPC: 4.2724, "EC2-Other": 2.5662, CloudTrail: 2.1333, RDS: 1.2037, ELB: 1.2979, ElastiCache: 0.912, Config: 0, WAF: 0.25, KMS: 0.2214, Comprehend: 0, ECR: 0.1481, CloudWatch: 0, SecretsManager: 0.037, DynamoDB: 0.016121, S3: 0.0061 },
  { date: "Feb 26", ECS: 11.3804, VPC: 4.2722, "EC2-Other": 2.5451, CloudTrail: 2.1974, RDS: 1.2037, ELB: 1.3055, ElastiCache: 0.912, Config: 0, WAF: 0.25, KMS: 0.22, Comprehend: 0, ECR: 0.1681, CloudWatch: 0.1437, SecretsManager: 0.0333, DynamoDB: 0.024680, S3: 0.0065 },
  { date: "Feb 27", ECS: 14.9299, VPC: 4.2722, "EC2-Other": 2.563, CloudTrail: 4.7615, RDS: 1.7784, ELB: 1.3164, ElastiCache: 0.912, Config: 0.915, WAF: 0.25, KMS: 0.2512, Comprehend: 1.7389, ECR: 0.1752, CloudWatch: 0.15, SecretsManager: 0.0376, DynamoDB: 0.056005, S3: 0.0131 },
  { date: "Feb 28", ECS: 9.5984, VPC: 4.2963, "EC2-Other": 2.5612, CloudTrail: 5.717, RDS: 1.9963, ELB: 1.3141, ElastiCache: 0.912, Config: 2.436, WAF: 0.25, KMS: 0.2611, Comprehend: 2.3575, ECR: 0.1782, CloudWatch: 0.5265, SecretsManager: 0.0365, DynamoDB: 0.038406, S3: 0.0203 },
  { date: "Mar 01", ECS: 8.2892, VPC: 4.8482, "EC2-Other": 2.5573, CloudTrail: 5.9812, RDS: 2.5021, ELB: 1.3157, ElastiCache: 0.912, Config: 2.528, WAF: 0.2258, KMS: 0.2581, Comprehend: 0, ECR: 0.1537, CloudWatch: 0, SecretsManager: 0.0345, DynamoDB: 0.034379, S3: 0.0188 },
  { date: "Mar 02", ECS: 8.2701, VPC: 4.8484, "EC2-Other": 2.5799, CloudTrail: 6.7154, RDS: 2.5021, ELB: 1.3308, ElastiCache: 0.912, Config: 3.446, WAF: 0.2258, KMS: 0.2581, Comprehend: 0, ECR: 0.1533, CloudWatch: 0, SecretsManager: 0.0398, DynamoDB: 0.192171, S3: 0.0231 },
];

const SERVICES = ["ECS", "VPC", "EC2-Other", "CloudTrail", "RDS", "ELB", "ElastiCache", "Config", "WAF", "KMS", "Comprehend", "ECR", "CloudWatch", "SecretsManager", "DynamoDB", "S3"];

const COLORS = {
  ECS: "#FF6B35",
  VPC: "#4ECDC4",
  "EC2-Other": "#F59E0B",
  CloudTrail: "#A78BFA",
  RDS: "#45B7D1",
  ELB: "#34D399",
  ElastiCache: "#60A5FA",
  Config: "#FB7185",
  WAF: "#E879F9",
  KMS: "#FCD34D",
  Comprehend: "#6EE7B7",
  ECR: "#93C5FD",
  CloudWatch: "#C4B5FD",
  SecretsManager: "#FCA5A5",
  DynamoDB: "#6B7280",
  S3: "#D1FAE5",
};

const TOTALS = {
  ECS: 133.91,
  VPC: 89.55,
  "EC2-Other": 41.09,
  CloudTrail: 39.33,
  RDS: 23.16,
  ELB: 19.83,
  ElastiCache: 14.54,
  Config: 9.33,
  WAF: 5.55,
  KMS: 4.38,
  Comprehend: 4.10,
  ECR: 2.47,
  CloudWatch: 0.82,
  SecretsManager: 0.58,
  DynamoDB: 0.37,
  S3: 0.16,
};

const GRAND_TOTAL = 389.17;

const dataWithTotal = RAW.map(d => ({
  ...d,
  Total: parseFloat(SERVICES.reduce((s, k) => s + (d[k] || 0), 0).toFixed(3)),
}));

const pieData = Object.entries(TOTALS)
  .filter(([, v]) => v > 0.5)
  .sort((a, b) => b[1] - a[1])
  .map(([name, value]) => ({ name, value }));

const resolveValue = (v) => {
  if (Array.isArray(v)) return v[1] - v[0];
  return typeof v === "number" ? v : parseFloat(v) || 0;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const entries = payload
    .map(p => ({ name: p.name, color: p.color || p.fill || COLORS[p.name] || "#e2e8f0", val: resolveValue(p.value) }))
    .filter(p => p.val > 0.00001)
    .sort((a, b) => b.val - a.val);
  const dayTotal = entries.reduce((s, p) => s + p.val, 0);
  return (
    <div style={{ background: "#0f1117", border: "1px solid #2a2d3a", borderRadius: 8, padding: "12px 16px", maxHeight: 340, overflowY: "auto", minWidth: 180 }}>
      <div style={{ color: "#a0aec0", marginBottom: 6, fontSize: 11, fontFamily: "monospace" }}>{label}</div>
      {entries.map(p => (
        <div key={p.name} style={{ display: "flex", justifyContent: "space-between", gap: 24, color: p.color, fontSize: 12, marginBottom: 3 }}>
          <span>{p.name}</span>
          <span style={{ fontWeight: 700 }}>${p.val.toFixed(2)}</span>
        </div>
      ))}
      {entries.length > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, color: "#f7fafc", fontSize: 12, marginTop: 8, paddingTop: 8, borderTop: "1px solid #2a2d3a" }}>
          <span>Total</span>
          <span style={{ fontWeight: 700 }}>${dayTotal.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

// Detect anomalies: days where a service is >3x its own average
const averages = {};
SERVICES.forEach(s => {
  const vals = RAW.map(d => d[s] || 0).filter(v => v > 0);
  averages[s] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
});

const anomalies = [];
RAW.forEach(d => {
  SERVICES.forEach(s => {
    if ((d[s] || 0) > averages[s] * 3 && (d[s] || 0) > 1) {
      anomalies.push({ date: d.date, service: s, value: d[s], avg: averages[s] });
    }
  });
});

const TOP_SERVICES = ["ECS", "VPC", "EC2-Other", "CloudTrail", "RDS", "ELB", "ElastiCache", "Config"];

export default function Dashboard() {
  const [activeServices, setActiveServices] = useState(new Set(TOP_SERVICES));
  const [view, setView] = useState("trend");

  const toggle = (s) => setActiveServices(prev => {
    const n = new Set(prev);
    n.has(s) ? n.delete(s) : n.add(s);
    return n;
  });

  return (
    <div style={{ background: "#080b13", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'IBM Plex Mono', 'Courier New', monospace", padding: "32px 28px" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 8, height: 8, background: "#FF6B35", borderRadius: "50%", boxShadow: "0 0 10px #FF6B35" }} />
          <span style={{ color: "#4a5568", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>AWS Cost Intelligence · Daily View · Account B</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "#f7fafc" }}>Feb 6 – Mar 2, 2026</h1>
        <p style={{ margin: "6px 0 0", color: "#718096", fontSize: 13 }}>16 services · 25 active days · ex-tax total</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Total Spend", value: `$${GRAND_TOTAL.toFixed(2)}`, sub: "Feb 6 – Mar 2", accent: "#FF6B35" },
          { label: "Peak Day", value: "Feb 20", sub: "$29.10 — ECS + CloudTrail surge", accent: "#A78BFA" },
          { label: "Fastest Grower", value: "CloudTrail", sub: "$0 → $6.72/day by Mar 2", accent: "#F59E0B" },
          { label: "Comprehend Spike", value: "Feb 27–28", sub: "$1.74 + $2.36 (then $0)", accent: "#6EE7B7" },
        ].map(c => (
          <div key={c.label} style={{ background: "#0f1117", border: `1px solid ${c.accent}22`, borderRadius: 12, padding: "20px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: `${c.accent}10`, borderRadius: "0 12px 0 60px" }} />
            <div style={{ color: "#4a5568", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>{c.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: c.accent, marginBottom: 4 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: "#718096" }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* View toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["trend", "stacked", "breakdown"].map(key => {
          const label = key === "trend" ? "Daily Trend" : key === "stacked" ? "Stacked Bars" : "Service Breakdown";
          return (
            <button key={key} onClick={() => setView(key)} style={{
              background: view === key ? "#1a1e2e" : "transparent",
              border: `1px solid ${view === key ? "#FF6B35" : "#1a1e2e"}`,
              borderRadius: 8, padding: "8px 18px", cursor: "pointer",
              color: view === key ? "#FF6B35" : "#4a5568", fontSize: 12, fontFamily: "inherit", transition: "all 0.2s"
            }}>{label}</button>
          );
        })}
      </div>

      {/* Service Filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {SERVICES.map(s => (
          <button key={s} onClick={() => toggle(s)} style={{
            background: activeServices.has(s) ? `${COLORS[s]}20` : "#0a0c13",
            border: `1px solid ${activeServices.has(s) ? COLORS[s] : "#2a2d3a"}`,
            borderRadius: 6, padding: "4px 10px", cursor: "pointer",
            color: activeServices.has(s) ? COLORS[s] : "#4a5568",
            fontSize: 11, fontFamily: "inherit", transition: "all 0.2s"
          }}>{s}</button>
        ))}
      </div>

      {/* Main Chart */}
      <div style={{ background: "#0f1117", border: "1px solid #1a1e2e", borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>
          {view === "trend" ? "Daily Cost per Service" : view === "stacked" ? "Stacked Daily Spend" : ""}
        </div>
        <ResponsiveContainer width="100%" height={320}>
          {view === "trend" ? (
            <LineChart data={dataWithTotal} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1e2e" />
              <XAxis dataKey="date" tick={{ fill: "#4a5568", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#1a1e2e" }} interval={2} />
              <YAxis tick={{ fill: "#4a5568", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              {SERVICES.filter(s => activeServices.has(s)).map(s => (
                <Line key={s} type="monotone" dataKey={s} stroke={COLORS[s]} strokeWidth={2} dot={false} connectNulls />
              ))}
            </LineChart>
          ) : view === "stacked" ? (
            <BarChart data={dataWithTotal} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1e2e" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "#4a5568", fontSize: 9 }} tickLine={false} axisLine={{ stroke: "#1a1e2e" }} interval={2} />
              <YAxis tick={{ fill: "#4a5568", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              {SERVICES.filter(s => activeServices.has(s)).map(s => (
                <Bar key={s} dataKey={s} stackId="a" fill={COLORS[s]} />
              ))}
            </BarChart>
          ) : (
            <BarChart data={Object.entries(TOTALS).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({name:k,value:v}))} layout="vertical" margin={{ left: 110, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1e2e" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#4a5568", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#a0aec0", fontSize: 11 }} tickLine={false} axisLine={false} width={105} />
              <Tooltip formatter={v => [`$${Number(v).toFixed(2)}`, ""]} contentStyle={{ background: "#0f1117", border: "1px solid #2a2d3a", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {Object.entries(TOTALS).sort((a,b)=>b[1]-a[1]).map(([k]) => <Cell key={k} fill={COLORS[k]} />)}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Bottom: Pie + Anomalies */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Pie */}
        <div style={{ background: "#0f1117", border: "1px solid #1a1e2e", borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>Period Breakdown</div>
          <div style={{ fontSize: 11, color: "#4a5568", marginBottom: 12 }}>% of $389.17 total</div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                  {pieData.map(d => <Cell key={d.name} fill={COLORS[d.name]} />)}
                </Pie>
                <Tooltip formatter={v => [`$${Number(v).toFixed(2)}`, ""]} contentStyle={{ background: "#0f1117", border: "1px solid #2a2d3a", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              {pieData.slice(0, 8).map(d => (
                <div key={d.name} style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 7, height: 7, background: COLORS[d.name], borderRadius: 2 }} />
                    <span style={{ fontSize: 10, color: "#a0aec0" }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: 10, color: COLORS[d.name], fontWeight: 700 }}>{((d.value / GRAND_TOTAL) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Anomalies */}
        <div style={{ background: "#0f1117", border: "1px solid #1a1e2e", borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>Key Observations</div>
          <div style={{ fontSize: 11, color: "#4a5568", marginBottom: 14 }}>Patterns & anomalies to investigate</div>
          {[
            { icon: "📈", title: "ECS ramps then stabilizes", desc: "Grew from $0.008/day (Feb 6) to $15/day (Feb 27). Likely task count scaling. Feb 20 peak ($12) worth investigating for runaway containers.", color: "#FF6B35" },
            { icon: "🌐", title: "VPC spikes Feb 18–20", desc: "Jumped from ~$4/day to $7–8/day for 3 days then dropped back. Matches a data-intensive workload — check NAT Gateway bytes processed.", color: "#4ECDC4" },
            { icon: "🔍", title: "CloudTrail accelerating", desc: "Near $0 early Feb → $6.72/day by Mar 2. Data events likely enabled mid-month. Check S3/Lambda data event logging config.", color: "#A78BFA" },
            { icon: "🧠", title: "Comprehend Feb 27–28 only", desc: "$1.74 + $2.36 billed on consecutive days then $0. Likely a one-off batch NLP job. Confirm this was intentional vs. a misconfigured trigger.", color: "#6EE7B7" },
            { icon: "⚙️", title: "Config billing starts Feb 28", desc: "AWS Config charges ($2.44–$3.45/day) appear only at month-end. New rule set or recorder may have been enabled late February.", color: "#FB7185" },
          ].map(obs => (
            <div key={obs.title} style={{ marginBottom: 13, paddingBottom: 13, borderBottom: "1px solid #1a1e2e" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 13 }}>{obs.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: obs.color }}>{obs.title}</span>
              </div>
              <p style={{ margin: 0, fontSize: 11, color: "#718096", lineHeight: 1.6 }}>{obs.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
