package br.com.erp.resources;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.poi.util.SystemOutLogger;

import br.com.erp.json.ParamJson;
import br.com.erp.model.Caixa;
import br.com.erp.model.CaixaMovimentacao;
import br.com.erp.model.CapCar;
import br.com.erp.model.TipoCobranca;
import br.com.erp.util.UnidadePersistencia;

@Path("capCar")
public class CapCarImp {
	
	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public  CapCar save(CapCar capCar) {
	
		EntityManager em = UnidadePersistencia.createEntityManager();
		CaixaImp caixaImp = new CaixaImp();

		try {
			Caixa caixa = caixaImp.obterCaixaAberto();
			
			if(capCar.getStatus().intValue() == 0) {
				this.gerarMovimentacao(capCar);
			}
			if((capCar.getId() == null) && (capCar.getTipoCobranca().getTipo().equals("V") && capCar.getTipo().equals("P") && caixaImp.obterCaixaAberto() == null)) {
				em.getTransaction().begin();
				capCar.setStatus(1);
				em.persist(capCar);
				em.merge(capCar);
				em.getTransaction().commit();
				throw new RuntimeException("Nenhum caixa em aberto!");
			}
			if((capCar.getId() == null) && (capCar.getTipoCobranca().getTipo().equals("P") && capCar.getTipo().equals("P") && caixaImp.obterCaixaAberto() == null)) {
				em.getTransaction().begin();
				em.persist(capCar);
				em.merge(capCar);
				em.getTransaction().commit();	
				throw new RuntimeException("Nenhum caixa em aberto!");
			}
			em.getTransaction().begin();
			if ((capCar.getId() == null) && (capCar.getTipoCobranca().getTipo().equals("V") && capCar.getTipo().equals("P") && caixaImp.obterCaixaAberto() != null)) {
				gerarMovimentacao(capCar);
				System.out.println("CapCar paga com sucesso");
				capCar.setStatus(0);
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
			throw e;
		} finally {
			em.close();
		}
		return capCar;
	}
	
	public void gerarMovimentacao(CapCar capCar) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		CaixaImp caixaImp = new CaixaImp();
		
		try {
			
			Caixa caixa = caixaImp.obterCaixaAberto();
			CaixaMovimentacao caixaMovimentacao = new CaixaMovimentacao();
			caixaMovimentacao.setDataMovimentacao(new Date());
			caixaMovimentacao.setCaixa(caixa);
			caixaMovimentacao.setObservacao("Movimentação gerada a partir da conta "+capCar.getId());
			
			if(caixaImp.obterCaixaAberto() == null && capCar.getTipoCobranca().getTipo().equals("V")) {
				throw new RuntimeException("Nenhum caixa em aberto2!");
				
			}
			else if(caixaImp.obterCaixaAberto() == null && capCar.getTipoCobranca().getTipo().equals("P")) {
				throw new RuntimeException("Nenhum caixa em aberto2!");
			}
			
			else if(capCar.getTipo().equals("P") && capCar.getTipoCobranca().getTipo().equals("V")) {
				
				if(capCar.getValorTotal() > caixa.getValorAtual()) {
					throw new RuntimeException("Valor da conta superior ao valor total do caixa");
				}
				caixa.setValorAtual(caixa.getValorAtual() - capCar.getValorTotal());
				caixaMovimentacao.setTipo("D");
				
			}
			
			else if(capCar.getTipo().equals("P") && capCar.getTipoCobranca().getTipo().equals("P")||
					capCar.getTipo().equals("R") && capCar.getStatus().equals(0)) {
				
				if(capCar.getValorTotal() > caixa.getValorAtual()) {
					throw new RuntimeException("Valor da conta superior ao valor total do caixa");
				}
				caixa.setValorAtual(caixa.getValorAtual() - capCar.getValorTotal());
				caixaMovimentacao.setTipo("D");
				
			}
			
			else if(capCar.getTipoCobranca().getTipo().equals("P") && capCar.getTipo().equals("R") && caixaImp.obterCaixaAberto() != null) {
				caixa.setValorAtual(caixa.getValorAtual() + capCar.getValorTotal());
				//System.out.println("1 CapCar tipo: "+capCar.getTipo()+", cobranca tipo: "+capCar.getTipoCobranca().getTipo());
				capCar.setStatus(0);
				caixaMovimentacao.setTipo("C");
			}

			else if(capCar.getTipoCobranca().getTipo().equals("V") && capCar.getTipo().equals("R") && caixaImp.obterCaixaAberto() != null) {
				caixa.setValorAtual(caixa.getValorAtual() + capCar.getValorTotal());
				//System.out.println("2 CapCar tipo: "+capCar.getTipo()+", cobranca tipo: "+capCar.getTipoCobranca().getTipo());
				capCar.setStatus(0);
				caixaMovimentacao.setTipo("C");
			}
			else if(capCar.getTipoCobranca().getTipo().equals("V") && capCar.getTipo().equals("P") && caixaImp.obterCaixaAberto() != null) {
				caixa.setValorAtual(caixa.getValorAtual() - capCar.getValorTotal());
				//System.out.println("3 CapCar tipo: "+capCar.getTipo()+", cobranca tipo: "+capCar.getTipoCobranca().getTipo());
				capCar.setStatus(0);
				caixaMovimentacao.setTipo("D");
				
			}else if(capCar.getTipoCobranca().getTipo().equals("V") && capCar.getTipo().equals("P") && caixaImp.obterCaixaAberto() == null) {
				//System.out.println("4 CapCar tipo: "+capCar.getTipo()+", cobranca tipo: "+capCar.getTipoCobranca().getTipo());
				capCar.setStatus(1);
			}
			caixaMovimentacao.setValorMovimentacao(capCar.getValorTotal());
			
			em.getTransaction().begin();
			em.persist(caixaMovimentacao);
			em.getTransaction().commit();
			
			caixaImp.save(caixa);
			
			System.out.println("CapCar inclu�da com sucesso");
		} catch (Exception e) {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			e.printStackTrace();
			System.out.println("Não foi poss�vel incluir a capCar");
			throw e;
		} finally {
			em.close();
		}
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
	
	
	@Path("exibirTodosInativosP")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<CapCar> exibirTodosInativos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<CapCar> capCarS = null;

		try {
			capCarS = em.createQuery("select a " 
							     + "  from CapCar a"
							     + " where a.status = 0"
							     + " and a.tipo = 'P'").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return capCarS;
	}
	
	
	@Path("obterTodosInativosP")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	
	public List<CapCar> obterTodosInativos() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<CapCar> capCarS = null;

		try {
			capCarS = em.createQuery("select a " 
								 + "  from CapCar a" 
								 + " where a.status = 0"
								 + " and a.tipo = 'P'").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return capCarS;
	}
	
	@Path("exibirTodosInativosR")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<CapCar> exibirTodosInativosR() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<CapCar> capCarS = null;

		try {
			capCarS = em.createQuery("select a " 
							     + "  from CapCar a"
							     + " where a.status = 0"
							     + " and a.tipo = 'R'").getResultList();

		} catch (Exception e) {

		} finally {
			em.close();
		}
		return capCarS;
	}
	
	@Path("obterTodosInativosR")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<CapCar> obterTodosInativosR() {
		EntityManager em = UnidadePersistencia.createEntityManager();
		List<CapCar> capCarS = null;

		try {
			capCarS = em.createQuery("select a " 
								 + "  from CapCar a" 
								 + " where a.status = 0"
								 + " and a.tipo = 'R'").getResultList();
			
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
			gerarMovimentacao(capCar);
			em.remove(capCar);
			em.getTransaction().commit();
			System.out.println("CapCar Excluída com sucesso");
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
			System.out.println("Não foi possível excluir a capCar");
		} finally {
			em.close();
		}

	}
	
	
}
