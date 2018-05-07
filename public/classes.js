class Empleado{
  constructor(pNombreCompleto,pcodigo,pPhoto,pFecha, pEdad,pCorreo, pContrasena,pconfirmarContrasena,pestado){
   
    this.nombreCompleto = pNombreCompleto;
    this.codigo = pcodigo;
    this.photo = pPhoto;
    this.fecha = pFecha;
    this.edad = pEdad;
    this.correo = pCorreo;
    this.contrasena = pContrasena;
    this.estado = pestado;
    this.listaTareas=[];
    
  }
  getId(){
    return this.codigo;
}

setId(pcodigo){
   this.codigo=pcodigo;
}

setTarea(ptarea){
  this.listaTareas.push(ptarea);
}
  getCorreo() {
    return this.correo;
  }

  getEstado() {
    return this.estado;
}

  }


 
  class Tarea{
    constructor(pnombreTarea,pdescripcion,pfecha,pprioridad, pestado,pcosto, pproyecto,pempleado){
     this._id=0;
      this.nombreTarea = pnombreTarea;
      this.descripcion = pdescripcion;
      this.fecha = pfecha;
      this.prioridad = pprioridad;
      this.estado = pestado;
      this.costo = pcosto;
      this.proyecto = pproyecto;
      this.empleado = pempleado;
      this.estadoTarea = 'activo';
      
    }
   
  setId(pid){
     this._id=pid;
  }
   
   
  
    }
  

 