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
import br.com.erp.model.Contato;
import br.com.erp.model.TipoContato;
import br.com.erp.util.UnidadePersistencia;

@Path("tipoContato")
public class TipoContatoImp {
	
	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public TipoContato save(TipoContato tipoContato) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (tipoContato.getId() == null) {
				em.persist(tipoContato);
			} else {
				em.merge(tipoContato);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return tipoContato;
	}
	
	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public TipoContato findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		TipoContato tipoContato = null;
		try {
			tipoContato = em.find(TipoContato.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return tipoContato;
	}
	
	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<TipoContato> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<TipoContato> tipoContatos = null;

		try {
			tipoContatos = em.createQuery("select a " 
							     + "  from TipoContato a").getResultList();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			em.close();
		}
		return tipoContatos;
	}
	
	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<TipoContato> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<TipoContato> tipoContatos = null;

		try {
			tipoContatos = em.createQuery("select a " 
								 + "  from TipoContato a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return tipoContatos;
	}
	
	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		try {
			TipoContato tipoContato = em.find(TipoContato.class, paramJson.getInt1());
			em.getTransaction().begin();
			Contato contato = obterDependencia();
			
			if(contato != null) {
				System.out.println("Já existe uma dependência: " + contato.getId());
			}
			em.remove(tipoContato);
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
	
	
	
	public Contato obterDependencia() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		Contato contato = null;
		
		try {
			contato = (Contato) em.createQuery("select a "
											   +"from Contato a "
											   +"where a.tipoContato.id = 64").getResultList();
		}catch(Exception e){
			e.printStackTrace();
		}finally {
			em.close();
		}
		
		return contato;
	}
	
}
