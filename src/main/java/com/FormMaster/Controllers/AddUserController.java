package com.FormMaster.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.FormMaster.DTO.SearchDataDTO;
import com.FormMaster.Entity.AddUser;
import com.FormMaster.Service.AddUserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller

public class AddUserController {

    @Autowired
    AddUserService as;

    @RequestMapping("/master_users")
    public String master_users(){
        return "/JSP_Page/master_users";
    }

    @PostMapping("/addUser")
    @ResponseBody public String insertAndUpdateUser(@RequestParam("userData") String userData,@RequestParam(name="userImg",required = false) MultipartFile userImg,HttpSession session) {
          

        //mapping json string to entity json.
        ObjectMapper objectMapper = new ObjectMapper();

        try{
            
            AddUser UserData = objectMapper.readValue(userData, AddUser.class);    

            return as.insertAndUpdateUser(UserData,userImg,session);

        }catch(Exception exe){
            System.out.println(exe);
        }

        return userData;
    }    

    @PostMapping("/changePassword")
    @ResponseBody public String changePassword(@RequestBody Object passwords) {                        

        return as.changePassword(passwords);
    }    

    @GetMapping("/getActiveUserData")
    @ResponseBody public List<AddUser> getActiveUserData(){
        return as.getActiveUserData();
    }

    @GetMapping("/findUserById/{uId}")
    @ResponseBody public AddUser getActiveUserData(@PathVariable("uId") int userId){

        AddUser abc = as.findUserById(userId);

        return abc;
    }

    @PostMapping("/deleteUser/{uId}")
    @ResponseBody public ResponseEntity<String> deleteUser(@PathVariable("uId") int usderId){    
        return new ResponseEntity<>(as.deleteUser(usderId), HttpStatus.OK);
    }

    @PostMapping("/searchByFilter")
    @ResponseBody public List<AddUser> searchByFilter(@RequestBody SearchDataDTO searchData){
        return as.searchByFilter(searchData);
    }
}
