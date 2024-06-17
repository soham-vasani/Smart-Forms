package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.Entity.Month;
import com.FormMaster.Repository.MonthRepo;

@Service

public class MonthServiceImplementation implements MonthService{

    @Autowired
    MonthRepo mr;

    @Override
    public List<Month> getMonth() {

        return mr.findAll();        
    }
}
