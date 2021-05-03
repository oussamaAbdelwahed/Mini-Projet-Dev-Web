package isi.tn.entities;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import isi.tn.entities_enums.Sex;

@Entity
@DiscriminatorValue("admin")
public class Admin extends Person implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Column(name="EMAIL")
	private String email;
	
	@Column(name="PASSWORD")
	private String password;
	
	@OneToMany(mappedBy = "plannedBy")
	@JsonIgnore
	private List<Tour> tours;
	
	public Admin(){super();}
	
	public Admin(String lastname,String firstname,Sex sex,int CIN, Date dateNaiss,String email,String password) {
		super(lastname,firstname,sex,CIN,dateNaiss);
		this.email=email;
		this.password=password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Tour> getTours() {
		return tours;
	}

	public void setTours(List<Tour> tours) {
		this.tours = tours;
	}

	
}
