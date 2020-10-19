package br.com.erp.model;

import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class Caixa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	@Column(name = "DATA_ABERTURA")
	private Date dataAbertura;
	@Column(name = "DATA_FECHAMENTO")
	private Date dataFechamento;
	@Column(length = 10, name = "VALOR_ABERTURA")
	private Double valorAbertura;
	@Column(length = 10, name = "VALOR_FECHAMENTO")
	private Double valorFechamento;
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
	public Date getDataAbertura() {
		return dataAbertura;
	}
	public void setDataAbertura(Date dataAbertura) {
		this.dataAbertura = dataAbertura;
	}
	public Date getDataFechamento() {
		return dataFechamento;
	}
	public void setDataFechamento(Date dataFechamento) {
		this.dataFechamento = dataFechamento;
	}
	public Double getValorAbertura() {
		return valorAbertura;
	}
	public void setValorAbertura(Double valorAbertura) {
		this.valorAbertura = valorAbertura;
	}
	public Double getValorFechamento() {
		return valorFechamento;
	}
	public void setValorFechamento(Double valorFechamento) {
		this.valorFechamento = valorFechamento;
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
