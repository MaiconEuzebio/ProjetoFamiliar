package br.com.erp.model;

import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "PESSOA")
public class Pessoa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	
	@Column(length = 100, name = "NOME_RZ_SOCIAL")
	private String nomeRzSocial;
	
	@Column(name = "CNPJ_CPF")
	private String cnpjCpf;
	
	@Column(length = 1, name = "TIPO")
	private String tipo;
	
	@Column(length = 1, name = "STATUS")
	private Integer status;
	
	@OneToMany(mappedBy = "pessoa", cascade = CascadeType.ALL)
	private List<Contato> contatos;
	
	@OneToMany(mappedBy = "pessoa", cascade = CascadeType.ALL)
	private List<Endereco> enderecos;
	
	@Transient
	private String descStatus;
	
	
	
	
	
	
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNomeRzSocial() {
		return nomeRzSocial;
	}

	public void setNomeRzSocial(String nomeRzSocial) {
		this.nomeRzSocial = nomeRzSocial;
	}

	public String getCnpjCpf() {
		return cnpjCpf;
	}

	public void setCnpjCpf(String cnpjCpf) {
		this.cnpjCpf = cnpjCpf;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public List<Contato> getContatos() {
		return contatos;
	}

	public void setContatos(List<Contato> contatos) {
		this.contatos = contatos;
	}

	public List<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(List<Endereco> enderecos) {
		this.enderecos = enderecos;
	}

	public String getDescStatus() {
		if(Objects.nonNull(status)) {
			if(status.equals(0)) {
				return "INATIVO";
			}else {
				return "ATIVO";
			}
		}
		return descStatus;
	}

	public void setDescStatus(String descStatus) {
		this.descStatus = descStatus;
	}
	
	public void atualizarContatos() {
		for(Contato contato : contatos) {
			contato.setPessoa(this);
		}
	}
	
	public void atualizarEnderecos() {
		for(Endereco endereco : enderecos) {
			endereco.setPessoa(this);
		}
	}
	
	
	
}
