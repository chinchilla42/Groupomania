<script>
export default 
{
  name: 'CreatePost',
  data() {
    return {
      post: "",
      content: "",
      date: new Date().toLocaleString(),
      image: "",
      file: "",
      userId: localStorage.getItem('userId'),
      isCreate: false,
      imageFile: null,
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
    addImg(){
          this.file = this.$refs.file.files[0];
          //console.log(this.file);
          if (this.file && this.file['type'].split('/')[0] === 'image') 
          {
         this.imageFile = this.file;
         //console.log(this.imageFile);
         this.imagePreview = URL.createObjectURL(this.file);
        console.log(this.imagePreview);
       }
       else 
       {
         this.$refs.file.value = null;
       }
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
          this.$emit("getAllPosts"); 
        })
        .catch(error => console.log('error', error))))
      
      }
      else // post avec image ***CA MARCHE PAS T___T***
      {
        const newPost = new FormData();
          newPost.append("content", this.content);
          //newPost.append("image", this.imagePreview);    
          newPost.append("image", this.imageFile);   
          // plante le back --> penser à redémarrer avec rs dans le back   
          newPost.append("userId", localStorage.getItem("userId"));
         
        for (const value of newPost.values()) 
        {
          console.log(value);
        }        
        const options =
        {
          method: 'POST',
          body: newPost, 
          //body: JSON.stringify(newPost),

          headers: 
          {
            "Content-Type": "multipart/form-data",
            //"Boundary": "--",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        };
        fetch('http://localhost:3000/groupomania/post', options)

          .then((res => res.json()
          .then(res => {
          console.log(res);
          alert("Votre message a été publié avec succès");
          this.$emit("getAllPosts");    //ne semble pas fonctionner, 
          //il faut reload la page pour que le dernier post s'affiche
        })
        .catch(error => console.log('error', error))))
      }
    }
  }
}
 
</script>



<template>
  <div class="createPost">
    <h2 @click="toggleIsCreate()">Créer une publication <i class="fas fa-plus"></i></h2>
    <div class="createForm" v-if="isCreate">
      <form  id="newPost" >
        <div :author="author"></div>
        <textarea wrap="soft" rows="10" name="content" v-model="content" placeholder="Quoi de neuf ?"></textarea>
        <label for="image"><i class="fas fa-file-image"></i> Ajouter une image</label>
        <input 
        type="file" 
        class="file"
        ref="file" 
        id="image"
        accept=".image/*" 
        @change="addImg()"
        aria-label="file selection" />
        <!-- <p @click="onFileClick()">Ajouter cette image</p> -->
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

textarea {
  resize: none;
  max-width: 100%;
  margin: 5px;
  padding: 5px;
}
</style>

