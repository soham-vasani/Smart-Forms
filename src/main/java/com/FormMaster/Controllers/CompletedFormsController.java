package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.FormMaster.DTO.Form_Que_Ans_DTO;
import com.FormMaster.Service.AnswerResponseService;
import com.FormMaster.Service.CreateFormService;
import com.FormMaster.Service.FormResponseService;
import com.FormMaster.Service.OptionsService;
import com.FormMaster.Service.QuestionsService;

import jakarta.servlet.http.HttpSession;


@Controller
public class CompletedFormsController {

    @Autowired
    CreateFormService cfs;
    
    @Autowired
    QuestionsService qs;

    @Autowired
    AnswerResponseService ars;

    @Autowired
    FormResponseService frs;

    @Autowired 
    OptionsService os;

    @Autowired
    

    @RequestMapping("/completed_forms")
    public String completed_forms(){
        return "/JSP_Page/completed_forms";
    }

    @GetMapping("/getSubmittedForm/{uId}")
    @ResponseBody public List<Object> getSubmittedForm(@PathVariable("uId") Long userId,HttpSession session){        

        return cfs.getSubmittedForm(userId,session);
    }

    @GetMapping("/getCompletedFormByFormId")
    @ResponseBody public Form_Que_Ans_DTO getCompletedFormByFormId(@RequestParam("fId") int formId,@RequestParam("uId") int userId){            
        
        Form_Que_Ans_DTO FormQueAnsDTO = new Form_Que_Ans_DTO();

        System.out.println(formId+"  "+userId);
        
    
        FormQueAnsDTO.setFormData(cfs.findActiveFormDataByFormId(formId));
    
        FormQueAnsDTO.setQueData(qs.findActiveQueDataByFormId(formId));
    
        FormQueAnsDTO.setAnswer(ars.findAnsDataByFormIdAndUserId(formId,userId));

        FormQueAnsDTO.setOptions(os.findOptionByFormId(formId));
    
        FormQueAnsDTO.setSubmitOn(frs.getFormSubmitDataByFormIdAndUserId(formId,userId));        
        
        return FormQueAnsDTO;
    }
}
