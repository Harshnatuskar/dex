<script lang="ts">
    import type { PageData } from "./$types"; 
    import { generations } from "./generations";
    import {goto} from "$app/navigation";
    import { page } from "$app/stores"; 
    import Monster from "./Monster.svelte";
    
    export let data: PageData;

    let form = {
      searchString:''
    }
    let searchString = ''
    $: selectedMonsters= data.monsters.filter((monster)=>{
      return monster.name.toLowerCase().includes(searchString.toLowerCase());
    })
     
    $: monsterId =$page.url.searchParams.get("monsterId") || '';

    $: monster = data.monsters.find((monster)=> monster.id === monsterId);
     

    $: selectedGenerationId = $page.url.searchParams.get('generation_id')|| ";"
    
    const updateSearchParams = (key: string, value: string) => {
        const searchParams = new URLSearchParams($page.url.searchParams);
        searchParams.set(key, value);
        goto(`?${searchParams.toString()}`);
    }

    const submitSearch = (e: Event) =>{
      searchString= form.searchString;
    }
     
    </script>

    {#if monster}
        <Monster
            monster={monster} 
            updateSearchParams={updateSearchParams}
        />
    {/if}
 
      
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="generations">
      <button class="generation"
        class:active={selectedGenerationId == 'all'}
        on:click={()=> updateSearchParams('generation_id','all')}>
        All
      </button> 

      {#each generations as generation (generation.id)} 
        <button class="generation"
          class:active={selectedGenerationId === generation.id.toString()}   
          on:click={()=> updateSearchParams('generation_id',generation.id.toString())}>
          {generation.main_region}
        </button>
      {/each}
    </div>
    
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <form class="search-form" on:submit|preventDefault={submitSearch}>
      <input class="search-field" type="text" bind:value={form.searchString} placeholder="pokemon name">
      <input type="submit" value="Search">
    </form>
     
    <div class="monsters" >
      {#each selectedMonsters as monster (monster.id)}
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
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
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
       
      .search-form{
        display: flex;
        justify-content: center;
        margin: 20px 0; 
      } 

      .search-form input[type="text"]{
        padding: 5px 10px;
        border: 1px solid #333;
        border-radius: 5px;
        width: 200px;
      }

      .search-form input[type="submit"]{
        padding: 5px 10px;
        border: 1px solid #333;
        border-radius: 5px;
        margin-left: 10px;
        background-color: #333;
        color: #fff;
      }
      
    </style>