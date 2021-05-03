package isi.tn.entities;
import java.io.Serializable;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;



import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import isi.tn.entities_enums.Sex;

@Entity
@DiscriminatorValue("spectator")
//@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")

public class Spectator extends Person implements Serializable {
	
	
	private static final long serialVersionUID = 1L;

	@Column(name="EMAIL")
	private String email;
	
	@Column(name="PASSWORD")
	private String password;
	
	@OneToMany(mappedBy = "spectator",fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
	
	//@JsonIgnoreProperties({"spectator","game"})
	@JsonIgnore
	private List<Ticket> tickets;
	
	public Spectator() {super();}
	
	public Spectator(String lastname,String firstname,Sex sex,int CIN, Date dateNaiss,String email,String password) {
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

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	@Override
	public String toString() {
		return super.toString()+" Spectator [email=" + email + ", password=" + password + ", tickets=" + tickets + "]";
	}
}
