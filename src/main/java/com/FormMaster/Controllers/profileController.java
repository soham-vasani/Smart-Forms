package com.FormMaster.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class profileController {

    @RequestMapping("/profile")
    public String profile(){
        return "/JSP_Page/profile";
    }

}
