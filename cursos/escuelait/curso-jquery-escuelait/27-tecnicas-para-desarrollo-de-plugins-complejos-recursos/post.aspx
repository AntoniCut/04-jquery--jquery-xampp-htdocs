<% @Page Language="c#" %>
<%
	System.Threading.Thread.Sleep(2000);
	if(!string.IsNullOrEmpty(Request.Form["name"]) && !string.IsNullOrEmpty(Request.Form["phone"]))
	{
		Response.Write("Todo Ok");
	}
	else
	{
		Response.Write("Algo no ha ido bien");	
	}
%>