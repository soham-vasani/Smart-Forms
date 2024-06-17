package com.FormMaster.Configuration.springSecurity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.FormMaster.Entity.AddUser;

public class MyUserDetail implements UserDetails{

    AddUser addUser;

    public MyUserDetail(AddUser addUser){
        this.addUser = addUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> authorities = new ArrayList<>(); 

        authorities.add(new SimpleGrantedAuthority(addUser.getRole().toUpperCase()));

        return authorities;
    }    

    @Override
    public String getPassword() {
        return addUser.getPassword();
    }   

    @Override
    public String getUsername() {
        return addUser.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        
        return true;
    }

    @Override
    public boolean isEnabled() {
        
        return true;
    }

}
