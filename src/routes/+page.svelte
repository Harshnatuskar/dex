<script lang="ts">
    import type { PageData } from "./$types"; 
    import { generations } from "./generations";
    import {goto} from "$app/navigation";
    import { page } from "$app/stores"; 
    import Monster from "./Monster.svelte";
    
    export let data: PageData;
     
    $: monsterId =$page.url.searchParams.get("monsterId") || '';

    $: monster = data.monsters.find((monster)=> monster.id === monsterId);
    
    $: monsterId2 =$page.url.searchParams.get("monsterId2") || '';

    $: monster2 = data.monsters.find((monster)=> monster.id === monsterId2);
    
    const updateSearchParams = (key: string, value: string) => {
        const searchParams = new URLSearchParams($page.url.searchParams);
        searchParams.set(key, value);
        goto(`?${searchParams.toString()}`);
    }
     
    </script>

    {#if monster}
        <Monster
            monster={monster} 
            updateSearchParams={updateSearchParams}
        />
    {/if}

    {#if monster2}
        <Monster
            monster={monster2} 
            updateSearchParams={updateSearchParams}
        />
    {/if}
      
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="generations">
      <a
        class="generation"
        class:active={$page.url.searchParams.get('generation') === null}
        href="/"
      >
        All
      </a>
      {#each generations as generation (generation.id)}
        <a
          class="generation"
          class:active={$page.url.searchParams.get('generation') === generation.id.toString()}
          href="/?generation={generation.id}"
        >
          {generation.main_region}
        </a>
      {/each}
    </div>
    
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="monsters" >
      {#each data.monsters as monster (monster.id)}
         <Monster 
         monster={monster}
         updateSearchParams={updateSearchParams}
         isInteractive={true}

         />
      {/each}
    </div>
    
    <style>
        .monsters {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
      .generations {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
      .generation {
        margin: 5px;
        padding: 5px 10px;
        border: 1px solid black;
        background-color: #f9f9f9;
        color: #333; 
      }
      .generation.active {
        background-color: #333;
        color: #f9f9f9;
      }
      .generation:hover {
        background-color: #eee;
      }
      .generation.active:hover {
        background-color: #555;
      }
       
    
    </style>