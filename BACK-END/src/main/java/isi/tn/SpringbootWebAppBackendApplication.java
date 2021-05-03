package isi.tn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableJpaRepositories(basePackages="isi.tn")
//Authorization annotation syntax    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_SPECTATOR')")
public class SpringbootWebAppBackendApplication {
    
  
	private static BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();
    
	public static void main(String[] args) {
		System.out.println("**********************************************************************BCRYPT PWD  = "+bcryptEncoder.encode("winners97")+" **********************");
		SpringApplication.run(SpringbootWebAppBackendApplication.class, args);
	}

}
