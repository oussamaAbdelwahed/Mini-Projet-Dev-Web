package isi.tn.entities;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import isi.tn.entities_enums.RoleStaff;
import isi.tn.entities_enums.Sex;


@Entity
@DiscriminatorValue("staff")
public class Staff extends Person {
	
	
	@Column(name="ROLE_STAFF")
	@Enumerated(EnumType.STRING)
	private RoleStaff roleStaff ;
	
	@ManyToOne
	@JoinColumn
	@JsonIgnoreProperties({"players","staffs"})
	Team teamOfStaff;
	
	
	public Staff(){super();}
	
	public Staff(String lastname,String firstname,Sex sex,int CIN, Date dateNaiss,RoleStaff roleStaff) {
		super(lastname,firstname,sex,CIN,dateNaiss);
		this.roleStaff=roleStaff;
	}

	public RoleStaff getRoleStaff() {
		return roleStaff;
	}

	public void setRoleStaff(RoleStaff roleStaff) {
		this.roleStaff = roleStaff;
	}

	@JsonIgnoreProperties({"players","staffs"})
	public Team getTeamOfStaff() {
		return teamOfStaff;
	}
	@JsonProperty
	public void setTeamOfStaff(Team teamOfStaff) {
		this.teamOfStaff = teamOfStaff;
	}
	
}
