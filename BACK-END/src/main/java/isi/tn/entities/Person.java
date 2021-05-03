package isi.tn.entities;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import isi.tn.entities_enums.Sex;

@Entity
@Table(name= "persons")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="person_type")
public abstract class Person {
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PERSON_ID")
	private long id ;
	
	@Column(name="LASTNAME")
	private String lastname;
	
	@Column(name="email",unique = true)
	private String email;
	
	@Column(name="password")
	@JsonIgnore
	private String password;
	
	@Column(name="FIRSTNAME")
	private String firstname;
	
	@Column(name="SEX")
	@Enumerated(EnumType.STRING)
	private Sex sex;
	
	@Column(name="CIN")
	private int cin;
	
	@Column(name="DATE_NAISSANCE")
	private Date dateNaiss;
	
	
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}

	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

	
	public Person() {}
	
	public Person(String lastname,String firstname,Sex sex,int CIN, Date dateNaiss) {
		this.lastname=lastname;
		this.firstname=firstname;
		this.sex=sex;
		this.cin=CIN;
		this.dateNaiss=dateNaiss;
		
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLastname() {
		return lastname;
	}
	@Override
	public String toString() {
		return "Person [id=" + id + ", lastname=" + lastname + ", email=" + email + ", password=" + password
				+ ", firstname=" + firstname + ", sex=" + sex + ", cin=" + cin + ", dateNaiss=" + dateNaiss + "]";
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
	public Sex getSex() {
		return sex;
	}

	public void setSex(Sex sex) {
		this.sex = sex;
	}

	public int getCIN() {
		return cin;
	}
	public void setCIN(int cIN) {
		cin = cIN;
	}
	public Date getDateNaiss() {
		return dateNaiss;
	}
	public void setDateNaiss(Date dateNaiss) {
		this.dateNaiss = dateNaiss;
	}
	
	
}
