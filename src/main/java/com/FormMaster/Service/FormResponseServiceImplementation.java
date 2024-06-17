package com.FormMaster.Service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.Entity.FormResponse;
import com.FormMaster.Repository.FormResponseRepo;

@Service
public class FormResponseServiceImplementation implements FormResponseService{

    @Autowired
    FormResponseRepo frr;

    @Override
    public boolean saveForm(FormResponse fd) {

        fd.setSubmitOn(LocalDate.now());
        frr.save(fd);
        return true;
    }

    @Override
    public LocalDate getFormSubmitDataByFormIdAndUserId(int formId, long userId) {
        return frr.getFormSubmitDataByFormIdAndUserId(formId,userId);
    }

    
}
