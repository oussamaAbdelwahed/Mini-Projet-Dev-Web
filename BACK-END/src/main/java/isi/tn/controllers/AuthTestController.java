package isi.tn.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import isi.tn.entities.Game;
import isi.tn.entities.Person;
import isi.tn.entities.Stadium;
import isi.tn.entities.Team;
import isi.tn.entities.Ticket;
import isi.tn.entities.Tour;
import isi.tn.entities.UserDto;
//import isi.tn.service.UserService;
import isi.tn.repository.PersonRepository;
import isi.tn.repository.SpectatorRepository;
import isi.tn.repository.TicketRepository;
import isi.tn.services.GameService;
import isi.tn.services.TicketService;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
//@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("/test")
public class AuthTestController {
    @Autowired
    private PersonRepository pr;
    
    @Autowired
    private TicketService ts;
    
    
    @GetMapping("/tickets/{id}")
    public List<Ticket> getNbrBuyedTicketsPerType(@PathVariable Long id) {
    	return ts.getNbrBuyedTicketsPerType(id);
    }
  
 
    //@Secured({"ROLE_ADMIN", "ROLE_USER"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value="/users", method = RequestMethod.GET)
    public List<UserDto> listUser(){
    	UserDto u1 = new UserDto();
    	UserDto u2 = new UserDto();
    	
    	u1.setId(1l);
    	u1.setEmail("ousabdelwahed@gmail.com");
    	u1.setPwd("pwd");
    	u1.setFname("oussama");
    	u1.setLname("ABDELWAHED");
    	List<UserDto> res = new LinkedList<UserDto>();
    	res.add(u1);
        return res;
    }
    
    @RequestMapping(value="/users/adduser", method = RequestMethod.GET)
    public List<Person> addUser(){
        return pr.findAll();
    }
    
    @PreAuthorize("hasRole('REFEREE')")
    @RequestMapping(value="/users/ref", method = RequestMethod.GET)
    public List<Person> listUserRef(){
        return pr.findAll();
    }

   /* //@Secured("ROLE_USER")
    @PreAuthorize("hasRole('USER')")
    ////@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public User getOne(@PathVariable(value = "id") Long id){
        return userService.findById(id);
    }


    @RequestMapping(value="/signup", method = RequestMethod.POST)
    public User saveUser(@RequestBody UserDto user){
        return userService.save(user);
    }*/



}
