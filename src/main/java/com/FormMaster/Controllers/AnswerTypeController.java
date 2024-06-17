package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.FormMaster.Entity.AnswerType;
import com.FormMaster.Service.AnswerTypeService;

@Controller
public class AnswerTypeController {

    @Autowired 
    AnswerTypeService ats; 

    @GetMapping("/AnswerType")
    @ResponseBody List<AnswerType> getAnswerType(){
        return ats.getAnswerType();
    }
}
