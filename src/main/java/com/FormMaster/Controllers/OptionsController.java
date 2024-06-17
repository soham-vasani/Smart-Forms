package com.FormMaster.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.FormMaster.Service.OptionsService;

@Controller
public class OptionsController {

    @Autowired
    OptionsService os;

    @GetMapping("/removeOptions/{optionId}")
    void removeOptions(@PathVariable("optionId") int optionId){
        os.removeOptions(optionId);
    }

}
