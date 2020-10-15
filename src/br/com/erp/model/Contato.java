package br.com.erp.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name = "CONTATO")
public class Contato {
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		@Column(name = "ID")
		private Integer id;
		
		@Column(length = 100, name = "NOME")
		private String nome;
		
		@Column(length = 100, name = "DESCRICAO")
		private String descricao;
		
		@Column(length = 1, name = "STATUS")
		private Integer status;
		
		@ManyToOne
		@JoinColumn
		private TipoContato tipoContato;
		
		
		@Transient
		private String descStatus;


		public Integer getId() {
			return id;
		}


		public void setId(Integer id) {
			this.id = id;
		}


		public String getNome() {
			return nome;
		}


		public void setNome(String nome) {
			this.nome = nome;
		}


		public String getDescricao() {
			return descricao;
		}


		public void setDescricao(String descricao) {
			this.descricao = descricao;
		}


		public Integer getStatus() {
			return status;
		}


		public void setStatus(Integer status) {
			this.status = status;
		}


		public TipoContato getTipoContato() {
			return tipoContato;
		}


		public void setTipoContato(TipoContato tipoContato) {
			this.tipoContato = tipoContato;
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
