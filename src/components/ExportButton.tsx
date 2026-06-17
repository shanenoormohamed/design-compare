import { useState } from 'react';
import { exportComparisonPdf } from '../lib/pdfExport';
import type { SlotKey } from '../types';

type ExportButtonProps = {
  images: Record<SlotKey, string>;
  notes: string;
  disabled: boolean;
};

export function ExportButton({ images, notes, disabled }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setExporting(true);
    setError(null);
    try {
      await exportComparisonPdf(images, notes);
    } catch {
      setError('Export failed. Try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="export">
      <button
        type="button"
        className="export__button"
        disabled={disabled || exporting}
        onClick={handleExport}
      >
        {exporting ? 'Generating PDF...' : 'Export PDF'}
      </button>
      {error && <p className="export__error">{error}</p>}
    </div>
  );
}
