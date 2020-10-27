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
import br.com.erp.model.CapCar;
import br.com.erp.util.UnidadePersistencia;

@Path("capCar")
public class CapCarImp {
	
	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public  CapCar save(CapCar capCar) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (capCar.getId() == null) {
				em.persist(capCar);
			} else {
				em.merge(capCar);
			}
			em.getTransaction().commit();
			System.out.println("CapCar inclu�da com sucesso");
		} catch (Exception e) {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			e.printStackTrace();
			System.out.println("Não foi poss�vel incluir a capCar");
		} finally {
			em.close();
		}
		return capCar;
	}
	
	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public CapCar findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		CapCar capCar = null;
		try {
			capCar = em.find(CapCar.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return capCar;
	}

	@Path("obterTodos")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<CapCar> obterTodos(ParamJson param) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<CapCar> capCarS = null;

		try {
			capCarS = em.createQuery("select a " 
							     + "  from CapCar a"
							     + " where a.tipo = :qualTela")
						.setParameter("qualTela", param.getStr1())
						.getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return capCarS;
	}
	
	
	
	@Path("exibirTodosAtivos")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<CapCar> exibirTodosAtivos(ParamJson param) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<CapCar> capCarS = null;

		try {
			capCarS = em.createQuery("select a " 
							     + "  from CapCar a"
							     + " where a.tipo = :qualTela"
							     + " and status = 1")
						.setParameter("qualTela", param.getStr1())
						.getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return capCarS;
	}
	
	
	
	
	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<CapCar> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<CapCar> capCarS = null;

		try {
			capCarS = em.createQuery("select a " 
								 + "  from CapCar a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return capCarS;
	}
	
	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			CapCar capCar = em.find(CapCar.class, paramJson.getInt1());
			em.getTransaction().begin();
			em.remove(capCar);
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();

		} finally {
			em.close();
		}

	}
	
	
}
