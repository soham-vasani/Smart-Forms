package com.FormMaster.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import java.util.Map;
// import org.hibernate.mapping.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.FormMaster.Configuration.springSecurity.MyUserDetail;
// import com.FormMaster.Configuration.springSecurity.MyUserDetail;
import com.FormMaster.DTO.SearchDataDTO;
import com.FormMaster.Entity.AddUser;
import com.FormMaster.Repository.AddUserRepo;

import jakarta.servlet.http.HttpSession;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;


@Service
public class AddUserServiceImplement implements AddUserService,UserDetailsService{

    // PasswordEncoder passwordEncoder;

    @Autowired
    private AddUserRepo aur;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private HttpSession session;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;    

    private static final String IMAGE_DIRECTORY = "/media/soham-vasani/D1/E Five Java/exercise 5/FormMaster/src/main/resources/static/UserImages";

    @Override
    public String insertAndUpdateUser(AddUser userData, MultipartFile userImg,HttpSession session) {

        try{

            int userId = userData.getUserId();
            AddUser userExist = aur.findByEmail(userData.getEmail());

            if (userId == 0) {
                return handleNewUser(userData, userImg, userExist,session);
            } else {
                return handleExistingUser(userData, userImg, userExist, userId,session);
            }

        }catch(Exception e){
            return "Error occurred while insert or update the user: " + e.getMessage();
        }        
    }

    private String handleNewUser(AddUser userData, MultipartFile userImg, AddUser userExist,HttpSession session) {

        try{

            if (userExist != null) {
                return "User Exist.";
            } else {
    
                String password = PasswordGenerator();
    
                userData.setCreatedBy((int)session.getAttribute("uId"));
                userData.setCreatedOn(LocalDate.now());
    
                userData.setPassword(passwordEncoder.encode(password));            
    
                AddUser saveUser = aur.save(userData);
                
                if (userImg != null) {
    
                    saveUser.setImagePath(saveUserImage(userImg, saveUser.getUserId()));
                    aur.save(saveUser);
    
                }
    
                sendMailAsync(userData.getEmail(), password);
    
                return "User Added.";
            }

        }catch(Exception e){
            return "Error occurred while inserting the user: " + e.getMessage();
        }
        
    }

    private String handleExistingUser(AddUser userData, MultipartFile userImg, AddUser userExist, int userId,HttpSession session) {

        try{

            if (userExist != null && userExist.getUserId() != userId) {
                return "User Exist.";
            } else {
    
                userExist.setActiveId(userData.getActiveId());
                userExist.setContactNo(userData.getContactNo());
                userExist.setEmail(userData.getEmail());
                userExist.setFirstName(userData.getFirstName());
                userExist.setLastName(userData.getLastName());
                userExist.setGender(userData.getGender());
                userExist.setRole(userData.getRole());
                userExist.setValidFrom(userData.getValidFrom());
                userExist.setValidTo(userData.getValidTo());
                userExist.setModifyBy((int) session.getAttribute("uId"));
                userExist.setModifyOn(LocalDate.now());
    
                if (userImg != null) {
                    userExist.setImagePath(saveUserImage(userImg, userData.getUserId()));   
                }

                aur.save(userExist);
                return "User Updated.";
            }

        }catch(Exception e){
            return "Error occurred while updating the user: " + e.getMessage();
        }
        
    }

    private String saveUserImage(MultipartFile userImg, int userId) {

        try{

            String fileName = userImg.getOriginalFilename();
            String extension = fileName.substring(fileName.lastIndexOf("."));
            String newFileName = userId + extension;

            Path fileUploadPath = Paths.get(IMAGE_DIRECTORY);
            try {
                Files.createDirectories(fileUploadPath);
                try (InputStream inputStream = userImg.getInputStream()) {
                    Path filePath = fileUploadPath.resolve(newFileName);
                    Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                }
            } catch (IOException e) {
                throw new RuntimeException("Failed to store file " + newFileName, e);
            }
            return newFileName;
            
        }catch(Exception e){
            return "Error occurred while uploading the user image: " + e.getMessage();
        }
        
    }

    private static String PasswordGenerator() {
        final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
        final String DIGITS = "0123456789";
        final String SPECIAL_CHARACTERS = "!@#$%";

        final String ALL_CHARACTERS = UPPERCASE + LOWERCASE + DIGITS + SPECIAL_CHARACTERS;
        final SecureRandom random = new SecureRandom();
        final int passwordLength = 8 ;

        StringBuilder password = new StringBuilder(passwordLength);
        password.append(UPPERCASE.charAt(random.nextInt(UPPERCASE.length())));
        password.append(LOWERCASE.charAt(random.nextInt(LOWERCASE.length())));
        password.append(DIGITS.charAt(random.nextInt(DIGITS.length())));
        password.append(SPECIAL_CHARACTERS.charAt(random.nextInt(SPECIAL_CHARACTERS.length())));

        for (int i = 4; i < passwordLength; i++) {
            password.append(ALL_CHARACTERS.charAt(random.nextInt(ALL_CHARACTERS.length())));
        }

        return password.toString();
    }

    //this method take more time so we use CompletableFuture.runAsync to divede the task.
    private void sendMailAsync(String receiverMail, String password) {

        CompletableFuture.runAsync(() -> {

            try{

                SimpleMailMessage mailMessage = new SimpleMailMessage();

                mailMessage.setTo(receiverMail);
                mailMessage.setSubject("Efive User Password");
                mailMessage.setFrom("sohamvasani12@gmail");
                mailMessage.setText("Your Password is: " + password);

                mailSender.send(mailMessage);

            }catch (Exception e) {                
                e.printStackTrace();
            }

        });

    }

    @Override
    public List<AddUser> getActiveUserData() {
        return aur.getActiveUserData();
    }

    @Override
    public AddUser findUserById(int userId) {
        return aur.findUserById(userId);
    }

    @Override
    public String deleteUser(int usderId) {

        aur.deleteUser(usderId);

       return "User Deleted.";
    }

    @Override
    public List<AddUser> searchByFilter(SearchDataDTO searchData) {

        return aur.searchByFilter(searchData.getUserName(),searchData.getUserRole());
    }

    //spring security

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        AddUser user = aur.findByEmail(username);

        if (user != null) {
                    
            session.setAttribute("uId",user.getUserId());  
            session.setAttribute("uName",user.getFirstName());
            session.setAttribute("uRole",user.getRole());  
            session.setAttribute("uImg",user.getImagePath());

            return new MyUserDetail(user);
            
        }else{
            throw new UsernameNotFoundException("User not found");
        }        
    }

    @Override
    public String changePassword(Object passwords) {        

        try{

            int userId = (int)session.getAttribute("uId");

            String currentHashedPassword = aur.getPassword(userId);    

            // The java instanceof operator is used to test whether the object is an instance of the specified type (class or subclass or interface).
            if(passwords instanceof Map){

                Map<String,String> allPassword = (Map<String, String>) passwords;

                String currentPass = allPassword.get("currentPassword");
                String newPass1 = allPassword.get("newPassword1");
                String newPass2 = allPassword.get("newPassword2");

                if(newPass1.equals(newPass2)){
                    
                    if(passwordEncoder.matches(currentPass,currentHashedPassword)){

                        aur.updatePassword(userId,passwordEncoder.encode(newPass1));

                        return "Password Changed successfully";

                    }else{
                        return "Current password is incorrect";
                    }
                }else{
                    return "New password is not match";
                }
            }
            return null; 
            
        }catch(Exception e){
            return "Failed to change password" + e.getMessage();
        }
                   
    }

}
