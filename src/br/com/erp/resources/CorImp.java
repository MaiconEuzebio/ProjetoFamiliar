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
import br.com.erp.model.Cor;
import br.com.erp.model.Marca;
import br.com.erp.model.Produto;
import br.com.erp.model.TipoContato;
import br.com.erp.util.UnidadePersistencia;

@Path("cor")
public class CorImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Cor save(Cor cor) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (cor.getId() == null) {
				em.persist(cor);
			} else {
				em.merge(cor);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return cor;
	}

	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Cor findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Cor cor = null;
		try {
			cor = em.find(Cor.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return cor;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Cor> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Cor> cores = null;

		try {
			cores = em.createQuery("select a " 
							     + "  from Cor a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return cores;
	}

	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Cor> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Cor> cores = null;

		try {
			cores = em.createQuery("select a " 
								 + "  from Cor a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return cores;
	}

	
	
	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		try {
			Cor cor = em.find(Cor.class, paramJson.getInt1());
			em.getTransaction().begin();
			Produto produto = obterDependencia(paramJson.getInt1());
			
			if(produto != null) {
				throw new RuntimeException("Existe uma dependência relacionada a este registro: " + produto.getId());
			}
			em.remove(cor);
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
	
	
	
	
	
	
	public Produto obterDependencia(Integer id) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		Produto produto = null;
		
		try {
			produto = (Produto) em.createQuery("select a "
											   +"from Produto a "
											   +"where a.cor.id = :id")
								  .setParameter("id", id)
								  .setMaxResults(1)
					              .getSingleResult();
		}catch(Exception e){
			e.printStackTrace();
		}finally {
			em.close();
		}
		
		return produto;
	}
	
	
}
