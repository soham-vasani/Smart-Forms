package com.FormMaster.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.FormMaster.Entity.AddUser;

import jakarta.transaction.Transactional;

@Repository
public interface AddUserRepo extends JpaRepository<AddUser,Integer>{

    @Query(value = "select * from add_user where active_id != 9",nativeQuery = true)
    List<AddUser> getActiveUserData();

    @Query(value = "select * from add_user where active_id != 9 and user_id = :uId",nativeQuery = true)
    AddUser findUserById(@Param("uId") int userId);

    @Query(value="select image_path from add_user where user_id = :uId",nativeQuery = true)
    String getImagePath(@Param("uId") int userId);

    @Query(value="select password from add_user where user_id = :uId",nativeQuery = true)
    String getPassword(@Param("uId") int userId);

    @Modifying
    @Transactional
    @Query(value="update add_user set active_id = 9  where user_id = :uId",nativeQuery = true)    
    void deleteUser(@Param("uId")int usderId);

    @Query(value="select * from add_user where role = :uRole and (first_name like %:uName% or last_name like %:uName%)",nativeQuery = true)
    List<AddUser> searchByFilter(@Param("uName")String userName,@Param("uRole") String userRole);

    @Query(value="select * from add_user where email = :eId and active_id != 9",nativeQuery = true)
    AddUser findByEmail(@Param("eId") String email);

    @Query(value="select * from add_user where email = :eId and password = :pass",nativeQuery = true)
    AddUser findByEmailAndPassword(@Param("eId") String email,@Param("pass") String password);

    @Modifying
    @Transactional
    @Query(value="update add_user set password = :newPass where user_id = :uId",nativeQuery = true)
    void updatePassword(@Param("uId") int userId,@Param("newPass") String newPassword);
}
