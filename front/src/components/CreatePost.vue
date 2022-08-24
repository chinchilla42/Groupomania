<script>
export default 
{
  name: 'CreatePost',
  data() {
    return {
      content: "",
      image: "",
      file: "",
      userId: localStorage.getItem('userId'),
      isCreate: false,
    }
  },
  methods: 
  {
    toggleIsCreate()
    {
      this.isCreate = !this.isCreate;
    },

    onFileClick() 
    {
      this.$refs['input-file'].click()
    },

    onFileSelect() 
    {
      const [file] = this.$refs.file.files;
      if (file && file['type'].split('/')[0] === 'image') {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      }
      else {
        this.$refs.file.value = null;
      }
    },

    publishContent() //essai pour publication avec image
    {
      if (this.content == "")
      {
        alert("Votre publication est vide");
      }
      else 
      {
         const newPost = new FormData();
          newPost.append("content", this.content);
          newPost.append("image", this.file);    
          //newPost.append("image", this.file, this.file.name);      
          newPost.append("userId", localStorage.getItem("userId"));
         
        for (const value of newPost.values()) 
        {
          console.log(value);
        }        
        const options =
        {
          method: 'POST',
          body: newPost, //body: JSON.stringify(newPost),

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
          //this.getAllPosts();        
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
        <textarea wrap="soft" rows="1" name="content" v-model="content" placeholder="Quoi de neuf ?"></textarea>
        <label for="image"><i class="fas fa-file-image"></i> Ajouter une image</label>
        <input 
        type="file" 
        ref="file" 
        id="image"
        accept=".image/*" 
        @change="onFileSelect()"
        aria-label="file selection" />
        <button @click="onFileClick()">Ajouter cette image</button>
        <button type="submit" @click="publishContent()">Partager</button>
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

