<script>

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
    /* display creating post form */
    toggleIsCreate()
    {
      this.isCreate = !this.isCreate;
    },
    /* get image added to post */
    addImg()
    {
      this.file = this.$refs.file.files[0];
      if (this.file && this.file['type'].split('/')[0] === 'image') 
      {
        this.imagePreview = URL.createObjectURL(this.file);
        console.log(this.imagePreview);
      }
      else 
      {
        this.$refs.file.value = null;
      }
    },
    /* send post to backend back */
    publishContent() {
      /* if post is empty */
      if (this.content == "" && this.file === "") 
      {
        alert("Votre publication est vide");
      }
      /* post without image*/
      else if (this.file === "") 
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
          document.location.reload(); 
        })
        .catch(error => console.log('error', error))))
      
      }
      /* post with image */
      else 
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
          alert("Votre message a été publié avec succès");
          this.toggleIsCreate;
          document.location.reload(); 
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
        <textarea wrap="soft" rows="5" name="content" v-model="content" placeholder="Quoi de neuf ?"></textarea>
        <label for="file"><i class="fas fa-file-image"></i> Ajouter une image</label>
        <input 
        type="file" 
        class="image"
        ref="file" 
        id="file"
        name="file"
        accept="image/*"
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
