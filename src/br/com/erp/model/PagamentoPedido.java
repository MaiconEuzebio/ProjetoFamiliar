package br.com.erp.model;


import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name = "PAGAMENTO_PEDIDO")
public class PagamentoPedido {
	
	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(name = "VALOR")
	private Double valor;
	
	@OneToMany
	@JoinColumn(name = "ID_TIPO_COBRANCA")
	private List<TipoCobranca> tipoCobranca;
	
	@Column(length = 1, name = "STATUS")
	private Integer status;
	
	@Transient
	private String descStatus;
	
	
	
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
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Double getValor() {
		return valor;
	}
	public void setValor(Double valor) {
		this.valor = valor;
	}
	public List<TipoCobranca> getTipoCobranca() {
		return tipoCobranca;
	}
	public void setTipoCobranca(List<TipoCobranca> tipoCobranca) {
		this.tipoCobranca = tipoCobranca;
	}
}