<script>
  import { db } from "./firebase.js";
  export let name;
  let arrList = [];
  let newItemText = "";
  let newItemQuantity;

  db.collection("grocery").onSnapshot((snapData) => {
    arrList = snapData.docs;
  });

  function addItem() {
    db.collection("grocery").add({
      name: newItemText,
      quantity: newItemQuantity,
    }); // It adds new data to the collection grocery
    newItemText = "";
    newItemQuantity = "";
  }

  function removeItem(itemId) {
    console.log("The event works");
    db.collection("grocery").doc(itemId).delete();
  }
</script>

<main>
  <h1>Grocery list</h1>
  <h2>
    <input type="text" bind:value={newItemText} placeholder="Item to buy" />
    <input
      type="number"
      bind:value={newItemQuantity}
      placeholder="Quantity to buy"
    />
    <button on:click={addItem}>Add item</button>
  </h2>
  <ul>
    {#each arrList as listItem}
      <li>
        {listItem.data().name} : {listItem.data().quantity}
        <button on:click={() => removeItem(listItem.id)}>Remove Item</button>
      </li>
      <!--.name = element name in the database-->
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

  h2 {
    font-size: 10px;
    color: black;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
