<script>
  export let item;
  export let removeItem;
  export let updateItem;
  export let editItem;
  export let itemId;
  export let isEditing = false;

  export let inputEl;
  let trashIconImage = "./images/trash.svg";
  let editIconImage = "./images/edit-icon.svg";
  //export let inputEl = item.name;
</script>

<li class="item">
  {#if isEditing}
    <input class="input-update" type="text" bind:value={inputEl} />
    <button
      class="update-btn"
      on:click={() => {
        updateItem(itemId, inputEl);
      }}>Update</button
    >
  {:else}
    <!--<span class="name">{item.name}</span>
  <button class="edit-item-btn btn-white btn-animate"
  on:click={() => {
      isEditing=true;
  }}><img src={editIconImage} alt="{editIconImage} image" /></button>-->

    <span class="name">{item.name}</span>
    <button
      class="edit-item-btn btn-white btn-animate"
      on:click={() => {
        editItem();
      }}><img src={editIconImage} alt="{editIconImage} image" /></button
    >
  {/if}

  <button class="remove-item-btn" on:click={() => removeItem(itemId)}
    ><img src={trashIconImage} alt="{trashIconImage} image" /></button
  >
  <!--<button class="remove-item-btn" on:click={() => removeItem(item.id)}
    ><img src={trashIconImage} alt="{trashIconImage} image" /></button
  >-->
</li>

<style>
  .remove-item-btn {
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid var(--action-btn-color);
    margin-top: 5px;
  }
  .remove-item-btn:hover {
    background-color: var(--action-btn-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .name {
    flex-grow: 1;
    margin-right: 10px;
  }

  .item {
    display: flex;
    align-items: center;
    background-color: var(--background-color-light);
    margin-top: 5px;
    border-radius: 10px;
    color: var(--text-color);
    font-weight: bold;
    border: 1px solid var(--item-background-color);
  }

  .input-update {
    flex-grow: 1;
    border: none;
    background-color: var(--background-color-light);
    color: var(--text-color);
    font-weight: bold;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  :focus {
    outline-width: 0px;
  }

  .remove-item-btn {
    background-color: white;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid var(--action-btn-color);
    margin-top: 5px;
    margin-right: 4px;
  }
  .remove-item-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .edit-item-btn {
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid var(--action-btn-color);
    margin-top: 5px;
    margin-right: 3px;
  }

  .edit-item-btn:hover {
    background-color: var(--action-btn-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .btn-white {
    background-color: #fff;
    color: #777;
  }
  .btn-animate {
    animation: moveInBottom 5s ease-out;
    animation-fill-mode: backwards;
  }

  .btn-white::after {
    background-color: #fff;
  }

  .update-btn {
    color: var(--title-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s ease 0s;
    margin-right: 5px;
    margin-top: 5px;
    align-content: center;
  }

  .update-btn:hover {
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }

  @media (max-width: 600px) {
    .input-update {
      width: 180px;
    }
  }
</style>
