<script>
  import { db } from "./firebase.js";
  import { onMount } from "svelte";
  import AddItemForm from "./AddItemForm.svelte";
  import GroceryItem from "./components/GroceryItem.svelte";

  let newItemList = {};
  let groceryList = [];
  let shareIconImage = "./images/share-icon.svg";
  let bellIconImage = "./images/bell-regular.svg";
  let redoIconImage = "./images/redo-solid.svg";
  let noteIconImage = "./images/sticky-note-regular.svg";
  let calendarIconImage = "./images/calendar.svg";
  let heartIconImage = "./images/heart.svg";
  let mailIconImage = "./images/envelope.svg";
  let linkedinIconImage = "./images/linkedin.svg";
  let githubIconImage = "./images/github.svg";
  let dateString;
  let isEditing = false;

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

  function editItem() {
    isEditing = true;
  }

  async function updateItem(itemId, inputEl) {
    const reponse = db
      .collection("grocery")
      .doc(itemId)
      .update({ name: inputEl });
    isEditing = false;
  }
</script>

<header />
<main>
  <h1>Grocery list</h1>
  <span class="date">
    {dateString} <img src={calendarIconImage} alt="{calendarIconImage} image" />
  </span>
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
<footer>
  <div class="footer-contacts">
    <a href="https://www.linkedin.com/in/clarachaouatb3981363/">
      <img src={linkedinIconImage} alt="{linkedinIconImage} image" /></a
    >
    <a href="mailto:clara.chaouat@gmail.com?subject = Feedback&body = Message"
      ><img src={mailIconImage} alt="{mailIconImage} image" />
    </a>
    <a href="https://github.com/ClaraChaouat">
      <img src={githubIconImage} alt="{githubIconImage} image" />
    </a>
  </div>

  <div class="footer-text">
    Made with<img
      class="heart-icon"
      src={heartIconImage}
      alt="{heartIconImage} image"
    />somewhere over the rainbow
  </div>
</footer>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    background-color: var(--main-background-color);
    border-radius: 5px;
  }
  h1 {
    color: var(--title-color);
    font-size: 4em;
    font-weight: 100;
  }

  .date {
    font-weight: 700;
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

  footer,
  header {
    background-color: #262626;
    border-radius: 5px;
  }
  header {
    border-bottom: 3px solid #f29f05;
    height: 12%;
  }
  footer {
    display: flex;
    flex-direction: column;
    border-top: 3px solid #f29f05;
    height: 15%;
    color: #a6a6a6;
    align-items: center;
    justify-content: center;
  }

  .heart-icon {
    margin: 0 3px;
  }

  .footer-contacts {
    display: block;
  }

  .footer-text {
    margin-bottom: 5px;
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

    .footer-text {
      font-size: 10px;
    }

    .heart-icon {
      width: 13px;
      height: 8px;
      margin: 0 2px;
    }

    footer {
      border-top: 3px solid var(--border-color-light);
      height: 10%;
    }

    @media (max-width: 320px) {
      ul {
        width: 280px;
        margin: 0 auto;
        padding: 0;
      }

      .footer-text {
        font-size: 10px;
      }

      .heart-icon {
        width: 13px;
        height: 8px;
        margin: 0 2px;
      }

      .bottom-navbar-btn {
        width: 60px;
        height: 30px;
        font-size: 8px;
        display: inline-flex;
      }
    }
  }
</style>
