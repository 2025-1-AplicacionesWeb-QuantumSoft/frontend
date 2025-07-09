import httpInstance from "@/shared/services/http.instance.js";

export  class UserApiService{


    login(email,password){

        return httpInstance.get(`/user`,{
            params:{
                email:email,
                password:password
            }
        }).then(res=>{
            console.log("Respuesta de la API:", res.data);
            if(res.data.length>0){
                const user =  res.data[0];
                console.log("Usuario encontrado:", user);

                if (user.role === "parent") {
                    return this.getParentDetails(user.id)
                        .then(parentDetails=>({...user,...parentDetails}));  // Obtener detalles del padre
                } else if (user.role === "babysitter") {
                    return this.getBabysitterDetails(user.id)
                        .then(babysitterDetails=>({...user,...babysitterDetails}));  // Obtener detalles de la niñera
                }else {
                    return Promise.reject(new Error("Rol de usuario no reconocido."));
                }
            }else {
                return Promise.reject(new Error("Correo o contraseña incorrectos"));
            }
        }).catch(err=>{
            console.log('Error during login',err)
            throw err;
        })
    }

    getParentDetails(userId){
        return httpInstance.get(`/parent`,{
            params: { user_id: userId }
        }).then(res=>{
            return{
                ...res.data[0],
            };
        }).catch(err=>{
            console.log('Error during getParentDetails',err)
            throw err;
        })
    }

    getBabysitterDetails(userId) {
        return httpInstance.get(`/babysitter`, {
            params: {user_id: userId}
        }).then(res => {
            return {
                ...res.data[0],  // Detalles adicionales de la niñera// Añadimos el ID del usuario para poder usarlo más tarde
            };
        }).catch(err => {
            console.log('Error al obtener los detalles de la niñera:', err);
            throw err;
        });
    }
}