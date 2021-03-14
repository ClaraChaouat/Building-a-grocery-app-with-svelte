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

<style>
  form {
    margin-right: 25%;
    margin-left: 25%;
  }

  input {
    background-color: #f2f2f2;
    border-radius: 5px;
    color: #595959;
    border: 1.5px solid #f29f05;
  }
</style>
