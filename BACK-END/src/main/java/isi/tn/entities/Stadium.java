package isi.tn.entities;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name= "stadiums")
public class Stadium {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="STADIUM_ID")
	private long id ;
	
	@Column(name="STADIUM_NAME")
	private String stadiumName;
	
	@Column(name="STADIUM_VIRAGE_NORD_CAPACITY")
	private int virageNCap;
	
	@Column(name="STADIUM_VIRAGE_SUD_CAPACITY")
	private int virageSCap;
	
	@Column(name="STADIUM_PEULOUSE_CAPACITY")
	private int viragePelCap;
	
	@Column(name="STADIUM_ENCEINTE_INF_CAPACITY")
	private int virageEncInfCap;

	@Column(name="STADIUM_ENCEINTE_SUP_CAPACITY")
	private int virageEncSupCap;

	public int getVirageNCap() {
		return virageNCap;
	}
	public void setVirageNCap(int virageNCap) {
		this.virageNCap = virageNCap;
	}
	public int getVirageSCap() {
		return virageSCap;
	}
	public void setVirageSCap(int virageSCap) {
		this.virageSCap = virageSCap;
	}
	public int getViragePelCap() {
		return viragePelCap;
	}
	public void setViragePelCap(int viragePelCap) {
		this.viragePelCap = viragePelCap;
	}
	public int getVirageEncInfCap() {
		return virageEncInfCap;
	}
	public void setVirageEncInfCap(int virageEncInfCap) {
		this.virageEncInfCap = virageEncInfCap;
	}
	public int getVirageEncSupCap() {
		return virageEncSupCap;
	}
	public void setVirageEncSupCap(int virageEncSupCap) {
		this.virageEncSupCap = virageEncSupCap;
	}


	
	public Stadium() {}
	public Stadium(long id ,String stadiumName) {
		this.id=id;
		this.stadiumName=stadiumName;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getStadiumName() {
		return stadiumName;
	}
	public void setStadiumName(String stadiumName) {
		this.stadiumName = stadiumName;
	}
	
}
