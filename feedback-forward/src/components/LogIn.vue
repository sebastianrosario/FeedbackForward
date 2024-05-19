<template>
    <div class="signup-form">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitForm">
        <div>
            <label for="username">Username:</label>
            <input type="text" v-model="username" required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    // for hashing password before sending to backend server
    // import bcrypt from 'bcrypt';
    // import apiActions from '../api/api.js'
    export default {
    data() {
        return {
        username: '',
        password: '',
        message: ''
        };
    },
    methods: {
        async submitForm() {
        try {
            
            const response = await axios.post(`http://localhost:3000/api/users/login/`, {
            username: this.username,
            password: this.password
            });
            this.message = 'User Authenticated';
        } catch (error) {
            this.message = 'Error: ' + error;
        }
        }
    }
    };
  </script>
  
  <style scoped>
  .signup-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .signup-form div {
    margin-bottom: 15px;
  }
  .signup-form label {
    display: block;
    margin-bottom: 5px;
  }
  .signup-form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  .signup-form button {
    padding: 10px 15px;
  }
  .signup-form p {
    margin-top: 15px;
    color: red;
  }
  </style>
  
    