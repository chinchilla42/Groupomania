<script>
import NavHeader from '@/components/NavHeader.vue'
import editForm from '@/components/editForm.vue'

export default {
  name: 'editPost',
   components: {
    NavHeader,
    editForm,
}
}

</script>

<template>
    <section>
        <NavHeader/>
        <editForm/>
    </section>
</template>