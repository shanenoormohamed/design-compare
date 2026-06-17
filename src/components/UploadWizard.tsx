import { DropSlot } from './DropSlot';
import type { SlotKey } from '../types';
import { SLOT_LABELS, SLOT_ORDER } from '../types';

type UploadWizardProps = {
  images: Record<SlotKey, string | null>;
  onSetImage: (key: SlotKey, file: File) => void;
  onClearImage: (key: SlotKey) => void;
};

export function UploadWizard({
  images,
  onSetImage,
  onClearImage,
}: UploadWizardProps) {
  const currentStep =
    SLOT_ORDER.find((key) => images[key] === null) ?? null;

  return (
    <section className="upload-wizard">
      <h2>Upload screenshots</h2>
      <p className="upload-wizard__subtitle">
        Add in order: Figma, then iOS, then Android
      </p>
      <div className="upload-wizard__slots">
        {SLOT_ORDER.map((key, index) => (
          <DropSlot
            key={key}
            slotKey={key}
            label={SLOT_LABELS[key]}
            imageUrl={images[key]}
            active={currentStep === key}
            completed={images[key] !== null}
            stepNumber={index + 1}
            onFile={(file) => onSetImage(key, file)}
            onClear={() => onClearImage(key)}
          />
        ))}
      </div>
    </section>
  );
}
