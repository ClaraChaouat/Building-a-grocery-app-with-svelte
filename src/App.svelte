<script>
  import { db } from "./firebase.js";
  import { onMount } from "svelte";
  import AddItemForm from "./AddItemForm.svelte";
  export let name;
  export let newItemText;

  let arrList = [];
  let tooltip = "Click to edit the entry";
  let shareIconImage = "./images/share-icon.svg";
  let bellIconImage = "./images/bell-regular.svg";
  let redoIconImage = "./images/redo-solid.svg";
  let noteIconImage = "./images/sticky-note-regular.svg";
  let trashIconImage = "./images/trash.svg";
  let now = new Date(),
    month,
    day,
    year;
  let dateString;

  onMount(() => {
    db.collection("grocery").onSnapshot((snapData) => {
      arrList = snapData.docs;
    });

    (month = "" + (now.getMonth() + 1)),
      (day = "" + now.getDate()),
      (year = now.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    dateString = [year, month, day].join("-");
  });

  function removeItem(itemId) {
    console.log("The event works");
    db.collection("grocery").doc(itemId).delete();
  }

  function updateItem(itemId, newItemValue) {
    db.collection("grocery").doc(itemId).update({ name: newItemText });
  }
</script>

<header />
<main>
  <h1>Grocery list</h1>
  <h3>{dateString}</h3>
  <AddItemForm />

  <ul>
    {#each arrList as listItem}
      <li>
        <!--.name = element name in the database-->

        <!--{#if listItem.editMode == true}-->
        <span>{listItem.data().name}</span>
        <input type="text" {tooltip} bind:value={newItemText} />
        <button
          on:click={() => {
            updateItem(listItem.id);
          }}>Update</button
        ><button
          class="remove-item-btn"
          on:click={() => removeItem(listItem.id)}
          ><img src={trashIconImage} alt="{trashIconImage} image" /></button
        >
        <!--{:else}
          <span
            data-tooltip={tooltip}
            on:click={() => {
              listItem.editMode = true;
              arrList = arrList;
            }}
          >
            {listItem.data().name}</span
          ><button class="remove-item-btn" on:click={() => removeItem(listItem.id)}><img src={trashIconImage} alt="{trashIconImage} image"></button>
        {/if}-->
      </li>
    {/each}
  </ul>
  <div class="bottom-navbar">
    <button class="bottom-navbar-btn icon"
      >Share<img
        class="icon"
        src={shareIconImage}
        alt="{shareIconImage} image"
      /></button
    >
    <button class="bottom-navbar-btn icon"
      >Set Reminder<img
        class="icon"
        src={bellIconImage}
        alt="{bellIconImage} image"
      /></button
    >
    <button class="bottom-navbar-btn icon"
      >Make recurring<img
        class="icon"
        src={redoIconImage}
        alt="{redoIconImage} image"
      /></button
    >
    <button class="bottom-navbar-btn icon"
      >Add note<img
        class="icon"
        src={noteIconImage}
        alt="{noteIconImage} image"
      /></button
    >
  </div>
  <!-- svelte-ignore a11y-img-redundant-alt -->
</main>
<footer />

<style>
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  :root {
    --title-color: #262626;
    --background-color-light: #f2f2f2;
    --text-color: #595959;
    --border-color-light: #f29f05;
    --background-color-dark: #bf846f;
  }
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    background-color: var(--background-color-dark);
    border-radius: 5px;
  }

  h1 {
    color: var(--title-color);
    font-size: 4em;
    font-weight: 100;
  }

  ul {
    list-style-type: none;
  }

  li {
    display: flex;
    align-items: center;
    background-color: var(--background-color-light);
    margin-top: 5px;
    border-radius: 10px;
    margin-right: 35%;
    margin-left: 35%;
    color: var(--text-color);
    font-weight: bold;
    border: 1.5px solid var(--border-color-light);
  }

  .bottom-navbar-btn {
    color: var(--background-color-light);
    border-radius: 8px;
    background-color: #bf846f;
    cursor: pointer;
    /*font-weight:bolder;*/
    border: 1px solid #bf846f;
    box-shadow: inset 0 0 0 10em rgba(255, 255, 255, 0.18);
  }

  .bottom-navbar-btn:hover {
    background-color: #f29f05;
  }

  .icon {
    margin-left: 1px;
    width: max-content;
  }

  .bottom-navbar {
    align-items: center;
  }

  header,
  footer {
    background-color: #262626;
    border-radius: 5px;
  }

  header {
    border-bottom: 3px solid #f29f05;
    height: 12%;
  }

  footer {
    border-top: 3px solid #f29f05;
    height: 15%;
  }

  .remove-item-btn {
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid #bfbfbf;
    margin-top: 5px;
  }

  .remove-item-btn:hover {
    background-color: #bfbfbf;
  }

  /*[data-tooltip] {
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
  }*/

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
