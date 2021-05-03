package isi.tn.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import isi.tn.entities.Spectator;
import isi.tn.entities.Team;
import isi.tn.services.SpectatorService;

@RestController
@RequestMapping("/spectator")
@CrossOrigin(origins = "*")
public class SpectatorController {
	
	@Autowired
	private SpectatorService spectatorService;
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("{spectatorId}/delete")
	public Boolean deleteSpectator(@PathVariable("spectatorId") Long spectatorId) {
		return this.spectatorService.deleteSpectator(spectatorId);
	}
	
     @PostMapping("signup")
     public Boolean signupSpectator(@RequestBody Spectator s) {
    	  System.out.println(s);
    	  if(this.spectatorService.saveNewSpectator(s) != null)
    		    return true;
    	 
    	  return false;
     }
     
 	 @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SPECTATOR')")
     @GetMapping("{spectatorId}/get")
     public Spectator getSpectatorById(@PathVariable("spectatorId") Long spectatorId) {
    	 return this.spectatorService.getSpectatorById(spectatorId);
     }
 	 
 	 @PreAuthorize("hasRole('ROLE_ADMIN')")
     @PostMapping("{id}/update")
     public Spectator updateSpectator(@RequestBody Spectator s) {
    	  return this.spectatorService.updateSpectator(s);
     }
     
 	 @PreAuthorize("hasRole('ROLE_ADMIN')")
     @GetMapping("all/{pageIndex}")
     public List<Spectator> getSpectatorsPage(@PathVariable int pageIndex,@RequestParam(required = false) Long gameId,@RequestParam(required = false) Integer pageSize,@RequestParam(required = false) String searchQuery){
    	 return this.spectatorService.getSpectatorsPage(pageIndex,pageSize ,gameId,searchQuery).getContent();
     }
}
