<script lang="ts"> 
   const greetingObject ={
    greeting : "How are you",
    day: "today?"
   }

   const data = [
    "oragen",
    "purple",
    "olive"
   ]
</script>

<h1>{greetingObject.greeting} doing {greetingObject.greeting}!</h1>

{#each data as color,i (color)}  
    <div>{i}:{color}</div>
{/each}
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
