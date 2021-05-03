package isi.tn.entities_enums;

public enum TicketType {
  VIRAGE("VIRAGE"),
  PELOUSE ("PELOUSE"),
  ENCEINTE_INF("ENCEINTE_INF"),
  ENCEINTE_SUP("ENCEINTE_SUP");
  
  public final String label;

  private TicketType(String label) {
      this.label = label;
  }
}
