# feedback-forward
## Prereqs
1. NPM
2. MongoDB
3. Ubuntu Instance

## MongoDB Setup
```
mongosh // to get into mongodb shell
use ff_users
db.createCollection("users")
db.createUser(
    {
        user: "ff_login",
        pwd: "test123",
        roles: [ { role: "readWrite", db: "ff_users" } ] 
    }
)

use ff_posts
db.createCollection("posts")

// exit mongoshell
mongod --auth --port 27017 // make authentication mandatory, will restart mongo daemon
```

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Structure for the Front-End:

/feedback-forward/frontend 

│ 

├── /assets 

│   ├── /css 

│   │   ├── styles.css 

│   │   └── ....css 

│   ├── /js 

│   │   ├── main.js 

│   │   ├── swiper-config.js 

│   │   └── ....js 

│   └── /images 

│       └── ...png 

│ 

├── search.html 

├── signup.html 

├─ sighin.html 

│── index.html 

└── ...html 

## Structure for the Back-End:

/feedback-forward/src

│

├── /assets

│   ├── /css

│   │   ├── styles.css

│   │   └── ....css

│   ├── /js

│   │   ├── main.js

│   │   ├── swiper-config.js

│   │   └── ....js

│   └── /images

│       └── ...png

│

├── search.html

├── signup.html

├─ sighin.html

│── index.html

└── ...html
