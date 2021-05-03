package isi.tn.services;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.tn.entities.Game;
import isi.tn.entities.Stadium;
import isi.tn.entities.Team;
import isi.tn.entities.Tour;
import isi.tn.repository.GameRepository;
import isi.tn.repository.SpectatorRepository;

@Service
public class GameService {
    @Autowired
    private GameRepository gr;
    
    
    public List<Game> getAllGames() {
    	return this.gr.findAll();
    }
    
    
    public List<Game> getCurrentTourGames() {
    	List<Map<String,String>> tmp =  gr.getCurrentTourGames(); 
        List<Game> result = new LinkedList<>();
        
        Game g=null;
        Team homeTeam = null;
        Team awayTeam = null;
        Stadium s=null;
        Tour t=null;
        
        for(Map<String,String> item: tmp) {
        	g = new Game();
        	g.setId(Long.valueOf(String.valueOf(item.get("game_id"))).longValue());
        	
        	t= new Tour();
        	
        	t.setId(Long.valueOf(String.valueOf(item.get("tour_id"))).longValue());
        	t.setDesignation(item.get("designation"));
        	
        	g.setTour(t);
        	
        	
        	
        	s = new Stadium();
        	s.setId(Long.valueOf(String.valueOf(item.get("stadium_id"))).longValue());
        	s.setStadiumName(item.get("stadium_name"));
        	s.setVirageNCap(Integer.valueOf(String.valueOf(item.get("stadium_virage_nord_capacity"))).intValue()+Integer.valueOf(String.valueOf(item.get("stadium_virage_sud_capacity"))).intValue());
		    s.setViragePelCap(Integer.valueOf(String.valueOf(item.get("stadium_peulouse_capacity"))).intValue());
		    s.setVirageEncInfCap(Integer.valueOf(String.valueOf(item.get("stadium_enceinte_inf_capacity"))).intValue());
		    s.setVirageEncSupCap(Integer.valueOf(String.valueOf(item.get("stadium_enceinte_sup_capacity"))).intValue());
        	
        	g.setStadium(s);
        	
        	homeTeam = new Team();
        	homeTeam.setId(Long.valueOf(String.valueOf(item.get("hometeam_id"))).longValue());
        	homeTeam.setTeamName(item.get("hometeam_name"));
        	
        	awayTeam = new Team();
        	awayTeam.setId(Long.valueOf(String.valueOf(item.get("awayteam_id"))).longValue());
        	awayTeam.setTeamName(item.get("awayteam_name"));
        	
        	g.setHomeTeam(homeTeam);
        	g.setAwayTeam(awayTeam);  
        	
        	result.add(g);
        }
    	return result;
    }
}
