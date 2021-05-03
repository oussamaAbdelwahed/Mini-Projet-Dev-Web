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
import isi.tn.entities_enums.PositionPlayer;
import isi.tn.entities_enums.Sex;

@Entity
@DiscriminatorValue("player")
public class Player extends Person {
	
	@Column(name="POSITION")
	@Enumerated(EnumType.STRING)
	private PositionPlayer position;
	
	@Column(name="NUMBER")
	private Integer number;
	
	@ManyToOne
	@JoinColumn
	@JsonIgnoreProperties({"players","staffs"})
	private Team teamOfPlayer;
	
	public Player() {super();}
	public Player(String lastname,String firstname,Sex sex,int CIN, Date dateNaiss,PositionPlayer position,Integer number) {
		super(lastname,firstname,sex,CIN,dateNaiss);
		this.position=position;
		this.number=number;
	}
	
	public PositionPlayer getPosition() {
		return position;
	}
	public void setPosition(PositionPlayer position) {
		this.position = position;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	@JsonIgnoreProperties({"players","staffs"})
	public Team getTeamOfPlayer() {
		return teamOfPlayer;
	}
	@JsonProperty
	public void setTeamOfPlayer(Team teamOfPlayer) {
		this.teamOfPlayer = teamOfPlayer;
	}
	
}
