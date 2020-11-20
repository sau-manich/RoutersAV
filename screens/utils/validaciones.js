export function validarCorreo(correo){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(correo);
  
  
  }
  export function validarUsuario(usuario){
  validate(text,type)
  {
  alph=/^[a-zA-Z]+$/
  if(type=='usuario')
  {
    // Verificamos 
    if(alph.test(text))
    {
      // Imprimimos en consola si ingreso correctamente
      console.warn("Texto ingresado correctamente")
    }
    else
    { // Imprimimos en consola si no ingreso correctamente
      console.wan("Texto No admitido")
    }
  }
  return alph.test(usuario);
  }}
  
  
  