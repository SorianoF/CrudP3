class Auth {
    static login(username, password) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(u => u.username === username && u.password === password);
  
      if (!usuario) {
        alert("Usuario o contraseña incorrectos");
        return false;
      }
  
      localStorage.setItem("usuarioActual", username);
      return true;
    }
  
    static register(username, password) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      
      if (usuarios.find(u => u.username === username)) {
        alert("Ese usuario ya existe");
        return false;
      }
  
      usuarios.push({ username, password });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Usuario registrado con éxito");
      return true;
    }
  
    static logout() {
      localStorage.removeItem("usuarioActual");
      window.location.href = "login.html";
    }
  
    static isLoggedIn() {
      return localStorage.getItem("usuarioActual") !== null;
    }
  
    static getCurrentUser() {
      return localStorage.getItem("usuarioActual");
    }
}  