package isi.tn.entities;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import isi.tn.entities_enums.TicketType;


@Entity
@Table(name= "tickets")
//@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@reference")
public class Ticket {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name="REFERENCE_ID")
	private long reference;
	
	public Ticket() {};
	
	@Column(name="type")
	@Enumerated(EnumType.STRING)
	private TicketType type;
	

	@Column(name="PRICE")
	private double price ;
	
	@Column(name="ticket_uuid")
	private String uuid ;
	
	
	
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	@ManyToOne
    @JoinColumn(name = "SPECTATOR_ID" ,referencedColumnName="PERSON_ID",insertable=true,updatable=true)
	private Spectator spectator;
	
	@ManyToOne
    @JoinColumn(name = "GAME_ID",referencedColumnName="GAME_ID",insertable=true,updatable=true)
	private Game game;
	
	
	private int nbrBuyedTickets;
	
	
	public int getNbrBuyedTickets() {
		return nbrBuyedTickets;
	}
	public void setNbrBuyedTickets(int nbrBuyedTickets) {
		this.nbrBuyedTickets = nbrBuyedTickets;
	}
	
	public TicketType getType() {
		return type;
	}
	public void setType(TicketType type) {
		this.type = type;
	}

	Ticket(int reference , double price) {
		this.reference=reference;
		this.price=price;
	}
	public long getReference() {
		return reference;
	}
	public void setReference(long reference) {
		this.reference = reference;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Spectator getSpectator() {
		return spectator;
	}
	public void setSpectator(Spectator spectator) {
		this.spectator = spectator;
	}
	public Game getGame() {
		return game;
	}
	public void setGame(Game game) {
		this.game = game;
	}
	
}
