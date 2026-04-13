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
        <h2>Downloadable report outputs and evidence bundles</h2>
        <p>
          The MVP keeps the output model simple: one polished PDF report, supporting evidence, and worker
          artifacts stored under a deterministic run path.
        </p>
      </div>

      <div className="grid two">
        {artifacts.map((artifact) => (
          <article key={artifact.id} className="card" style={{ padding: 18, boxShadow: 'none' }}>
            <div className="button-row" style={{ justifyContent: 'space-between' }}>
              <span className="kicker">{artifact.kind}</span>
              <span className="badge">{artifactStatusLabel(artifact.status)}</span>
            </div>
            <h3 style={{ marginTop: 12 }}>{artifact.name}</h3>
            <p>{artifact.path}</p>
            <p>{artifact.sizeLabel}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
