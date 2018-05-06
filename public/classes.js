class Empleado{
  constructor(pNombreCompleto,pcodigo,pPhoto,pFecha, pEdad,pCorreo, pContrasena,pconfirmarContrasena,pestado){
    this._id = 0;
    this.nombreCompleto = pNombreCompleto;
    this.codigo = pcodigo;
    this.photo = pPhoto;
    this.fecha = pFecha;
    this.edad = pEdad;
    this.correo = pCorreo;
    this.contrasena = pContrasena;
    this.estado = pestado;
    
  }
  getId(){
    return this.codigo
}
  getCorreo() {
    return this.correo;
  }

  getEstado() {
    return this.estado;
}




  }


 


 