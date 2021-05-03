package isi.tn.entities;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

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
@Table(name= "games")
public class Game implements Serializable{
	

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="GAME_ID")
	private long id;
	
	@Column(name="DATE")
	private Date date;
	
	@Column(name="SCORE")
	private String score;
	
	@ManyToOne
	@JoinColumn(name="FK_HOMETEAM_ID")
	private Team homeTeam;
	
	@ManyToOne
	@JoinColumn(name="FK_AWAYTEAM_ID")
	private Team awayTeam;
	
	@ManyToOne
	@JoinColumn(name="FK_TOUR_ID")
	Tour tour;
	
	@ManyToOne
	@JoinColumn(name="FK_STADIUM_ID")
	private Stadium stadium;
	
	@ManyToOne
	@JoinColumn(name="FK_REFEREE_ID")
	private Referee referee;
	
	@ManyToOne
	@JoinColumn(name="FK_ASSISTANT_REFEREE_1_ID")
	private Referee asistantReferee1;
	
	@ManyToOne
	@JoinColumn(name="FK_ASSISTANT_REFEREE_2_ID")
	private Referee asistantReferee2;
	
	@ManyToOne
	@JoinColumn(name="FK_FOURTH_OFFICIEL_ID")
	private Referee fourthOfficiel;
	
	@OneToMany(mappedBy = "game")
	@JsonIgnore
	private List<Ticket> tickets;
	
	public Game() {}
	
	public Game(Date date,String score) {
		this.date=date;
		this.score=score;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public Team getHomeTeam() {
		return homeTeam;
	}

	public void setHomeTeam(Team homeTeam) {
		this.homeTeam = homeTeam;
	}

	public Team getAwayTeam() {
		return awayTeam;
	}

	public void setAwayTeam(Team awayTeam) {
		this.awayTeam = awayTeam;
	}

	public Tour getTour() {
		return tour;
	}

	public void setTour(Tour tour) {
		this.tour = tour;
	}

	public Stadium getStadium() {
		return stadium;
	}

	public void setStadium(Stadium stadium) {
		this.stadium = stadium;
	}

	public Referee getReferee() {
		return referee;
	}

	public void setReferee(Referee referee) {
		this.referee = referee;
	}

	public Referee getAsistantReferee1() {
		return asistantReferee1;
	}

	public void setAsistantReferee1(Referee asistantReferee1) {
		this.asistantReferee1 = asistantReferee1;
	}

	public Referee getAsistantReferee2() {
		return asistantReferee2;
	}

	public void setAsistantReferee2(Referee asistantReferee2) {
		this.asistantReferee2 = asistantReferee2;
	}

	public Referee getFourthOfficiel() {
		return fourthOfficiel;
	}

	public void setFourthOfficiel(Referee fourthOfficiel) {
		this.fourthOfficiel = fourthOfficiel;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}
	
}
