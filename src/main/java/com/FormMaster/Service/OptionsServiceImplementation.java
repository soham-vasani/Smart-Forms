package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FormMaster.Entity.Options;
import com.FormMaster.Repository.OptionsRepo;

@Service
public class OptionsServiceImplementation implements OptionsService{

    @Autowired
    OptionsRepo or;

    @Override
    public void removeOptions(int optionId) {
        or.deleteOptByOptId(optionId);
    }

    @Override
    public List<Options> findOptionByFormId(int formId) {
        return or.findOptionByFormId(formId);
    }

}
