package isi.tn.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import isi.tn.entities.Spectator;
import isi.tn.repository.SpectatorRepository;

@Service
public class SpectatorService {
	@Autowired
	private SpectatorRepository spectatorRepo;
	
	@Autowired
	 private  BCryptPasswordEncoder enoder;
	
    public Spectator saveNewSpectator(Spectator s) {
    	s.setPassword(enoder.encode(s.getPassword()));
        return  spectatorRepo.save(s);
    }
    
    
    
    public Spectator updateSpectator(Spectator s) {
        Spectator spec = this.spectatorRepo.findById(s.getId()).get();
        spec.setFirstname(s.getFirstname());
        spec.setLastname(s.getLastname());
        spec.setEmail(s.getEmail());
        spec.setCIN(s.getCIN());
        spec.setSex(s.getSex());
        spec.setDateNaiss(s.getDateNaiss());
        
       return this.spectatorRepo.save(spec);
    }
    
    public Spectator getSpectatorById(Long spectatorId) {
    	return this.spectatorRepo.findById(spectatorId).get();
    }
    
    public Page<Spectator> getSpectatorsPage(int pageIndex,Integer pageSize,Long gameId,String searchQuery) {
    	Pageable p = PageRequest.of(pageIndex, pageSize != null ? pageSize : 2);
    	if(gameId!=null) {
    		if(searchQuery == null || searchQuery.length() ==0) {
    		  return  this.spectatorRepo.findByTicketsGameId(gameId,p);
    		}
            return   this.spectatorRepo.findByTicketsGameIdAndSearchQuery(gameId, searchQuery,p);
    	
    	}else {
    		if(searchQuery == null || searchQuery.length() ==0) {
        	  return  this.spectatorRepo.findAll(p);
    		}
    		return   this.spectatorRepo.findBySearchQuery(searchQuery,p);
    	}
    }
    
    public Boolean deleteSpectator(Long spectatorId) {
    	try {
        	this.spectatorRepo.deleteById(spectatorId);
        	return true;
    	}catch(Exception e) {
    		e.printStackTrace();
    		return false;
    	}
    }
}
