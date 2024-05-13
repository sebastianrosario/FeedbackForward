<script setup>
const api = require('../api/api.js')
</script>

<template>
    <div class="loginbox">
      <input type="text" id="usernameField">
      <input type="text" id="passwordField">
      <!-- <button @click="api.getUserById('helloworld')"></button> !-->
    </div>
</template>
  
  <style>
  @media (min-width: 1024px) {
    .loginbox {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  input {
    width: 50%;
  }
  </style>
  