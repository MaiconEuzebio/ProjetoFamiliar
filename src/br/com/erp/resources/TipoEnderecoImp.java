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
import br.com.erp.model.TipoContato;
import br.com.erp.model.TipoEndereco;
import br.com.erp.util.UnidadePersistencia;


	@Path("tipoEndereco")
	public class TipoEnderecoImp {
		
		@Path("salvar")
		@POST
		@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
		@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
		public TipoEndereco save(TipoEndereco tipoEndereco) {

			EntityManager em = UnidadePersistencia.createEntityManager();

			try {
				em.getTransaction().begin();
				if (tipoEndereco.getId() == null) {
					em.persist(tipoEndereco);
				} else {
					em.merge(tipoEndereco);
				}
				em.getTransaction().commit();

			} catch (Exception e) {
				e.printStackTrace();
				em.getTransaction().rollback();
			} finally {
				em.close();
			}
			return tipoEndereco;
		}
		
		@Path("obterPorId")
		@POST
		@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
		@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
		public TipoEndereco findByID(ParamJson paramJson) {
			EntityManager em = UnidadePersistencia.createEntityManager();
			TipoEndereco tipoEndereco = null;
			try {
				tipoEndereco = em.find(TipoEndereco.class, paramJson.getInt1());
			} catch (Exception e) {
				System.err.println(e);
			} finally {
				em.close();
			}
			return tipoEndereco;
		}
		
		@Path("obterTodos")
		@GET
		@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
		@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
		public List<TipoEndereco> obterTodos() {
			EntityManager em = UnidadePersistencia.createEntityManager();
			List<TipoEndereco> tipoEnderecos = null;

			try {
				tipoEnderecos = em.createQuery("select a " 
								     + "  from TipoEndereco a").getResultList();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				em.close();
			}
			return tipoEnderecos;
		}
		
		@Path("obterTodosAtivos")
		@GET
		@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
		@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
		public List<TipoEndereco> obterTodosAtivos() {
			EntityManager em = UnidadePersistencia.createEntityManager();
			List<TipoEndereco> tipoEnderecos = null;

			try {
				tipoEnderecos = em.createQuery("select a " 
									 + "  from TipoEndereco a" 
									 + " where a.status = 1").getResultList();

			} catch (Exception e) {

			} finally {
				em.close();
			}
			return tipoEnderecos;
		}
		
		@Path("removerPorId")
		@POST
		@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
		@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
		public void remove(ParamJson paramJson) {
			EntityManager em = UnidadePersistencia.createEntityManager();

			try {
				TipoEndereco tipoEndereco = em.find(TipoEndereco.class, paramJson.getInt1());
				em.getTransaction().begin();
				em.remove(tipoEndereco);
				em.getTransaction().commit();

			} catch (Exception e) {
				e.printStackTrace();
				em.getTransaction().rollback();

			} finally {
				em.close();
			}

		}
}

