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
import br.com.erp.model.Categoria;
import br.com.erp.model.Contato;
import br.com.erp.model.TipoContato;
import br.com.erp.util.UnidadePersistencia;

@Path("categoria")
public class CategoriaImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Categoria save(Categoria categoria) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (categoria.getId() == null) {
				em.persist(categoria);
			} else {
				em.merge(categoria);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return categoria;
	}

	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Categoria findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Categoria categoria = null;
		try {
			categoria = em.find(Categoria.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return categoria;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Categoria> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Categoria> categorias = null;

		try {
			categorias = em.createQuery("select a " 
							     + "  from Categoria a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return categorias;
	}

	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Categoria> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Categoria> categorias = null;

		try {
			categorias = em.createQuery("select a " 
								 + "  from Categoria a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return categorias;
	}

	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		try {
			Categoria categoria = em.find(Categoria.class, paramJson.getInt1());
			em.getTransaction().begin();
			CapCar capCar = obterDependencia(paramJson.getInt1());
			
			if(capCar != null) {
				throw new RuntimeException("Existe uma dependência relacionada a este registro: " + capCar.getId());
			}
			em.remove(categoria);
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
											   +"where a.categoria.id = :id")
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
