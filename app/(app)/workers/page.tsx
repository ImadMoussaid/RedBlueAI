import { workerNodes } from '@/lib/data/control-plane';

export default function WorkersPage() {
  return (
    <div className="grid">
      <header className="page-header">
        <span className="badge">Worker fleet</span>
        <h1>Monitor distributed workers from the central control plane.</h1>
        <p>
          This page supports issue #7 by making multi-host worker capacity, model allocation, and current job
          assignment visible to the operator.
        </p>
      </header>

      <section className="grid three">
        {workerNodes.map((worker) => (
          <article key={worker.hostLabel} className="card metric">
            <span className="kicker">{worker.hostLabel}</span>
            <h2>{worker.status}</h2>
            <p>{worker.capacity}</p>
            <p>Current job: {worker.currentJob}</p>
            <p>Model: {worker.model}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
