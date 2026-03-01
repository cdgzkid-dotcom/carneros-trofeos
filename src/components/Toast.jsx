import './Toast.css';

/**
 * Toast notification bottom-center
 * Props:
 *   toast {object|null} — { msg: string, cls: 'am'|'fl' } | null
 */
export default function Toast({ toast }) {
  return (
    <div className={`toast ${toast ? toast.cls + ' show' : ''}`}>
      {toast?.msg}
    </div>
  );
}
