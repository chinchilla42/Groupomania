<script>
import NavHome from '@/components/NavHome.vue'
import CreatePost from '@/components/CreatePost.vue'
import DisplayFeed from '@/components/DisplayFeed.vue'
import AdminPost from '@/components/AdminPost.vue'

export default {
  name: 'HomePage',

  components: {
    NavHome,
    CreatePost ,
    DisplayFeed,
    AdminPost,
  },

  mounted() 
  {
    this.getUserInfo();
  },
  beforeUpdate(){
        if(localStorage.getItem("token") == null)
        {
            this.$router.push("/");
        } else{
            console.log("ok");
        }
    },
  
  data(){
    return {
      userId: localStorage.getItem('userId'),
      admin:  localStorage.getItem('admin'),
      user: {},
      author: "",
    }
  },
  
  methods:
  {

    /*récupérer les info de l'utilisateur connecté*/ 
    getUserInfo() 
    {
      const url = "http://localhost:3000/groupomania/auth/user/" + this.userId;
      const options =
      {
        method: "GET",
        headers:
        {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      };
      fetch(url, options)
      .then(response => response.json())
      .then(userData => {
        this.user = userData;
        this.author = this.user.firstName + ' ' + this.user.lastName;
      })
      .catch(error => console.log(error));
    },
  },

};
</script>

<template>
  <div class="container">
    <NavHome />
    <main>
      <h1 > Bienvenue, {{ user.firstName }} {{ user.lastName}} !</h1>
      <CreatePost :author=author v-if="admin == 'false'"/>
      <AdminPost v-if="admin == 'true'" />
      <DisplayFeed />
    </main>
  </div>
</template>



<style>

.container {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  max-width: 1000px;
  margin: auto;
  height: 100%;
}

h1{
  margin-bottom: 15px;
}

h2{
  text-align: center;
  margin: 10px;
  padding: 10px;
}

.post p{
  text-align: left;
  margin: 5px;
}

.fas{
  color: #FFD7D7;
  padding-right: 5px;
}
.fas:hover{
    color: #FD2D01;

}

@media (max-width: 767px) {
    body{
        font-size: small;
        text-align: center;
    }
    .container{
        max-width: 767px;
        min-width: 300px;
        width:100%;
        text-align: left;
    }
    header{
        flex-direction: column;
        text-align: center;
        margin: 0;
    }
    img {
    object-fit: cover;
    width: 100%;
    height: 100px;
    }
    ul{
      display: flex;
      flex-direction:row;
      text-align: justify;
      margin-bottom: 5px;

    }
    main{
        margin: 0;
    }
}
</style>
