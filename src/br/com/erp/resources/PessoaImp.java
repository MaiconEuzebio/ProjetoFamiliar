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
import br.com.erp.model.Contato;
import br.com.erp.model.Endereco;
import br.com.erp.model.Pessoa;
import br.com.erp.model.Produto;
import br.com.erp.model.TipoContato;
import br.com.erp.util.UnidadePersistencia;

@Path("pessoa")
public class PessoaImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Pessoa save(Pessoa pessoa) {

		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			pessoa.atualizarEnderecos();
			pessoa.atualizarContatos();
			em.getTransaction().begin();
			
			
			
			if (pessoa.getId() == null) {
				em.persist(pessoa);
			} else {
				em.merge(pessoa);
			}
			em.getTransaction().commit();
			System.out.println("Pessoa inclu�da com sucesso");
		} catch (Exception e) {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			e.printStackTrace();
			em.getTransaction().rollback();
			System.out.println("Não foi poss�vel incluir a pessoa");
		} finally {
			em.close();
		}
		return pessoa;
	}

	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Pessoa findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Pessoa pessoa = null;
		try {
			pessoa = em.find(Pessoa.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return pessoa;
	}

	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Pessoa> obterTodos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Pessoa> pessoas = null;

		try {
			pessoas = em.createQuery("select a " 
							     + "  from Pessoa a").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return pessoas;
	}

	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Pessoa> obterTodosAtivos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<Pessoa> pessoas = null;

		try {
			pessoas = em.createQuery("select a " 
								 + "  from Pessoa a" 
								 + " where a.status = 1").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return pessoas;
	}

	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		try {
			Pessoa pessoa = em.find(Pessoa.class, paramJson.getInt1());
			em.getTransaction().begin();
			CapCar capCar = obterDependencia(paramJson.getInt1());
			
			if(capCar != null) {
				throw new RuntimeException("Existe uma dependência relacionada a este registro: " + capCar.getId());
			}
			em.remove(pessoa);
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
											   +"from capcar a "
											   +"where a.cliente.id = :id"
											   +"and tipo a = 'P'"
											   +"or tipo a = 'R'"
											   +"and status a = 0"
											   +"or status a = 1")
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
