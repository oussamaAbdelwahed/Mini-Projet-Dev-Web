package isi.tn.entities;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
@Table(name= "tours")
public class Tour {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="TOUR_ID")
	private long id ;
	
	@Column(name="DESIGNATION")
	private String designation;
	
	
	@ManyToOne
	@JoinColumn(name="admin_planner_id")
	private Admin plannedBy;
	
	@Column(name="NUMBER_TEAM_MAX")
	private int numberTeamMax ;
	
	@OneToMany(mappedBy="tour")
	//@JsonIgnoreProperties("tour")
	@JsonIgnore
	private Set<Game> games;
	
	public Tour() {}
	
	public Tour(String designation,int numberTeamMax ) {
		this.designation=designation;
		this.numberTeamMax=numberTeamMax;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public int getNumberTeamMax() {
		return numberTeamMax;
	}

	public void setNumberTeamMax(int numberTeamMax) {
		this.numberTeamMax = numberTeamMax;
	}
	@JsonIgnore
	public Set<Game> getGames() {
		return games;
	}

	public void setGames(Set<Game> games) {
		this.games = games;
	}
	
	
}
