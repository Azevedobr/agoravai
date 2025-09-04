import React, { useState, useEffect } from 'react';
import UploadFoto from '../../components/UploadFoto';

const GerenciarProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produto/findAll');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🛍️ Gerenciar Fotos dos Produtos</h2>
      
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {produtos.map(produto => (
          <div key={produto.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center'
          }}>
            <div style={{ width: '80px', height: '80px', border: '1px solid #ccc', borderRadius: '6px', overflow: 'hidden' }}>
              {produto.foto ? (
                <img 
                  src={`data:image/jpeg;base64,${produto.foto}`}
                  alt={produto.nome}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  fontSize: '24px'
                }}>
                  📷
                </div>
              )}
            </div>
            
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 8px 0' }}>{produto.nome}</h4>
              <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                R$ {Number(produto.preco).toFixed(2)}
              </p>
              <UploadFoto 
                produtoId={produto.id} 
                onFotoUpload={carregarProdutos}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GerenciarProdutos;