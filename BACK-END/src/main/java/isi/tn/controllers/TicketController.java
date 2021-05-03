package isi.tn.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import isi.tn.entities.Spectator;
import isi.tn.entities.Ticket;
import isi.tn.entities_enums.TicketType;
import isi.tn.services.TicketService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ROLE_SPECTATOR')")
@RequestMapping("/ticket")
public class TicketController {
	 @Autowired
	  private TicketService ts;
	
	@GetMapping("/buyed-tickets-per-type/{gameId}")
	public List<Ticket> getNbrBuyedTicketsPerType(@PathVariable Long gameId) {
		return ts.getNbrBuyedTicketsPerType(gameId);
	}
	
	@GetMapping("/{spectatorId}/all")
	public List<Ticket> getTicketsOfLoggedInSpectator(@PathVariable Long spectatorId) {
		return ts.getTicketsOfLoggedInSpectator(spectatorId);
	}
	
	@PostMapping("/buy-ticket")
    public Map<String,String> buyTicket(@RequestBody Ticket t) {
		Map<String,String> res = new HashMap<>();
		t.setUuid(java.util.UUID.randomUUID().toString());
		if(ts.buyTicket(t)) {
		  res.put("uuid", t.getUuid());
		}else {
		  res.put("uuid", "");
		}
		return res;
   }
}
