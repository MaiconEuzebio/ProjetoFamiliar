package br.com.erp.model;

public class Teste {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			
			System.out.println("Entrou linha 9");
			
			throw new RuntimeException("Erro na linha 11");
		}catch (Exception e) {
			
			System.out.println(e.getMessage());
			
		}
	}

}
