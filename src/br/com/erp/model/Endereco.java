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
@Table(name = "ENDERECO")
	public class Endereco {
		
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		@Column(name = "ID")
		private Integer id;
		
		@Column(length = 100, name = "RUA")
		private String rua;
		
		@Column(name = "CEP")
		private String cep;
		
		@Column(name = "NUMERO")
		private String numero;
		
		@Column(length = 1, name = "STATUS")
		private Integer status;
		
		@ManyToOne
		@JoinColumn
		private TipoEndereco tipoEndereco;
		
		
		
		@Transient
		private String descStatus;



		public Integer getId() {
			return id;
		}



		public void setId(Integer id) {
			this.id = id;
		}



		public String getRua() {
			return rua;
		}



		public void setRua(String rua) {
			this.rua = rua;
		}



		public String getCep() {
			return cep;
		}



		public void setCep(String cep) {
			this.cep = cep;
		}



		public String getNumero() {
			return numero;
		}



		public void setNumero(String numero) {
			this.numero = numero;
		}



		public Integer getStatus() {
			return status;
		}



		public void setStatus(Integer status) {
			this.status = status;
		}



		public TipoEndereco getTipoEndereco() {
			return tipoEndereco;
		}



		public void setTipoEndereco(TipoEndereco tipoEndereco) {
			this.tipoEndereco = tipoEndereco;
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
