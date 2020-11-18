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
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "PEDIDO_PAGAMENTO")
public class PedidoPagamento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	
	@Column(name = "VALOR")
	private Double valor;
	
	@Column(name = "OBSERVACAO", length = 300)
	private String observacao;
	
	@Column(name = "DATA_VENCIMENTO")
	private Date dataVencimento;
	
	@ManyToOne
	@JoinColumn(name = "ID_CATEGORIA")
	private TipoCobranca categoria;
	
	@ManyToOne
	@JoinColumn(name = "ID_PEDIDO")
	private Pedido pedido;
	
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
	public Double getValor() {
		return valor;
	}
	public void setValor(Double valor) {
		this.valor = valor;
	}
	
	public String getObservacao() {
		return observacao;
	}
	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	
	public Date getDataVencimento() {
		return dataVencimento;
	}
	public void setDataVencimento(Date dataVencimento) {
		this.dataVencimento = dataVencimento;
	}
	public TipoCobranca getCategoria() {
		return categoria;
	}
	public void setCategoria(TipoCobranca categoria) {
		this.categoria = categoria;
	}
	@JsonBackReference
	public Pedido getPedido() {
		return pedido;
	}
	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
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
