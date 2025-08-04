import React from 'react';

type FileWithPreview = File & { preview: string; id: string };

export function useFileUpload(options: { accept?: string; maxSize?: number }) {
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  function generateId() {
    return Math.random().toString(36).slice(2, 9);
  }

  function validateFile(file: File) {
    const errs: string[] = [];
    if (options.accept && !file.type.match(options.accept.replace('*', '.*'))) {
      errs.push('Formato de arquivo não suportado.');
    }
    if (options.maxSize && file.size > options.maxSize) {
      errs.push(`Arquivo maior que o permitido (${options.maxSize / 1024 / 1024}MB).`);
    }
    return errs;
  }

  function handleFiles(selectedFiles: FileList) {
    const newErrors: string[] = [];
    const validFiles: FileWithPreview[] = [];

    Array.from(selectedFiles).forEach((file) => {
      const validationErrors = validateFile(file);
      if (validationErrors.length) {
        newErrors.push(...validationErrors);
      } else {
        const url = URL.createObjectURL(file);
        if (url && url.trim() !== "") {
          const fileWithPreview = Object.assign(file, {
            preview: url,
            id: generateId(),
          });
          validFiles.push(fileWithPreview);
        }
      }
    });

    setErrors(newErrors);
    setFiles(validFiles);
  }

  function handleDragEnter() {
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }

  function openFileDialog() {
    inputRef.current?.click();
  }

  function removeFile(id: string | undefined) {
    if (!id) return;
    setFiles((f) => f.filter((file) => file.id !== id));
  }

  function getInputProps() {
    return {
      ref: inputRef,
      type: 'file',
      accept: options.accept,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          handleFiles(e.target.files);
          e.target.value = ''; // <-- permite subir mesma imagem novamente
        }
      },
    };
  }

  return [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] as const;
}
