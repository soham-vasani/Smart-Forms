package com.FormMaster.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.CreateForm;

import jakarta.transaction.Transactional;

@Repository
public interface CreateFormRepo extends JpaRepository<CreateForm,Integer>{

    @Modifying
    @Transactional
    @Query("update CreateForm set activeId = 9 where formId = :fId")
    void deleteFormByFormId(@Param("fId") int formId);     

    @Query(value="select * from create_form where active_id != 9",nativeQuery=true)
    List<CreateForm> findActiveFormData();

    @Query(value="select * from create_form where active_id != 9 and form_id = :fId",nativeQuery=true)
    CreateForm findActiveFormDataByFormId(@Param("fId") int formId);

    @Query(value="SELECT * FROM formmaster.create_form WHERE form_id NOT IN (SELECT form_id FROM formmaster.form_response WHERE user_id = :uId) AND active_id != 9 AND active_id != 0", nativeQuery = true)
    List<CreateForm> getUnSubmittedForm(@Param("uId") Long userId);

    @Query(value="SELECT form_response.submit_on,form_response.user_id,add_user.first_name,create_form.form_id,create_form.title FROM create_form Join form_response On create_form.form_id = form_response.form_id join add_user on form_response.user_id = add_user.user_id;",nativeQuery = true)
    List<Object> getAllSubmittedForm();
    
    @Query(value="SELECT form_response.submit_on,form_response.user_id,add_user.first_name,create_form.form_id,create_form.title FROM create_form Join form_response On create_form.form_id = form_response.form_id join add_user on form_response.user_id = add_user.user_id where form_response.user_id = :uId",nativeQuery = true)
    List<Object> getSubmittedFormByUserId(@Param("uId") Long userId);
}