package com.FormMaster.Entity;

import java.sql.Date;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDate;
@Entity
@Data

public class AddUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int userId;
    int activeId;
    String firstName;
    String lastName;
    String email;
    String password;
    String contactNo;
    String gender;
    Date validFrom;
    Date validTo;
    String role;
    String imagePath;
    int createdBy;
    LocalDate createdOn;
    @Column(nullable = true)
    int modifyBy;
    @Column(nullable = true)
    LocalDate modifyOn;

}
