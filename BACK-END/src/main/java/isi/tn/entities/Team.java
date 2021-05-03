package isi.tn.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
@Table(name= "teams")
public class Team {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="TEAM_ID")
	private long id;
	
	@Column(name="PHOTO")
	private String photo ;
	
	@Column(name="TEAM_NAME")
	private String teamName ;
	
	
	@Column(name="IS_WINNER")
	private boolean isWinner;
	
	@OneToMany(mappedBy="teamOfPlayer")
	@JsonIgnoreProperties("teamOfPlayer")
	private Set<Player> players = new HashSet<>();;
	
	@OneToMany(mappedBy="teamOfStaff")
	@JsonIgnoreProperties("teamOfStaff")
	private Set<Staff> staffs = new HashSet<>();;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public boolean getWinner() {
		return isWinner;
	}

	public void setWinner(boolean isWinner) {
		this.isWinner = isWinner;
	}

	public Team() {}
	
	public Team(String photo,String teamName,boolean isWinner) {
		this.photo=photo;
		this.teamName=teamName;
		this.isWinner = isWinner;
	}
	@JsonIgnoreProperties("teamOfPlayer")
	public Set<Player> getPlayers() {
		return players;
	}

	public void setPlayers(Set<Player> players) {
		this.players = players;
	}

	@JsonIgnoreProperties("teamOfStaff")
	public Set<Staff> getStaffs() {
		return staffs;
	}

	public void setStaffs(Set<Staff> staffs) {
		this.staffs = staffs;
	}
	
}
