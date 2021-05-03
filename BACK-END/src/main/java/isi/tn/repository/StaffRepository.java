package isi.tn.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.entities.Staff;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Long>{
    public Optional<Staff> findStaffById(Long id);
}
