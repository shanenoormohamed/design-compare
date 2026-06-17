import { useCallback, useMemo, useState } from 'react';
import { ComparisonView } from './components/ComparisonView';
import { ExportButton } from './components/ExportButton';
import { NotesSection } from './components/NotesSection';
import { UploadWizard } from './components/UploadWizard';
import type { SlotKey } from './types';
import { SLOT_ORDER } from './types';
import './App.css';

function createEmptyImages(): Record<SlotKey, string | null> {
  return { figma: null, ios: null, android: null };
}

function App() {
  const [images, setImages] = useState(createEmptyImages);
  const [notes, setNotes] = useState('');

  const allImagesLoaded = useMemo(
    () => SLOT_ORDER.every((key) => images[key] !== null),
    [images],
  );

  const loadedImages = useMemo(() => {
    if (!allImagesLoaded) return null;
    return {
      figma: images.figma!,
      ios: images.ios!,
      android: images.android!,
    };
  }, [allImagesLoaded, images]);

  const setImage = useCallback((key: SlotKey, file: File) => {
    const url = URL.createObjectURL(file);
    setImages((prev) => {
      if (prev[key]) URL.revokeObjectURL(prev[key]!);
      return { ...prev, [key]: url };
    });
  }, []);

  const clearImage = useCallback((key: SlotKey) => {
    setImages((prev) => {
      if (prev[key]) URL.revokeObjectURL(prev[key]!);
      return { ...prev, [key]: null };
    });
  }, []);

  const clearAll = useCallback(() => {
    setImages((prev) => {
      SLOT_ORDER.forEach((key) => {
        if (prev[key]) URL.revokeObjectURL(prev[key]!);
      });
      return createEmptyImages();
    });
    setNotes('');
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Design Compare</h1>
        <p>Compare Figma, iOS, and Android screenshots side by side</p>
      </header>

      <UploadWizard
        images={images}
        onSetImage={setImage}
        onClearImage={clearImage}
      />

      {loadedImages && <ComparisonView images={loadedImages} />}

      <NotesSection notes={notes} onChange={setNotes} />

      <footer className="app__footer">
        <ExportButton
          images={
            loadedImages ?? { figma: '', ios: '', android: '' }
          }
          notes={notes}
          disabled={!allImagesLoaded}
        />
        {allImagesLoaded && (
          <button type="button" className="app__clear" onClick={clearAll}>
            Start over
          </button>
        )}
      </footer>
    </div>
  );
}

export default App;
