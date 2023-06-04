export default class UsuariosServices {
    obtenerJSONUsuarios() {
      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          return response.json();
        })
        .catch(error => {
          console.error('Hubo un error:', error);
        });
    }
  
  }
  