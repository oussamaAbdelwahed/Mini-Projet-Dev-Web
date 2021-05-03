package isi.tn.controllers;

import java.util.LinkedList;
import java.util.List;

import isi.tn.entities.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import isi.tn.services.AdminService;

@RestController
@RequestMapping(path = "/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {
	private final AdminService adminService ;
	
	public AdminController(AdminService adminService) {
		this.adminService=adminService;
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/teams")
	public ResponseEntity<List<Team>> getAllTeams() {
		List<Team> teams = adminService.findAllTeams();
		return new ResponseEntity<>(teams, HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/teamsByState/{bool}")
	public ResponseEntity<List<Team>> getTeamsByState(@PathVariable boolean bool) {
		List<Team> teams = adminService.findTeamByWinner(bool);
		return new ResponseEntity<>(teams,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/teams/{id}")
	public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
		Team team = adminService.findTeamById(id) ;
		return new ResponseEntity<>(team,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/teams/add")
	public ResponseEntity<Team> addTeam(@RequestBody Team team) {
		Team t = adminService.addTeam(team);
		return new ResponseEntity<>(t,HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/teams/update/{id}")
	public ResponseEntity<Team> updateTeam(@PathVariable Long id , @RequestBody Team changes) {
		Team team = adminService.updateTeam(id,changes);
		return new ResponseEntity<>(team,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/teams/delete/{id}")
	public ResponseEntity<?> deleteTeam(@PathVariable Long id) {
		adminService.deleteTeam(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	//end team management

	//player management
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/players")
	public ResponseEntity<List<Player>> getAllPlayers() {
		List<Player> players = adminService.findAllPlayers();
		return new ResponseEntity<>(players,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/players/{id}")
	public ResponseEntity<Player> getPlayerById(@PathVariable Long id) {
		Player player = adminService.findPlayerById(id);
		return new ResponseEntity<>(player,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/players/add")
	public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
		Player p = adminService.addPlayer(player);
		return new ResponseEntity<>(p,HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/players/update/{id}")
	public ResponseEntity<Player> updatePlayer(@PathVariable Long id ,@RequestBody Player changes) {
		Player player = adminService.updatePlayer(id,changes);
		return new ResponseEntity<>(player,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/players/updateTeam/{id}")
	public ResponseEntity<Player> updatePlayerTeam(@PathVariable Long id ,@RequestBody Player changes) {
		Player player = adminService.updatePlayerTeam(id,changes);
		return new ResponseEntity<>(player,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/players/delete/{id}")
	public ResponseEntity<?> deletePlayer(@PathVariable Long id) {
		adminService.deletePlayer(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	//Staff management

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/staffs")
	public ResponseEntity<List<Staff>> getAllStaffMemebers() {
		List<Staff> staffs = adminService.findAllStaffMembers();
		return new ResponseEntity<>(staffs,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/staffs/{id}")
	public ResponseEntity<Staff> getStaffMemberById(@PathVariable Long id) {
		Staff staff = adminService.findStaffById(id);
		return new ResponseEntity<>(staff,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/staffs/add")
	public ResponseEntity<Staff> addStaffMember(@RequestBody Staff staff) {
		Staff s = adminService.addStaff(staff);
		return new ResponseEntity<>(s,HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/staffs/update/{id}")
	public ResponseEntity<Staff> updateStaffMember(@PathVariable Long id ,@RequestBody Staff changes) {
		Staff staff = adminService.updateStaff(id,changes);
		return new ResponseEntity<>(staff,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/staffs/updateTeam/{id}")
	public ResponseEntity<Staff> updateStaffMemberTeam(@PathVariable Long id ,@RequestBody Staff changes) {
		Staff staff = adminService.updateStaffTeam(id,changes);
		return new ResponseEntity<>(staff,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/staffs/delete/{id}")
	public ResponseEntity<?> deleteStaffMember(@PathVariable Long id) {
		adminService.deleteStaff(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	//end staff management

	//Stadium management

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/stadiums")
	public ResponseEntity<List<Stadium>> getAllStadiums() {
		List<Stadium> stadiums = adminService.findAllStadiums();
		return new ResponseEntity<>(stadiums,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/stadiums/{id}")
	public ResponseEntity<Stadium> getStadiumById(@PathVariable Long id) {
		Stadium stadium = adminService.findStadiumById(id);
		return new ResponseEntity<>(stadium,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/stadiums/add")
	public ResponseEntity<Stadium> addStadium(@RequestBody Stadium stadium) {
		Stadium s = adminService.addStadium(stadium);
		return new ResponseEntity<>(s,HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/stadiums/update/{id}")
	public ResponseEntity<Stadium> updateStadium(@PathVariable Long id ,@RequestBody Stadium changes) {
		Stadium stadium = adminService.updateStadium(id,changes);
		return new ResponseEntity<>(stadium,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/stadiums/delete/{id}")
	public ResponseEntity<?> deleteStadium(@PathVariable Long id) {
		adminService.deleteStadium(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	//end stadium management

	//Referee management
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/referees")
	public ResponseEntity<List<Referee>> getAllReferees() {
		List<Referee> referees = adminService.findAllReferees();
		return new ResponseEntity<>(referees,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/refereesByType/{type}")
	public ResponseEntity<List<Referee>> getRefereesByType(@PathVariable String type) {
		List<Referee> referees = adminService.findRefereesByType(type);
		return new ResponseEntity<>(referees,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/referees/{id}")
	public ResponseEntity<Referee> getRefereeById(@PathVariable Long id) {
		Referee referee = adminService.findRefereeById(id);
		return new ResponseEntity<>(referee,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/referees/add")
	public ResponseEntity<Referee> addReferee(@RequestBody Referee referee) {
		Referee r = adminService.addReferee(referee);
		return new ResponseEntity<>(r,HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/referees/update/{id}")
	public ResponseEntity<Referee> updateReferee(@PathVariable Long id ,@RequestBody Referee changes) {
		Referee referee = adminService.updateReferee(id,changes);
		return new ResponseEntity<>(referee,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/referees/delete/{id}")
	public ResponseEntity<?> deleteReferee(@PathVariable Long id) {
		adminService.deleteReferee(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	//end referee management

	//Spectator management

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/spectators")
	public ResponseEntity<List<Spectator>> getAllSpectators() {
		List<Spectator> spectators = adminService.findAllSpectators();
		return new ResponseEntity<>(spectators,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/spectators/{id}")
	public ResponseEntity<Spectator> getSpectatorById(@PathVariable Long id) {
		Spectator spectator = adminService.findSpectatorById(id);
		return new ResponseEntity<>(spectator,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/spectators/add")
	public ResponseEntity<Spectator> addSpectator(@RequestBody Spectator spectator) {
		Spectator s = adminService.addSpectator(spectator);
		return new ResponseEntity<>(s,HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/spectators/update/{id}")
	public ResponseEntity<Spectator> updateSpectator(@PathVariable Long id ,@RequestBody Spectator changes) {
		Spectator spectator = adminService.updateSpectator(id,changes);
		return new ResponseEntity<>(spectator,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/spectators/delete/{id}")
	public ResponseEntity<?> deleteSpectator(@PathVariable Long id) {
		adminService.deleteSpectator(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	//end Spectator management

	//Tour management
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/tours")
	public ResponseEntity<List<Tour>> getAllTours() {
		List<Tour> tours = adminService.findAllTours();
		return new ResponseEntity<>(tours,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/tours/{id}")
	public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
		Tour tour = adminService.findTourById(id);
		return new ResponseEntity<>(tour,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/tours/add")
	public ResponseEntity<Tour> addTour(@RequestBody Tour tour) {
		Tour t = adminService.addTour(tour);
		return new ResponseEntity<>(t,HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/tours/update/{id}")
	public ResponseEntity<Tour> updateTour(@PathVariable Long id ,@RequestBody Tour changes) {
		Tour tour = adminService.updateTour(id,changes);
		return new ResponseEntity<>(tour,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/tours/delete/{id}")
	public ResponseEntity<?> deleteTour(@PathVariable Long id) {
		adminService.deleteTour(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	//end Tour management

	//Games Managament
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/games/{id}")
	public ResponseEntity<List<Game>> getGamesForTour(@PathVariable Long id) {
		List<Game> games = adminService.findGamesByTour(id);
		return new ResponseEntity<>(games,HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/games/add")
	public ResponseEntity<Game> addGame(@RequestBody Game game) {
		Game g = adminService.addGame(game);
		return new ResponseEntity<>(g,HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/games/delete/{id}")
	public ResponseEntity<?> deleteGame(@PathVariable Long id) {
		adminService.deleteGame(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/games/update/{id}")
	public ResponseEntity<Game> changeScoreForGame(@PathVariable Long id , @RequestBody Game changes) {
		Game game= adminService.updateGame(id,changes);
		return new ResponseEntity<>(game,HttpStatus.OK);
	}
	//end games management

	//adding superAdmin
	/*
	@PostMapping("/add")
	public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
		Admin a = adminService.addAdmin(admin);
		return new ResponseEntity<>(a,HttpStatus.CREATED);
	}*/
}
