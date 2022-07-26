module.exports=(sequalize,Datatypes)=>{
    const Users= sequalize.define("Users",{
        
        username:{
            type:Datatypes.STRING,
            allowNull:false,
            min:3,
            max:20,
            unique:true

        },
        email:{
            type:Datatypes.STRING,
            allowNull:false,
            max:50,
            unique:true

        },
        password:{
            type:Datatypes.STRING,
            allowNull:false,
            min:6
        }

    })

    return Users;
}