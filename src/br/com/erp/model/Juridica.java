package br.com.erp.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name = "JURIDICA")
public class Juridica {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	
	@OneToOne
	@JoinColumn
	private Pessoa nomeRzSocial;
	
	@OneToOne
	@JoinColumn
	private Pessoa cnpjCpf;
	
	@ManyToOne
	@JoinColumn
	private Endereco endereco;
	
	
	@Column(length = 1, name = "STATUS")
	private Integer status;
	
	
	@Transient
	private String descStatus;


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Pessoa getNomeRzSocial() {
		return nomeRzSocial;
	}


	public void setNomeRzSocial(Pessoa nomeRzSocial) {
		this.nomeRzSocial = nomeRzSocial;
	}


	public Pessoa getCnpjCpf() {
		return cnpjCpf;
	}


	public void setCnpjCpf(Pessoa cnpjCpf) {
		this.cnpjCpf = cnpjCpf;
	}


	
	public Endereco getEndereco() {
		return endereco;
	}


	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}


	public Integer getStatus() {
		return status;
	}


	public void setStatus(Integer status) {
		this.status = status;
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
	
	
	
	
	
	
}
