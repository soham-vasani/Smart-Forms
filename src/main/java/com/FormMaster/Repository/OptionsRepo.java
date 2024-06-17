package com.FormMaster.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.Options;

import jakarta.transaction.Transactional;

@Repository
public interface OptionsRepo extends JpaRepository<Options,Integer>{

    // List<Options> findByFormId = null;


    // when we modify in database by using query then we must to use @Modifying and @Transactional anotation.
    @Modifying
    @Transactional
    @Query(value="update options set active_id = 9 where que_id = :qId",nativeQuery = true)
    void deleteOptByQueId(@Param(value = "qId") int questionId);

    @Modifying
    @Transactional
    @Query("update Options o set o.activeId = 9 where o.optionsId = :optionsId")
    void deleteOptByOptId(@Param("optionsId") int optionsId);

    @Modifying
    @Transactional
    @Query("update Options o set o.activeId = 9 where o.formId = :formId")
    void deleteOptByFormId(@Param("formId") int formId);

    @Query(value="select * from options where form_id = :fId and active_id != 9",nativeQuery = true)
    List<Options> findActiveOpt(@Param(value = "fId") int formId);

    @Query(value="select * from options where form_id = :fId and active_id != 9;",nativeQuery = true)
    List<Options> findOptionByFormId(@Param("fId") int formId);

    @Modifying
    @Transactional
    @Query(value= "update options set active_id = 9 where form_id = :fId",nativeQuery=true)
    void deActiveExistingOption(@Param("fId")int formId);    

}
