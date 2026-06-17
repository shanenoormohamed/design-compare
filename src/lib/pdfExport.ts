import { jsPDF } from 'jspdf';
import type { SlotKey } from '../types';
import { SLOT_LABELS, SLOT_ORDER } from '../types';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

async function toPngDataUrl(src: string): Promise<string> {
  const img = await loadImage(src);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png');
}

function fitImage(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } {
  const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
  return {
    width: img.width * ratio,
    height: img.height * ratio,
  };
}

export async function exportComparisonPdf(
  images: Record<SlotKey, string>,
  notes: string,
): Promise<void> {
  const loaded = await Promise.all(
    SLOT_ORDER.map(async (key) => {
      const dataUrl = await toPngDataUrl(images[key]);
      return {
        key,
        dataUrl,
        img: await loadImage(dataUrl),
      };
    }),
  );

  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  const date = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  doc.setFontSize(18);
  doc.text('Design Comparison', margin, margin);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(date, margin, margin + 16);
  doc.setTextColor(0);

  const imageTop = margin + 36;
  const labelHeight = 18;
  const notesTopMin = imageTop + 20;
  const maxImageHeight = notes.trim()
    ? pageHeight * 0.55
    : pageHeight - imageTop - margin - labelHeight;

  const colWidth = contentWidth / 3;
  const gap = 12;

  loaded.forEach(({ key, dataUrl, img }, index) => {
    const { width, height } = fitImage(img, colWidth - gap, maxImageHeight);
    const x = margin + index * colWidth + (colWidth - width) / 2;
    const y = imageTop + (maxImageHeight - height) / 2;

    doc.addImage(dataUrl, 'PNG', x, y, width, height);

    doc.setFontSize(11);
    doc.text(
      SLOT_LABELS[key],
      margin + index * colWidth + colWidth / 2,
      imageTop + maxImageHeight + labelHeight,
      { align: 'center' },
    );
  });

  if (notes.trim()) {
    const notesY = Math.max(notesTopMin, imageTop + maxImageHeight + 40);
    doc.setFontSize(12);
    doc.text('Notes', margin, notesY);
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(notes, contentWidth);
    doc.text(lines, margin, notesY + 16);
  }

  const filename = `design-compare-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
