package br.com.erp.model;

import java.util.Date;
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
@Table(name = "CAPCAR")
public class CapCar {
	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(length = 1, name = "TIPO")
	private String tipo;
	
	@Column(name = "DATA_INICIAL")
	private Date dataInicial;
	
	@Column(name = "DATA_VENCIMENTO")
	private Date dataVencimento;
	
	@Column(name = "DATA_PAGAMENTO")
	private Date dataPagamento;
	
	@Column(name = "VALOR_LIQUIDO")
	private Double valorLiquido;
	
	@Column(name = "VALOR_TOTAL")
	private Double valorTotal;
	
	
	@Column(length = 1, name = "STATUS")
	private Integer status;
	
	@ManyToOne
	@JoinColumn(name = "ID_CLIENTE")
	private Pessoa cliente;
	
	@ManyToOne
	@JoinColumn(name = "ID_CATEGORIA")
	private Categoria categoria;
	
	@Transient
	private String descStatus;
	
	
	
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getDataInicial() {
		return dataInicial;
	}
	public void setDataInicial(Date dataInicial) {
		this.dataInicial = dataInicial;
	}
	public Date getDataVencimento() {
		return dataVencimento;
	}
	public void setDataVencimento(Date dataVencimento) {
		this.dataVencimento = dataVencimento;
	}
	public Date getDataPagamento() {
		return dataPagamento;
	}
	public void setDataPagamento(Date dataPagamento) {
		this.dataPagamento = dataPagamento;
	}
	public Double getValorTotal() {
		return valorTotal;
	}
	public void setValorTotal(Double valorTotal) {
		this.valorTotal = valorTotal;
	}
	public Double getValorLiquido() {
		return valorLiquido;
	}
	public void setValorLiquido(Double valorLiquido) {
		this.valorLiquido = valorLiquido;
	}
	
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Pessoa getCliente() {
		return cliente;
	}
	public void setCliente(Pessoa cliente) {
		this.cliente = cliente;
	}
	public Categoria getCategoria() {
		return categoria;
	}
	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
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
