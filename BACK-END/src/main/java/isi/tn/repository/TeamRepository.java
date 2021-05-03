package isi.tn.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    public Optional<Team> findTeamById(Long id);
    public Optional<List<Team>> findByIsWinner(Boolean bool);
}
