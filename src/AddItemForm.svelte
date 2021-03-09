<script>
  import { db } from "./firebase.js";
  let newItemText = "";

  function addItem() {
    db.collection("grocery").add({
      name: newItemText,
    });
    newItemText = "";
  }
</script>

<form>
  <input
    title="Add-item"
    type="text"
    bind:value={newItemText}
    placeholder="Item and quantity to buy"
  />
  <button on:click|preventDefault={addItem}>Add item</button>
</form>
