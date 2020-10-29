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
import br.com.erp.model.CaixaMovimentacao;
import br.com.erp.model.CapCar;
import br.com.erp.util.UnidadePersistencia;

@Path("caixaMovimentacao")
public class CaixaMovimentacaoImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public CaixaMovimentacao save(CaixaMovimentacao caixaMovimentacao ) {
		double valor = 1;
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (caixaMovimentacao.getId() == null) {
				em.persist(caixaMovimentacao );
			} else {
				em.merge(caixaMovimentacao);
				
			}
			em.getTransaction().commit();
			
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return caixaMovimentacao;
	}
	
	

	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public CaixaMovimentacao findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		CaixaMovimentacao caixaMovimentacao = null;
		try {
			caixaMovimentacao = em.find(CaixaMovimentacao.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return caixaMovimentacao;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<CaixaMovimentacao> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<CaixaMovimentacao> caixaMovimentacoes = null;

		try {
			caixaMovimentacoes = em.createQuery("select a " 
							     + "  from CaixaMovimentacao a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return caixaMovimentacoes;
	}

	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<CaixaMovimentacao> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<CaixaMovimentacao> caixaMovimentacoes = null;

		try {
			caixaMovimentacoes = em.createQuery("select a " 
								 + "  from CaixaMovimentacao a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return caixaMovimentacoes;
	}

	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			CaixaMovimentacao caixaMovimentacao = em.find(CaixaMovimentacao.class, paramJson.getInt1());
			em.getTransaction().begin();
			em.remove(caixaMovimentacao);
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();

		} finally {
			em.close();
		}

	}
}