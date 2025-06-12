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
                if (user.role === "parent") {
                    return this.getParentDetails(user.id);  // Obtener detalles del padre
                } else if (user.role === "babysitter") {
                    return this.getBabysitterDetails(user.id);  // Obtener detalles de la niñera
                }

                return user;
            }else {
                throw new Error("Invalid email or password");
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
                userId: userId,
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
                ...res.data[0],  // Detalles adicionales de la niñera
                userId: userId  // Añadimos el ID del usuario para poder usarlo más tarde
            };
        }).catch(err => {
            console.log('Error al obtener los detalles de la niñera:', err);
            throw err;
        });
    }
}