package com.FormMaster.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class accessDeniedController {

    @RequestMapping("/accessDenied")
    public String accessDenied() {
        return "/JSP_Page/access_denied";
    }
    
}
