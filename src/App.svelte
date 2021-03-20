<script>
  import { db } from "./firebase.js";
  import { onMount } from "svelte";
  import AddItemForm from "./AddItemForm.svelte";
  import GroceryItem from "./components/GroceryItem.svelte";

  let name;
  let newItemList = {};

  let groceryList = [];
  let shareIconImage = "./images/share-icon.svg";
  let bellIconImage = "./images/bell-regular.svg";
  let redoIconImage = "./images/redo-solid.svg";
  let noteIconImage = "./images/sticky-note-regular.svg";
  let calendarIconImage = "./images/calendar.svg";
  let dateString;
  let isEditing = false;
  let xxx = "";

  let now = new Date(),
    month,
    day,
    year;

  onMount(() => {
    db.collection("grocery").onSnapshot((snapData) => {
      groceryList = snapData.docs;
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
    console.log(itemId);
    db.collection("grocery").doc(itemId).delete();
  }

  // async function updateItem(itemId, newItemValue) {
  //    const response = await db.collection("grocery").doc(itemId).update({ name: newItemList[itemId] });
  //   newItemList[itemId] = '';
  //   isEditing = false;

  // }

  function editItem() {
    isEditing = true;
  }

  function updateItem(itemId, inputEl) {
    console.log(itemId);
    console.log(inputEl);
    console.log(newItemList);
    db.collection("grocery").doc(itemId).update({ name: inputEl });
    console.log("no update");
    isEditing = false;

    // console.log(isEditing);
    // isEditing = false;
  }
</script>

<header />
<main>
  <h1>Grocery list</h1>
  <h3>
    {dateString} <img src={calendarIconImage} alt="{calendarIconImage} image" />
  </h3>
  <AddItemForm />

  <ul>
    {#each groceryList as listItem}
      <GroceryItem
        item={listItem.data()}
        {removeItem}
        itemId={listItem.id}
        {isEditing}
        {updateItem}
        inputEl={listItem.data().name}
        {editItem}
      />
    {/each}
  </ul>
  <div class="bottom-navbar">
    <button class="bottom-navbar-btn share "
      >Share<img
        class="icon share"
        src={shareIconImage}
        alt="{shareIconImage} image"
      /></button
    >
    <button class="bottom-navbar-btn"
      >Set Reminder<img
        class="icon"
        src={bellIconImage}
        alt="{bellIconImage} image"
      /></button
    >
    <button class="bottom-navbar-btn"
      >Make recurring<img
        class="icon"
        src={redoIconImage}
        alt="{redoIconImage} image"
      /></button
    >
    <button class="bottom-navbar-btn"
      >Add note<img
        class="icon"
        src={noteIconImage}
        alt="{noteIconImage} image"
      /></button
    >
  </div>
</main>
<footer />

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    /*background-color: var(--background-color-dark);*/
    background-color: gainsboro;
    border-radius: 5px;
  }
  h1 {
    color: var(--title-color);
    font-size: 4em;
    font-weight: 100;
  }
  ul {
    list-style-type: none;
    width: 350px;
    margin: 0 auto;
    padding: 0;
  }

  .bottom-navbar-btn {
    color: var(--background-color-light);
    border-radius: 8px;
    background-color: #a6a6a6;
    cursor: pointer;
    /*font-weight:bolder;*/
    border: 1px solid #a6a6a6;
    box-shadow: inset 0 0 0 10em rgba(255, 255, 255, 0.18);
    margin-top: 15px;
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

  @media (max-width: 600px) {
    ul {
      list-style-type: none;
      width: 300px;
      margin: 0 auto;
      padding: 0;
    }
    h1 {
      font-size: 40px;
      font-weight: 100;
    }
    .bottom-navbar-btn {
      width: 70px;
      height: 30px;
      font-size: 10px;
      display: inline-flex;
    }

    .icon {
      margin-top: 2px;
    }
    .bottom-navbar-btn.share {
      padding-left: 6px;
    }

    .icon.share {
      margin-left: 7px;
      margin-right: 0;
      padding-right: 0;
    }

    header {
      border-bottom: 3px solid var(--border-color-light);
      height: 8%;
    }
    footer {
      border-top: 3px solid var(--border-color-light);
      height: 10%;
    }
  }
</style>
