package com.FormMaster.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.Questions;

import jakarta.transaction.Transactional;


@Repository
public interface QuestionsRepo extends JpaRepository<Questions,Integer>{

    @Modifying
    @Transactional
    @Query(value="update questions set active_id = 9 where que_id = :qId",nativeQuery = true)
    void deleteQue(@Param(value = "qId") int questionId);

    @Modifying
    @Transactional
    @Query(value="update questions set active_id = 9 where form_id = :fId",nativeQuery = true)
    void deleteQueByFormId(@Param(value = "fId") int formId);

    @Query(value="select * from questions where form_id = :fId and active_id != 9",nativeQuery = true)
    List<Questions> findActiveQue(@Param(value = "fId") int formId);

    
}
