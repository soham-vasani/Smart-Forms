package com.FormMaster.Configuration.springSecurity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.FormMaster.Service.AddUserServiceImplement;

@Configuration
@EnableMethodSecurity // To check role at method(controller) level using pre Authorized in controller.
public class WebSecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        return new AddUserServiceImplement();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }        
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Autowired
    private CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return (web)-> web.ignoring().requestMatchers("/assets/**", "/jspjs/**", "/error","/WEB-INF/**");
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
            // .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth                    
                .requestMatchers("/loginPage").permitAll()
                .requestMatchers("/master_form","master_users").hasAnyAuthority("ADMIN")
                .requestMatchers("/fill_forms","/completed_forms").hasAnyAuthority("USER","ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(login -> 
                    // login.permitAll()
                    login.loginPage("/loginPage")
                    .loginProcessingUrl("/login")
                    .usernameParameter("username")
					.passwordParameter("password")                    
                    .successHandler(customAuthenticationSuccessHandler)
                    .permitAll()
            )
            .logout(logout -> 
                logout.logoutUrl("/logout").permitAll()
            )
            .exceptionHandling(eh -> 
                eh.accessDeniedPage("/accessDenied")
            )
            .csrf(csrf -> csrf.disable());

        return httpSecurity.build();
    }
}
