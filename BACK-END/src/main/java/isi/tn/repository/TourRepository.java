package isi.tn.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Tour;

import java.util.Optional;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long>{
    Optional<Tour> findTourById(Long id);
}
