package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.FormMaster.DTO.CreateForm_Questions_Options_DTO;
import com.FormMaster.Entity.CreateForm;
import com.FormMaster.Entity.Options;
import com.FormMaster.Entity.Questions;
import com.FormMaster.Service.CreateFormService;

import jakarta.servlet.http.HttpSession;

@Controller
public class CreateFormController {

    @Autowired
    CreateFormService cfs;
    
    // @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping("/master_form")
    public String master_form(){
        return "/JSP_Page/master_form";
    }

    @GetMapping("/getLastFormId")
    @ResponseBody public int getLastFormId(){
        return cfs.getLastFormId();
    }

    @PostMapping("/insertAndUpdateForm")    
    @ResponseBody public String insertAndUpdateForm(@RequestBody CreateForm_Questions_Options_DTO FQO_Data,HttpSession session){        

        CreateForm FormData = FQO_Data.getFormData();   
        List<Questions> QueData = FQO_Data.getQueData();
        List<Options> OptData = FQO_Data.getOptionData();                

        return cfs.insertAndUpdateForm(FormData,QueData,OptData,session);
    }

    @GetMapping("/selectFormField")
    @ResponseBody public List<CreateForm> selectFormField(){
        return cfs.selectFormField();
    }

    @GetMapping("/select_Form_Que_Opt_ById/{fId}")
    @ResponseBody public CreateForm_Questions_Options_DTO select_Form_Que_Opt_ById(@PathVariable("fId") int formId){        
        
        return cfs.select_Form_Que_Opt_ById(formId);
    }

    @PutMapping("/deleteFormByFormId/{fId}")
    @ResponseBody public String deleteFormByFormId(@PathVariable("fId") int formId){
        return cfs.deleteFormByFormId(formId);
    }
    
}
