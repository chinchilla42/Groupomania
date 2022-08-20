<script>
export default {
	name: 'DisplayFeed'
}
</script>

<template>
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