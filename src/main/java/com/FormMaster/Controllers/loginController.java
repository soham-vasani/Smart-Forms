package com.FormMaster.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpSession;

import com.FormMaster.Entity.AddUser;

@Controller 
public class loginController {

    @RequestMapping("/loginPage")    
    public String login() {
        return "JSP_Page/index";                
    }

    @GetMapping("/getUserSessionData")
    @ResponseBody AddUser getUserSessionData(HttpSession session){

        AddUser sessionData = new AddUser();
        
        sessionData.setUserId((int) session.getAttribute("uId"));
        sessionData.setFirstName((String) session.getAttribute("uName"));
        sessionData.setRole((String) session.getAttribute("uRole"));
        sessionData.setImagePath((String) session.getAttribute("uImg")) ;
        
        

        return sessionData;
    }
}
