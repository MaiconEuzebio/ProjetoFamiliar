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
import br.com.erp.model.Endereco;
import br.com.erp.util.UnidadePersistencia;

@Path("endereco")
public class EnderecoImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Endereco save(Endereco endereco) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (endereco.getId() == null) {
				em.persist(endereco);
			} else {
				em.merge(endereco);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return endereco;
	}

	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Endereco findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Endereco endereco = null;
		try {
			endereco = em.find(Endereco.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return endereco;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Endereco> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Endereco> enderecos = null;

		try {
			enderecos = em.createQuery("select a " 
							     + "  from Endereco a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return enderecos;
	}

	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Endereco> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Endereco> enderecos = null;

		try {
			enderecos = em.createQuery("select a " 
								 + "  from Endereco a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return enderecos;
	}

	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			Endereco endereco = em.find(Endereco.class, paramJson.getInt1());
			em.getTransaction().begin();
			em.remove(endereco);
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();

		} finally {
			em.close();
		}

	}
}
