import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface UpdronwProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}

const Updronw: React.FC<UpdronwProps> = ({ value, options, onChange }) => {
  const selected = options.find(opt => opt.value === value) || options[0];
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-between border border-border rounded px-2 py-2 bg-background text-foreground w-full min-w-[120px]"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected.label}</span>
        <ChevronDownIcon className="ml-2 opacity-60" size={16} aria-hidden="true" />
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-card border border-border rounded shadow-lg right-0 left-auto" role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              className={`px-4 py-2 cursor-pointer hover:bg-muted ${opt.value === value ? 'font-bold' : ''}`}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Updronw; 