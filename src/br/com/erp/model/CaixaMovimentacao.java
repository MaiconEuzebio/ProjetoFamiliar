package br.com.erp.model;

import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "CAIXA_MOVIMENTACAO")
public class CaixaMovimentacao {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	@Column(name = "DATA_MOVIMENTACAO")
	private Date dataMovimentacao;
	@Column(length = 10, name = "VALOR_MOVIMENTACAO")
	private Double valorMovimentacao;
	@Column(length = 50, name = "TIPO")
	private String tipo;
	@Column(length = 300, name = "OBSERVACAO")
	private String observacao;
	@Column(length = 1, name = "STATUS")
	private Integer status;
	@Transient
	private String caixaStatus;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getDataMovimentacao() {
		return dataMovimentacao;
	}
	public void setDataMovimentacao(Date dataMovimentacao) {
		this.dataMovimentacao = dataMovimentacao;
	}
	public Double getValorMovimentacao() {
		return valorMovimentacao;
	}
	public void setValorMovimentacao(Double valorMovimentacao) {
		this.valorMovimentacao = valorMovimentacao;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getObservacao() {
		return observacao;
	}
	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getCaixaStatus() {
		if(Objects.nonNull(status)) {
			if(status.equals(0)) {
				return "INATIVO";
			}else {
				return "ATIVO";
			}
		}
		return caixaStatus;
	}
	public void setCaixaStatus(String caixaStatus) {
		this.caixaStatus = caixaStatus;
	}

}
