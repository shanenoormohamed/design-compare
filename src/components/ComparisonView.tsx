import type { SlotKey } from '../types';
import { SLOT_LABELS, SLOT_ORDER } from '../types';

type ComparisonViewProps = {
  images: Record<SlotKey, string>;
};

export function ComparisonView({ images }: ComparisonViewProps) {
  return (
    <section className="comparison">
      <h2>Comparison</h2>
      <div className="comparison__grid">
        {SLOT_ORDER.map((key) => (
          <figure key={key} className="comparison__item">
            <figcaption>{SLOT_LABELS[key]}</figcaption>
            <img src={images[key]} alt={`${SLOT_LABELS[key]} screenshot`} />
          </figure>
        ))}
      </div>
    </section>
  );
}
