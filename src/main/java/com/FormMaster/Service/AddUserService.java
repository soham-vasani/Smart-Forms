package com.FormMaster.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.FormMaster.DTO.SearchDataDTO;
import com.FormMaster.Entity.AddUser;

import jakarta.servlet.http.HttpSession;

public interface AddUserService {

    String insertAndUpdateUser(AddUser userData, MultipartFile userImg,HttpSession session);

    List<AddUser> getActiveUserData();

    AddUser findUserById(int userId);

    String deleteUser(int usderId);

    List<AddUser> searchByFilter(SearchDataDTO searchData);

    String changePassword(Object passwords);

}
