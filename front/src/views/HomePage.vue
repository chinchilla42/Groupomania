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
}
</script>

<template>
  <div class="container">
    <NavHeader />
    <main>
      <h1>Bienvenue, <!--{{ firstName }} {{ lastName}}--> !</h1>
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
.create-post, .content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin:  10px ;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 2px #4E5166;
}

textarea {
  resize: none;
  max-width: 100%;
  margin: 5px;
  padding: 5px;
}

.change{
  display: flex;
  flex-wrap: wrap;
  width: auto;
  justify-content: space-around;
  border-top: solid 1px;

}

.content p{
  text-align: left;
  margin: 5px;
}

.like, .modify-post, .delete-post{
  color: #FD2D01;
  padding: 5px;

}

.like{
  text-align: right;
  padding-bottom: 10px;
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
