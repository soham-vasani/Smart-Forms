package com.FormMaster.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.FormMaster.Entity.Module;
import com.FormMaster.Repository.ModuleRepo;

@Service
public class ModuleServiceImplementation implements ModuleService{

    @Autowired
    ModuleRepo mr;

    @Override
    public List<Module> getAllModule() {

        List<Module> allmodule = mr.findAll();
        return allmodule;
    }
    
}
