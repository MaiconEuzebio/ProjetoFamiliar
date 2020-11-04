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
import br.com.erp.model.Caixa;
import br.com.erp.model.CaixaMovimentacao;
import br.com.erp.util.UnidadePersistencia;

@Path("caixa")
public class CaixaImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Caixa save(Caixa caixa) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			
			caixa.atualizarMovimentacao();
			
			if (caixa.getId() == null) {
				
				em.persist(caixa);
			} else {
				em.merge(caixa);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			if(em.getTransaction().isActive()){
				em.getTransaction().rollback();
			}
		} finally {
			em.close();
		}
		return caixa;
	}
	
	@Path("abrirCaixa")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Caixa abrirCaixa (Caixa caixa) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
	try {
			Caixa caixaAux = obterCaixaAberto();
			
			if(caixaAux != null) {
				throw new RuntimeException("Já existe um caixa em aberto : " + caixaAux.getId());
			}
			
	} catch (Exception e) {
		e.printStackTrace();
		if(em.getTransaction().isActive()){
			em.getTransaction().rollback();
		}
		throw e;
	}
	finally {
		em.close();
	}
		return caixa;
	}
	
	@Path("obterCaixaAberto")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	
	public Caixa obterCaixaAberto () {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		Caixa caixa = null;
		try {
			caixa = (Caixa) em.createQuery("select a " 
				     + "from Caixa a "
				     + "where a.status = 1"
					).getSingleResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			em.close();
		}
	
		return caixa;
	}
	
	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Caixa findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Caixa caixa = null;
		try {
			caixa = em.find(Caixa.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return caixa;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Caixa> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Caixa> caixas = null;

		try {
			caixas = em.createQuery("select a " 
							     + "  from Caixa a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return caixas;
	}

	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Caixa> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Caixa> caixas = null;

		try {
			caixas = em.createQuery("select a " 
								 + "  from Caixa a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return caixas;
	}

	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			Caixa caixa = em.find(Caixa.class, paramJson.getInt1());
			em.getTransaction().begin();
			Caixa caixaA = obterCaixaAberto();
			if(caixaA != null) {
				throw new RuntimeException("Este caixa está aberto e não pode ser excluído!: " + caixaA.getId());
			}
			em.remove(caixa);
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
}

