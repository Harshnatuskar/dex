<script lang="ts">
    import type { IndexMonster } from "./+page";
    export let monster: IndexMonster;
    export let updateSearchParams: (key: string, value: string) => void;
    export let isInteractive: boolean = false;

    let rarity: string = monster.rarity ? monster.rarity : 'unknown';
    function getRarityClass(rarity: string): string {
    switch (rarity) {
      case 'normal':
        return 'normal';
      case 'rare':
        return 'rare';
      case 'ultra':
        return 'ultra';
      default:
        return '';
    }
  }

     
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={`monster ${getRarityClass(monster.rarity)}`}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click={()=> isInteractive?updateSearchParams('monsterId',monster.id):()=>{}}>
      <div class="monster-content">
        <img src={monster.image} alt={monster.name} />
        {monster.name}
      </div>
      <div class="monster-id">
        {monster.id}
      </div>
    </div> 
    
    </div>

<style>

:global(body) {
  background-color: black; 
}

.monster-id {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 0.8em;
  color: #3d3d3d;
  border-radius: 8px;
}

.monster {
  text-decoration: none;
  width: 100px;
  margin: 10px;
  padding: 10px;
  position: relative;
  background-color: #eee;
  border-radius: 8px;
  border: 1px solid rgb(68, 68, 68);
}

.monster:hover {
  background-color: #ffffff;
}

.normal {
  background-color: #ccc; /* Grey tone for normal */
}

.rare {
  background-color: #dfae8b; /* Brown tone for rare */
}

.ultra {
  background: linear-gradient(to right, #dba9db, #af7cd3); /* Gradient purple for ultra */
}

.monster-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}  


</style>