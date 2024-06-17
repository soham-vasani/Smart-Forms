package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.FormMaster.DTO.FormResponse_AnswerResponse_DTO;
import com.FormMaster.Entity.CreateForm;
import com.FormMaster.Service.CreateFormService;
import com.FormMaster.Service.FillFormService;

@Controller
public class FillFormController {

    @Autowired
    FillFormService ffs;

    @Autowired
    CreateFormService cfs;
    
    @RequestMapping("/fill_forms")
    public String fill_forms() {
        return "/JSP_Page/fill_forms";
    }

    @PostMapping("/sendFormData")
    @ResponseBody public String sendFormData(@RequestBody FormResponse_AnswerResponse_DTO formData){        
        return ffs.saveFormData(formData);
    }
    
    @GetMapping("/getUnSubmittedForm/{uId}")
    @ResponseBody public List<CreateForm> getUnSubmittedForm(@PathVariable("uId") Long userId){
        return cfs.getUnSubmittedForm(userId);
    }


}