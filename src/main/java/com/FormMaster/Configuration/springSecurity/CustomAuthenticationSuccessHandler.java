package com.FormMaster.Configuration.springSecurity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Set;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(jakarta.servlet.http.HttpServletRequest request,
            jakarta.servlet.http.HttpServletResponse response, Authentication authentication)
            throws IOException, jakarta.servlet.ServletException {
       

        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());
        
        if (roles.contains("ADMIN")) {
            response.sendRedirect("/master_form");
        } else if (roles.contains("USER")) {
            response.sendRedirect("/fill_forms");
        }else{
            response.sendRedirect("/loginPage");
        }

    }
}
