<script>
import NavHeader from '@/components/NavHeader.vue'

export default {
  name: 'HomePAge',
  components: {
    NavHeader,
  },
}
</script>

<template>
  <div class="container">
    <NavHeader />
    <h1>Bienvenue</h1>
    <div class="create-post">
      <h2>Créer une publication</h2>
      <textarea wrap="soft" rows="1"  placeholder="Quoi de neuf ?"></textarea>
      <label for="image"><i class="fas fa-file-image"></i> Ajouter une image</label>
      <input
              type="file"
              id="image"
              name="image"
              accept=".image/*"
              aria-label="file selection"
            />
      <button>Partager</button>
    </div>
    <div class="feeds">
      <h2>Votre fil d'actualité</h2>
      <div class="feeds_post">
        <div class="content">
          <div class="author"> 
            <p>Nom a dit : </p>
          </div>
          <div class="image">
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur 
            dipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi 
            ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id 
            est laborum.</p>
          <div class="like"><i class="fas fa-thumbs-up"></i> J'aime</div>
          <div class="change">
          <div class="modify-post"><p><i class="fas fa-pen"></i> Modifier</p></div>
          <div class="delete-post"><p><i class="fas fa-trash"></i> Supprimer</p></div>
        </div>
        </div>

        
<div class="content">
          <div class="author"> 
            <p>Nom a dit : </p>
          </div>
          <div class="image">
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur 
            dipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi 
            ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id 
            est laborum.</p>
        </div>
      </div>
    </div>
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
