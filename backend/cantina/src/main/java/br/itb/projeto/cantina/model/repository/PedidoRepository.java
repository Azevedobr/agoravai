package br.itb.projeto.cantina.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.cantina.model.entity.Pedido;


@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    // Buscar pedidos por usuário ordenados por data (mais recentes primeiro)
    List<Pedido> findByUsuario_IdOrderByDataPedidoDesc(Long usuarioId);
}
