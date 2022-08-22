<script>
export default 
{
  name: 'CreatePost',
  data() {
    return {
      content: "",
      image: "",
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
        console.log("test");
        console.log(this.content);
        console.log(localStorage.getItem("userId"));
        let newImg = document.getElementById('image');
        this.img = newImg.files[0];
        console.log(this.img.name);
        const newPost = new FormData();
          newPost.append("userId", localStorage.getItem("userId"));
          newPost.append("content", this.content);
          newPost.append("image", this.img);
        console.log(newPost);
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

          .then((res => res.json()
          .then(data => {
          console.log(data);
          if(res.status == 201)
          {
            console.log("ok");
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
}
</script>

<template>
  <div class="createPost">
    <h2>Créer une publication</h2>
    <form enctype="multipart/form-data" method="post" id="newPost" >

      <textarea wrap="soft" rows="1" name="content" v-model="content" placeholder="Quoi de neuf ?"></textarea>
      <label for="image"><i class="fas fa-file-image"></i> Ajouter une image</label>
      <input 
      type="file" 
      ref="file"
      id="image" 
      name="image" 
      accept=".image/*" 
      aria-label="file selection" />
      <button type="submit" @click="publishContent()">Partager</button>
    </form>
  </div>
</template>