package com.FormMaster.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.Module;

@Repository
public interface ModuleRepo extends JpaRepository<Module,Integer>{

}
