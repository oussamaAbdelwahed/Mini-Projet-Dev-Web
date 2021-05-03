package isi.tn.repository;
import isi.tn.entities_enums.TypeReferee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Referee;

import java.util.List;
import java.util.Optional;

@Repository
public interface RefereeRepository extends JpaRepository<Referee,Long> {

   public Optional<Referee> findRefereeById(Long id);
   public Optional<List<Referee>> findByTypeReferee(TypeReferee typeReferee);
}
