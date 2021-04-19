<script>
  import { db } from "./firebase.js";

  let newItemText;

  function addItem() {
    db.collection("grocery").add({
      name: newItemText,
    });
    newItemText = "";
  }
</script>

<form>
  <div class="input-field">
    <input
      class="item-input"
      title="Add-item"
      type="text"
      bind:value={newItemText}
      placeholder="Item and quantity to buy"
    />
    <button
      class="add-item-btn btn-white btn-animate"
      on:click|preventDefault={addItem}>Add item</button
    >
  </div>
</form>

<style>
  .item-input {
    width: 250px;
    flex-grow: 1;
    background-color: var(--background-color-light);
    border-radius: 5px;
    color: #595959;
    border: 1px solid #a6a6a6;
    margin: 0 auto;
    flex-grow: 1;
    margin-top:10px;
    box-shadow: none;
  }

  .item-input:focus {
    outline: var(--action-btn-color) solid 2px;
    box-shadow: 0 0 0 2px hsla(210, 100%, 50%, 0.5);
  }

  .add-item-btn {
    color: var(--background-color-light);
    border-radius: 8px;
    background-color: var(--border-color-light);
    border: 1px solid var(--border-color-light);
    cursor: pointer;
    transition: all 0.4s ease 0s;
  }

  .add-item-btn:hover {
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }

  @media (max-width: 600px) {
    .item-input {
      width: 200px;
    }
  }
  @media (max-width: 320px) {
    .item-input {
      width: 160px;
    }
  }
</style>
