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
import br.com.erp.model.Produto;
import br.com.erp.model.TipoCobranca;
import br.com.erp.util.UnidadePersistencia;

@Path("tipoCobranca")
public class TipoCobrancaImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public TipoCobranca save(TipoCobranca tipoCobranca) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (tipoCobranca.getId() == null) {
				em.persist(tipoCobranca);
			} else {
				em.merge(tipoCobranca);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return tipoCobranca;
	}

	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public TipoCobranca findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		TipoCobranca tipoCobranca = null;
		try {
			tipoCobranca = em.find(TipoCobranca.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return tipoCobranca;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<TipoCobranca> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<TipoCobranca> tipoCobrancas = null;

		try {
			tipoCobrancas = em.createQuery("select a " 
							     + "  from TipoCobranca a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return tipoCobrancas;
	}

	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<TipoCobranca> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<TipoCobranca> tipoCobrancas = null;

		try {
			tipoCobrancas = em.createQuery("select a " 
								 + "  from TipoCobranca a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return tipoCobrancas;
	}

	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			TipoCobranca tipoCobranca = em.find(TipoCobranca.class, paramJson.getInt1());
			em.getTransaction().begin();
			CapCar capCar = obterDependencia(paramJson.getInt1());
			
			if(capCar != null) {
				throw new RuntimeException("Existe uma depêndencia para este registro: "+capCar.getId());
			}
			
			em.remove(tipoCobranca);
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
	
	
	public CapCar obterDependencia(Integer id) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		CapCar capCar = null;
		
		try {
			capCar = (CapCar) em.createQuery("select a "
											   +"from CapCar a "
											   +"where a.tipoCobranca.id = :id")
								  .setParameter("id", id)
								  .setMaxResults(1)
					              .getSingleResult();
		}catch(Exception e){
			e.printStackTrace();
		}finally {
			em.close();
		}
		
		return capCar;
	}
	
}
