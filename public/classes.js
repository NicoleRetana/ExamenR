class Empleado{
  constructor(pNombreCompleto,pcodigo,pPhoto,pFecha, pEdad,pCorreo, pContrasena,pconfirmarContrasena){
    
    this.nombreCompleto = pNombreCompleto;
    this.codigo = pcodigo;
    this.photo = pPhoto;
    this.fecha = pFecha;
    this.edad = pEdad;
    this.correo = pCorreo;
    this.contrasena = pContrasena;
  }
  getId(){
    return this.codigo
}
  getCorreo() {
    return this.correo;
  }
  }

 


 