package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.FormMaster.Entity.Month;
import com.FormMaster.Service.MonthService;

@Controller
public class MonthController {

    @Autowired MonthService ms;

    @GetMapping("/Month")
    @ResponseBody List<Month> getMonth(){
        return ms.getMonth();
    }

}
