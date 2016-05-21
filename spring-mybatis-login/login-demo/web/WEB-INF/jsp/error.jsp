<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: zhangjikai
  Date: 16-3-30
  Time: 上午8:55
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isErrorPage="true" %>
<html>
<head>
    <title>This is error</title>
    <style type="text/css">
        .error {
            font-size: 14px;
            font-weight: normal;
        }
        .error p{
            line-height: 20px;
        }
    </style>
</head>
<body>
<div class="error">
    <%=exception%>
    <p>
        <c:forEach var="trace" items="${pageContext.exception.stackTrace}">
            ${trace}<br />
        </c:forEach>
    </p>
</div>
</body>
</html>
