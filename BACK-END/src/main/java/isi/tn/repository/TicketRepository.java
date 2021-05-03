package isi.tn.repository;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {
     @Query(value="SELECT t.type,s.* ,COUNT(t.reference_id) as nbrBuyedTickets FROM tickets t INNER JOIN games g  ON t.game_id = g.game_id  JOIN  stadiums s ON g.fk_stadium_id = s.stadium_id WHERE g.game_id = :gameId   GROUP BY t.type\n" 
     		,nativeQuery=true)
     public List<Map<String,String>> getNbrBuyedTicketsPerType(Long gameId);
     public Optional<Ticket> findTicketByReference(Long reference);
     
     List<Ticket> findBySpectatorId(Long spectatorId);
}
