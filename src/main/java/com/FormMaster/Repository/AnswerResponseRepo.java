package com.FormMaster.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.AnswerResponse;

@Repository
public interface AnswerResponseRepo extends JpaRepository<AnswerResponse,Integer>{

    @Query(value="select * from answer_response where user_id = :uId and form_id = :fId",nativeQuery = true)
    List<AnswerResponse> findAnsDataByFormIdAndUserId(@Param("fId") int formId,@Param("uId") long userId);

}
