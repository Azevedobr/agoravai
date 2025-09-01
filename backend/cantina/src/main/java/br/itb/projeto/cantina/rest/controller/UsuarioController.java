package br.itb.projeto.cantina.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.cantina.model.entity.Produto;
import br.itb.projeto.cantina.model.entity.Usuario;
import br.itb.projeto.cantina.rest.response.MessageResponse;
import br.itb.projeto.cantina.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

	private UsuarioService usuarioService;
	// Source -> Generate Constructor using Fields...
	public UsuarioController(UsuarioService usuarioService) {
		super();
		this.usuarioService = usuarioService;
	}
	
	@GetMapping("/findById/{id}")
	public ResponseEntity<Usuario> findById(@PathVariable long id) {
		Usuario usuario = usuarioService.findById(id);
		return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
	}
	
	@GetMapping("/findAll")
	public ResponseEntity<List<Usuario>> findAll(){
		
		List<Usuario> usuarios = usuarioService.findAll();
		
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
		
	}
	
	@GetMapping("/findAllAtivos")
	public ResponseEntity<List<Usuario>> findAllAtivos(){
		
		List<Usuario> usuarios = usuarioService.findAllByStatus("ATIVO");
		
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
		
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Usuario usuario) {
		
		Usuario _usuario = usuarioService.save(usuario);
		
		return ResponseEntity.ok()
				.body(new MessageResponse("Conta de Usuário criada com sucesso!"));
	}
	
	@GetMapping("/create")
	public ResponseEntity<String> getCreateForm() {
		return ResponseEntity.ok("Use POST para criar usuário. Exemplo: {\"nome\":\"João\", \"email\":\"joao@email.com\", \"senha\":\"123456\"}");
	}

	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Usuario usuario) {
		
		Usuario _usuario = usuarioService.create(usuario);
		
		return ResponseEntity.ok()
				.body(new MessageResponse("Conta de Usuário criada com sucesso!"));
	}
	
	@PutMapping("/editar/{id}")
	public ResponseEntity<?> editar(@PathVariable long id,
			@RequestParam(required = false) MultipartFile file,
			@ModelAttribute Usuario usuario) {

		Usuario _usuario = usuarioService.editar(file, id, usuario);

		return ResponseEntity.ok()
				.body(new MessageResponse("Usuário alterado com sucesso!"));
	}
	
	@PutMapping("/alterarSenha/{id}")
	public ResponseEntity<?> trocarSenha(@PathVariable long id, @RequestBody Usuario usuario) {
		
		Usuario _usuario = usuarioService.alterarSenha(id, usuario);
		
		return ResponseEntity.ok()
				.body(new MessageResponse("Senha alterada com sucesso!"));
	}
	
	@PutMapping("/inativar/{id}")
	public ResponseEntity<?> inativar(@PathVariable long id) {
		
		Usuario _usuario = usuarioService.inativar(id);
		
		return ResponseEntity.ok()
				.body(new MessageResponse("Conta de Usuário inativada com sucesso!"));
	}	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Usuario usuario) {

		Usuario _usuario = usuarioService.login(usuario.getEmail(), usuario.getSenha());

		if (_usuario != null) {
			return ResponseEntity.ok().body(_usuario);
		} 

		return ResponseEntity.badRequest()
						.body(new MessageResponse("Dados Incorretos!"));
	}
}








