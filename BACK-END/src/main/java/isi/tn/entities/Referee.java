package isi.tn.entities;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import isi.tn.entities_enums.Sex;
import isi.tn.entities_enums.TypeReferee;


@Entity
@DiscriminatorValue("referee")
public class Referee extends Person {
	
	@Column(name="TYPE_REFEREE")
	private TypeReferee typeReferee ;
	
	public Referee() {super();}
	
	public Referee(String lastname,String firstname,Sex sex,int CIN, Date dateNaiss,TypeReferee typeReferee) {
		super(lastname,firstname,sex,CIN,dateNaiss);
		this.typeReferee=typeReferee;
	}

	public TypeReferee getTypeReferee() {
		return typeReferee;
	}

	public void setTypeReferee(TypeReferee typeReferee) {
		this.typeReferee = typeReferee;
	}
	
}
