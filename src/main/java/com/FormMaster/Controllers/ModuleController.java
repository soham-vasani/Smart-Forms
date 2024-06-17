package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.FormMaster.Entity.Module;
import com.FormMaster.Service.ModuleService;

@Controller
public class ModuleController {
    
    @Autowired
    ModuleService ms;

    @GetMapping("/module")
    @ResponseBody public List<Module> getAllModule(){
        return ms.getAllModule();
    }
    
}
