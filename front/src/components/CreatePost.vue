<script>
//import DisplayFeed from './DisplayFeed.vue';
export default 
{
  name: 'CreatePost',
  data() {
    return {
      post: "",
      content: "",
      date: new Date().toLocaleString(),
      imageUrl: "",
      file: "",
      userId: localStorage.getItem('userId'),
      isCreate: false,
      imagePreview: null,
    }
  },
  props:["author"],
  methods: 
  {
    /* afficher le formulaire de création de post */
    toggleIsCreate()
    {
      this.isCreate = !this.isCreate;
    },
    /*récupérer l'image ajoutée au post */
    addImg()
    {
      this.file = this.$refs.file.files[0];
      if (this.file && this.file['type'].split('/')[0] === 'image') 
      {
        this.imagePreview = URL.createObjectURL(this.file);
        console.log(this.imagePreview);
        //this.imageUrl = this.file;
      }
      // else 
      // {
      //   this.$refs.file.value = null;
      // }
    },
    /*envoyer le post au back */
    publishContent() {
      if (this.content == "" && this.file === "") // si le post vide
      {
        alert("Votre publication est vide");
      }
      else if (this.file === "") // post sans image OK
      {
         
        const newContent = {
          userId: this.userId,
          author: this.author,
          date: this.date,
          content: this.content,
        }
        console.log(newContent);
        const options =
        {
          method: 'POST',
          body: JSON.stringify(newContent),
          headers: 
          {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        };
        fetch('http://localhost:3000/groupomania/post', options)
          .then((res => res.json()
          .then(res => {
          console.log(res);
          alert("Votre message a été publié avec succès");
          this.toggleIsCreate;
          this.$emit('getAllPosts'); //trouver comment appeler methode depuis un autre composant
        })
        .catch(error => console.log('error', error))))
      
      }
      else // post avec image ***CA MARCHE PAS T___T***
      {
        const newPost = new FormData();
          newPost.append("userId", localStorage.getItem("userId"));
          newPost.append("author", this.author);
          newPost.append("date", this.date);          
          newPost.append("content", this.content);
          newPost.append("imageUrl", this.file);         
        for (const value of newPost.values()) 
        {
          console.log(value);
        } 
        const options =
        {
          method: 'POST',
          body: newPost, 
          headers: 
          {
            //"Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        };
        fetch('http://localhost:3000/groupomania/post', options)
        .then(res => {
            console.log(res);
            return res.json();
          })          
          .then(resData => {
          console.log(resData);
        })
        .catch(error => console.log('error message: ', error))
      }
    },
  }
}
 
</script>



<template>
  <div class="createPost">
    <h3 @click="toggleIsCreate()">Créer une publication <i class="fas fa-plus"></i></h3>
    <div class="createForm" v-if="isCreate">
      <form id="newPost">
        <div :author="author"></div>
        <textarea wrap="soft" rows="10" name="content" v-model="content" placeholder="Quoi de neuf ?"></textarea>
        <label for="file"><i class="fas fa-file-image"></i> Ajouter une image</label>
        <input 
        type="file" 
        class="image"
        ref="file" 
        id="file"
        name="file"
        @change="addImg()"
        aria-label="file selection" />
        <div v-if="imagePreview">
          <img :src=imagePreview />
        </div>
        <button type="button" @click="publishContent()">Partager</button>
      </form>
    </div>
  </div>
</template>

<style>
.createPost {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin:  10px ;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 2px #4E5166;
}
h3{
  text-align: center;
  padding: 10px;
}
textarea {
  resize: none;
  max-width: 100%;
  margin: 5px;
  padding: 5px;
}
</style>
