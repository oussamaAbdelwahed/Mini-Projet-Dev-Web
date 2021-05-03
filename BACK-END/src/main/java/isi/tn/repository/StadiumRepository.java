package isi.tn.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Stadium;

import java.util.Optional;

@Repository
public interface StadiumRepository extends JpaRepository<Stadium,Long>{
    public Optional<Stadium> findStadiumById(Long id);
}
