package br.com.erp.resources;

import java.util.List;

import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import br.com.erp.json.ParamJson;
import br.com.erp.model.Pedido;
import br.com.erp.model.PedidoItem;
import br.com.erp.model.Produto;
import br.com.erp.util.UnidadePersistencia;

@Path("pedido")
public class PedidoImp {
	
	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Pedido save(Pedido pedido) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		em.getTransaction().begin();
		try {



			for(PedidoItem pedidoItem : pedido.getItens()) {
				gerarPedidoMovimentacao(pedidoItem);
			}			

			
			
			pedido.atualizarItens();
			pedido.atualizarPagamentos();
			
			if (pedido.getId() == null) {
				em.persist(pedido);
			} else {
				em.merge(pedido);
			}
			em.getTransaction().commit();
			System.out.println("Pessoa inclu�da com sucesso");
		} catch (Exception e) {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			e.printStackTrace();
			em.getTransaction().rollback();
			System.out.println("Não foi poss�vel incluir a pessoa");
		} finally {
			em.close();
		}
		return pedido;
	}
	
	
public void gerarPedidoMovimentacao(PedidoItem item) {
	EntityManager em = UnidadePersistencia.createEntityManager();
		try {
			em.getTransaction().begin();
			if(item.getQuantidade()!=null && item.getId()==null) {
				Produto produto = item.getProduto();
				produto.setQuantidadeAtual(produto.getQuantidadeAtual()-item.getQuantidade());
				System.out.println(produto.getQuantidadeAtual());
				System.out.println("Quantidade baixada do estoque com sucesso");
				em.merge(produto);
				
			}else if(item.getQuantidade()!=null && item.getId()!=null && item.getValorUnitario() !=null) {
				PedidoItem pedidoItem = new PedidoItem();
				System.out.println(pedidoItem.getQuantidade());
				System.out.println("Quantidade editada com sucesso");
				em.merge(pedidoItem);
			}
				em.getTransaction().commit();
		}catch(Exception e) {
				em.getTransaction().rollback();
			
		}finally {
			em.close();
		}
	}




public void gerarDevolucao(PedidoItem item) {
	EntityManager em = UnidadePersistencia.createEntityManager();
	try {
		em.getTransaction().begin();
		if(item.getQuantidade()!=null && item.getId()!=null) {
		Produto produto;
		produto = item.getProduto();
		System.out.println("Antes: "+produto.getQuantidadeAtual());
		produto.setQuantidadeAtual(item.getQuantidade()+produto.getQuantidadeAtual());
		System.out.println("Agora: "+produto.getQuantidadeAtual());
		System.out.println("Quantidade devolvida com sucesso");
		em.merge(produto);
		}
		em.getTransaction().commit();
		
	}catch(Exception e) {
		em.getTransaction().rollback();
	}finally {
		em.close();
	}
}
	





	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Pedido findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Pedido pedido = null;
		try {
			pedido = em.find(Pedido.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return pedido;
	}
	
	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Pedido> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Pedido> pedidos = null;

		try {
			pedidos = em.createQuery("select a " 
							     + "  from Pedido a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return pedidos;
	}
	
	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Pedido> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Pedido> pedidos = null;

		try {
			pedidos = em.createQuery("select a " 
								 + "  from Pedido a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return pedidos;
	}
	
	
	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		try {
			Pedido pedido = em.find(Pedido.class, paramJson.getInt1());
			em.getTransaction().begin();
			
			
			if(pedido.getStatus()== 0) {
				throw new RuntimeException("Existe pedido esta fechado e não pode ser excluído.");
			}else if(pedido.getStatus()== 1) {
				for(PedidoItem pedidoItem : pedido.getItens()) {
					gerarDevolucao(pedidoItem);
				}
				em.remove(pedido);
				System.out.println("Pedido removido com sucesso");
				em.getTransaction().commit();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
			throw e;
		} finally {
			em.close();
		}

	}
	
	
	
	
	
	@Path("obterPedidoFechado")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	
	public Pedido obterPedidoFechado() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		Pedido pedido = null;
		try {
			pedido = (Pedido) em.createQuery("select a " 
				     						+ "from Pedido a "
				     						+ "where a.status = 0")
											.setMaxResults(1)
											.getSingleResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			em.close();
		}
	
		return pedido;
	}
	
	
	
	
	
	
	public Pedido obterPedidoStatus() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		Pedido pedido = null;
		try {
			pedido = (Pedido) em.createQuery("select a " 
				     						+ "from Pedido a "
				     						+ "where a.status = 1"
				     						+ "or a.status = 0")
											.setMaxResults(1)
											.getSingleResult();
			
		} catch (Exception e) {
			e.printStackTrace();
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
		} finally {
			em.close();
		}
	
		return pedido;
	}
	
	
}	
