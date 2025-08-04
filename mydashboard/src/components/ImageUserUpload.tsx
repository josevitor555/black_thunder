import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onUpload: (url: string) => void;
}

export function ImageUploadModal({ onClose, onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);

  const handleFileChange = () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setFileDataUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = () => {
    if (fileDataUrl) {
      onUpload(fileDataUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-sm rounded-2xl p-6 bg-popover text-popover-foreground shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/30 transition"
        >
          <X className="h-5 w-5 text-popover-foreground cursor-pointer" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Enviar Imagem</h2>

        {preview ? (
          <div className="mb-4">
            <img
              src={preview}
              alt="Prévia"
              className="w-26 h-26 object-cover mt-8 mb-8 rounded-full mx-auto border border-input shadow-md"
            />
          </div>
        ) : (
          <div className="mb-4 text-center text-muted-foreground cursor-pointer">
            Nenhuma imagem selecionada.
          </div>
        )}

        {fileName && (
          <p className="text-sm text-center text-muted-foreground mb-4">
            <span className="font-semibold">Arquivo:</span> {fileName}
          </p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded border border-input bg-input text-foreground file:text-sm file:border-0 file:bg-primary file:text-primary-foreground file:px-4 file:py-1.5 cursor-pointer"
        />

        <div className="mt-6 flex justify-between gap-2">
          <button
            onClick={onClose}
            className="btn-secondary text-sm px-4 py-2 rounded-md cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={handleSend}
            disabled={!fileDataUrl}
            className="btn-primary text-sm px-4 py-2 rounded-md cursor-pointer"
          >
            Enviar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
