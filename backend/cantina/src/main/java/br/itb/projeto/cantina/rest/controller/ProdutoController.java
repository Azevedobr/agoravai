package br.itb.projeto.cantina.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.cantina.model.entity.Produto;
import br.itb.projeto.cantina.rest.response.MessageResponse;
import br.itb.projeto.cantina.service.ProdutoService;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {

	private ProdutoService produtoService;
	// Source -> Generate Constructor using Fields...
	public ProdutoController(ProdutoService produtoService) {
		super();
		this.produtoService = produtoService;
	}
		
	@GetMapping("/findById/{id}")
	public ResponseEntity<Produto> findById(@PathVariable long id) {
		Produto produto = produtoService.findById(id);
		return new ResponseEntity<Produto>(produto, HttpStatus.OK);
	}
	
	@GetMapping("findByCodBarras/{codBarras}")
	public ResponseEntity<?> findByCodBarras(@PathVariable String codBarras) {

		Produto produto = produtoService.findByCodBarras(codBarras);

		if (produto != null) {
			return new ResponseEntity<Produto>(produto, HttpStatus.OK);
		} 
		return ResponseEntity.badRequest()
				.body(new MessageResponse("*** Produto não encontrado! *** "));

	}
	
	@GetMapping("/findAll")
	public ResponseEntity<List<Produto>> findAll(){
		
		List<Produto> produtos = produtoService.findAll();
		
		return new ResponseEntity<List<Produto>>(produtos, HttpStatus.OK);
	}
	
	@GetMapping("/findAllAtivos")
	public ResponseEntity<List<Produto>> findAllAtivos(){
		
		List<Produto> produtos = produtoService.findAllByStatus("ATIVO");
		
		return new ResponseEntity<List<Produto>>(produtos, HttpStatus.OK);
		
	}
	
	@GetMapping("/findAllCardapio")
	public ResponseEntity<List<Produto>> findAllCardapio(){
		
		List<Produto> produtos = produtoService.findAllByStatus("CARDAPIO");
		
		return new ResponseEntity<List<Produto>>(produtos, HttpStatus.OK);
		
	}
	
	@GetMapping("/createSemFoto")
	public ResponseEntity<String> getCreateForm() {
		return ResponseEntity.ok("Use POST para criar produto. Exemplo: {\"nome\":\"Hamburguer\", \"preco\":15.50, \"categoria\":1}");
	}

	@PostMapping("/createSemFoto")
	public ResponseEntity<?> create(@ModelAttribute Produto produto) {

		Produto _produto = produtoService.create(produto);

		if (_produto == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Produto já cadastrado!"));
		}
		return ResponseEntity.ok()
				.body(new MessageResponse("Produto cadastrado com sucesso!"));
	}
	
	@GetMapping("/createComFoto")
	public ResponseEntity<String> getCreateComFotoForm() {
		return ResponseEntity.ok("Use POST com form-data para criar produto com foto. Campos: nome, preco, categoria, file");
	}

	@PostMapping("/createComFoto")
	public ResponseEntity<?> createComFoto(
			@RequestParam(required = false) MultipartFile file,
			@ModelAttribute Produto produto) {

		produtoService.createComFoto(file, produto);

		return ResponseEntity.ok()
				.body(new MessageResponse("Produto cadastrado com sucesso!"));
	}
	
	@PutMapping("/alterar/{id}")
	public ResponseEntity<?> alterar(@PathVariable long id,
			@RequestParam(required = false) MultipartFile file,
			@ModelAttribute Produto produto) {

		produtoService.alterar(file, id, produto);

		return ResponseEntity.ok()
				.body(new MessageResponse("Produto alterado com sucesso!"));
	}
	
	@PutMapping("/addCardapio/{id}")
	public ResponseEntity<?> addCardapio(@PathVariable long id) {

		produtoService.addCardapio(id);

		return ResponseEntity.ok()
				.body(new MessageResponse("Produto adicionado ao cardápio com sucesso!"));
	}
	
	@PutMapping("/inativar/{id}")
	public ResponseEntity<Produto> inativar(@PathVariable long id) {

		Produto _produto = produtoService.inativar(id);

		return new ResponseEntity<Produto>(_produto, HttpStatus.OK);
	}

	@PutMapping("/reativar/{id}")
	public ResponseEntity<Produto> reativar(@PathVariable long id) {

		Produto _produto = produtoService.reativar(id);

		return new ResponseEntity<Produto>(_produto, HttpStatus.OK);
	}
	
}








