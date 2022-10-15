<script>
export default {
	name: 'NavHome',

    methods: {
        /* logout user */
        logout()
        {
            localStorage.clear();
            this.$router.push('/');	
            console.log("déconnexion");
        },  
    },
};
</script>

<template>
    <header>
        <img src="../assets/icon-left-font.png" alt="Logo de Groupomania">
        <nav>
            <ul> 
                <li><router-link to="/HomePage"><i class="fas fa-house-user"></i>Accueil</router-link></li>
                <li @click="logout()"><i class="fas fa-power-off"></i> Déconnexion</li>  
            </ul>
        </nav>
    </header>
</template>

<style>
header{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
img {
    object-fit: cover;
    width: 60%;
    height: 200px;
}

ul {
    list-style-type: none;  
}
li {
    margin: 5px;
  text-decoration: none;
  color: inherit;
}
li:hover{
    color:#FD2D01;
}
</style>