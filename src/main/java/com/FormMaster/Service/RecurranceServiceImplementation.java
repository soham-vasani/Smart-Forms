package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.Entity.Recurrence;
import com.FormMaster.Repository.RecurranceRepo;

@Service
public class RecurranceServiceImplementation implements RecurranceService{

    @Autowired
    RecurranceRepo rr;

    @Override
    public List<Recurrence> getRecurrance() {

        return rr.findAll();

    }

}
