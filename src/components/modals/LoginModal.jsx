import { useState } from 'react';
import Modal from '../ui/Modal';
import { PASSWORD } from '../../data/constants';
import './LoginModal.css';

export default function LoginModal({ isOpen, onLogin, onClose }) {
  const [pwd, setPwd]     = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (pwd === PASSWORD) {
      setPwd('');
      setError(false);
      onLogin();
    } else {
      setError(true);
      setPwd('');
    }
  };

  const handleClose = () => {
    setPwd('');
    setError(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="login-box">
        <div className="login-icon">🏈</div>
        <h2>Panel Admin</h2>
        <p className="login-sub">Carneros Football Club · Guadalajara</p>

        <div className="form-group">
          <label htmlFor="login-pwd">Contraseña</label>
          <input
            id="login-pwd"
            type="password"
            value={pwd}
            placeholder="••••••••"
            onChange={(e) => { setPwd(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <button className="btn-primary am-mode" onClick={handleLogin}>
          Entrar
        </button>

        {error && (
          <p className="login-error">❌ Contraseña incorrecta</p>
        )}

        <p className="login-hint">
          Contraseña predeterminada: <strong>carneros2025</strong>
        </p>
      </div>
    </Modal>
  );
}
