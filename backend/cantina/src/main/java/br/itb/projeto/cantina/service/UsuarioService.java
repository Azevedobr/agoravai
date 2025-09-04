package br.itb.projeto.cantina.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.cantina.model.entity.Usuario;
import br.itb.projeto.cantina.model.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService {

	private UsuarioRepository usuarioRepository;

	public UsuarioService(UsuarioRepository usuarioRepository) {
		super();
		this.usuarioRepository = usuarioRepository;
	}

	private final String SENHA_PADRAO = "12345678";

	public Usuario findById(long id) {

		Optional<Usuario> usuario = usuarioRepository.findById(id);

		if (usuario.isPresent()) {
			return usuario.get();
		}

		return null;
	}

	public List<Usuario> findAll() {
		List<Usuario> usuarios = usuarioRepository.findAll();
		return usuarios;
	}
	
	public List<Usuario> findAllByStatus(String status) {
		List<Usuario> usuarios = usuarioRepository.findByStatusUsuario(status);
		return usuarios;
	}

	@Transactional
	public Usuario login(String email, String senha) {
		Usuario usuario = usuarioRepository.findByEmail(email);

		if (usuario != null) {
			if (!usuario.getStatusUsuario().equals("INATIVO")) {
				byte[] decodedPass = Base64.getDecoder()
												.decode(usuario.getSenha());
				
				if (new String(decodedPass).equals(senha)) {
					return usuario;
				}
			}
		}
		return null;
	}

	public Usuario findByEmail(String email) {
		Usuario usuario = usuarioRepository.findByEmail(email);
		if (usuario != null) {
			return usuario;
		}
		return null;
	}

	// A CONTA DE USUÁRIO SERÁ CRIADA COM UMA SENHA PADRÃO
	// ELE DEVE ALTERAR NO PRIMEIRO ACESSO
	@Transactional
	public Usuario create(Usuario usuario) {

		Usuario _usuario = usuarioRepository.findByEmail(usuario.getEmail());

		if (_usuario == null) {
			String senha = Base64.getEncoder()
									.encodeToString(SENHA_PADRAO.getBytes());

			usuario.setSenha(senha);
			usuario.setDataCadastro(LocalDateTime.now());
			usuario.setStatusUsuario("TROCAR_SENHA");

			return usuarioRepository.save(usuario);
		}
		return null;

	}

	// A CONTA DE USUÁRIO SERÁ CRIADA COM SENHA DEFINIDA POR ELE
	@Transactional
	public Usuario save(Usuario usuario) {

		Usuario _usuario = usuarioRepository.findByEmail(usuario.getEmail());

		if (_usuario == null) {

			String senha = Base64.getEncoder()
									.encodeToString(usuario.getSenha().getBytes());

			usuario.setSenha(senha);
			usuario.setDataCadastro(LocalDateTime.now());
			usuario.setStatusUsuario("ATIVO");

			return usuarioRepository.save(usuario);
		}
		return null;
	}
	
	@Transactional
	public Usuario alterarSenha(long id, Usuario usuario) {
		Optional<Usuario> _usuario = usuarioRepository.findById(id);

		if (_usuario.isPresent()) {
			Usuario usuarioAtualizado = _usuario.get();
			String senha = Base64.getEncoder()
						.encodeToString(usuario.getSenha().getBytes());

			usuarioAtualizado.setSenha(senha);
			usuarioAtualizado.setDataCadastro(LocalDateTime.now());
			usuarioAtualizado.setStatusUsuario("ATIVO");

			return usuarioRepository.save(usuarioAtualizado);
		}
		return null;
	}
	

	@Transactional
	public Usuario editar(MultipartFile file, long id, Usuario usuario) {
		Optional<Usuario> _usuario = usuarioRepository.findById(id);

		if (_usuario.isPresent()) {
			Usuario usuarioAtualizado = _usuario.get();
		
			usuarioAtualizado.setNome(usuario.getNome());
			// Verificar se o email não está sendo usado por outro usuário
			if (usuario.getEmail() != null && !usuario.getEmail().isEmpty()) {
				Usuario usuarioComEmail = usuarioRepository.findByEmail(usuario.getEmail());
				if (usuarioComEmail == null || usuarioComEmail.getId() == id) {
					usuarioAtualizado.setEmail(usuario.getEmail());
				}
			}
			usuarioAtualizado.setNivelAcesso(usuario.getNivelAcesso());
			
			if (file != null && file.getSize() > 0) {
				try {
					usuarioAtualizado.setFoto(file.getBytes());
				} catch (IOException e) {
					e.printStackTrace();
				}
			} 

			return usuarioRepository.save(usuarioAtualizado);
		}
		return null;
	}

	
	@Transactional
	public Usuario inativar(long id) {
		Optional<Usuario> _usuario = usuarioRepository.findById(id);

		if (_usuario.isPresent()) {
			Usuario usuarioAtualizado = _usuario.get();
			String senha = Base64.getEncoder().encodeToString(SENHA_PADRAO.getBytes());

			usuarioAtualizado.setSenha(senha);
			usuarioAtualizado.setDataCadastro(LocalDateTime.now());
			usuarioAtualizado.setStatusUsuario("INATIVO");

			return usuarioRepository.save(usuarioAtualizado);
		}
		return null;
	}

	@Transactional
	public Usuario reativar(long id) {
		Optional<Usuario> _usuario = usuarioRepository.findById(id);

		if (_usuario.isPresent()) {
			Usuario usuarioAtualizado = _usuario.get();
			String senha = Base64.getEncoder()
						.encodeToString(SENHA_PADRAO.getBytes());

			usuarioAtualizado.setSenha(senha);
			usuarioAtualizado.setDataCadastro(LocalDateTime.now());
			usuarioAtualizado.setStatusUsuario("ATIVO");

			return usuarioRepository.save(usuarioAtualizado);
		}
		return null;
	}

	@Transactional
	public Usuario resetarSenha(long id) {
		Optional<Usuario> _usuario = usuarioRepository.findById(id);

		if (_usuario.isPresent()) {
			Usuario usuarioAtualizado = _usuario.get();
			String senha = Base64.getEncoder()
						.encodeToString(SENHA_PADRAO.getBytes());

			usuarioAtualizado.setSenha(senha);
			usuarioAtualizado.setDataCadastro(LocalDateTime.now());
			usuarioAtualizado.setStatusUsuario("TROCAR_SENHA");

			return usuarioRepository.save(usuarioAtualizado);
		}
		return null;
	}

	@Transactional
	public Usuario atualizarPerfil(long id, Usuario usuario) {
		Optional<Usuario> _usuario = usuarioRepository.findById(id);

		if (_usuario.isPresent()) {
			Usuario usuarioAtualizado = _usuario.get();
			
			// Atualizar nome
			if (usuario.getNome() != null && !usuario.getNome().isEmpty()) {
				usuarioAtualizado.setNome(usuario.getNome());
			}
			
			// Verificar se o email não está sendo usado por outro usuário
			if (usuario.getEmail() != null && !usuario.getEmail().isEmpty()) {
				Usuario usuarioComEmail = usuarioRepository.findByEmail(usuario.getEmail());
				if (usuarioComEmail == null || usuarioComEmail.getId() == id) {
					usuarioAtualizado.setEmail(usuario.getEmail());
				} else {
					// Email já está em uso por outro usuário
					return null;
				}
			}

			return usuarioRepository.save(usuarioAtualizado);
		}
		return null;
	}
	
	public boolean validatePassword(long userId, String password) {
		Optional<Usuario> _usuario = usuarioRepository.findById(userId);
		
		if (_usuario.isPresent()) {
			Usuario usuario = _usuario.get();
			
			// Decodificar a senha armazenada no banco
			byte[] decodedPass = Base64.getDecoder().decode(usuario.getSenha());
			String senhaDecodificada = new String(decodedPass);
			
			// Comparar com a senha fornecida
			return senhaDecodificada.equals(password);
		}
		
		return false;
	}
	
	@Transactional
	public boolean changePassword(long userId, String currentPassword, String newPassword) {
		// Primeiro validar se a senha atual está correta
		if (!validatePassword(userId, currentPassword)) {
			return false;
		}
		
		Optional<Usuario> _usuario = usuarioRepository.findById(userId);
		
		if (_usuario.isPresent()) {
			Usuario usuario = _usuario.get();
			
			// Codificar a nova senha
			String novaSenhaCodificada = Base64.getEncoder().encodeToString(newPassword.getBytes());
			
			// Atualizar a senha
			usuario.setSenha(novaSenhaCodificada);
			usuario.setDataCadastro(LocalDateTime.now());
			
			usuarioRepository.save(usuario);
			return true;
		}
		
		return false;
	}



}
