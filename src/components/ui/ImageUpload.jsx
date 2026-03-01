import { useRef, useState } from 'react';
import './ImageUpload.css';

const MAX_SIZE = 500 * 1024; // 500 KB

/**
 * Zona de upload de imagen con preview base64 y warning >500KB
 * Props:
 *   value    {string|null} — base64 actual
 *   onChange {function}   — (base64|null) => void
 */
export default function ImageUpload({ value, onChange }) {
  const fileRef = useRef(null);
  const [warning, setWarning] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setWarning('Solo se aceptan archivos de imagen (JPG, PNG, WEBP)');
      return;
    }
    if (file.size > MAX_SIZE) {
      setWarning(`Imagen grande (${(file.size / 1024).toFixed(0)} KB). Puede llenar el almacenamiento rápidamente. Considera usar una imagen menor a 500 KB.`);
    } else {
      setWarning(null);
    }
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleRemove = () => {
    onChange(null);
    setWarning(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="img-upload-wrap">
      <div
        className="img-upload-area"
        onClick={() => fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="img-upload-input"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {value ? (
          <img src={value} alt="Preview" className="img-preview" />
        ) : (
          <p className="upload-hint">
            📸 Haz clic o arrastra una foto<br />
            <span>JPG · PNG · WEBP</span>
          </p>
        )}
      </div>
      {warning && (
        <p className="upload-warning">⚠️ {warning}</p>
      )}
      {value && (
        <button type="button" className="img-remove-btn" onClick={handleRemove}>
          Quitar imagen
        </button>
      )}
    </div>
  );
}
