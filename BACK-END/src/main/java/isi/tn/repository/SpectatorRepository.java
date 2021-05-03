package isi.tn.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Spectator;

import java.util.Optional;

@Repository
public interface SpectatorRepository extends JpaRepository<Spectator,Long>{
    public Page<Spectator> findByTicketsGameId(Long id,Pageable pageable);
    
    //@Query(value="SELECT s FROM Spectator s  WHERE t.game.id = :",nativeQuery = false)
    @Query(value="SELECT s FROM Spectator s INNER JOIN s.tickets t  WHERE t.game.id =  :gameId AND s.firstname LIKE %:searchQuery% OR s.lastname LIKE %:searchQuery% OR s.cin  LIKE %:searchQuery% OR s.email LIKE %:searchQuery%")
    public Page<Spectator> findByTicketsGameIdAndSearchQuery(@Param("gameId") Long gameId,@Param("searchQuery") String searchQuery,Pageable pageable);
    
    @Query(value="SELECT s FROM Spectator s INNER JOIN s.tickets t WHERE s.firstname LIKE %:searchQuery% OR s.lastname LIKE %:searchQuery% OR s.cin  LIKE %:searchQuery% OR s.email LIKE %:searchQuery%")
    public Page<Spectator> findBySearchQuery(@Param("searchQuery") String searchQuery,Pageable pageable);
    public Optional<Spectator> findSpectatorById(Long id);

    
}
