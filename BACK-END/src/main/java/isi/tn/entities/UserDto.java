package isi.tn.entities;

public class UserDto {
	private Long id;
	private String fname,lname,email,pwd;
	
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public Long getId() {
			return id;
	}
	public void setId(Long id) {
			this.id = id;
	}
	public String getFname() {
			return fname;
	}
	public void setFname(String fname) {
			this.fname = fname;
	}
	public String getLname() {
			return lname;
	}
	public void setLname(String lname) {
			this.lname = lname;
	}
	public String getEmail() {
			return email;
	}
	public void setEmail(String email) {
			this.email = email;
	}
}
