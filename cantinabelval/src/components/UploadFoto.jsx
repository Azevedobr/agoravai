import React, { useState } from 'react';

const UploadFoto = ({ produtoId, onFotoUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('foto', file);
      formData.append('produtoId', produtoId);

      const response = await fetch('http://localhost:8080/produto/createComFoto', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Foto enviada com sucesso!');
        if (onFotoUpload) onFotoUpload();
      } else {
        alert('Erro ao enviar foto');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar foto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        style={{ display: 'none' }}
        id={`upload-${produtoId}`}
      />
      <label 
        htmlFor={`upload-${produtoId}`}
        style={{
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: '#3498db',
          color: 'white',
          borderRadius: '6px',
          cursor: uploading ? 'not-allowed' : 'pointer',
          fontSize: '14px'
        }}
      >
        {uploading ? '📤 Enviando...' : '📷 Adicionar Foto'}
      </label>
    </div>
  );
};

export default UploadFoto;