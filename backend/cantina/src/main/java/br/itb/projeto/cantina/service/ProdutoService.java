package br.itb.projeto.cantina.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.cantina.model.entity.Produto;
import br.itb.projeto.cantina.model.repository.ProdutoRepository;
import jakarta.transaction.Transactional;

@Service
public class ProdutoService {

	private ProdutoRepository produtoRepository;

	public ProdutoService(ProdutoRepository produtoRepository) {
		super();
		this.produtoRepository = produtoRepository;
	}

	public Produto findById(long id) {
		Optional<Produto> produto = produtoRepository.findById(id);
		if(produto.isPresent()) {
			return produto.get();
		}
		return null;
	}
	
	public Produto findByCodBarras(String codigoBarras) {
		Optional<Produto> produto = produtoRepository.findByCodigoBarras(codigoBarras);
		if(produto.isPresent()) {
			return produto.get();
		}
		return null;
	}

	public List<Produto> findAll() {
		List<Produto> produtos = produtoRepository.findAll();
		return produtos;
	}
	
	public List<Produto> findAllByStatus(String statusProduto) {
		List<Produto> produtos = produtoRepository.findByStatusProduto(statusProduto);
		return produtos;
	}
	
	@Transactional
	public Produto create(Produto produto) {

		produto.setFoto(null);
		produto.setStatusProduto("ATIVO");
		
		return produtoRepository.save(produto);
	}
	
	@Transactional
	public Produto createComFoto(MultipartFile file, Produto produto) {
		
		if (file != null && file.getSize() > 0) {
			try {
				produto.setFoto(file.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			produto.setFoto(null);
		}
		produto.setStatusProduto("ATIVO");
		
		return produtoRepository.save(produto);
	}
	
	@Transactional
	public Produto inativar(long id) {
		Optional<Produto> _produto = 
				produtoRepository.findById(id);
		
		if (_produto.isPresent()) {
			Produto produtoAtualizado = _produto.get();
			produtoAtualizado.setStatusProduto("INATIVO");
			
			return produtoRepository.save(produtoAtualizado);
		}
		return null;
	}
	
	@Transactional
	public Produto reativar(long id) {
		Optional<Produto> _produto = 
				produtoRepository.findById(id);
		
		if (_produto.isPresent()) {
			Produto produtoAtualizado = _produto.get();
			produtoAtualizado.setStatusProduto("ATIVO");
			
			return produtoRepository.save(produtoAtualizado);
		}
		return null;
	}
		
	@Transactional
	public Produto alterar(MultipartFile file, long id, Produto produto) {
		Optional<Produto> _produto = produtoRepository.findById(id);

		if (_produto.isPresent()) {
			Produto produtoAtualizado = _produto.get();
			
			produtoAtualizado.setPreco(produto.getPreco());
			produtoAtualizado.setCategoria(produto.getCategoria());
			produtoAtualizado.setNome(produto.getNome());
			produtoAtualizado.setDescricao(produto.getDescricao());
			
			if (file != null && file.getSize() > 0) {
				try {
					produtoAtualizado.setFoto(file.getBytes());
				} catch (IOException e) {
					e.printStackTrace();
				}
			} 

			return produtoRepository.save(produtoAtualizado);
		}
		return null;
	}

	public Produto addCardapio(long id) {
		Optional<Produto> _produto = 
				produtoRepository.findById(id);
		
		if (_produto.isPresent()) {
			Produto produtoAtualizado = _produto.get();
			produtoAtualizado.setStatusProduto("CARDAPIO");
			
			return produtoRepository.save(produtoAtualizado);
		}
		return null;
	}

}
