import httpInstance from "@/shared/services/http.instance.js";

export  class UserApiService{
    getAll(){
        return httpInstance.get("/user")
    }
    getById(id){
        return httpInstance.get(`/user/${id}`)
    }

    login(email,password){
        console.log(email,password)
        return httpInstance.get(`/user`,{
            params:{
                email:email,
                password:password
            }
        }).then(res=>{
            if(res.data.length>0){
                return res.data[0];
            }else {
                throw new Error("Invalid email or password");
            }
        }).catch(err=>{
            console.log('Error during login',err)
            throw err;
        })
    }
}