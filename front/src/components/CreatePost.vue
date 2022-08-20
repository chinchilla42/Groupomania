<script>
export default 
{
  name: 'CreatePost',
  data() {
    return {
      content: "",
      imageUrl: "",
      userId: localStorage.getItem('userId'),
    }
  },
  methods: 
  {
    publishContent() 
    {
      if (this.content == "")
      {
        alert("Votre publication est vide");
      }
      else 
      {
        let input = document.getElementById('image');
        const newPost = new FormData();
        
          newPost.append("content", this.content);
          newPost.append("image", input.files[0]);
          newPost.append("userId", localStorage.getItem("userId"));
        //const newPost = {
          //userId: localStorage.getItem("userId"),
          //content: this.content,
        }
        console.log(FormData)
        const options =
        {
          method: 'POST',
          body: (FormData),
          headers: 
          {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        };
        fetch('http://localhost:3000/api/post/createPost', options)

          .then((res => res.json()
          .then(data => {
          console.log(data);
          if(res.status === 201)
          {
            alert("Votre message a été publié avec succès")
            this.$router.push('/HomePage');
          }
          else 
          {
            alert("Erreur lors de la publication de votre post");
          }
        })
        .catch(error => console.log('error', error))))
      }
     }
   }

</script>

<template>
  <div class="createPost">
    <h2>Créer une publication</h2>
    <form method="post" enctype="multipart/form-data">
      <textarea wrap="soft" rows="1" name="content" v-model="content" placeholder="Quoi de neuf ?"></textarea>
      <label for="image"><i class="fas fa-file-image"></i> Ajouter une image</label>
      <input 
      type="file" 
      id="imageUrl" 
      name="image" 
      accept=".image/*" 
      aria-label="file selection" />
      <button type="submit" @click="publishContent()">Partager</button>
    </form>
  </div>
</template>