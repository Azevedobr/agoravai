package br.itb.projeto.cantina.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.projeto.cantina.model.entity.Mensagem;
import br.itb.projeto.cantina.model.repository.MensagemRepository;
import jakarta.transaction.Transactional;

@Service
public class MensagemService {

	/* INSTANCIA O OBJETO PARA ACESSAR OS RECURSOS DA CLASSE / INTERFACE */
	private MensagemRepository mensagemRepository;

	public MensagemService(MensagemRepository mensagemRepository) {
		super();
		this.mensagemRepository = mensagemRepository;
	}
	
	/* LISTA TODOS OS REGISTROS DA TABELA */
	public List<Mensagem> findAll(){
		List<Mensagem> mensagens = mensagemRepository.findAll();
		return mensagens;
	}
	
	/* BUSCA UM REGISTRO NA TABELA FILTRANDO PELO "id" */
	public Mensagem findById(long id) {
		Optional<Mensagem> mensagem = mensagemRepository.findById(id);
		if (mensagem.isPresent()) {
			return mensagem.get();
		}
		return null;
	}
	
	/* LISTA TODOS OS REGISTROS DE ACORDO COM FILTRO INDICADO */
	public List<Mensagem> findByEmail(String email) {
		List<Mensagem> mensagens = mensagemRepository.findByEmail(email);
		return mensagens;
	}
	
	/* LISTA TODOS OS REGISTROS DE ACORDO COM FILTRO INDICADO */
	public List<Mensagem> findAllByStatus(String statusMensagem) {
		List<Mensagem> mensagens = mensagemRepository.findByStatusMensagem(statusMensagem);
		return mensagens;
	}
	
	/* SALVA O REGISTRO NA BASE DE DADOS */
	@Transactional
	public Mensagem save(Mensagem mensagem) {
		
		/* DADOS QUE SERÃO ARMAZENADOS POR PADRÃO NA BASE DE DADOS */
		/* ESSES DADOS NÃO DEVEM SER PASSADOS NO FRONTEND */
		mensagem.setDataMensagem(LocalDateTime.now()); 
		mensagem.setStatusMensagem("ATIVO");
		
		return mensagemRepository.save(mensagem);
	}
	
	/* ATUALIZA DADOS DO REGISTRO NO BANCO DE DADOS */
	@Transactional
	public Mensagem marcarComoLida(long id) {
		
		/* BUSCA O REGISTRO QUE SERÁ ALTERADO/ATUALIZADO */
		Optional<Mensagem> _mensagem = 
				mensagemRepository.findById(id);
		
		/* SE O REGISTRO EXISTIR, A ALTERAÇÃO SERÁ EXECUTADA */
		if (_mensagem.isPresent()) {
			
			/* OBJETO QUE ESTÁ NO BANCO DE DADOS */
			Mensagem mensagemAtualizada = _mensagem.get();
			
			/* NOVO VALOR QUE SERÁ ATUALIZADO */
			mensagemAtualizada.setStatusMensagem("LIDA");
			
			/* SALVA AS ALTERAÇÕES */
			return mensagemRepository.save(mensagemAtualizada);
		}
		return null;
	}
	
	@Transactional
	public Mensagem inativar(long id) {
		Optional<Mensagem> _mensagem = 
				mensagemRepository.findById(id);
		
		if (_mensagem.isPresent()) {
			Mensagem mensagemAtualizada = _mensagem.get();
			mensagemAtualizada.setStatusMensagem("INATIVO");
			
			return mensagemRepository.save(mensagemAtualizada);
		}
		return null;
	}

}
