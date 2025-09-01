package br.itb.projeto.cantina.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.cantina.model.entity.Pedido;


@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    // Aqui você pode adicionar métodos customizados de consulta, se necessário
}
