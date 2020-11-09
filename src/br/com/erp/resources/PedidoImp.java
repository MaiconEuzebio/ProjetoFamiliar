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
		try {


			for(PedidoItem pedidoItem : pedido.getItens()) {
				gerarPedidoMovimentacao(pedidoItem);
			}			

			em.getTransaction().begin();
			
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
			if(item.getQuantidade()!=null) {
				Produto produto = item.getProduto();
				produto.setQuantidadeAtual(produto.getQuantidadeAtual()-item.getQuantidade());
				System.out.println(produto.getQuantidadeAtual());
				System.out.println("Quantidade atualizada co sucesso");
				em.merge(produto);
			}
				em.getTransaction().commit();
		}catch(Exception e) {
				em.getTransaction().isActive();
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
			Pedido pedidoAux = obterPedidoFechado() ;
			
			if(pedidoAux != null) {
				throw new RuntimeException("Existe pedido esta fechado e não pode ser excluído: " + pedidoAux.getId());
			}
			em.remove(pedido);
			em.getTransaction().commit();

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
				     + "where a.status = 0"
					).getSingleResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			em.close();
		}
	
		return pedido;
	}
	
	
}	
