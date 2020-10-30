package br.com.erp.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import br.com.erp.json.ParamJson;


@Provider
public class Handler implements ExceptionMapper<Exception> {

	@Override
	public Response toResponse(Exception exception) {
		exception.printStackTrace();
		ParamJson param = new ParamJson();
		param.setStr1(exception.getMessage());
		
		return Response.status(400).entity(param).type("application/json;charset=utf-8")
		        .build();
	}
}
