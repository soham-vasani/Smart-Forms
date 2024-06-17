package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.FormMaster.Entity.Recurrence;
import com.FormMaster.Service.RecurranceService;

@Controller
public class RecurranceController {

    @Autowired
    RecurranceService rs;

    @GetMapping("/Recurrence")
    @ResponseBody List<Recurrence> getRecurrance(){
        return rs.getRecurrance();
    }

}
