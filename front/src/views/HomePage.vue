<script>
import NavHeader from '@/components/NavHeader.vue'
import CreatePost from '@/components/CreatePost.vue'
import DisplayFeed from '@/components/DisplayFeed.vue'

export default {
  name: 'HomePAge',
  components: {
    NavHeader,
    CreatePost,
    DisplayFeed
  },
  data(){
    return {
      userId: localStorage.getItem('userId'),
      admin:  localStorage.getItem('admin'),
      firstName: "",
      lastName: "",
    }
  },
  methods:
  {
  getUserInfo() 
      {
        console.log(this.userId)
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
          .then(data => {
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            console.log(data);
          })
          .catch(error => console.log(error));
      }
  },
created() {
    this.getUserInfo();
  },
};
</script>

<template>
  <div class="container">
    <NavHeader />
    <main @created="getUserInfo()">
      <h1 > Bienvenue, {{ firstName }} {{ lastName}} !</h1>
      <CreatePost />
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

h2{
  text-align: center;
  margin: 10px;
  padding: 10px;
}
.create-post, .post {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin:  10px ;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 2px #4E5166;
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
