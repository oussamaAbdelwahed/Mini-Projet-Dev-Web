package isi.tn.config;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import isi.tn.entities.AuthToken;
import isi.tn.entities.Person;
import isi.tn.services.UserService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static utilities.Constants.HEADER_STRING;
import static utilities.Constants.TOKEN_PREFIX;



public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenProvider jwtTokenUtil;

    //after auth and putting basic token this filter will work in the response
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
    	System.out.println("******************************************************* HERE 1*********************************************************");
 
    	String header = req.getHeader(HEADER_STRING);
        String username = null;
        String authToken = null;
        String path = req.getRequestURI();
        //modifs added right thait of testing path if containing specific url due the fact that bearer token is sended when user authenticated and try to create an account or  re auhentificate
        if (header != null && header.startsWith(TOKEN_PREFIX) && !path.contains("/spectator/signup") && !path.contains("/token/generate-token")) {
            authToken = header.replace(TOKEN_PREFIX,"");
            try {
                username = jwtTokenUtil.getUsernameFromToken(authToken);
            } catch (IllegalArgumentException e) {
                logger.error("an error occured during getting username from token", e);
            } catch (ExpiredJwtException e) {
                logger.warn("the token is expired and not valid anymore", e);
            } catch(SignatureException e){
                logger.error("Authentication Failed. Username or Password not valid.");
            }
        } else {
        	System.out.println("******************************************************* HERE 2*********************************************************");
            logger.warn("couldn't find bearer string, will ignore the header");
        }
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        	System.out.println("******************************************************* HERE 3*********************************************************");

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
      
            
            if (jwtTokenUtil.validateToken(authToken, userDetails)) {
            	System.out.println("******************************************************* HERE 4*********************************************************");

            	UsernamePasswordAuthenticationToken authentication = jwtTokenUtil.getAuthentication(authToken, SecurityContextHolder.getContext().getAuthentication(), userDetails);
       
                
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
             
                
                logger.info("authenticated user " + username + ", setting security context");
                SecurityContextHolder.getContext().setAuthentication(authentication);
        
            }
        }else {
        	System.out.println("******************************************************* HERE 5*********************************************************");
        }

        chain.doFilter(req, res);
    }
}