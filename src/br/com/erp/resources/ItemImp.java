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
import br.com.erp.model.Item;
import br.com.erp.util.UnidadePersistencia;

@Path("item")
public class ItemImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Item save(Item item) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
						
			if (item.getId() == null) {
				em.persist(item);
			} else {
				em.merge(item);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return item;
	}

	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Item findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Item item = null;
		try {
			item = em.find(Item.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return item;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Item> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Item> itens = null;

		try {
			itens = em.createQuery("select a " 
							     + "  from Item a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return itens;
	}

	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Item> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Item> itens = null;

		try {
			itens = em.createQuery("select a " 
								 + "  from Item a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return itens;
	}

	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			Item item = em.find(Item.class, paramJson.getInt1());
			em.getTransaction().begin();
			em.remove(item);
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();

		} finally {
			em.close();
		}

	}
}
