package isi.tn.repository;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import isi.tn.entities.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Long>{
	@Query(value="SELECT t.tour_id,t.designation,g.game_id,ta.team_name as hometeam_name,ta.team_id as hometeam_id,tb.team_name as awayteam_name,tb.team_id as awayteam_id,s.stadium_id,s.stadium_name,s.stadium_enceinte_inf_capacity,s.stadium_enceinte_sup_capacity,s.stadium_virage_nord_capacity,s.stadium_peulouse_capacity,s.stadium_virage_sud_capacity FROM games AS g INNER JOIN tours AS t ON g.fk_tour_id = t.tour_id JOIN teams AS ta ON g.fk_hometeam_id = ta.team_id JOIN teams AS tb ON g.fk_awayteam_id= tb.team_id JOIN stadiums s ON g.fk_stadium_id = s.stadium_id WHERE t.tour_id = (SELECT MAX(t.tour_id) from tours t) ORDER BY `t`.`designation` ASC\n" + 
			"", nativeQuery = true)
	public List<Map<String,String>> getCurrentTourGames();
	public Optional<Game> findGameById(Long Id);
	public Optional<List<Game>> findByTour(Tour tour);

}
