type NotesSectionProps = {
  notes: string;
  onChange: (value: string) => void;
};

export function NotesSection({ notes, onChange }: NotesSectionProps) {
  return (
    <section className="notes">
      <label htmlFor="comparison-notes">Notes</label>
      <textarea
        id="comparison-notes"
        value={notes}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Layout differences, spacing issues, copy mismatches..."
        rows={5}
      />
    </section>
  );
}
