package isi.tn.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

}
