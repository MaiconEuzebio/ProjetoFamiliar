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
import br.com.erp.model.UnidadeMedida;
import br.com.erp.util.UnidadePersistencia;

@Path("unidadeMedida")
public class UnidadeMedidaImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public UnidadeMedida save(UnidadeMedida unidadeMedida) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (unidadeMedida.getId() == null) {
				em.persist(unidadeMedida);
			} else {
				em.merge(unidadeMedida);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return unidadeMedida;
	}

	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public UnidadeMedida findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		UnidadeMedida unidadeMedida = null;
		try {
			unidadeMedida = em.find(UnidadeMedida.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return unidadeMedida;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<UnidadeMedida> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<UnidadeMedida> unidadeMedidas = null;

		try {
			unidadeMedidas = em.createQuery("select a " 
							     + "  from UnidadeMedida a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return unidadeMedidas;
	}

	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<UnidadeMedida> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<UnidadeMedida> unidadeMedidas = null;

		try {
			unidadeMedidas = em.createQuery("select a " 
								 + "  from UnidadeMedida a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return unidadeMedidas;
	}

	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			UnidadeMedida unidadeMedida = em.find(UnidadeMedida.class, paramJson.getInt1());
			em.getTransaction().begin();
			em.remove(unidadeMedida);
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();

		} finally {
			em.close();
		}

	}
}
