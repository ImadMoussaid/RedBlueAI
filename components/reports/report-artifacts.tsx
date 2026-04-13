import type { ReportArtifact } from '@/lib/reports/types';
import { artifactStatusLabel } from '@/lib/artifacts/paths';

type Props = {
  artifacts: ReportArtifact[];
};

export function ReportArtifacts({ artifacts }: Props) {
  return (
    <section className="card" style={{ padding: 24 }}>
      <div className="page-header" style={{ marginBottom: 18 }}>
        <span className="badge">Artifacts</span>
        <h2>Downloadable outputs and supporting evidence</h2>
        <p>
          The output model stays simple: one polished PDF, one normalized evidence bundle, and worker artifacts that show how the run progressed from queue claim to reporting.
        </p>
      </div>

      <div className="grid three">
        {artifacts.map((artifact) => (
          <article key={artifact.id} className="card" style={{ padding: 18, boxShadow: 'none', background: 'var(--panel-alt)' }}>
            <div className="button-row" style={{ justifyContent: 'space-between' }}>
              <span className="kicker">{artifact.kind}</span>
              <span className="badge">{artifactStatusLabel(artifact.status)}</span>
            </div>
            <h3 style={{ marginTop: 12 }}>{artifact.name}</h3>
            <p>{artifact.summary}</p>
            <p style={{ marginTop: 10 }}><strong>Path:</strong> {artifact.path}</p>
            <p><strong>Size:</strong> {artifact.sizeLabel}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
