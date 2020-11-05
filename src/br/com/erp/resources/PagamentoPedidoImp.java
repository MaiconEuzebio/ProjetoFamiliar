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
import br.com.erp.model.PedidoPagamento;
import br.com.erp.model.Pedido;
import br.com.erp.util.UnidadePersistencia;

@Path("pagamentoPedido")
public class PagamentoPedidoImp {
	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public PedidoPagamento save(PedidoPagamento pagamentoPedido) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			
			
			
			if (pagamentoPedido.getId() == null) {
				em.persist(pagamentoPedido);
			} else {
				em.merge(pagamentoPedido);
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
		return pagamentoPedido;
	}
	
	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public  PedidoPagamento findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		PedidoPagamento pagamentoPedido = null;
		try {
			pagamentoPedido = em.find(PedidoPagamento.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return pagamentoPedido;
	}
	
	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<PedidoPagamento> pagamentoPedidos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<PedidoPagamento> pagamentoPedidos = null;

		try {
			pagamentoPedidos = em.createQuery("select a " 
							     + "  from PagamentoPedido a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return pagamentoPedidos;
	}
	
	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<PedidoPagamento> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<PedidoPagamento> pagamentoPedidos = null;

		try {
			pagamentoPedidos = em.createQuery("select a " 
								 + "  from PagamentoPedido a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return pagamentoPedidos;
	}
}

