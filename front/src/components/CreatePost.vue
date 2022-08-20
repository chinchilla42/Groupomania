<script>
export default 
{
  name: 'CreatePost',
  data() {
    return {
      content: "",
      //imageUrl: "",
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
        //let input = document.getElementById('image');
        // const newPost = new FormData();
          // newPost.append("userId", localStorage.getItem("userId"));
          // newPost.append("content", this.content);
          //newPost.append("image", input.files[0]);
         

        const newContent = {
          userId: this.userId,
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
          if(res.status == 201)
          {
            alert("Votre message a été publié avec succès")
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
    <form>
      <textarea wrap="soft" rows="1" name="content" v-model="content" placeholder="Quoi de neuf ?"></textarea>
      <!-- <label for="image"><i class="fas fa-file-image"></i> Ajouter une image</label>
      <input 
      type="file" 
      id="imageUrl" 
      name="image" 
      accept=".image/*" 
      aria-label="file selection" /> -->
      <button type="submit" @click="publishContent()">Partager</button>
    </form>
  </div>
</template>