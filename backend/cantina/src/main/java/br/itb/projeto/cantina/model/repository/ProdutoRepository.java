package br.itb.projeto.cantina.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.cantina.model.entity.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

	List<Produto> findByStatusProduto(String statusProduto);

	Optional<Produto> findByCodigoBarras(String codigoBarras);

}
