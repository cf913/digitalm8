<template>
  <div class="product_item">
    <div class="card item">
      <b-link :to="`/product/${component.id}`">
        <img class="card-img-top" :src="component.image" alt="image">
      </b-link>
      <div class="card-body">
        <b-link :to="`/product/${component.id}`" class="card-title">
          <h5>{{component.name}}</h5>
      </b-link>
              <p class="card-text">
        <span class="sales">${{Math.round(component.price*1.2)}}</span> ${{component.price}}
      </p>
        <b-button class="add-to-cart"><font-awesome-icon icon="shopping-cart" /> Add to cart</b-button>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: ['component']
}
</script>

<style lang="scss" scoped>
  .product_item {
    width: 30%;
  }
  .item {
    color: white;
    border: none;
    width: 100%;
    background: transparent;
    border-radius: 0;
    margin-bottom: 30px;
  }
  .card-text {
    font-weight: 500;
    font-size: 1.3em;
    color: red;
  }
  .card-img-top {
    width: 90%;
    margin: auto;
    border-radius: 5px;
    border: 2px solid #555;
  }

  .add-to-cart {
    background: rgb(255, 145, 0);
    border: orange;
    font-weight: 600;   
  }

  a.card-title {
    font-size: 1.2em;
    cursor: pointer;
    color: #ddd;

  }

  .sales {
    display: inline-block;
    position: relative;
    font-size: .8em;
    left: -20px;
    color: #777;
    text-decoration: line-through;
  }
</style>
