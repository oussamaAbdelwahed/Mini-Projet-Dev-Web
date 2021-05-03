package isi.tn.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import isi.tn.entities.Game;
import isi.tn.services.GameService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/game")
public class GameController {
   @Autowired
   private GameService gs;
   
   @PreAuthorize("hasRole('ROLE_SPECTATOR')")
   @GetMapping("/current-tour-games")
   public List<Game> getCurrentTourGames() {
	  return gs.getCurrentTourGames();
   }
   
   @GetMapping("/all")
   public List<Game> getAllGames() {
	  return gs.getAllGames();
   }
}
