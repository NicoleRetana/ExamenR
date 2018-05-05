class Empleado{
  constructor(pNombreCompleto,pPhoto,pFecha, pEdad,pCorreo, pContrasena,pconfirmarContrasena){
    
    this.nombreCompleto = pNombreCompleto;
    this.photo = pPhoto;
    this.fecha = pFecha;
    this.edad = pEdad;
    this.correo = pCorreo;
    this.contrasena = pContrasena;
    this.confirmarContrasena = pconfirmarContrasena;
  }
    getId(){
      return this.correo
  }
  getCorreo() {
    return this.correo;
  }
  }

 


 