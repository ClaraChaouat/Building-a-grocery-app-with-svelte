<script>
  import { db } from "./firebase.js";
  import { onMount } from "svelte";
  import AddItemForm from "./AddItemForm.svelte";
  export let name;
  export let newItemText;

  let arrList = [];
  let tooltip = "Click to edit the entry";

  onMount(() => {
    db.collection("grocery").onSnapshot((snapData) => {
      arrList = snapData.docs;
    });
  });

  function removeItem(itemId) {
    console.log("The event works");
    db.collection("grocery").doc(itemId).delete();
  }

  function updateItem(itemId, newItemValue) {
    db.collection("grocery").doc(itemId).update({ name: newItemText });
  }
</script>

<main>
  <h1>Grocery list</h1>
  <AddItemForm />

  <ul>
    {#each arrList as listItem}
      <li>
        <!--.name = element name in the database-->

        {#if listItem.editMode == true}
          <input type="text" {tooltip} bind:value={newItemText} />
          <button
            on:click={() => {
              updateItem(listItem.id);
            }}>Update</button
          >
        {:else}
          <span
            data-tooltip={tooltip}
            on:click={() => {
              listItem.editMode = true;
              arrList = arrList;
            }}
          >
            {listItem.data().name}</span
          >
        {/if}
        <button on:click={() => removeItem(listItem.id)}>Remove Item</button>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    font-weight: 100;
  }

  [data-tooltip] {
    position: relative;
    z-index: 2;
  }

  [data-tooltip]:before,
  [data-tooltip]:after {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s ease-out;
    transform: translate(-50%, 5px);
  }

  [data-tooltip]:before {
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-bottom: 5px;
    padding: 7px;
    width: 100%;
    min-width: 70px;
    max-width: 250px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    content: attr(data-tooltip);
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
    transition: 0.2s ease-out;
  }

  [data-tooltip]:after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    border-top: 5px solid #000;
    border-top: 5px solid hsla(0, 0%, 20%, 0.9);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

  [data-tooltip]:hover:before,
  [data-tooltip]:hover:after {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, 0);
  }
  [data-tooltip="false"]:hover:before,
  [data-tooltip="false"]:hover:after {
    visibility: hidden;
    opacity: 0;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
