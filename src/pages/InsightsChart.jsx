import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: "rgba(17, 24, 39, 0.95)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      padding: "12px 16px",
      fontSize: "13px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    }}>
      <p style={{ fontWeight: 600, marginBottom: 8, color: "#f1f5f9" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "4px 0" }}>
          {p.name}: {Math.round(p.value)}{p.name === "Calories" ? " kcal" : "g"}
        </p>
      ))}
    </div>
  );
};

const InsightsChart = ({ data, targets }) => {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="day"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#94a3b8" }}
          />
          <ReferenceLine
            y={targets.calories}
            stroke="rgba(245,158,11,0.3)"
            strokeDasharray="5 5"
            label={{ value: "Target", fill: "#f59e0b", fontSize: 11 }}
          />
          <Bar dataKey="calories" name="Calories" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="protein" name="Protein" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="carbs" name="Carbs" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InsightsChart;
