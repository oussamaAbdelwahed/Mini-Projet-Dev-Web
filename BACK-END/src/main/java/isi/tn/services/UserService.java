package isi.tn.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import isi.tn.entities.Admin;
import isi.tn.entities.Person;
import isi.tn.entities.Referee;
import isi.tn.entities.Spectator;
import isi.tn.repository.PersonRepository;

@Service(value = "userService")
public class UserService implements UserDetailsService{ 

	
	@Autowired
	private PersonRepository personDao;
    
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    Person person = personDao.findByEmail(username);
		if(person == null){
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		return new org.springframework.security.core.userdetails.User(person.getEmail(), person.getPassword(), getAuthority(person));
	}
	

	private Set<SimpleGrantedAuthority> getAuthority(Person p) {
		String userNeededDataInFrontEnd = "{\"id\":"+p.getId()+",\"firstname\":\""+p.getFirstname()+"\",\"lastname\":\""+p.getLastname()+"\"}";
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		if(p instanceof Referee) {
			System.out.println("***********<***************<**************<**************<************FEFEREE INSTANCE ************>*****************>**************>****************>******");
			authorities.add(new SimpleGrantedAuthority(userNeededDataInFrontEnd+";ROLE_REFEREE"));
		}else if(p instanceof Admin) {
			System.out.println("***********<***************<**************<**************<************ADMIN INSTANCE ************>*****************>**************>****************>******");
			authorities.add(new SimpleGrantedAuthority(userNeededDataInFrontEnd+";ROLE_REFEREE;ROLE_ADMIN"));
		}else if(p instanceof Spectator){
			System.out.println("***********<***************<**************<**************<************BUG FUCKING INSTANCE ************>*****************>**************>****************>******");
			authorities.add(new SimpleGrantedAuthority(userNeededDataInFrontEnd+";ROLE_SPECTATOR"));
		}
		
		//SEULEMENT ÇA A CHANGER % A L OLD VERSION(3AND BOUHMID)

		return authorities;
	}
}
