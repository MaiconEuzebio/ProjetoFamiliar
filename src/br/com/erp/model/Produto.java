package br.com.erp.model;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Produto {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	@Column(length = 100, name = "DESCRICAO")
	private String descricao;
	@Column(length = 10, name = "QUANTIDADE_MAXIMA")
	private Double quantidadeMaxima;
	@Column(length = 10, name = "QUANTIDADE_MINIMA")
	private Double quantidadeMinima;
	@Column(length = 10, name = "QUANTIDADE_ATUAL")
	private Double quantidadeAtual;
	@Column(length = 10, name = "PRECO_CUSTO")
	private Double precoCusto;
	@Column(length = 10, name = "PRECO_VENDA")
	private Double precoVenda;
	@ManyToOne
	@JoinColumn(name = "ID_COR")
	private Cor cor;
	@ManyToOne
	@JoinColumn(name = "ID_MARCA")
	private Marca marca;
	@ManyToOne
	@JoinColumn(name = "ID_TAMANHO")
	private Tamanho tamanho;
	@ManyToOne
	@JoinColumn(name = "ID_UNIDADE_MEDIDA")
	private UnidadeMedida unidadeMedida;
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
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Double getQuantidadeMaxima() {
		return quantidadeMaxima;
	}
	public void setQuantidadeMaxima(Double quantidadeMaxima) {
		this.quantidadeMaxima = quantidadeMaxima;
	}
	public Double getQuantidadeMinima() {
		return quantidadeMinima;
	}
	public void setQuantidadeMinima(Double quantidadeMinima) {
		this.quantidadeMinima = quantidadeMinima;
	}
	public Double getQuantidadeAtual() {
		return quantidadeAtual;
	}
	public void setQuantidadeAtual(Double quantidadeAtual) {
		this.quantidadeAtual = quantidadeAtual;
	}
	public Double getPrecoCusto() {
		return precoCusto;
	}
	public void setPrecoCusto(Double precoCusto) {
		this.precoCusto = precoCusto;
	}
	public Double getPrecoVenda() {
		return precoVenda;
	}
	public void setPrecoVenda(Double precoVenda) {
		this.precoVenda = precoVenda;
	}
	public Cor getCor() {
		return cor;
	}
	public void setCor(Cor cor) {
		this.cor = cor;
	}
	public Marca getMarca() {
		return marca;
	}
	public void setMarca(Marca marca) {
		this.marca = marca;
	}
	public Tamanho getTamanho() {
		return tamanho;
	}
	public void setTamanho(Tamanho tamanho) {
		this.tamanho = tamanho;
	}
	public UnidadeMedida getUnidadeMedida() {
		return unidadeMedida;
	}
	public void setUnidadeMedida(UnidadeMedida unidadeMedida) {
		this.unidadeMedida = unidadeMedida;
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
