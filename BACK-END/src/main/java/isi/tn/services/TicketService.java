package isi.tn.services;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.tn.entities.Game;
import isi.tn.entities.Stadium;
import isi.tn.entities.Ticket;
import isi.tn.entities_enums.TicketType;
import isi.tn.repository.TicketRepository;

@Service
public class TicketService {
     
	@Autowired
	public TicketRepository tr;
	
	
	public List<Ticket> getTicketsOfLoggedInSpectator(Long spectatorId) {
		return this.tr.findBySpectatorId(spectatorId);
	}
	
	public List<Ticket> getNbrBuyedTicketsPerType(Long gameId) {
		List<Map<String,String>> tmp  =tr.getNbrBuyedTicketsPerType(gameId);
		Ticket t = null;
		Game g = null;
		Stadium s = null;
		
		List<Ticket> res = new LinkedList<>();
		for(Map<String,String> item: tmp) {
			t = new Ticket();
			g = new Game();
			s = new Stadium();
			
			g.setStadium(s);
			t.setGame(g);
			
			t.setNbrBuyedTickets(Integer.valueOf(String.valueOf(item.get("nbrBuyedTickets"))).intValue());
			t.setType(TicketType.valueOf(item.get("type")));
			/*switch(Integer.valueOf(item.get("type").toString())) {
			 case 0 :
				 t.setType(TicketType.VIRAGE);
			 break;
			 case 1 :
				 t.setType(TicketType.PELOUSE);
			 break;
			 case 2 :
				 t.setType(TicketType.ENCEINTE_INF);
			 break;
			 case 3 :
				 t.setType(TicketType.ENCEINTE_SUP);
			 break;
			}*/
			
			s.setId(Integer.valueOf(String.valueOf(item.get("stadium_id"))).longValue());
			s.setVirageNCap(Integer.valueOf(String.valueOf(item.get("stadium_virage_nord_capacity"))).intValue()+Integer.valueOf(String.valueOf(item.get("stadium_virage_sud_capacity"))).intValue());
		    s.setViragePelCap(Integer.valueOf(String.valueOf(item.get("stadium_peulouse_capacity"))).intValue());
		    s.setVirageEncInfCap(Integer.valueOf(String.valueOf(item.get("stadium_enceinte_inf_capacity"))).intValue());
		    s.setVirageEncSupCap(Integer.valueOf(String.valueOf(item.get("stadium_enceinte_sup_capacity"))).intValue());
		    s.setStadiumName(item.get("stadium_name"));
		    res.add(t);
		}
		return res;
	}
	
	public Boolean buyTicket(Ticket t) {
		t = this.tr.save(t);
		return t != null;
	}
}
