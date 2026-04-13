const metrics = [
  { title: 'Pending approvals', value: '03', text: 'Runs waiting for manual review before queueing.' },
  { title: 'Active workers', value: '02', text: 'Worker hosts connected to the central control plane.' },
  { title: 'Actionable fixes', value: '12', text: 'Prioritized remediation items across recent exercises.' }
];

export function DashboardMetrics() {
  return (
    <div className="grid three">
      {metrics.map((metric) => (
        <section key={metric.title} className="card metric">
          <span className="kicker">{metric.title}</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: 8 }}>{metric.value}</h2>
          <p>{metric.text}</p>
        </section>
      ))}
    </div>
  );
}
