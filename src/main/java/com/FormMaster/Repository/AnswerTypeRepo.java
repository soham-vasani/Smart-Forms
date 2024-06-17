package com.FormMaster.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.AnswerType;

@Repository

public interface AnswerTypeRepo extends JpaRepository<AnswerType,Integer>{

    
}