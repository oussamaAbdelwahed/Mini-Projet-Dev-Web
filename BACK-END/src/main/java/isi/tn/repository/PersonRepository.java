package isi.tn.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Person;

@Repository
public interface PersonRepository<T extends Person> extends JpaRepository<T, Long> {
   public T findByEmail(String email);
}
