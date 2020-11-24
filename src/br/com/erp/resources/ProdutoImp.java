package br.com.erp.resources;

import java.util.List;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.bouncycastle.crypto.RuntimeCryptoException;

import br.com.erp.json.ParamJson;
import br.com.erp.model.Pedido;
import br.com.erp.model.PedidoItem;
import br.com.erp.model.Produto;
import br.com.erp.util.UnidadePersistencia;

@Path("produto")
public class ProdutoImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Produto save(Produto produto) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (produto.getId() == null) {
				em.persist(produto);
			} else {
				em.merge(produto);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return produto;
	}

	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Produto findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Produto produto = null;
		try {
			produto = em.find(Produto.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return produto;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Produto> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Produto> produtos = null;

		try {
			produtos = em.createQuery("select a " 
							     + "  from Produto a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return produtos;
	}

	@Path("obterTodosAtivosEmEstoque")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Produto> obterTodosAtivosEmEstoque() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Produto> produtos = null;

		try {
			produtos = em.createQuery("select a " 
								 + " from Produto a" 
								 + " where a.status = 1"
								 + " and quantidadeAtual > 0").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return produtos;
	}
	
	

	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			Produto produto = em.find(Produto.class, paramJson.getInt1());
			em.getTransaction().begin();
			PedidoItem pedidoItem = obterDependencia(paramJson.getInt1());
			
			if(pedidoItem != null) {
				throw new RuntimeException("Existe uma depêndencia relacionada a este registro: "+pedidoItem.getId());
			}
			em.remove(produto);
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

	
	
	public PedidoItem obterDependencia(Integer id) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		PedidoItem pedidoItem = null;
		
		try {
			pedidoItem = (PedidoItem) em.createQuery("select a "
											   +"from PedidoItem a "
											   +"where a.produto.id = :id")
								  .setParameter("id", id)
								  .setMaxResults(1)
					              .getSingleResult();
		}catch(Exception e){
			e.printStackTrace();
		}finally {
			em.close();
		}
		
		return pedidoItem;
	}
	
	
}
