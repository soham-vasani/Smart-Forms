package com.FormMaster.Repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.FormResponse;

@Repository
public interface FormResponseRepo extends JpaRepository<FormResponse,Integer>{

    @Query(value="select submit_on from form_response where form_id = :fId and user_id = :uId",nativeQuery = true)
    LocalDate getFormSubmitDataByFormIdAndUserId(@Param("fId") int formId,@Param("uId") long userId);

}
