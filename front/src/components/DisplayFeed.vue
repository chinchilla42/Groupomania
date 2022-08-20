<script>
export default {
	name: 'DisplayFeed',
	data() {
		return {
			posts: [],
		};
	},
	created() {
		const options =
		{
			method: 'GET',
			headers:
			{
				'Authorization': 'Bearer ' + localStorage.getItem("token"),
			}
		};
		fetch('http://localhost:3000/groupomania/post', options)
			.then((response) => response.json())
			.then((response) => {
				if (response.error) {
					return this.$router.push("/");
				}
				this.posts = response.post;
				console.log("check")
			})
			.catch((error) => {
				console.log(error);
			});
	},
	// methods: {
	// 	displayPosts() {
	// 		products.forEach(product => { }
	// 		)
	// 	}
	// }




}
</script>

<template>
	<div class="feeds">
		<h2>Votre fil d'actualité</h2>
		<div class="feeds_post">
			<div v-for="post in posts" :key="post.id" class="content">
				<div class="content-author">
					<p>Nom a dit : </p>
				</div>
				<div class="content-image">
				</div>
				<p class="content-text">{{post.content}}</p>
				<div class="like"><i class="fas fa-thumbs-up"></i> J'aime</div>
				<div class="change">
					<div class="modify-post">
						<p><i class="fas fa-pen"></i> Modifier</p>
					</div>
					<div class="delete-post">
						<p><i class="fas fa-trash"></i> Supprimer</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>