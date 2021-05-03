package isi.tn.services;

import java.util.List;

import isi.tn.entities.*;
import isi.tn.entities_enums.TypeReferee;
import isi.tn.exception.ResourceNotFoundException;
import isi.tn.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
	private final TeamRepository teamRepository;
	private final PlayerRepository playerRepository;
	private final StaffRepository staffRepository;
	private final StadiumRepository stadiumRepository;
	private final RefereeRepository refereeRepository;
	private final SpectatorRepository spectatorRepository;
	private final TourRepository tourRepository;
	private final GameRepository gameRepository ;
	private final TicketRepository ticketRepository;
	private final AdminRepository adminRepository;
	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	public AdminService (TeamRepository teamRepository , PlayerRepository playerRepository,StaffRepository staffRepository
						, StadiumRepository stadiumRepository, RefereeRepository refereeRepository , SpectatorRepository spectatorRepository
						,TourRepository tourRepository , GameRepository gameRepository,TicketRepository ticketRepository,AdminRepository adminRepository) {
		this.teamRepository=teamRepository;
		this.playerRepository=playerRepository;
		this.staffRepository=staffRepository;
		this.stadiumRepository=stadiumRepository;
		this.refereeRepository=refereeRepository;
		this.spectatorRepository=spectatorRepository;
		this.tourRepository=tourRepository;
		this.gameRepository=gameRepository;
		this.ticketRepository=ticketRepository;
		this.adminRepository=adminRepository;
	}

	//team management
	public List<Team> findAllTeams() {
		return teamRepository.findAll();
	}
	public List<Team> findTeamByWinner(Boolean bool) {
		return teamRepository.findByIsWinner(bool).orElseThrow(()->
				new ResourceNotFoundException("No winner teams Found"));
	}
	public Team findTeamById(Long id) {
		return teamRepository.findTeamById(id).orElseThrow(()->
				new ResourceNotFoundException("no Team with id: "+id+" was found"));
	}
	public Team addTeam(Team team) {
		return teamRepository.save(team);
	}
	public Team updateTeam(Long id , Team changes) {
		Team team = teamRepository.findTeamById(id).orElseThrow(()->
				new ResourceNotFoundException("no Team with id: "+id+" was found")) ;
		team.setTeamName(changes.getTeamName());
		team.setPhoto(changes.getPhoto());
		team.setWinner(changes.getWinner());
		return teamRepository.save(team);
	}

	public void deleteTeam(Long id) {
		Team team = teamRepository.findTeamById(id).orElseThrow(()->
				new ResourceNotFoundException("no Team with id: "+id+" was found"));
		if(team.getPlayers()!=null) {
			for (Player player : team.getPlayers()) {
				this.deletePlayer(player.getId());
			}
		}
		if(team.getStaffs()!=null) {
			for (Staff staff : team.getStaffs()) {
				this.deleteStaff(staff.getId());
			}
		}
		teamRepository.delete(team);
	}
	//end team management

	//player management
	public List<Player> findAllPlayers(){
		return playerRepository.findAll();
	}
	public Player findPlayerById(Long id) {
		return playerRepository.findPlayerById(id).orElseThrow(()->
				new ResourceNotFoundException("no Player with id: "+id+" was found"));

	}

	public Player addPlayer(Player player) {return playerRepository.save(player);}
	public Player updatePlayer(Long id , Player changes) {
		Player player = playerRepository.findPlayerById(id).orElseThrow(()->
				new ResourceNotFoundException("no Player with id: "+id+" was found"));
		player.setLastname(changes.getLastname());
		player.setFirstname(changes.getFirstname());
		player.setSex(changes.getSex());
		player.setCIN(changes.getCIN());
		player.setDateNaiss(changes.getDateNaiss());
		player.setPosition(changes.getPosition());
		player.setNumber(changes.getNumber());
		//player.setTeamOfPlayer(changes.getTeamOfPlayer());
		return playerRepository.save(player);
	}

	public Player updatePlayerTeam(Long id , Player changes) {
		Player player = playerRepository.findPlayerById(id).orElseThrow(()->
				new ResourceNotFoundException("no Player with id: "+id+" was found"));

		player.setTeamOfPlayer(changes.getTeamOfPlayer());
		return playerRepository.save(player);
	}
	public void deletePlayer(Long id) {
		Player player = playerRepository.findPlayerById(id).orElseThrow(()->
				new ResourceNotFoundException("Player with id "+id+" was not found"));
		playerRepository.delete(player);
	}
	//end player management

	//staff management
	public List<Staff> findAllStaffMembers(){
		return staffRepository.findAll();
	}
	public Staff findStaffById(Long id) {
		return staffRepository.findStaffById(id).orElseThrow(()->
				new ResourceNotFoundException("Staff member with id: "+id+" was not found"));

	}

	public Staff addStaff(Staff staff) {return staffRepository.save(staff);}
	public Staff updateStaff(Long id , Staff changes) {
		Staff staff = staffRepository.findStaffById(id).orElseThrow(()->
				new ResourceNotFoundException("Staff member with id: "+id+" was not found"));
		staff.setLastname(changes.getLastname());
		staff.setFirstname(changes.getFirstname());
		staff.setSex(changes.getSex());
		staff.setCIN(changes.getCIN());
		staff.setDateNaiss(changes.getDateNaiss());
		staff.setRoleStaff(changes.getRoleStaff());
		//staff.setTeamOfStaff(changes.getTeamOfStaff());
		return staffRepository.save(staff);
	}
	public Staff updateStaffTeam(Long id , Staff changes) {
		Staff staff = staffRepository.findStaffById(id).orElseThrow(()->
				new ResourceNotFoundException("Staff member with id: "+id+" was not found"));
		staff.setTeamOfStaff(changes.getTeamOfStaff());
		return staffRepository.save(staff);
	}
	public void deleteStaff(Long id) {
		Staff staff = staffRepository.findStaffById(id).orElseThrow(()->
				new ResourceNotFoundException("Staff member with id "+id+" was not found"));
		staffRepository.delete(staff);
	}
	//end staff management

	//stadium management
	public List<Stadium> findAllStadiums(){
		return stadiumRepository.findAll();
	}
	public Stadium findStadiumById(Long id) {
		return stadiumRepository.findStadiumById(id).orElseThrow(()->
				new ResourceNotFoundException("Stadium with id: "+id+" was not found"));

	}

	public Stadium addStadium(Stadium stadium) {return stadiumRepository.save(stadium);}
	public Stadium updateStadium(Long id , Stadium changes) {
		Stadium stadium = stadiumRepository.findStadiumById(id).orElseThrow(()->
				new ResourceNotFoundException("Stadium with id: "+id+" was not found"));
		stadium.setStadiumName(changes.getStadiumName());
		stadium.setVirageNCap(changes.getVirageNCap());
		stadium.setVirageSCap(changes.getVirageSCap());
		stadium.setViragePelCap(changes.getViragePelCap());
		stadium.setVirageEncInfCap(changes.getVirageEncInfCap());
		stadium.setVirageEncSupCap(changes.getVirageEncSupCap());
		return stadiumRepository.save(stadium);
	}
	public void deleteStadium(Long id) {
		Stadium stadium = stadiumRepository.findStadiumById(id).orElseThrow(()->
				new ResourceNotFoundException("Stadium with id "+id+" was not found"));
		stadiumRepository.delete(stadium);
	}
	//end stadium management

	//Referee Management
	public List<Referee> findAllReferees(){
		return refereeRepository.findAll();
	}
	public List<Referee> findRefereesByType(String type) {
		return refereeRepository.findByTypeReferee(Enum.valueOf(TypeReferee.class,type)).orElseThrow(()->
				new ResourceNotFoundException("Referees with type: "+type+" was not found"));
	}
	public Referee findRefereeById(Long id) {
		return refereeRepository.findRefereeById(id).orElseThrow(()->
				new ResourceNotFoundException("Referee with id: "+id+" was not found"));

	}

	public Referee addReferee(Referee referee) {return refereeRepository.save(referee);}
	public Referee updateReferee(Long id , Referee changes) {
		Referee referee = refereeRepository.findRefereeById(id).orElseThrow(()->
				new ResourceNotFoundException("Referee with id: "+id+" was not found"));
		referee.setLastname(changes.getLastname());
		referee.setFirstname(changes.getFirstname());
		referee.setSex(changes.getSex());
		referee.setCIN(changes.getCIN());
		referee.setDateNaiss(changes.getDateNaiss());
		referee.setTypeReferee(changes.getTypeReferee());
		return refereeRepository.save(referee);
	}
	public void deleteReferee(Long id) {
		Referee referee = refereeRepository.findRefereeById(id).orElseThrow(()->
				new ResourceNotFoundException("Referee with id "+id+" was not found"));
		refereeRepository.delete(referee);
	}
	//end referee management

	//spectator Management
	public List<Spectator> findAllSpectators(){
		return spectatorRepository.findAll();
	}
	public Spectator findSpectatorById(Long id) {
		return spectatorRepository.findSpectatorById(id).orElseThrow(()->
				new ResourceNotFoundException("Spectator with id: "+id+" was not found"));

	}

	public Spectator addSpectator(Spectator spectator) {
		spectator.setPassword(encoder.encode(spectator.getPassword()));
		return spectatorRepository.save(spectator);
	}
	public Spectator updateSpectator(Long id , Spectator changes) {
		Spectator spectator = spectatorRepository.findSpectatorById(id).orElseThrow(()->
				new ResourceNotFoundException("Spectator with id: "+id+" was not found"));
		spectator.setLastname(changes.getLastname());
		spectator.setFirstname(changes.getFirstname());
		spectator.setEmail(changes.getEmail());
		spectator.setSex(changes.getSex());
		spectator.setCIN(changes.getCIN());
		spectator.setDateNaiss(changes.getDateNaiss());
		spectator.setPassword(encoder.encode(changes.getPassword()));
		return spectatorRepository.save(spectator);
	}
	public void deleteSpectator(Long id) {
		Spectator spectator = spectatorRepository.findSpectatorById(id).orElseThrow(()->
				new ResourceNotFoundException("Spectator with id "+id+" was not found"));
		if(spectator.getTickets()!=null) {
			for (Ticket ticket : spectator.getTickets()) {
				this.deleteTicket(ticket.getReference());
			}
		}
		spectatorRepository.delete(spectator);
	}
	//end spectator management

	//Tour management
	public List<Tour> findAllTours(){
		return tourRepository.findAll();
	}
	public Tour findTourById(Long id) {
		return tourRepository.findTourById(id).orElseThrow(()->
				new ResourceNotFoundException("Tour with id: "+id+" was not found"));

	}

	public Tour addTour(Tour tour) {
		return tourRepository.save(tour);
	}
	public Tour updateTour(Long id , Tour changes) {
		Tour tour = tourRepository.findTourById(id).orElseThrow(()->
				new ResourceNotFoundException("Tour with id: "+id+" was not found"));
		tour.setDesignation(changes.getDesignation());
		tour.setNumberTeamMax(changes.getNumberTeamMax());
		return tourRepository.save(tour);
	}
	public void deleteTour(Long id) {
		Tour tour = tourRepository.findTourById(id).orElseThrow(()->
				new ResourceNotFoundException("Tour with id "+id+" was not found"));
		tourRepository.delete(tour);
	}
	//end Tour management

	//Game management
	public Game findGameById(Long id) {
		return gameRepository.findGameById(id).orElseThrow(()->
				new ResourceNotFoundException("Game with id: "+id+" was not found"));
	}
	public List<Game> findGamesByTour(Long id) {
		Tour tour = tourRepository.findTourById(id).orElseThrow(()->new ResourceNotFoundException("Tour with id "+id+" was not found"));
		List<Game> games =  gameRepository.findByTour(tour).orElseThrow(()->
				new ResourceNotFoundException("No Game was Found for Tour "+ tour.getDesignation()));
		return games;
	}
	public Game addGame(Game game) { return gameRepository.save(game);}
	public void deleteGame(Long id) {
		Game game = gameRepository.findGameById(id).orElseThrow(()->
				new ResourceNotFoundException("Game with id "+id+" was not found"));
		if(game.getTickets()!=null) {
			for (Ticket ticket : game.getTickets()) {
				this.deleteTicket(ticket.getReference());
			}
		}
		gameRepository.delete(game);
	}
	public Game updateGame(Long id,Game changes) {
		Game game = gameRepository.findGameById(id).orElseThrow(()->
				new ResourceNotFoundException("game with "+id+" was not found"));
		game.setScore(changes.getScore());
		char [] score = changes.getScore().toCharArray();
		if (score[0] > score[2]) {
			game.getHomeTeam().setWinner(true);
			game.getAwayTeam().setWinner(false);
		}
		if (score[0] < score[2]) {
			game.getHomeTeam().setWinner(false);
			game.getAwayTeam().setWinner(true);
		}
			teamRepository.save(game.getAwayTeam());
			teamRepository.save(game.getAwayTeam());
		return gameRepository.save(game);
	}

	//end game management

	//Ticket management
	public void deleteTicket(Long id) {
		Ticket ticket = ticketRepository.findTicketByReference(id).orElseThrow(()->
				new ResourceNotFoundException("Ticket with id "+id+" was not found"));
		ticketRepository.delete(ticket);
	}
	//end ticket management

	//creating instance of super admin
	public Admin addAdmin(Admin admin) {
		admin.setPassword(encoder.encode(admin.getPassword()));
		return adminRepository.save(admin);
	}
}
