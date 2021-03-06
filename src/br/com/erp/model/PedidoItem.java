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
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "PEDIDO_ITEM")
public class PedidoItem {
		
	@Id		
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	
	@Column(name = "QUANTIDADE", length = 10)
	private Integer quantidade;
	
	@Column(name = "VALOR_UNITARIO", length = 10)
	private Double valorUnitario;
	
	@Column(name = "VALOR_TOTAL", length = 10)
	private Double valorTotal;
	
	@Column(name = "DESCONTO", length = 10)
	private Double desconto;
	
	@Column(name = "ACRESCIMO", length = 10)
	private Double acrescimo;
	
	@Column(name = "OBSERVACAO", length = 300)
	private String observacao;
	
	@Column(length = 1, name = "STATUS")
	private Integer status;
	
	@ManyToOne
	@JoinColumn(name = "ID_PEDIDO")
	private Pedido pedido;
	
	@Transient
	private String descStatus;
	
	@ManyToOne
	@JoinColumn(name = "ID_PRODUTO")
	private Produto produto;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getQuantidade() {
		return quantidade;
	}
	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}
	public Double getValorUnitario() {
		return valorUnitario;
	}
	public void setValorUnitario(Double valorUnitario) {
		this.valorUnitario = valorUnitario;
	}
	public Double getValorTotal() {
		return valorTotal;
	}
	public void setValorTotal(Double valorTotal) {
		this.valorTotal = valorTotal;
	}
	public Double getDesconto() {
		return desconto;
	}
	public void setDesconto(Double desconto) {
		this.desconto = desconto;
	}
	public Double getAcrescimo() {
		return acrescimo;
	}
	public void setAcrescimo(Double acrescimo) {
		this.acrescimo = acrescimo;
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
	@JsonBackReference
	public Pedido getPedido() {
		return pedido;
	}
	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
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
	public Produto getProduto() {
		return produto;
	}
	public void setProduto(Produto produto) {
		this.produto = produto;
	}
}
