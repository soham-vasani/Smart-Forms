package com.FormMaster.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.Recurrence;

@Repository
public interface RecurranceRepo extends JpaRepository<Recurrence,Integer>{

}
