package com.FormMaster.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.FormMaster.Service.QuestionsService;

@Controller
public class QuestionsController {

    @Autowired 
    QuestionsService qs;


    @GetMapping("/getLastQueId")
    @ResponseBody public int getLastQueId() {
        return qs.getLastQueId();
    }

    @PostMapping("/deleteQueAndOpt/{qId}")
    @ResponseBody public String deleteQueAndOpt(@PathVariable("qId") int questionId){
        return qs.deleteQueAndOpt(questionId);
    }
    

}
