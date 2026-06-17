import { useRef, useState, type DragEvent } from 'react';
import type { SlotKey } from '../types';
import { ACCEPTED_IMAGE_TYPES } from '../types';

type DropSlotProps = {
  slotKey: SlotKey;
  label: string;
  imageUrl: string | null;
  active: boolean;
  completed: boolean;
  stepNumber: number;
  onFile: (file: File) => void;
  onClear: () => void;
};

export function DropSlot({
  slotKey,
  label,
  imageUrl,
  active,
  completed,
  stepNumber,
  onFile,
  onClear,
}: DropSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('Use PNG, JPG, or WebP');
      return;
    }
    setError(null);
    onFile(file);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    if (!active && !completed) return;
    handleFile(event.dataTransfer.files[0]);
  };

  const canInteract = active || completed;

  return (
    <div
      className={`drop-slot ${active ? 'drop-slot--active' : ''} ${completed ? 'drop-slot--completed' : ''} ${dragOver ? 'drop-slot--drag-over' : ''}`}
      onDragOver={(event) => {
        event.preventDefault();
        if (canInteract) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => {
        if (canInteract) inputRef.current?.click();
      }}
      role="button"
      tabIndex={canInteract ? 0 : -1}
      aria-label={`${label} screenshot upload`}
      onKeyDown={(event) => {
        if (canInteract && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        hidden
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <span className="drop-slot__step">{stepNumber}</span>
      <span className="drop-slot__label">{label}</span>

      {imageUrl ? (
        <div className="drop-slot__preview">
          <img src={imageUrl} alt={`${label} screenshot`} />
          <button
            type="button"
            className="drop-slot__replace"
            onClick={(event) => {
              event.stopPropagation();
              inputRef.current?.click();
            }}
          >
            Replace
          </button>
          <button
            type="button"
            className="drop-slot__clear"
            onClick={(event) => {
              event.stopPropagation();
              onClear();
            }}
          >
            Clear
          </button>
        </div>
      ) : (
        <p className="drop-slot__hint">
          {active
            ? `Drop ${label} screenshot here`
            : `Upload ${label} after previous step`}
        </p>
      )}

      {error && <p className="drop-slot__error">{error}</p>}
      <span className="drop-slot__key" hidden>
        {slotKey}
      </span>
    </div>
  );
}
